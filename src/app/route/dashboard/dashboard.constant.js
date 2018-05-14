/* Urls */
export const GIPHY_API_KEY = 'mPxJIyYTDLz3rXf8Y8nDIEYr1YuAKRky';
export const URL_GIPHY_TRENDING = `http://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=20&offset=`;

/* Actions */
export const ACTION_LOAD_GIPHY_TRENDING = 'ACTION_LOAD_GIPHY_TRENDING';
export const ACTION_LOAD_GIPHY_TRENDING_SUCCESS = 'ACTION_LOAD_GIPHY_TRENDING_SUCCESS';
export const ACTION_LOAD_GIPHY_TRENDING_FAILURE = 'ACTION_LOAD_GIPHY_TRENDING_FAILURE';

/* Reducer */
export const STATE_DASHBOARD = 'dashboard';
export const STATE_GIPHY_LIST = 'giphyImages';
export const STATE_GIPHY_PAGINATION = 'pagination';
export const STATE_DASHBOARD_LOADING = 'loading';
