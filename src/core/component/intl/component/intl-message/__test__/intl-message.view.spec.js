import React from 'react';
import { shallow } from 'enzyme';

import { intlMessageView } from '../intl-message.view';

describe('IntlMessage View', () => {
  it('should render tag span', () => {
    // arrange
    const model = { message: 'testing data' };

    // sut
    const wrapper = shallow(intlMessageView.view(model));

    // expect
    assert.isTrue(wrapper.contains(<span>testing data</span>));
  });

  it('should render tag label', () => {
    // arrange
    const model = {
      htmlTag: 'label',
      message: 'testing data'
    };

    // sut
    const wrapper = shallow(intlMessageView.view(model));

    // expect
    assert.isTrue(wrapper.contains(<label>testing data</label>));
  });
});
