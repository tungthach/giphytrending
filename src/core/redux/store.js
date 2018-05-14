import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistState } from 'redux-devtools';

import { BrowserHistory } from '../service';
import { createReducer } from './reducer';
import { createEpic } from './middleware';
import { DevTools } from './dev-tools';

export const CLIENT_INIT = 'CLIENT_INIT';

export class Store {
  constructor() {
    if (!Store.instance) {
      Store.instance = this;
    }

    return Store.instance;
  }

  /**
   * Config store with middlewares/logger/devtools
   * @param  {Object} settings         The store options
   *                  - rootReducer    The root reducer
   *                  - epicMiddleware The epic middleware
   *                  - initialState   Initial state
   *                  - history        Browser history
   * @return {Object}                  The Redux store
   */
  config(settings) {
    const { rootReducer, epicMiddleware, initialState, history = new BrowserHistory() } = settings;

    // Sync dispatched route actions to the history
    const reduxRouterMiddleware = routerMiddleware(history);

    // Order routerMiddleware first because epicMiddleware consumes the actions it receives from other middlewares
    let middlewares = [reduxRouterMiddleware, epicMiddleware];
    let finalCreateStore = null;

    // Case DevTools is enabled in webpack/config files
    if (__DEVTOOLS__) {
      finalCreateStore = compose(applyMiddleware(...middlewares), window.devToolsExtension
        ? window.devToolsExtension()
        : DevTools.instrument(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)))(createStore);
    } else {
      finalCreateStore = applyMiddleware(...middlewares)(createStore);
    }

    return finalCreateStore(rootReducer, initialState);
  }

  /**
   * Create store
   *
   * @param  {Object} settings         The store settings
   *                  - reducers       Reducers
   *                  - epics          Epics
   *                  - initialState   Initial state
   *                  - history        Browser history
   *                  - options        Additional options
   *                    + dependencies The epic dependencies
   * @return {Object}                  Application store
   */
  create(settings) {
    const { reducers, initialState, history, epics, epicDependencies } = settings;
    const rootReducer = createReducer(reducers);
    const { rootEpic, epicStream, epicMiddleware } = createEpic(epics, epicDependencies);

    this.store = this.config({ rootReducer, epicMiddleware, initialState, history });
    this.store.reducers = reducers || {};
    this.store.epics = {};
    this.store.epicStream = epicStream;

    if (__DEVELOPMENT__ && module.hot) {
      module.hot.accept('./reducer', () => {
        this.store.replaceReducer(rootReducer);
      });
      module.hot.accept('./middleware', () => {
        epicMiddleware.replaceEpic(rootEpic);
      });
    }

    return this.store;
  }

  /**
   * Dynamic inject async reducer to store
   *
   * @param {String} name             Reducer name
   * @param {Function} reducer        Reducer
   * @param {Object} configuredStore  Store. Defaults to current store
   * @return {Void}
   */
  injectReducer(name, reducer, configuredStore = this.store) {
    if (configuredStore && name && reducer) {
      configuredStore.reducers[name] = reducer;
      configuredStore.replaceReducer(createReducer(configuredStore.reducers));
    }
  }

  /**
   * Dynamic inject async epic to store
   *
   * @param {String} name            Epic name
   * @param {Function} epic          Epic
   * @param {Object} configuredStore Store. Defaults to current store
   * @return {Void}
   */
  injectEpic(name, epic, configuredStore = this.store) {
    if (epic && configuredStore && !configuredStore.epics[name]) {
      configuredStore.epics[name] = epic;
      configuredStore.epicStream.next(epic);
    }
  }
}
