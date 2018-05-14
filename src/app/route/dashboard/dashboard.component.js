
import { array, bool, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { BaseComponent, view, INT_ZERO } from 'core';

import { dashboardView } from './dashboard.view';
import { dashboardSelector } from './dashboard.selector';
import { getGiphyTrending } from './dashboard.action';

@connect(dashboardSelector, { getGiphyTrending })
@view(dashboardView)
export default class Dashboard extends BaseComponent {
  /**
   * propTypes
   */
  static propTypes = {
    images: array,
    loading: bool,
    pagination: object,
    getGiphyTrending: func
  };

  /**
   * Load the images when component did mount
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getGiphyTrending(INT_ZERO);
  }

  /**
   * Model for view
   * @return {object} Model object for view
   */
  get model() {
    return this.createModel();
  }

  /**
   * Handler for view
   * @return {object} Model object for view
   */
  get handler() {
    return this.createHandler();
  }
}