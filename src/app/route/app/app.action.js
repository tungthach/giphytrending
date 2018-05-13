import { ACTION_TOGGLE_SIDEBAR } from './app.constant';

/**
 * Toggle the sidebar open or collapse
 *
 * @param {Boolean} open Is the sidebar opened or collapsed;
 *                       leave blank (undefined) to toggle the sidebar
 * @return {Func}        Action dispatcher
 */
export const toggleSidebar = (open) => {
  return dispatch => dispatch({
    type: ACTION_TOGGLE_SIDEBAR,
    payload: {
      isSidebarOpen: open
    }
  });
};
