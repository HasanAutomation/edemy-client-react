import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import UnauthModal from '../modals/UnauthModal';

function PrivateRoute({ component: Component, ...rest }) {
  const { authenticated } = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={props => {
        return !authenticated ? (
          <UnauthModal {...props} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}

export default PrivateRoute;
