import React from 'react';
import { shallow } from 'enzyme';
import merge from 'merge';

import { IntlProvider, intlShape } from 'core';
import { BaseContextBuilder } from './base.context';

/**
 * Get resource for test mode
 *
 * @param {Object} initialMessages  The default messages
 * @returns {Object}                The resources
 */
export const getResources = (initialMessages = {}) => {
  const appResource = require('app/resource/en.json');
  const coreResource = require('core/resource/en.json');
  const resources = merge({}, coreResource, appResource, initialMessages);

  return resources;
};

class IntlContextBuilder extends BaseContextBuilder {
  hasContext(node) {
    if (!node) {
      return false;
    }
    const {contextTypes} = node.type;

    return contextTypes && contextTypes.intl !== null;
  }

  createContext(options) {
    const { initialMessages, messages = getResources(initialMessages), locale = 'en' } = options;
    const props = {
      locale,
      messages
    };
    const intlProviderWrapper = shallow(<IntlProvider.WrappedComponent {...props} />);
    const instance = intlProviderWrapper.instance();

    const {intl} = instance.getChildContext();

    return {
      context: {
        intl
      },
      childContextTypes: {
        intl: intlShape.isRequired
      }
    };
  }
}

export const intlBuilder = new IntlContextBuilder();
