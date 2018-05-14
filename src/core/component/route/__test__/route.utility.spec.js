import React from 'react';

import { shallow } from 'test-util';
import { INT_TWO } from 'core';

import { renderAnimatedComponent, renderRoutes } from '../';

/**
* Test renderAnimatedComponent()
* @return {Void}
*/
const testRenderAnimatedComponent = () => {
  context('renderAnimatedComponent()', () => {
    it('Case 1: route has passed', () => {
      // arrange
      const route = {
        path: '/test',
        component: <div>Test</div>
      };

      // sut
      const wrapper = shallow(renderAnimatedComponent(route));
      const instance = wrapper.instance();

      // expect
      assert.deepEqual(instance.constructor.name, 'CSSTransition');
    });

    it('Case 2: route has not passed', () => {
      // sut
      const component = renderAnimatedComponent();

      // expect
      assert.isNull(component);
    });
  });
};

/**
* Test renderRoutes()
* @return {Void}
*/
const testRenderRoutes = () => {
  context('renderRoutes()', () => {
    it('Case 1: routes has passed', () => {
      // arrange
      const routes = [
        {
          path: '/1',
          component: <div>1</div>
        },
        {
          path: '/2',
          component: <div>2</div>
        }
      ];

      // sut
      const wrapper = shallow(renderRoutes(routes));
      const instance = wrapper.instance();
      const { children } = instance.props;

      // expect
      assert.deepEqual(instance.constructor.name, 'Switch');
      assert.deepEqual(children.length, INT_TWO);
    });

    it('Case 2: routes has not passed', () => {
      // sut
      const component = renderRoutes();

      // expect
      assert.isNull(component);
    });
  });
};

describe('route.utility.spec.js', () => {
  testRenderAnimatedComponent();
  testRenderRoutes();
});