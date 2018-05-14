import React from 'react';

const LABEL = 'label';

const view = ({ htmlTag, message }) => {
  const tag = htmlTag ? htmlTag.toLowerCase() : '';

  if (tag === LABEL) {
    return <label>{message}</label>;
  }

  return <span>{message}</span>;
};

export const intlMessageView = { view };
