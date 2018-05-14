import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { Switch, Route } from 'react-router-dom';

/**
 * Transition options when change route
 * @return {Object} Transition options
 */
const transitionOptions = {
  timeout: { enter: 500, exit: 300 },
  classNames: 'fade',
  in: true,
  appear: true,
  enter: true,
  exit: true
};

/**
 * Render component with animation when route changed
 * @param  {Object} route     Routing info we registered { path, exact, component, routes }
 * @param  {Object} props     Route's props
 * @return {Component}        Route component wrapped in animated transition component
 */
export const renderAnimatedComponent = (route, props) => {
  props = props || {};

  // Should leave tag div there in case the asyncComponent has not fully loaded yet
  // CSSTransition can continue processsing without error "classList is null..."
  if (route && route.component) {
    return (
      <CSSTransition {...transitionOptions}>
        <div>
          <route.component {...props} route={route} />
        </div>
      </CSSTransition>
    );
  }

  return null;
};

/**
 * Render registered routes with animated transition
 * @param  {Array} routes     Array of object route { path, exact, component, routes }
 * @return {Component}        Route components wrapped in Switch
 */
export const renderRoutes = (routes) => {
  return routes
    ? <Switch>
        {
          routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={renderAnimatedComponent.bind(this, route)}
            />
          ))
        }
      </Switch>
    : null;
};