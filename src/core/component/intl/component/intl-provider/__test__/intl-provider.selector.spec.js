import Immutable from 'immutable';

import { getLocalization, intlProviderSelector } from '../intl-provider.selector';

describe('IntlProvider selector', () => {
  const localization = {
    locale: 'en',
    messages: [
      { home: 'home content...' }
    ]
  };
  const state = Immutable.fromJS({
    app: { localization }
  });

  it('getLocalization()', () => {
    // sut
    const result = getLocalization(state);

    // expect
    assert.equal(result, Immutable.fromJS(localization));
  });

  it('intlProviderSelector()', () => {
    // sut
    const selector = intlProviderSelector(state);

    // expect
    assert.deepEqual(selector, {
      ...localization,
      key: 'en'
    });
  });

});
