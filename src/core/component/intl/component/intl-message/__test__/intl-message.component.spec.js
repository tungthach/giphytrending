import React from 'react';
import PropTypes from 'prop-types';

import { shallow } from 'test-util';
import { IntlMessage } from '../';

describe('IntlMessage', () => {
  it('check propTypes and defaultProps', () => {
    // arrange
    const { intlKey, intlValues } = IntlMessage.propTypes;

    // expect
    assert.deepEqual({ intlKey, intlValues }, {
      intlKey: PropTypes.string.isRequired,
      intlValues: PropTypes.object
    });

    assert.deepEqual(IntlMessage.defaultProps, {
      htmlTag: 'span'
    });
  });

  context('model', () => {
    it('should return message', () => {
      // arrange
      const messages = { home: 'This is home page' };

      // sut
      const wrapper = shallow(<IntlMessage intlKey="home" />, {messages});
      const instance = wrapper.instance();

      // expect
      assert.deepEqual(instance.model, {
        htmlTag: 'span',
        message: messages.home
      });
    });

    it('should return message with format values', () => {
      // arrange
      const messages = { failed: 'Email: {email} is invalidate format' };

      // sut
      const wrapper = shallow(<IntlMessage intlKey="failed" intlValues={{email: 'testing'}} />, {messages});
      const instance = wrapper.instance();

      // expect
      assert.deepEqual(instance.model, {
        htmlTag: 'span',
        message: 'Email: testing is invalidate format'
      });
    });
  });
});
