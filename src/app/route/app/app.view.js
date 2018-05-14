import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Business from 'material-ui/svg-icons/communication/business';

import { renderRoutes, IntlMessage } from 'core';

import { URL_DASHBOARD, URL_ABOUT } from './app.constant';

import './app.style';

/*
 * The menu items
 */
const menus = [
  { to: URL_DASHBOARD, intlKey: 'dashboard', icon: <Dashboard /> },
  { to: URL_ABOUT, intlKey: 'about', icon: <Business /> }
];

/**
 * Get class name
 *
 * @param  {object} options Options to get class names
 * @return {string}         Return class names
 */
export const getClassName = ({ isSidebarOpen }) => {
  return classNames('sidebar', {
    'is-open': isSidebarOpen
  });
};

/**
 * Render menu
 *
 * @return {array} Array of menu items
 */
export const renderMenu = () => {
  return menus.map(item => {
    return (
      <MenuItem key={item.to}>
        <NavLink className="menu-item" to={item.to} activeClassName="is-active">
          {item.icon}
          <IntlMessage intlKey={item.intlKey} />
        </NavLink>
      </MenuItem>
    );
  });
};

/**
 * Render app component
 *
 * @param  {obecjt} model     Model for component
 * @param  {obecjt} handler   Handler for component
 * @return {Component}        App component
 */
export const appView = (model, handler) => {
  const { route, title, isSidebarOpen } = model;
  const { onToggleSidebar } = handler;
  const className = getClassName({ isSidebarOpen });

  return (
    <div className="app">
      <AppBar
        className="navbar"
        title={title}
        onLeftIconButtonClick={onToggleSidebar}
      />
      <Drawer
        className="sidebar-wrapper"
        docked={false}
        containerClassName={className}
        open={isSidebarOpen}
        onRequestChange={onToggleSidebar}
      >
        {renderMenu()}
      </Drawer>
      <div className="content">
        {renderRoutes(route.routes)}
      </div>
    </div>
  );
};
