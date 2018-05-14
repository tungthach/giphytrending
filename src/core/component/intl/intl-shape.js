import PropTypes from 'prop-types';

const { string, func, object, shape } = PropTypes;
const funcReq = func.isRequired;

export const intlConfigPropTypes = {
  locale: string,
  messages: object,

  defaultLocale: string
};

export const intlFormatPropTypes = {
  formatMessage: funcReq
};

export const intlShape = shape({
    ...intlConfigPropTypes,
    ...intlFormatPropTypes
});