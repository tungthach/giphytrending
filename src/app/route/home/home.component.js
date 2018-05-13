import { view, BaseComponent } from 'core';
import { homeView } from './home.view';

@view(homeView)
export default class Home extends BaseComponent {
  /**
   * Get model for view
   * @return {Object}       Model for view
   */
  get model() {
    return this.createModel();
  }
}