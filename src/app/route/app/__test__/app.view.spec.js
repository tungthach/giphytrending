import { Switch } from 'react-router-dom';

import { shallow } from 'test-util';

import { appView } from '../app.view';

/**
* Test render()
* @return {Void}
*/
const testRender = () => {
  context('render()', () => {
    it('should render correctly', () => {
      // arrange
      const model = {
        route: {
          routes: [
            { path: '/', component: null },
            { path: '/home', component: null }
          ]
        }
      };
      const handler = {
        onToggleSidebar: sinon.spy()
      };

      const expectedRoutesLength = 2;

      // sut
      const wrapper = shallow(appView(model, handler));
      const appComponent = wrapper.children('.app');
      const switchComponent = wrapper.find(Switch);
      const routeComponents = switchComponent.props().children;

      // expect
      assert.isNotNull(wrapper);
      assert.isNotNull(appComponent);
      assert.isNotNull(switchComponent);
      assert.deepEqual(routeComponents.length, expectedRoutesLength);
    });
  });
};

describe('app.view.spec.js', () => {
  testRender();
});