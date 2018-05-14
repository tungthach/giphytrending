import { waiting } from 'test-util';

import { store } from 'app/redux/store';

import { injectReducer, appRoute } from '../app.route';

import { homeRoute } from '../../home/home.route';
import { exampleRoute } from '../../example/example.route';
import { notFoundRoute } from '../../not-found/not-found.route';

/**
 * Constant for unit test
 *
 * @type {Object}
 */
const constants = {
  URL_APP: '/'
};

/**
 * Test injectReducer
 *
 * @return {Void}
 */
const testInjectReducer = () => {
  it('injectReducer()', () => {
    // arrange
    const injectReducerSpy = sinon.spy(store, 'injectReducer');

    // sut
    injectReducer();

    // expect
    assert(injectReducerSpy.called);
  });
};

/**
 * Test appRoute
 *
 * @return {Void}
 */
const testAppRoute = () => {
  it('appRoute()', () => {
    // arrange
    const expectedChildRoutes = [homeRoute, exampleRoute, notFoundRoute];

    // expect
    return waiting(() => {
      assert.deepEqual(appRoute.path, constants.URL_APP);
      assert.deepEqual(appRoute.component.name, 'AsyncComponent');
      assert.deepEqual(appRoute.routes, expectedChildRoutes);
    });
  });
};

describe('app.route.spec.js', () => {
  testInjectReducer();
  testAppRoute();
});
