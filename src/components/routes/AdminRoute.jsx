import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import constants from '../../utils/constant';
import AdminModal from '../modals/AdminModal';
import UnauthModal from '../modals/UnauthModal';

function AdminRoute({ component: Component, ...rest }) {
  const { authenticated, authUser } = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={props => {
        return !authenticated ? (
          <UnauthModal {...props} />
        ) : authUser.role === constants.roles.admin ? (
          <Component {...props} />
        ) : (
          <AdminModal {...props} />
        );
      }}
    />
  );
}

export default AdminRoute;
