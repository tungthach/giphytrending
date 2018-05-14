import { object, func } from 'prop-types';

import { BaseComponent, view } from 'core';

import { paginationView } from './pagination.view';

@view(paginationView)
export class Pagination extends BaseComponent {
  /**
   * The prop types
   *
   * @static
   */
  static propTypes = {
    pagination: object,
    getMoreImages: func
  };

  /**
   * Handle click event on load more image
   *
   * @return {Void}
   */
  onHandleLoadMore() {
    const { pagination, getMoreImages } = this.props;
    const offset = pagination.offset + pagination.count;

    getMoreImages(offset);
  }

  /**
   * Prepare model for view including component's props
   *
   * @return {Object} Model object for view
   */
  get model() {
    return this.createModel({
      onClick: this.onHandleLoadMore.bind(this)
    });
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
