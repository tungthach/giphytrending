import { shallow } from 'test-util';

import { notFoundView } from '../not-found.view';

/**
* Test render()
* @return {Void}
*/
const testRender = () => {
  it('render()', () => {
    // arrange
    const { view } = notFoundView;
    const expectedElementLength = 1;

    // sut
    const wrapper = shallow(view());
    const notFoundComponent = wrapper.find('.section__not-found');

    // expect
    assert.isNotNull(wrapper);
    assert.deepEqual(notFoundComponent.length, expectedElementLength);
  });
};

describe('not-found.view.spec.js', () => {
  testRender();
});