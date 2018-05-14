import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import _ from 'lodash';

/**
 * Static Component class is used to prevent update children
 */
export class Static extends PureComponent {
  /**
   * Accept property shouldUpdate is a boolean or a function
   * @return {type} {description}
   */
  static propTypes = {
    shouldUpdate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  }

  /**
   * Check should component update or not
   * @param  {Object} nextProps is next properties
   * @param  {Object} nextState is next state
   * @return {Bool} return a boolean
   */
  shouldComponentUpdate(nextProps, nextState) {
    const {shouldUpdate} = nextProps;

    if (_.isFunction(shouldUpdate)) {
      return shouldUpdate(nextProps, nextState);
    }

    return shouldUpdate;
  }

  render() {
    return this.props.children;
  }
}
