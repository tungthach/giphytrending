import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { INT_ZERO } from 'core';

import './pagination.style';
/**
 * Render List Content
 *
 * @param  {Object} model    Model for view including component's props & state
 * @return {Component}       Component include Button content
 */
export const paginationView = model => {
  const { pagination, onClick } = model;

  return (
    <div className="pagination">
      {pagination && pagination.count > INT_ZERO && <RaisedButton primary label="Show more images" onClick={onClick} />}
    </div>
  );
};
