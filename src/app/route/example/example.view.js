import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import { renderRoutes, IntlMessage } from 'core';

import './example.style';

/**
 * Render example view
 * @param  {object} model   Model for view
 * @param  {object} handler Handler for view
 * @return {Component}      Example component
 */
export const exampleView = (model, handler) => {
  const { route, menus, selectedIndex } = model;
  const { onActive } = handler;

  return (
    <div>
      <Tabs className="example__tabs" value={selectedIndex}>
        {
          (menus || []).map((menu, index) => {
            return (
              <Tab
                key={index}
                value={index}
                className="example__tab"
                label={<IntlMessage intlKey={menu.inltKey} />}
                data-route={menu.link}
                onActive={onActive}
              />
            );
          })
        }
      </Tabs>
      <div className="section">
        {renderRoutes(route.routes)}
      </div>
    </div>
  );
};