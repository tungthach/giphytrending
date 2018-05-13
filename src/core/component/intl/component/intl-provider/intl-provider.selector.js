import { createSelector } from 'utility/selector';

/**
 * Get localization state
 * @param  {Immutable.Map} state  Redux state
 * @return {Immutable.Map}        Localization state
 */
export const getLocalization = (state) => {
  return state.getIn(['app', 'localization']);
};

// IntlProvider Selector return { key, locale, messages}
export const intlProviderSelector = createSelector(
  getLocalization,
  (localization) => {
    const locale = localization.get('locale');
    const messages = localization.get('messages').toJS();

    return {
      key: locale,
      locale,
      messages
    };
  }
);