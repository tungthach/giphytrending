import PropTypes from 'prop-types';

import { intlConfigPropTypes, intlFormatPropTypes } from '../';

const { string, func, object } = PropTypes;
const funcReq = func.isRequired;

describe('intlShape', () => {

  it('check properties and format methods', () => {
    // expect
    assert.deepEqual(intlConfigPropTypes, {
      locale: string,
      messages: object,
      defaultLocale: string
    });

    assert.deepEqual(intlFormatPropTypes, {
      formatMessage: funcReq
    });
  });
});
