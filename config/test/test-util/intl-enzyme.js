import React from 'react';
import { mount, shallow } from 'enzyme';

import { IntlProvider, intlShape } from 'core';

/**
 * Create intl object with locale and messages
 * @param  {Object} messages is for a language
 * @param  {String} locale   default value is 'en'
 * @return {Object}          return object intl from component IntlProvider
 */
const createIntlContext = (messages = {}, locale = 'en') => {
  const resources = Object.assign({}, __RESOURCES__, messages);
  const props = { locale, messages: resources };
  const intlProviderWrapper = shallow(<IntlProvider.WrappedComponent {...props} />);
  const instance = intlProviderWrapper.instance();
  const intl = instance.getChildContext().intl;

  return {
    context: {
      intl
    },
    childContextTypes: {
      intl: intlShape.isRequired
    }
  };
};

/**
 * Shallow a component with intl context
 * @param {ReactComponent} node is component
 * @param {Object} messages     is text resources
 * @return {ShallowWrapper}     Shallow wrapper with intl
 */
export const shallowIntl = (node, messages) => {
  const intlContext = createIntlContext(messages);

  if (node) {
    return shallow(node, intlContext);
  }

  return null;
};

/**
 * Mount a component with intl context
 * @param {ReactComponent} node component to be mounted
 * @param {Object} messages     messages is text resources
 * @return {ReactWrapper}       Mounted component with intl
 */
export const mountIntl = (node, messages) => {
  const intlContext = createIntlContext(messages);

  return mount(node, intlContext);
};
