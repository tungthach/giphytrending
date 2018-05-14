import React from 'react';

import { shallow } from 'test-util';

import { homeView } from '../home.view';

/**
 * Test render()
 * @return {Void}
 */
const testRender = () => {
  it('render()', () => {
    // arrange
    const children = <img src="/asset/image/confident-girls.jpg" />;
    const expectedGridHomeElementLength = 0;

    // sut
    const wrapper = shallow(homeView({ children }));
    const gridHomeComponent = wrapper.children('#Home');

    // expect
    assert.isNotNull(homeView);
    assert.isNotNull(wrapper);
    assert.deepEqual(gridHomeComponent.length, expectedGridHomeElementLength);
  });
};

describe('home.view.spec.js', () => {
  testRender();
});
