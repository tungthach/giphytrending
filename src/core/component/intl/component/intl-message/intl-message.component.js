import { string, object, bool, oneOf } from 'prop-types';
import pluralize from 'pluralize';

import { view } from 'component/base';

import { Intl } from '../../intl.component';
import { intlMessageView } from './intl-message.view';
import { TAG_LABEL, TAG_SPAN } from './intl-message.constant';

/**
 * IntlMessage component to render localization text
 */
@view(intlMessageView)
export class IntlMessage extends Intl {
  /**
   * propTypes
   */
  static propTypes = {
    intlKey: string.isRequired,
    intlValues: object,
    plural: bool,
    htmlTag: oneOf([TAG_LABEL, TAG_SPAN])
  };

  /**
   * defaultProps
   */
  static defaultProps = {
    htmlTag: TAG_SPAN
  }

  /**
   * Module for view
   * @return {Object} Model for view
   */
  get model() {
    const { intlKey, intlValues, htmlTag, plural } = this.props;
    const message = this.formatMessage(intlKey, intlValues);
    const pluralizedMessage = plural ? pluralize(message) : message;

    return { htmlTag, message: pluralizedMessage };
  }
}