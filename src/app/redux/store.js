import { Store } from 'core';

import { reducers } from './reducer';
import { epic, dependencies } from './epic';

export class FrontStore extends Store {
  /**
   * Create Front store
   *
   * @param  {Object} initialState Initial state
   * @param  {Object} history      Browser history
   * @return {Object}              Front store
   */
  create(initialState, history) {
    return super.create({ reducers, initialState, history, epic, epicDependencies: dependencies });
  }
}

export const store = new FrontStore();
