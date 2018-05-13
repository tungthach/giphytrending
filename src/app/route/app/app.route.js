import { asyncComponent } from 'core';
import { store } from 'app/redux/store';

import appComponent from 'bundle-loader?lazy!./app.component';
import { URL_APP, STATE_APP } from './app.constant';
import { appReducer } from './app.reducer';

import { homeRoute } from '../home/home.route';
import { exampleRoute } from '../example/example.route';
import { notFoundRoute } from '../not-found/not-found.route';

/**
 * InjectReducer
 * @return {Void}
 */
export const injectReducer = () => {
  store.injectReducer(STATE_APP, appReducer);
};

const component = asyncComponent({
  component: appComponent,
  preProcess: injectReducer
});

export const appRoute = {
  path: URL_APP,
  component,
  routes: [
    homeRoute,
    exampleRoute,
    notFoundRoute
  ]
};
