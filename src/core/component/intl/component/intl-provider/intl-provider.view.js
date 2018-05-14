import React from 'react';

const view = ({ children }) => {
  return <div data-language="en">{children}</div>;
};

export const intlProviderView = { view };
