import { ajax } from './service';
import { combineEpics } from 'redux-observable';

// The root epic of front page
export const epic = combineEpics(ajax.updaterEpic);

// The epic's dependencies on front page
export const dependencies = {
  getJSON: ajax.getJSON,
  postJSON: ajax.postJSON,
  post: ajax.post,
  ajax: ajax.ajax
};
