import PropTypes from 'prop-types';

import {BaseContextBuilder} from './base.context';

class RouterContextBuilder extends BaseContextBuilder {
  /**
   * Check router context exists or not
   * @param  {PropTypes.node} node   Component node
   * @return {Bool}                  True if exists
   */
  hasContext(node) {
    if (!node) {
      return false;
    }
    const {contextTypes} = node.type;

    return contextTypes && contextTypes.router !== null;
  }

  /**
   * Create router context
   * @return {object} Router context
   */
  createContext({ customContext }) {
    const defaultContext = {
      context: {
        router: {
          history: {
            location: {
              pathname: ''
            },
            push: () => {},
            replace: () => '',
            createHref: () => ''
          },
          route: {
            location: {
              pathname: ''
            }
          }
        }
      },
      childContextTypes: {
        router: PropTypes.object
      }
    };

    return {...defaultContext, ...customContext};
  }
}

/**
 * Export router builder
 */
export const routerBuilder = new RouterContextBuilder();