import React from 'react';
import { number, string } from 'prop-types';
import { given } from 'mocha-testdata';
import { mount, shallow } from 'enzyme';

import { BaseComponent } from 'component/base';

/**
 * Generic functions used for testing.
 */
const TestFunctions = {
  A: () => 'A',
  B: () => 'B',
  C: () => 'C',
  D: () => 'D'
};

/**
 * Test the updateClassName method
 *
 * @param {Object} sampleWrapper The Sample component for testing
 * @return {Void}
 */
const testUpdateClassName = sampleWrapper => {
  context('updateClassName()', () => {
    given(
      {
        domNode: {
          className: 'origin'
        },
        oldClassName: 'old',
        newClassName: 'new',
        expectedClassName: 'new origin'
      },
      {
        domNode: {
          className: 'old'
        },
        oldClassName: 'old',
        newClassName: 'new',
        expectedClassName: 'new'
      },
      {
        domNode: {
          className: 'origin'
        },
        oldClassName: 'old',
        newClassName: 'old',
        expectedClassName: 'origin'
      }
    ).it('Should update the class names correctly', ({ domNode, oldClassName, newClassName, expectedClassName }) => {
      // arrange
      const findDOMNodeStub = () => domNode;

      sampleWrapper.element = <div />;

      // sut
      const wrapper = mount(<sampleWrapper.component id="15" />);

      wrapper.instance().updateClassName(newClassName, oldClassName, findDOMNodeStub);

      // expect
      assert.equal(domNode.className, expectedClassName, 'The result class names must be correct');
    });
  });
};

/**
 * Test the extendHandler method
 *
 * @param {Object} sampleWrapper The Sample component for testing
 * @return {Void}
 */
const testExtendHandler = sampleWrapper => {
  context('extendHandler()', () => {
    given(
      {
        extendHandler: null,
        expectedHandler: {
          A: TestFunctions.A,
          D: TestFunctions.D
        }
      },
      {
        extendHandler: {
          A: TestFunctions.C,
          B: TestFunctions.B
        },
        expectedHandler: {
          A: TestFunctions.C,
          D: TestFunctions.D,
          B: TestFunctions.B
        }
      },
      {
        extendHandler: [TestFunctions.B, TestFunctions.C],
        expectedHandler: {
          A: TestFunctions.A,
          D: TestFunctions.D,
          B: TestFunctions.B,
          C: TestFunctions.C
        }
      }
    ).it('Should update the class names correctly', ({ extendHandler, expectedHandler }) => {
      // arrange
      const handler = {
        A: TestFunctions.A,
        D: TestFunctions.D
      };

      sampleWrapper.element = <div />;

      // sut
      const wrapper = mount(<sampleWrapper.component id="15" />);
      const mergedHandler = wrapper.instance().extendHandler(handler, extendHandler);

      // expect
      assert.deepEqual(
        Object.keys(mergedHandler),
        Object.keys(expectedHandler),
        'The result handler names must be correct'
      );
      assert(
        Object.keys(mergedHandler).every(key => mergedHandler[key]() === expectedHandler[key]()),
        'The result handler behaviors must be correct'
      );
    });

    it('Should catch error correctly', () => {
      // arrange
      const handler = {};
      const extendHandler = [() => true];

      sampleWrapper.element = <div />;

      // sut
      const wrapper = mount(<sampleWrapper.component id="15" />);
      const executeMerge = () => wrapper.instance().extendHandler(handler, extendHandler);

      // expect
      assert.throws(executeMerge);
    });
  });
};

/**
 * Test the componentDidMount method
 *
 * @param {Object} sampleWrapper The Sample component for testing
 * @return {Void}
 */
const testComponentDidMount = sampleWrapper => {
  context('componentDidMount()', () => {
    it('should set className', () => {
      // arrange
      sampleWrapper.element = <div />;
      const className = 'test-class';

      // sut
      const wrapper = mount(<sampleWrapper.component className={className} />);

      // expect
      assert.isTrue(wrapper.hasClass(className));
    });

    it('should append new className with child className', () => {
      // arrange
      const className = 'test-class';
      const elementClassName = 'element';

      sampleWrapper.element = <div className={elementClassName} />;

      // sut
      const wrapper = mount(<sampleWrapper.component className={className} />);

      wrapper.update();

      return () => {
        // expect
        assert.isTrue(wrapper.hasClass(className));
        assert.isTrue(wrapper.hasClass(elementClassName));
      };
    });

    it('should not set className if is not passed', () => {
      // arrange
      sampleWrapper.element = <div />;

      // sut
      const wrapper = mount(<sampleWrapper.component />);

      // expect
      assert.isUndefined(wrapper.props().className);
    });
  });
};

/**
 * Test the createModel method
 *
 * @param {Object} sampleWrapper The Sample component for testing
 * @return {Void}
 */
const testCreateModel = (sampleWrapper) => {
  context('createModel()', () => {
    const props = {
        id: 1,
        name: 'abc'
      };

    it('should return object base on propTypes', () => {
      // arrange
      const expectedModel = props;

      // sut
      const wrapper = shallow(<sampleWrapper.component {...props} newProp="32323" />);
      const instance = wrapper.instance();
      const actualModel = instance.createModel();

      // expect
      assert.deepEqual(actualModel, expectedModel);
    });

    it('should return object base on propTypes and extend object', () => {
      // arrange
      const extendObject = {
        email: 'abc@gmail.com'
      };
      const expectedModel = {
        ...props,
        ...extendObject
      };

      // sut
      const wrapper = shallow(<sampleWrapper.component {...props} />);
      const instance = wrapper.instance();
      const actualModel = instance.createModel(extendObject);

      // expect
      assert.deepEqual(actualModel, expectedModel);
    });
  });
};

// Unit tests on BaseComponent
describe('base.component.spec.js', () => {
  const sampleWrapper = {
    component: null,
    element: null
  };

  beforeEach(() => {
    sampleWrapper.component = class extends BaseComponent {
      static propTypes = {
        id: number.isRequired,
        name: string
      };

      render() {
        return sampleWrapper.element;
      }
    };
  });

  testUpdateClassName(sampleWrapper);
  testExtendHandler(sampleWrapper);
  testComponentDidMount(sampleWrapper);
  testCreateModel(sampleWrapper);
});
