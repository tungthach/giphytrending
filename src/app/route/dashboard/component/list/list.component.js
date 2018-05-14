import { array, bool } from 'prop-types';

import { BaseComponent, view } from 'core';

import { listView } from './list.view';

@view(listView)
export class List extends BaseComponent {
  /**
   * The prop types
   *
   * @static
   */
  static propTypes = {
    data: array,
    loading: bool
  };

  /**
   * Prepare model for view including component's props
   *
   * @return {Object} Model object for view
   */
  get model() {
    return this.createModel();
  }

  /**
   * Prepare handlers/methods for view to interact with
   *
   * @return {Object} Handlers/methods for view
   */
  get handlers() {
    return this.createHandlers();
  }
}
