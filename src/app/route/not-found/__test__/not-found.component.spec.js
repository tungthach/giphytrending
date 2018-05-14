import React from 'react';

import { shallow } from 'test-util';
import NotFound from '../not-found.component';

/**
* Test get model()
* @return {VoidFunction}
*/
const testModel = () => {
  it('get model()', () => {
    // arrange
    const expectedModel = {};

    // sut
    const wrapper = shallow(<NotFound />);
    const wrapperInstance = wrapper.instance();
    const { model } = wrapperInstance;

    // expect
    assert.deepEqual(model, expectedModel);
  });
};

describe('not-found.component.spec.js', () => {
  testModel();
});
