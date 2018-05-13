import configureMockStore from 'redux-mock-store';

import { createEpic, IMMUTABLE_EMPTY_MAP } from 'core';

const { epicMiddleware } = createEpic();

export const createMockStore = (initialState = IMMUTABLE_EMPTY_MAP, middlewares = [epicMiddleware]) => {
  const mockStore = configureMockStore(middlewares);

  return mockStore(initialState);
};
