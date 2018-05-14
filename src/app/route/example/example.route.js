import { asyncComponent } from 'core';

import Example from 'bundle-loader?lazy!./example.component';
import { URL_EXAMPLE } from './example.constant';

import { counterRoute } from './route/counter/counter.route';
import { counterReduxRoute } from './route/counter-redux/counter-redux.route';
import { userRoute } from './route/user/user.route';

const component = asyncComponent({
  component: Example
});

export const exampleRoute = {
  path: URL_EXAMPLE,
  component,
  routes: [
    counterRoute,
    counterReduxRoute,
    userRoute
  ]
};
