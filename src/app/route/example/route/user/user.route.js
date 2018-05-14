import { asyncComponent } from 'core';

import { store } from 'app/redux/store';

import User from 'bundle-loader?lazy!./user.component';
import { URL_USER, STATE_USER } from './user.constant';
import { userEpic } from './user.epic';
import { userReducer } from './user.reducer';

/**
 * Inject epic and reducer
 *
 * @return {void}
 */
export const preProcess = () => {
  store.injectReducer(STATE_USER, userReducer);
  store.injectEpic(STATE_USER, userEpic);
};

/**
 * Lazy load User component
 */
const component = asyncComponent({
  component: User,
  preProcess
});

/**
 * User route
 */
export const userRoute = {
  path: URL_USER,
  component
};
