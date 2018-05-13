import React from 'react';
import PropTypes from 'prop-types';

import { shallow } from 'test-util';

import App from '../app.component';

/**
* Wrapped App component because App has connect to Redux
*/
const AppComponent = App.WrappedComponent;

/**
* Test get propTypes
* @return {Void}
*/
const testPropTypes = () => {
  context('propTypes', () => {
    it('should be correct', () => {
      // arrange
      const expectedPropTypes = {
        route: PropTypes.object,
        auth: PropTypes.object
      };

      // expect
      assert.deepEqual(AppComponent.propTypes, expectedPropTypes);
    });
  });
};

/**
* Test get model()
* @return {Void}
*/
const testModel = () => {
  context('model()', () => {
    it('should be correct', () => {
      // arrange
      const auth = { isAuthenticated: true };
      const route = { routes: [{ path: '/', component: null }] };
      const isSidebarOpen = false;
      const title = 'Load Giphy Trending';
      const expectedModel = { auth, route, isSidebarOpen, title };

      // sut
      const wrapper = shallow(<AppComponent auth={auth} route={route} isSidebarOpen={isSidebarOpen} />);
      const wrapperInstance = wrapper.instance();
      const {model} = wrapperInstance;

      // expect
      assert.deepEqual(model, expectedModel);
    });
  });
};

describe('app.component.spec.js', () => {
  testPropTypes();
  testModel();
});
