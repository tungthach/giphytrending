import { BaseComponent } from 'component/base';

import { intlShape } from './intl-shape';

export class Intl extends BaseComponent {
  static contextTypes = {
    intl: intlShape.isRequired
  };

  /**
   * Format message by key and values
   * @param  {String} key    [is key in text resource]
   * @param  {Object} values [is used to format message]
   * @return {String}        [return message string]
   */
  formatMessage(key, values) {
    return this.context.intl.formatMessage(key, values);
  }
}
