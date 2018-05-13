import createHistory from 'history/createBrowserHistory';

import { BrowserHistory } from '../browser-history.service';

const testConstructor = () => {
  context('constructor', () => {
    it('Should init BrowserHistory if does not exist', () => {
      // sut
      const history = new BrowserHistory();

      // expect
      assert.isNotNull(history);
    });

    it('Should return BrowserHistory if exists', () => {
      // arrange
      const mockedHistory = createHistory();

      // sut
      BrowserHistory.history = mockedHistory;

      const history = new BrowserHistory();


      // expect
      assert.deepEqual(history, mockedHistory);
    });
  });
};

describe('browser-history.service.spec.js', () => {
  beforeEach(() => {
    BrowserHistory.history = null;
  });

  testConstructor();
});