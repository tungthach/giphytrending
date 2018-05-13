import createHistory from 'history/createBrowserHistory';

/**
 * The BrowserHistory service
 * Hold the global browser history instance
 *
 * @export
 * @class BrowserHistory
 */
export class BrowserHistory {
  static history = null;

  constructor() {
    if (!BrowserHistory.history) {
      BrowserHistory.history = createHistory();
    }

    return BrowserHistory.history;
  }
}
