import { asyncComponent } from 'core';

import { store } from 'app/redux/store';

import CounterRedux from 'bundle-loader?lazy!./counter-redux.component';
import { URL_COUNTER_REDUX, STATE_COUNTER_REDUX } from './counter-redux.constant';
import { counterReduxReducer } from './counter-redux.reducer';
import { counterReduxEpic } from './counter-redux.epic';

/**
 * Inject epic and reducer
 *
 * @return {void}
 */
export const preProcess = () => {
  store.injectReducer(STATE_COUNTER_REDUX, counterReduxReducer);
  store.injectEpic(STATE_COUNTER_REDUX, counterReduxEpic);
};

/**
 * Lazy load CounterRedux component
 */
const component = asyncComponent({
  component: CounterRedux,
  preProcess
});

/**
 * Counter redux route
 */
export const counterReduxRoute = {
  path: URL_COUNTER_REDUX,
  component
};
