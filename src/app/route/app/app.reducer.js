import { fromJS } from 'immutable';
import { isNil } from 'lodash';

import { CLIENT_INIT } from 'redux/store';
import coreResources from 'core/resource/en.json';
import appResources from 'app/resource/en.json';

import {
  STATE_APP_ERROR,
  STATE_APP_IS_LOADING,
  STATE_APP_IS_SIDEBAR_OPEN,
  STATE_APP_LOCALIZATION_DEFAULT_LOCALE,
  STATE_APP_LOCALIZATION_LOCALE,
  STATE_APP_LOCALIZATION_MESSAGES,
  STATE_APP_LOCALIZATION,
  ACTION_TOGGLE_SIDEBAR
} from './app.constant';

const initialState = fromJS({
  [STATE_APP_ERROR]: null,
  [STATE_APP_IS_LOADING]: false,
  [STATE_APP_LOCALIZATION]: {
    [STATE_APP_LOCALIZATION_MESSAGES]: {},
    [STATE_APP_LOCALIZATION_DEFAULT_LOCALE]: 'en',
    [STATE_APP_LOCALIZATION_LOCALE]: 'en'
  }
});

/**
 * Initialize the redux store when the client init
 *
 * @param {Object} state The redux state
 * @return {Object}      New state
 */
export const handleClientInit = (state) => {
  const resources = Object.assign({}, coreResources, appResources);

  return state
    .setIn([STATE_APP_LOCALIZATION, STATE_APP_LOCALIZATION_MESSAGES], fromJS(resources))
    .setIn([STATE_APP_IS_SIDEBAR_OPEN], true);
};

/**
 * Handle the sidebar toggle action
 *
 * @param {Object} state The redux state
 * @return {Object}      New stateSTATE_APP_IS_SIDEBAR_OPEN
 */
export const handleToggleSidebar = (state, { isSidebarOpen }) => {
  const currentIsSidebarOpen = state.getIn([STATE_APP_IS_SIDEBAR_OPEN, STATE_APP_IS_SIDEBAR_OPEN]);
  const newIsSidebarOpen = isNil(isSidebarOpen) ? !currentIsSidebarOpen : isSidebarOpen;

  return state.setIn([STATE_APP_IS_SIDEBAR_OPEN], newIsSidebarOpen);
};

/**
 * App reducer
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Redux action
 * @return {Object}        New state
 */
export const appReducer = (state = initialState, action) => {
  const { type, payload = {} } = action || {};

  switch (type) {
    // Set locale when init app
    case CLIENT_INIT:
      return handleClientInit(state);

    // Handle toggle sidebar: open/close
    case ACTION_TOGGLE_SIDEBAR:
      return handleToggleSidebar(state, payload);

    // Default case should keep current state
    default:
      return state;
  }
};
