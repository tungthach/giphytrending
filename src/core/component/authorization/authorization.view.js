import React from 'react';

export const authorizationView = ({ props, WrappedComponent }) => {
  return <div>
          {props.auth.get('isAuthenticated')
          ? <WrappedComponent {...props} />
          : null}
        </div>;
};
