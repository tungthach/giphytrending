import { view, BaseComponent } from 'core';
import { notFoundView } from './not-found.view';

@view(notFoundView)
export default class NotFound extends BaseComponent {
  /**
   * Get model for view
   * @return {Object}       Model for view
   */
  get model() {
    return this.createModel();
  }
}