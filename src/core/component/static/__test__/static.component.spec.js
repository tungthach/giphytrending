import React from 'react';
import { given } from 'mocha-testdata';

import { shallow } from 'test-util';
import { Static } from '../';

/**
 * Test propTypes
 * @return {Void}
 */
const testPropTypes = () => {
  it('propTypes', () => {
    // expect
    assert.isNotNull(Static.propTypes.shouldUpdate);
  });
};

/**
 * Test render()
 * @return {Void}
 */
const testRender = () => {
  it('render()', () => {
    // arrange
    const children = <span>testing</span>;

    // sut
    const wrapper = shallow(<Static>{ children }</Static>);
    const instance = wrapper.instance();
    const result = instance.render();

    // expect
    assert.deepEqual(result, children);
  });
};

/**
 * Test shouldComponentUpdate()
 * @return {Void}
 */
const testShouldComponentUpdate = () => {
  given({
    nextProps: {
      shouldUpdate: false
    },
    expected: false
  },
  {
    nextProps: {
      shouldUpdate: true
    },
    expected: true
  },
  {
    nextProps: {
      shouldUpdate: () => false
    },
    expected: false
  },
  {
    nextProps: {
      shouldUpdate: () => true
    },
    expected: true
  })
  .it('shouldComponentupdate()', (testData) => {
    // arrange
    const children = <span>testing</span>;
    const { nextProps, expected } = testData;

    // sut
    const wrapper = shallow(<Static>{children}</Static>);
    const instance = wrapper.instance();

    const actual = instance.shouldComponentUpdate(nextProps);

    // assert
    assert.deepEqual(actual, expected, 'shouldComponentupdate()');
  });
};

describe('static.component.spec.js', () => {
  testPropTypes();
  testRender();
  testShouldComponentUpdate();
});
