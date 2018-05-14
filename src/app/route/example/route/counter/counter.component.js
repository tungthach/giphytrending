
import { BaseComponent, view, INT_ONE } from 'core';
import { counterView } from './counter.view';

@view(counterView)
export default class Counter extends BaseComponent {
  /**
   * Constructor
   * @param  {object} props Properties
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = { counter: 0 };
  }

  /**
   * Handle on click button Increase
   * @return {void}
   */
  onClickIncrease = () => {
    this.setState({ counter: this.state.counter + INT_ONE });
  }

  /**
   * Handle on click button Decrease
   * @return {void}
   */
  onClickDecrease = () => {
    this.setState({ counter: this.state.counter - INT_ONE });
  }

  /**
   * Model for view
   * @return {object} Model object for view
   */
  get model() {
    return this.createModel({
      counter: this.state.counter
    });
  }

  /**
   * Handler for view
   * @return {object} Handler for view
   */
  get handler() {
    return this.createHandler();
  }
}