import { asyncComponent } from 'core';

import { store } from 'app/redux/store';

import Dashboard from 'bundle-loader?lazy!./dashboard.component';
import { STATE_DASHBOARD } from './dashboard.constant';
import { URL_DASHBOARD } from '../app/app.constant';
import { dashboardEpic } from './dashboard.epic';
import { dashboardReducer } from './dashboard.reducer';

/**
 * Inject epic and reducer
 *
 * @return {void}
 */
export const preProcess = () => {
  store.injectReducer(STATE_DASHBOARD, dashboardReducer);
  store.injectEpic(STATE_DASHBOARD, dashboardEpic);
};

/**
 * Lazy load User component
 */
const component = asyncComponent({
  component: Dashboard,
  preProcess
});

export const dashboardRoute = {
  path: URL_DASHBOARD,
  component,
  exact: true
};
