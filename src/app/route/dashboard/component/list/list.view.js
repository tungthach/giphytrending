import React from 'react';
import { Loader } from 'core';

import { Item } from '../item/item.component';

import './list.style';

/**
 * Render List Content
 *
 * @param  {Object} model    Model for view including component's props & state
 *                             + data: list data image
 * @return {Component}       Component include Button content
 */
export const listView = (model) => {
  const { loading, data } = model;

  return (
    <div className="list">
      {loading && <Loader />}
      {data.map(item =>
        <Item key={item.id} item={item} />
      )}
    </div>
  );
};
