import Immutable from 'immutable';
import { given } from 'mocha-testdata';
import { CLIENT_INIT } from 'redux/store';

import { ACTION_TOGGLE_SIDEBAR } from '../app.constant';
import { appReducer } from '../app.reducer';
import coreResources from 'core/resource/en.json';
import appResources from 'app/resource/en.json';

const defaultState = {
  error: null,
  loading: false,
  isSidebarOpen: true,
  filterCategories: {},
  localization: {
    messages: {},
    defaultLocale: 'en',
    locale: 'en'
  }
};

const resources = Object.assign({}, coreResources, appResources);

/**
 * Test the CLIENT_INIT case
 *
 * @return {Void}
 */
const testHandleClientInit = () => {
  context('CLIENT_INIT()', () => {
    it('Should init state correctly', () => {
      // arrange
      const initialState = Immutable.fromJS(defaultState);
      const expectedState = {
        ...defaultState,
        localization: {
          messages: resources,
          defaultLocale: 'en',
          locale: 'en'
        }
      };

      // sut
      const newState = appReducer(initialState, { type: CLIENT_INIT });

      // expect
      assert.deepEqual(newState.toJS(), expectedState);
    });
  });
};

/**
 * Test the ACTION_TOGGLE_SIDEBAR case
 *
 * @return {Void}
 */
const testHandleToggleSidebar = () => {
  context('ACTION_TOGGLE_SIDEBAR', () => {
    given(
      {
        initialIsSidebarOpen: false,
        inputPayload: {
          isSidebarOpen: false
        },
        expectedIsSidebarOpen: false
      },
      {
        initialIsSidebarOpen: false,
        inputPayload: {
          isSidebarOpen: true
        },
        expectedIsSidebarOpen: true
      },
      {
        initialIsSidebarOpen: true,
        inputPayload: {
          isSidebarOpen: false
        },
        expectedIsSidebarOpen: false
      },
      {
        initialIsSidebarOpen: true,
        inputPayload: {
          isSidebarOpen: true
        },
        expectedIsSidebarOpen: true
      },
      {
        initialIsSidebarOpen: false,
        inputPayload: {
          isSidebarOpen: null
        },
        expectedIsSidebarOpen: true
      }
    ).it('Should change isSidebarOpen correctly', ({ initialIsSidebarOpen, inputPayload, expectedIsSidebarOpen }) => {
      // arrange
      const initialState = Immutable.fromJS({
        isSidebarOpen: initialIsSidebarOpen
      });
      const expectedState = {
        isSidebarOpen: expectedIsSidebarOpen
      };

      // sut
      const newState = appReducer(initialState, {
        type: ACTION_TOGGLE_SIDEBAR,
        payload: inputPayload
      });

      // expect
      assert.deepEqual(newState.toJS(), expectedState);
    });
  });
};

/**
 * Test the default case
 *
 * @return {Void}
 */
const testDefaultCase = () => {
  context('default', () => {
    given(
      {
        input: Immutable.fromJS({
          a: 'abc',
          b: 234
        }),
        expected: {
          a: 'abc',
          b: 234
        }
      },
      {
        input: undefined,
        expected: {
          error: null,
          isLoading: false,
          localization: {
            messages: {},
            defaultLocale: 'en',
            locale: 'en'
          }
        }
      }
    ).it('Should return original state', ({ input, expected }) => {
      // sut
      const newState = appReducer(input);

      // expect
      assert.deepEqual(newState.toJS(), expected);
    });
  });
};

// Unit tests for AppReducer
describe('app.reducer.spec.js', () => {
  testHandleClientInit();
  testHandleToggleSidebar();
  testDefaultCase();
});
