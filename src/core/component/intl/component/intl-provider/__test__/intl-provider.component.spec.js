import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider, intlShape } from 'component/intl';


const WrappedIntlProvider = IntlProvider.WrappedComponent;

describe('IntlProvider', () => {
  it('childContextTypes', () => {
    // expect
    assert.deepEqual(WrappedIntlProvider.childContextTypes, { intl: intlShape.isRequired });
  });

  it('model', () => {
    // arrange
    const children = <span>child text content</span>;

    // sut
    const wrapper = shallow(<WrappedIntlProvider >{children}</WrappedIntlProvider>);
    const instance = wrapper.instance();

    // expect
    assert.deepEqual(instance.model, { children });
  });

  it('getChildContext()', () => {
    // arrange
    const locale = 'vi';
    const messages = {
      fullname: 'Họ và tên:',
      dob: 'Ngày sinh'
    };
    const props = { locale, messages };

    // sut
    const wrapper = shallow(<WrappedIntlProvider {...props} />);
    const instance = wrapper.instance();

    // expect
    assert.deepEqual(instance.getChildContext(), {
      intl: {
        locale,
        messages,

        // format methods
        formatMessage: instance.formatMessage
      }
    });

  });

  context('formatMessage()', () => {
    const props = {
      locale: 'en',
      messages: {
        test: 'Test message',
        emailInvalid: 'Email {email} is invalid format'
      }
    };

    it('should return content for existed key', () => {
      // sut
      const wrapper = shallow(<WrappedIntlProvider {...props} />);
      const instance = wrapper.instance();
      const content = instance.formatMessage('test');

      // expect
      assert.equal(content, 'Test message');
    });

    it('should return content with formated values for existed key', () => {
      // sut
      const wrapper = shallow(<WrappedIntlProvider {...props} />);
      const instance = wrapper.instance();
      const content = instance.formatMessage('emailInvalid', {email: 'loremloremloremlorem'});

      // expect
      assert.equal(content, 'Email loremloremloremlorem is invalid format');
    });

    it('should return key for not existed key', () => {
      // sut
      const wrapper = shallow(<WrappedIntlProvider {...props} />);
      const instance = wrapper.instance();
      const content = instance.formatMessage('notexistkey');

      // expect
      assert.equal(content, 'notexistkey');
    });
  });
});
