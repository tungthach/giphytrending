import { isString } from 'lodash';
import { Observable } from 'rxjs';
import { ajax as rxjsAjax } from 'rxjs/observable/dom/ajax';

import { HTTP_POST } from 'core/utility';

export class Ajax {
  /**
   * The updater epic, used to listen to Redux action and update the service
   *
   * @return {Observable}
   */
  updaterEpic = () => Observable.empty();

  /**
   * Wraps Rx-Dom.getJSON
   *
   * @return {Observable}
   */
  getJSON = (...args) => rxjsAjax.getJSON(...args);

  /**
   * Wraps Rx-DOM.ajax and inject options to make it user friendly
   *
   * @param {String} url   The API url
   * @param {Object|String} body  The POST body
   * @return {Observable}
   */
  postJSON = (url, body) => {
    const stringifiedBody = isString(body) ? body : JSON.stringify(body);

    return rxjsAjax({
      url,
      body: stringifiedBody,
      method: HTTP_POST,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Wraps Rx-Dom.post
   *
   * @return {Observable}
   */
  post = (...args) => rxjsAjax.post(...args);

  /**
   * Wraps Rx-Dom.ajax
   *
   * @return {Observable}
   */
  ajax = (...args) => rxjsAjax(...args);
}
