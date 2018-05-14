import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { view, Intl } from 'core';

import { appSelector } from './app.selector';
import { appView } from './app.view';

@connect(appSelector)
@view(appView)
export default class App extends Intl {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpen: false
    };
  }

  static propTypes = {
    auth: PropTypes.object,
    route: PropTypes.object
  };

  /**
   * Handle on toggle sidebar
   * @return {void}
   */
  onToggleSidebar = () => {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
  }

  /**
   * Get model for view
   * @return {object} Model for view
   */
  get model() {
    return this.createModel({
      title: this.formatMessage('appTitle'),
      isSidebarOpen: this.state.isSidebarOpen
    });
  }

  /**
   * Get handler for view
   * @return {object} Model for view
   */
  get handler() {
    return this.createHandler();
  }
}