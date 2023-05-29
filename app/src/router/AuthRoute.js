import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Navigate, Outlet } from 'react-router';

const AuthRoute = () => {
  const accessToken = useSelector((state) =>
    _.get(state, 'authenticationReducer.access_token', null)
  );

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthRoute;
