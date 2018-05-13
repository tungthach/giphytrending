import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ajax } from 'rxjs/observable/dom/ajax';

export const EMPTY_EPIC = () => Observable.empty();

/**
 * Create root epic
 *
 * @param  {Object} epics         The epic
 * @param  {Object} dependencies  The dependencies
 * @return {Object}
 */
export const createEpic = (epics = EMPTY_EPIC, dependencies = {}) => {
  // The main dependencies of the epic
  const epicDependencies = {
    getJSON: ajax.getJSON,
    postJSON: ajax.postJSON,
    post: ajax.post,
    ajax: ajax.ajax,
    ...dependencies
  };
  const combinedEpic = combineEpics(epics);
  const epicStream = new BehaviorSubject(combinedEpic);
  const rootEpic = (...args) => epicStream.pipe(mergeMap(epic => epic(...args)));
  const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies: epicDependencies });

  return { epicStream, rootEpic, epicMiddleware };
};
