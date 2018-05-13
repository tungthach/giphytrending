import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';

import { view } from 'component/base';

import { authorizeSelector } from './authorized.selector';
import { authorizationView } from './authorization.view';

const LOGIN_URL = '/login';

const createComponent = (WrappedComponent) => {
  @connect(authorizeSelector)
  @view(authorizationView)
  class AuthorizationComponent extends React.Component {
    get model() {
      return {
        props: this.props,
        WrappedComponent
      };
    }

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      const browserHistory = createHistory();

      !this.props.auth.get('isAuthenticated') && browserHistory.push(LOGIN_URL);
    }
  }

  return AuthorizationComponent;
};

export const authorized = roleOrComponent => {
  let type = typeof roleOrComponent;

  if (type === 'string') {
    // let role = roleOrComponent;

    return (WrappedComponent) => createComponent(WrappedComponent);
  }
  let Component = roleOrComponent;

  return createComponent(Component);
};
