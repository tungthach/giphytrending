import React from 'react';

import { shallow } from 'test-util';
import { Intl } from '../';
import { intlShape } from '../intl-shape';

describe('Intl Component', () => {
  it('contextTypes', () => {
    // expect
    assert.deepEqual(Intl.contextTypes, {
      intl: intlShape.isRequired
    });
  });

  it('formatMessage()', () => {
    // arrange
    const value = 123;
    const messages = {
      abc: 'This is ABC value: {value}'
    };
    const expectedMessage = `This is ABC value: ${value}`;
    const Temp = class extends Intl {
      render() {
        return <div />;
      }
    };

    // sut
    const wrapper = shallow(<Temp />, {
      messages
    });
    const instance = wrapper.instance();
    const result = instance.formatMessage('abc', {
      value
    });

    // expect
    assert.equal(result, expectedMessage);
  });
});
