import React from 'react';

import { shallow } from 'test-util';
import Home from '../home.component';

/**
* Test get model()
* @return {VoidFunction}
*/
const testModel = () => {
  it('get model()', () => {
    // arrange
    const expectedModel = {};

    // sut
    const wrapper = shallow(<Home />);
    const wrapperInstance = wrapper.instance();
    const { model } = wrapperInstance;

    // expect
    assert.deepEqual(model, expectedModel);
  });
};

describe('home.component.spec.js', () => {
  testModel();
});
