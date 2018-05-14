import {
  URL_EXAMPLE_COUNTER,
  URL_EXAMPLE_COUNTER_REDUX,
  URL_EXAMPLE_USER
} from './example.constant';

/**
 * Get menus data
 * @return {Observable} The list of menu in observable
 */
export const getMenus = () => {
  return [
    { link: URL_EXAMPLE_COUNTER, key: 'counter', inltKey: 'counter' },
    { link: URL_EXAMPLE_COUNTER_REDUX, key: 'counterRedux', inltKey: 'counterRedux' },
    { link: URL_EXAMPLE_USER, key: 'userRedux', inltKey: 'userRedux' }
  ];
};