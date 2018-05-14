
import { number } from 'prop-types';
import { connect } from 'react-redux';

import { BaseComponent, view, INT_ZERO } from 'core';
import { counterReduxView } from './counter-redux.view';
import { counterReduxSelector } from './counter-redux.selector';
import { increase, decrease } from './counter-redux.action';

@connect(counterReduxSelector, {increase, decrease})
@view(counterReduxView)
export default class CounterRedux extends BaseComponent {
  /**
   * Define propTypes
   */
  static propTypes = {
    counter: number
  }

  /*
   * Define defaultProps
   */
  static defaultProps = {
    counter: INT_ZERO
  }

  /**
   * Handle on click button Increase
   * @return {void}
   */
  onClickIncrease = () => {
    this.props.increase && this.props.increase();
  }

  /**
   * Handle on click button Decrease
   * @return {void}
   */
  onClickDecrease = () => {
    this.props.decrease && this.props.decrease();
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
   * @return {object} Handler for view
   */
  get handler() {
    return this.createHandler();
  }
}