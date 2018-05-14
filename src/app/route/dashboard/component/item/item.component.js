import { object } from 'prop-types';

import { BaseComponent, view } from 'core';

import { itemView } from './item.view';

@view(itemView)
export class Item extends BaseComponent {
  /**
   * Constructor
   *
   * @param  {Object} props constructor params
   * @return {Void}
   */
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  /**
   * The prop types
   *
   * @static
   */
  static propTypes = {
    item: object
  };

  /**
   * Handle mouse down event on item
   *
   * @return {Void}
   */
  onMouseDown = () => {
    this.setState({ hover: true });
  };

  /**
   * Handle mouse out event on item
   *
   * @return {Void}
   */
  onMouseOut = () => {
    this.setState({ hover: false });
  };

  /**
   * Prepare model for view including component's props
   *
   * @return {Object} Model object for view
   */
  get model() {
    return this.createModel({
      hover: this.state.hover,
      onMouseDown: this.onMouseDown,
      onMouseOut: this.onMouseOut
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
