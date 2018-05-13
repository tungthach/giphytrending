import { waiting } from 'test-util';

import { notFoundRoute } from '../not-found.route';

/**
 * Constant for unit test
 * @type {Object}
 */
const constants = {
  URL_NOT_FOUND: '*'
};

/**
 * Test notFoundRoute
 * @return {Void}
 */
const testNotFoundRoute = () => {
  it('notFoundRoute', () => {
    // expect
    return waiting(() => {
      assert.deepEqual(notFoundRoute.path, constants.URL_NOT_FOUND);
      assert.deepEqual(notFoundRoute.component.name, 'AsyncComponent');
    });
  });
};

describe('not-found.route.spec.js', () => {
  testNotFoundRoute();
});
