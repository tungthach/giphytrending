
import { connect } from 'react-redux';
import { list } from 'react-immutable-proptypes';

import { BaseComponent, view } from 'core';

import { getUsers } from './user.action';
import { userSelector } from './user.selector';
import { userView } from './user.view';

@connect(userSelector, { getUsers })
@view(userView)
export default class User extends BaseComponent {
  /**
   * Define propTypes
   */
  static propTypes = {
    users: list
  }

  /**
   * Handle on click button Get Users
   *
   * @return {void}
   */
  onClick = () => {
    this.props.getUsers && this.props.getUsers();
  }

  /**
   * Model for view
   *
   * @return {object} Model object for view
   */
  get model() {
    return this.createModel({
      users: this.props.users.toJS()
    });
  }

  /**
   * Handler for view
   *
   * @return {object} Handler for view
   */
  get handler() {
    return this.createHandler();
  }
}