import React from 'react';
import {shallow} from 'enzyme';

import {intlProviderView} from '../intl-provider.view';

describe('intlProvider View', () => {
  it('view', () => {
    // arrange
    const children = <span>testing data</span>;

    // sut
    const wrapper = shallow(intlProviderView.view({children}));

    // expect
    assert.isTrue(wrapper.contains(children));
  });
});

