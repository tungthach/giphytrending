import { Component } from 'react';
import { connect } from 'react-redux';
import format from 'string-format';

import { view } from 'component/base';

import { intlShape } from '../../intl-shape';
import { intlProviderSelector } from './intl-provider.selector';
import { intlProviderView } from './intl-provider.view';

@connect(intlProviderSelector)
@view(intlProviderView)
export class IntlProvider extends Component {
  static childContextTypes = {
    intl: intlShape.isRequired
  };

  /**
   * Pass 'localization' through child components
   * @return {[object]} childContext object
   */
  getChildContext() {
    return {
      intl: {
        locale: this.props.locale,
        messages: this.props.messages,

        // format methods
        formatMessage: this.formatMessage
      }
    };
  }

  /**
   * Format message with key and values
   * @param  {String} key    [message key]
   * @param  {String} values [is used for message which has variable]
   * @return {String}        [return formated message or key if it doesn't exist]
   */
  formatMessage = (key, values) => {
    const { messages, locale } = this.props;
    const content = messages[key];

    if (!content) {
      // eslint-disable-next-line no-console
      console.error(`[IntlProvider] Missing locale data for locale: "${locale}" and key: "${key}".`);

      return key;
    }

    return values ? format(content, values) : content;
  }

  get model() {
    return {
      children: this.props.children
    };
  }
}
