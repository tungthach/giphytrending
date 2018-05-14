import React from 'react';

import { List } from './component/list/list.component';
import { Pagination } from './component/pagination/pagination.component';

import './dashboard.style';

/**
 * Render Dashboard  view
 * @param  {object} model   Model for view
 * @return {Component}      Dashboard component
 */
export const dashboardView = (model) => {
  const { images, loading, pagination, getGiphyTrending } = model;

  return (
    <div className='dashboard'>
      <List data={images} loading={loading} />
      <Pagination pagination={pagination} getMoreImages={getGiphyTrending} />
    </div>
  );
};
