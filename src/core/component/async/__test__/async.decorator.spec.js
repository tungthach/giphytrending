import React from 'react';
import { given } from 'mocha-testdata';

import { mount, Test } from 'test-util';
import { INT_ZERO, INT_ONE } from 'core';

import { asyncComponent } from '../async.decorator';

/**
 * The error message of the test error.
 */
const TEST_ERROR_MESSAGE = "Test error";

/**
 * Generate a stub of a module import
 *
 * @param  {Boolean} hasDefault Does the importing stub module has the component in the 'default' property
 * @param  {Boolean} hasError Does the importing process has an error
 * @return {Object} The stub of the module import
 */
const makeImportStub = ({hasDefault = false, hasError = false} = {}) => {
  const module = hasDefault ? {default: Test} : Test;
  const resultStub = {
    // The expected importing module
    expectedModule: module,
    isLoaded: false,
    callback: null
  };

  // Simulate the module loaded event
  resultStub.load = () => {
    resultStub.isLoaded = true;
    resultStub.callback && resultStub.callback(resultStub.expectedModule);
  };

  // The system import stub
  resultStub.component = sinon.spy((func) => {
    if (hasError) throw Error(TEST_ERROR_MESSAGE);

    resultStub.callback = func;
    resultStub.isLoaded && resultStub.load && resultStub.load();
  });

  return resultStub;
};

/**
 * Test loading component asynchronously
 *
 * @return {Void}
 */
const testAsynchronousLoading = () => {

  it('Should render correctly when mounting after the module has been loaded', () => {
    // arrange
    let importStub = makeImportStub();

    // sut
    const ComponentClass = asyncComponent({
      component: importStub.component
    });

    importStub.load();

    const wrapper = mount(<ComponentClass />);

    return () => {
      const testElement = wrapper.find('.test');

      // expect
      assert.isNotNull(ComponentClass, "Loaded component class must not be null");
      assert.equal(wrapper.length, INT_ONE, "Loaded component class must be mountable");
      assert.equal(testElement.length, INT_ONE, "Loaded component view must be correct");
    };
  });

  it('Should render correctly if mounting before the module load but render after the module load', () => {
    // arrange
    let importStub = makeImportStub();

    // sut
    const ComponentClass = asyncComponent({ component: importStub.component });
    const wrapper = mount(<ComponentClass />);

    importStub.load();
    wrapper.update();

    return () => {
      const testElement = wrapper.find('.test');

      // expect
      assert.isNotNull(ComponentClass, "Loaded component class must not be null");
      assert.equal(wrapper.length, INT_ONE, "Loaded component class must be mountable");
      assert.equal(testElement.length, INT_ONE, "Loaded component view must be correct");
    };
  });

  it('Should render nothing if the render happen before the module load', () => {
    // arrange
    let importStub = makeImportStub();

    // sut
    const ComponentClass = asyncComponent({
      component: importStub.component
    });
    const wrapper = mount(<ComponentClass />);
    const testElement = wrapper.find('.test');

    importStub.load();
    wrapper.update();

    // expect
    assert.isNotNull(ComponentClass, "Loaded component class must not be null");
    assert.equal(wrapper.length, INT_ONE, "Loaded component class must be mountable");
    assert.equal(testElement.length, INT_ZERO, "Loaded component view must be correct");
  });
};

/**
 * Test loading component with error
 *
 * @return {Void}
 */
const testErrorThrowing = () => {
  it('Should load module with error', () => {
    // arrange
    let importStub = makeImportStub({
      hasError: true
    });

    const ComponentClass = asyncComponent({
      component: importStub.component
    });

    // sut
    try {
      const instance = new ComponentClass();

      instance.componentWillMount();
    }
    catch (error) {
      assert.deepEqual(error.message, `Dynamic page loading failed: Error: ${TEST_ERROR_MESSAGE}`);

      return;
    }

    assert.fail(null, null, `The component didn't throw error`);
  });
};

/**
 * Test loading component with additionals initial props, callback
 *
 * @return {Void}
 */
const testInitialPropsAndCallback = () => {
  given(
    {
      initialProps: {},
      componentProps: {},
      callback: null,
      expectedHasInitialProps: false,
      expectedHasComponentProps: false,
      expectedCallbackCallCount: INT_ZERO
    },
    {
      initialProps: {
        className: 'initial'
      },
      componentProps: {},
      callback: null,
      expectedHasInitialProps: true,
      expectedHasComponentProps: false,
      expectedCallbackCallCount: INT_ZERO
    },
    {
      initialProps: {},
      componentProps: {
        className: 'component'
      },
      callback: sinon.spy(),
      expectedHasInitialProps: false,
      expectedHasComponentProps: true,
      expectedCallbackCallCount: INT_ONE
    },
    {
      initialProps: {
        className: 'initial'
      },
      componentProps: {
        className: 'component'
      },
      callback: sinon.spy(),
      expectedHasInitialProps: true,
      expectedHasComponentProps: false,
      expectedCallbackCallCount: INT_ONE
    }
  )
  .it('Should load component correctly with callback, initial properties', ({
    // Initial properties from builder's params.
    initialProps,
    // Properties passed into the AsyncComponent.
    componentProps,
    // The callback of the module loaded event
    callback,
    // Whether the className from the initial props is found in the child component
    expectedHasInitialProps,
    // Whether the className from the component props is found in the child component
    expectedHasComponentProps,
    // Whether the callback is called
    expectedCallbackCallCount
  }) => {
    // arrange
    let importStub = makeImportStub();

    // sut
    const ComponentClass = asyncComponent({
      component: importStub.component,
      preProcess: callback,
      initialProps
    });
    const wrapper = mount(<ComponentClass {...componentProps} />);

    importStub.load();
    wrapper.update();

    return () => {
      const testElement = wrapper.find('.test');
      const hasInitialProps = testElement.hasClass('initial');
      const hasComponentProps = testElement.hasClass('component');

      // expect
      assert.isNotNull(ComponentClass, "Loaded component class must not be null");
      assert.equal(wrapper.length, INT_ONE, "Loaded component class must be mountable");
      assert.equal(testElement.length, INT_ONE, "Loaded component view must be correct");
      assert.equal(hasInitialProps, expectedHasInitialProps, "Initial props is passed correctly");
      assert.equal(hasComponentProps, expectedHasComponentProps, "Component props is passed correctly");
      assert.equal(
        callback ? callback.callCount : INT_ZERO,
        expectedCallbackCallCount,
        "Callback method is called correctly"
      );
    };
  });
};

/**
 * Test the ability to load a component from a module by it's default prop or by itself.
 *
 * @return {Void}
 */
const testLoadModuleWithDefault = () => {
  given(
    {
      importStubOptions: {
        hasDefault: false
      }
    },
    {
      importStubOptions: {
        hasDefault: true
      }
    }
  )
  .it('Should load module with default options correctly', ({
    importStubOptions
  }) => {
    // arrange
    let importStub = makeImportStub(importStubOptions);

    // sut
    const ComponentClass = asyncComponent({
      component: importStub.component
    });
    const wrapper = mount(<ComponentClass />);

    importStub.load();
    wrapper.update();

    return () => {
      const testElement = wrapper.find('.test');

      // expect
      assert.isNotNull(ComponentClass, "Loaded component class must not be null");
      assert.equal(wrapper.length, INT_ONE, "Loaded component class must be mountable");
      assert.equal(testElement.length, INT_ONE, "Loaded component view must be correct");
    };
  });
};

/**
 * Test loading component with error
 *
 * @return {Void}
 */
const testWithNoComponent = () => {
  it('Should render nothing with no system import', () => {
    // sut
    const ComponentClass = asyncComponent({
      component: null
    });
    const wrapper = mount(<ComponentClass />);
    const instance = wrapper.instance();

    // expect
    assert.isNotNull(ComponentClass, "Loaded component class must not be null");
    assert.equal(wrapper.length, INT_ONE, "Loaded component class must be mountable");
    assert.isNull(instance.render(), "Loaded component must render to nothing");
  });
};

// Test the AsyncComponent
describe('async.decorator.spec.js', () => {
  testAsynchronousLoading();
  testErrorThrowing();
  testInitialPropsAndCallback();
  testLoadModuleWithDefault();
  testWithNoComponent();
});
