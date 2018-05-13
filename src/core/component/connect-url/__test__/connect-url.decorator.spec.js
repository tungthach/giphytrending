import React from 'react';
import Immutable from 'immutable';
import { given } from 'mocha-testdata';

import { mount } from 'test-util';
import { EMPTY_FUNCTION, INT_ZERO, INT_ONE, INT_TWO } from 'core';

import {
  connectUrl,
  validateOptions,
  validatePropertyName,
  sanitizeOptions,
  passThroughFunction
} from '../connect-url.decorator';

/**
 * Initialize the router context with the specified options
 *
 * @param {Object} options={path, queries, push} The current path, queries and push method of the context
 * @returns {Object} Context mock object
 */
const initializeContext = ({ path, queries, push }) => {
  return {
    context: {
      router: {
        history: {
          location: {
            pathname: path || '',
            search: queries || ''
          },
          push: push || EMPTY_FUNCTION
        },
        route: {
          location: {
            pathname: path || '',
            search: queries || ''
          }
        }
      }
    }
  };
};

/**
 * Initialize the sample component wrapped in the decorator
 *
 * @param {Object} options={ propName, options } The inputs of the decorator
 * @returns {Class} The sample decorated component
 */
const initializeTestComponent = ({ propName = undefined, options = {} }) => {
  @connectUrl(propName, options)
  class Sample extends React.Component {
    render() {
      return <div className="sample" />;
    }
  }

  return Sample;
};

/**
 * Test the method getComposedQueriesObject
 *
 * @return {Void}
 */
const testGetComposedQueriesObject = () => {
  context('getComposedQueriesObject()', () => {
    given(
      {
        queries: '?number=10',
        initialState: {
          cachedQueriesString: '?number=5',
          cachedComposedQueriesObject: Immutable.fromJS({ number: '5' })
        },
        expectedObject: {
          number: '10'
        }
      },
      {
        queries: '?number=10',
        initialState: {
          cachedQueriesString: '?number=5',
          cachedComposedQueriesObject: Immutable.fromJS({ number: '5' })
        },
        decoratorOptions: { composer: () => ({ number: '50' }) },
        expectedObject: {
          number: '50'
        }
      },
      {
        queries: '?number=10',
        initialState: {
          cachedQueriesString: '?number=10',
          cachedComposedQueriesObject: Immutable.fromJS({ number: '750' })
        },
        expectedObject: {
          number: '750'
        }
      },
      {
        queries: '',
        initialState: {
          cachedQueriesString: '?number=10',
          cachedComposedQueriesObject: Immutable.fromJS({ number: '750' })
        },
        expectedObject: {}
      },
      {
        queries: null,
        initialState: {
          cachedQueriesString: '?number=10',
          cachedComposedQueriesObject: Immutable.fromJS({ number: '750' })
        },
        expectedObject: {}
      }
    ).it('Should return the right object', ({ queries, decoratorOptions = {}, initialState, expectedObject }) => {
      // arrange
      const SampleComponent = initializeTestComponent({ options: decoratorOptions });
      const initialRouterContext = initializeContext({ queries });

      // sut
      const wrapper = mount(<SampleComponent />, { customContext: initialRouterContext });

      wrapper.setState(initialState);

      const instance = wrapper.instance();
      const parsedObject = instance.getComposedQueriesObject();

      // expect
      assert.deepEqual(parsedObject, expectedObject, 'The returned object must be correct');
    });
  });
};

/**
 * Test the method processRoute
 *
 * @return {Void}
 */
const testProcessRoute = () => {
  context('processRoute()', () => {
    given(
      {
        initialState: null,
        inputObject: { number: '10' },
        expectedPath: '?number=10'
      },
      {
        initialState: null,
        inputPath: 'path',
        inputObject: { number: '10' },
        expectedPath: 'path?number=10'
      },
      {
        initialState: {
          cachedQueriesString: '?number=20',
          cachedComposedQueriesObject: Immutable.fromJS({ number: '10' })
        },
        inputObject: { number: '10' },
        expectedPath: '?number=10'
      },
      {
        classOptions: {
          options: { decomposer: x => x }
        },
        initialState: {
          cachedQueriesString: '?number=20',
          cachedQueriesObject: Immutable.fromJS({ number: '10' })
        },
        inputObject: { number: '10' },
        expectedPath: '?number=10'
      },
      {
        classOptions: {
          options: { isCached: true }
        },
        initialState: {
          cachedQueriesString: '?number=20',
          cachedComposedQueriesObject: Immutable.fromJS({ number: '10' })
        },
        inputObject: { number: '10' },
        expectedPath: '?number=20'
      },
      {
        classOptions: {
          options: {
            isCached: true,
            decomposer: x => x
          }
        },
        initialState: {
          cachedQueriesString: '?number=20',
          cachedQueriesObject: Immutable.fromJS({ number: '10' })
        },
        inputObject: { number: '10' },
        expectedPath: '?number=20'
      },
      {
        initialContext: {
          path: 'old',
          queries: '?number=10'
        },
        initialState: {
          cachedQueriesString: '?number=10',
          cachedComposedQueriesObject: Immutable.fromJS({ number: '10' })
        },
        inputObject: { number: '10' },
        inputPath: 'new',
        expectedPath: 'new?number=10'
      }
    ).it(
      'Should route correctly',
      ({
        initialContext = {},
        classOptions = {},
        initialState = null,
        inputObject,
        inputPath = null,
        expectedPath
      }) => {
        // arrange
        const SampleComponent = initializeTestComponent(classOptions);
        const pushSpy = sinon.spy();
        const initialRouterContext = initializeContext({
          ...initialContext,
          push: pushSpy
        });

        // sut
        const wrapper = mount(<SampleComponent />, { customContext: initialRouterContext });

        wrapper.setState(initialState);

        const instance = wrapper.instance();

        instance.processRoute(inputObject, inputPath);

        // expect
        assert.equal(pushSpy.callCount, INT_ONE, 'Must route at least once');
        assert.equal(pushSpy.firstCall.args[INT_ZERO], expectedPath, 'The routed path must be correct');
      }
    );

    given({
      initialContext: {
        path: 'old',
        queries: '?number=10'
      },
      initialState: {
        cachedQueriesString: '?number=10',
        cachedQueriesObject: Immutable.fromJS({ number: '10' }),
        cachedComposedQueriesObject: Immutable.fromJS({ number: '10' })
      },
      inputPath: 'old',
      inputObject: { number: '10' }
    }).it('Should not route', ({ initialContext, initialState, inputPath, inputObject }) => {
      // arrange
      const SampleComponent = initializeTestComponent({
        options: {
          isCached: true
        }
      });
      const pushSpy = sinon.spy();
      const initialRouterContext = initializeContext({
        ...initialContext,
        push: pushSpy
      });

      // sut
      const wrapper = mount(<SampleComponent />, { customContext: initialRouterContext });

      wrapper.setState(initialState);

      const instance = wrapper.instance();

      instance.processRoute(inputObject, inputPath);

      // expect
      assert.equal(pushSpy.callCount, INT_ZERO, 'Must not route');
    });
  });
};

/**
 * Test the method patchRoute and setRoute
 *
 * @return {Void}
 */
const testPatchRouteAndSetRoute = () => {
  context('patchRoute(), setRoute()', () => {
    it('Should call processRoute correctly', () => {
      const SampleComponent = initializeTestComponent({});
      const inputObject = { number: '10' };
      const inputPath = 'path';

      // sut
      const wrapper = mount(<SampleComponent />);
      const instance = wrapper.instance();
      const processRouteStub = sinon.stub(instance, 'processRoute');

      instance.patchRoute(inputObject, inputPath);
      instance.setRoute(inputObject, inputPath);

      // expect
      assert.equal(processRouteStub.callCount, INT_TWO, 'Must call process route correctly');
      assert(processRouteStub.firstCall.args, [inputObject, inputPath, true], 'Must call process route correctly');
      assert(processRouteStub.firstCall.args, [inputObject, inputPath, false], 'Must call process route correctly');
    });
  });
};

/**
 * Test the method checkQueriesChanged
 *
 * @return {Void}
 */
const testCheckQueriesChanged = () => {
  context('checkQueriesChanged()', () => {
    given(
      {
        initialParam: undefined,
        initialContext: { queries: '?number=10' },
        initialState: { lastComparedQueriesString: '?number=10' },
        expected: {
          result: false,
          lastComparedQueriesString: '?number=10'
        }
      },
      {
        initialParam: '?number=20',
        initialContext: { queries: '?number=10' },
        initialState: { lastComparedQueriesString: '?number=10' },
        expected: {
          result: true,
          lastComparedQueriesString: '?number=20'
        }
      },
      {
        initialParam: undefined,
        initialContext: { queries: '?number=20' },
        initialState: { lastComparedQueriesString: '?number=10' },
        expected: {
          result: true,
          lastComparedQueriesString: '?number=20'
        }
      }
    ).it('Should compare correctly', ({ initialParam, initialContext, initialState, expected }) => {
      // arrange
      const SampleComponent = initializeTestComponent({});
      const initialRouterContext = initializeContext(initialContext);

      // sut
      const wrapper = mount(<SampleComponent />, { customContext: initialRouterContext });

      wrapper.setState(initialState);

      const instance = wrapper.instance();
      const result = instance.checkQueriesChanged(initialParam);

      // expect
      assert.equal(result, expected.result, 'Compare result must be correct');
      assert.deepEqual(
        instance.state.lastComparedQueriesString,
        expected.lastComparedQueriesString,
        'Must store the queries to state'
      );
    });
  });
};

/**
 * Test the method calculateQueriesString
 *
 * @return {Void}
 */
const testCalculateQueriesString = () => {
  context('calculateQueriesString()', () => {
    given(
      {
        inputObject: { number: '10' },
        isCached: false,
        isPatching: false,
        initialState: {
          cachedComposedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesString: '?number=10'
        },
        expectedQueries: '?number=10'
      },
      {
        inputObject: { number: '10' },
        isCached: false,
        isPatching: false,
        initialState: {
          cachedComposedQueriesObject: Immutable.fromJS({ number: '20' }),
          cachedQueriesObject: Immutable.fromJS({ number: '20' }),
          cachedQueriesString: '?number=20'
        },
        expectedQueries: '?number=10'
      },
      {
        inputObject: { number: '20' },
        isCached: true,
        isPatching: false,
        initialState: {
          cachedComposedQueriesObject: Immutable.fromJS({ number: '20' }),
          cachedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesString: '?number=10'
        },
        expectedQueries: '?number=10'
      },
      {
        inputObject: { number: '20' },
        isCached: true,
        isPatching: false,
        initialState: {
          cachedComposedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesObject: Immutable.fromJS({ number: '20' }),
          cachedQueriesString: '?number=10'
        },
        expectedQueries: '?number=10'
      },
      {
        inputObject: { number: '20' },
        isCached: false,
        isPatching: false,
        initialState: {
          cachedComposedQueriesObject: Immutable.fromJS({ number: '20' }),
          cachedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesString: '?number=10'
        },
        expectedQueries: '?number=20'
      },
      {
        inputObject: { number: '20' },
        isCached: false,
        isPatching: false,
        initialState: {
          cachedComposedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesObject: Immutable.fromJS({ number: '20' }),
          cachedQueriesString: '?number=10'
        },
        expectedQueries: '?number=20'
      },
      {
        inputObject: { letter: 'A' },
        isCached: false,
        isPatching: true,
        initialState: {
          cachedComposedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesString: '?number=10'
        },
        expectedQueries: '?letter=A&number=10'
      },
      {
        inputObject: { letter: 'A' },
        isCached: false,
        isPatching: false,
        initialState: {
          cachedComposedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesObject: Immutable.fromJS({ number: '10' }),
          cachedQueriesString: '?number=10'
        },
        expectedQueries: '?letter=A'
      }
    ).it('Should compare correctly', ({ inputObject, isCached, isPatching, initialState, expectedQueries }) => {
      // arrange
      const SampleComponent = initializeTestComponent({
        options: { isCached }
      });

      // sut
      const wrapper = mount(<SampleComponent />);

      wrapper.setState(initialState);

      const instance = wrapper.instance();
      const result = instance.calculateQueriesString(inputObject, isPatching);

      // expect
      assert.equal(result, expectedQueries, 'Result queries must be correct');
    });
  });
};

/**
 * Test the method updateQueriesCache
 *
 * @return {Void}
 */
const testUpdateQueriesCache = () => {
  context('updateQueriesCache()', () => {
    const state20 = {
      cachedComposedQueriesObject: Immutable.fromJS({ number: '20' }),
      cachedQueriesObject: Immutable.fromJS({ number: '20' })
    };
    const state10 = {
      cachedComposedQueriesObject: Immutable.fromJS({ number: '10' }),
      cachedQueriesObject: Immutable.fromJS({ number: '10' })
    };

    given(
      {
        initialContext: { queries: '?number=20' },
        initialState: {
          cachedQueriesString: '?number=10',
          ...state10
        },
        decoratorOptions: {},
        expectedState: {
          cachedQueriesString: '?number=20',
          ...state20
        }
      },
      {
        initialContext: { queries: '?number=20' },
        initialState: {
          cachedQueriesString: '?number=20',
          ...state10
        },
        decoratorOptions: {},
        expectedState: {
          cachedQueriesString: '?number=20',
          ...state10
        }
      },
      {
        initialContext: { queries: '?number=20' },
        initialState: {
          cachedQueriesString: '?number=10',
          ...state10
        },
        decoratorOptions: {
          composer: () => ({ number: 50 })
        },
        expectedState: {
          cachedQueriesString: '?number=20',
          cachedComposedQueriesObject: Immutable.fromJS({
            number: 50
          }),
          cachedQueriesObject: Immutable.fromJS({
            number: '20'
          })
        }
      }
    ).it('Should compare correctly', ({ initialContext, initialState, decoratorOptions, expectedState }) => {
      // arrange
      const SampleComponent = initializeTestComponent({ options: decoratorOptions });
      const initialRouterContext = initializeContext(initialContext);

      // sut
      const wrapper = mount(<SampleComponent />, { customContext: initialRouterContext });

      wrapper.setState(initialState);

      const instance = wrapper.instance();

      instance.updateQueriesCache();

      const state = instance.state;

      // expect
      assert.equal(state.cachedQueriesString, expectedState.cachedQueriesString, 'The state should be updated');
      assert.deepEqual(
        state.cachedComposedQueriesObject.toJS(),
        expectedState.cachedComposedQueriesObject.toJS(),
        'The state should be updated'
      );
      assert.deepEqual(
        state.cachedQueriesObject.toJS(),
        expectedState.cachedQueriesObject.toJS(),
        'The state should be updated'
      );
    });
  });
};

/**
 * Test the method connectUrl
 *
 * @return {Void}
 */
const testConnectUrl = () => {
  context('connectUrl()', () => {
    given(
      {
        decoratorPropName: 'queries',
        decoratorOptions: {
          composer: x => x,
          decomposer: x => x,
          isCached: false
        }
      },
      {}
    ).it('Should decorate the component correctly', classOptions => {
      // arrange
      const SampleComponent = initializeTestComponent(classOptions);
      const firstQueries = '?bar=foo';
      const secondQueries = '?foo=bar';
      const initialRouterContext = initializeContext({
        queries: firstQueries
      });

      // sut
      const wrapper = mount(<SampleComponent />, { customContext: initialRouterContext });
      const instance = wrapper.instance();
      const wrapperRouterContext = instance.context.router;
      const firstWrapperState = instance.state;
      const sampleElement = wrapper.find('.sample');

      wrapperRouterContext.history.location.search = secondQueries;
      wrapper.update();

      return () => {
        const secondWrapperState = wrapper.state();

        // expect
        assert.isNotNull(wrapperRouterContext, 'The router context must be available');
        assert.isNotNull(firstWrapperState, 'The wrapper must have correct state');
        assert.equal(firstWrapperState.cachedQueriesString, firstQueries, 'The wrapper must have correct state');
        assert.equal(secondWrapperState.cachedQueriesString, secondQueries, 'The wrapper must have correct state');
        assert.equal(sampleElement.length, INT_ONE, 'The wrapper must contains correct children');
      };
    });
  });
};

/**
 * Test the method validateOptions
 *
 * @return {Void}
 */
const testValidateOptions = () => {
  context('validateOptions()', () => {
    given(
      {
        composer: c => c,
        decomposer: d => d,
        isCached: false
      },
      {
        decomposer: d => d,
        isCached: false
      },
      {
        composer: c => c,
        isCached: false
      },
      {
        composer: c => c,
        decomposer: d => d,
        good: 'good'
      },
      {}
    ).it('Should allow correctly', options => {
      assert.doesNotThrow(() => validateOptions(options));
    });

    given(
      {
        composer: null,
        isCached: false
      },
      {
        composer: 123,
        isCached: false
      },
      {
        composer: 'a',
        isCached: false
      },
      {
        decomposer: null,
        isCached: false
      },
      {
        decomposer: 123,
        isCached: false
      },
      {
        decomposer: 'a',
        isCached: false
      },
      {
        isCached: 'false'
      },
      {
        isCached: null
      },
      {
        isCached: () => true
      },
      null,
      undefined,
      [false, true]
    ).it('Should throw error correctly', options => {
      assert.throws(() => validateOptions(options));
    });
  });
};

/**
 * Test the method validatePropertyName
 *
 * @return {Void}
 */
const testValidatePropertyName = () => {
  context('validatePropertyName()', () => {
    it('Should allow correctly', () => {
      assert.doesNotThrow(() => validatePropertyName('goodName'));
    });

    given('', null, INT_ONE, () => true, undefined).it('Should throw error correctly', name => {
      assert.throws(() => validatePropertyName(name));
    });
  });
};

/**
 * Test the method sanitizeOptions
 *
 * @return {Void}
 */
const testSanitizeOptions = () => {
  const func = () => true;

  context('sanitizeOptions()', () => {
    given(
      {
        input: {
          composer: func,
          decomposer: func,
          isCached: true
        },
        expected: {
          composer: func,
          decomposer: func,
          isCached: true
        }
      },
      {
        input: {
          decomposer: func,
          isCached: true
        },
        expected: {
          composer: passThroughFunction,
          decomposer: func,
          isCached: true
        }
      },
      {
        input: {
          composer: func,
          isCached: true
        },
        expected: {
          composer: func,
          decomposer: passThroughFunction,
          isCached: true
        }
      },
      {
        input: {
          composer: func,
          decomposer: func
        },
        expected: {
          composer: func,
          decomposer: func,
          isCached: false
        }
      }
    ).it('Should sanitize correctly', ({ input, expected }) => {
      // sut
      const result = sanitizeOptions(input);

      // expect
      assert.deepEqual(result, expected, 'Result must be correct');
    });
  });
};

/**
 * Test the method componentWillReceiveProps()
 *
 * @return {Void}
 */
const testComponentWillReceiveProps = () => {
  context('componentWillReceiveProps()', () => {
    it('Should update queries cache correctly', () => {
      // arrange
      const SampleComponent = initializeTestComponent({});
      const initialRouterContext = initializeContext({ queries: '?number=20' });

      // sut
      const wrapper = mount(<SampleComponent />, { customContext: initialRouterContext });
      const instance = wrapper.instance();
      const updateQueriesCacheStub = sinon.stub(instance, 'updateQueriesCache');

      instance.componentWillReceiveProps();

      // expect
      assert.isTrue(updateQueriesCacheStub.calledOnce, 'The cache should be updated');
    });
  });
};

// Test the ConnectUrl decorator
describe('connect-url.decorator.spec.js', () => {
  testGetComposedQueriesObject();
  testProcessRoute();
  testPatchRouteAndSetRoute();
  testCheckQueriesChanged();
  testCalculateQueriesString();
  testUpdateQueriesCache();
  testConnectUrl();
  testValidateOptions();
  testValidatePropertyName();
  testSanitizeOptions();
  testComponentWillReceiveProps();
});
