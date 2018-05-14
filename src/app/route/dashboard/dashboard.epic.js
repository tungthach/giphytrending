import { combineEpics } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';

import { getGiphyTrendingSuccess } from './dashboard.action';
import { ACTION_LOAD_GIPHY_TRENDING, URL_GIPHY_TRENDING } from './dashboard.constant';

/**
 * Get the list of users from API epic
 *
 * @param  {Observable} actionStream  The action stream
 * @param  {Object} store             The redux store
 * @param  {Object} dependencies      The dependencies
 * @return {Observable}               The output action stream
 */
export const dashboardEpic = (actionStream, store, { getJSON }) => {
  return actionStream.ofType(ACTION_LOAD_GIPHY_TRENDING).pipe(
    mergeMap(action => {
      const {
        payload: { offset }
      } = action;

      return getJSON(`${URL_GIPHY_TRENDING}${offset}`).pipe(
        map(response => getGiphyTrendingSuccess(response.data, response.pagination, offset))
      );
    })
  );
};

/**
 * The epic of the Dashboard component
 */
export const userEpic = combineEpics(dashboardEpic);
