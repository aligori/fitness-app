import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router';
import {AuthContext} from "../context/AuthProvider.js";

export const GuestRoute = () => {
  const [auth] = useContext(AuthContext);

  console.log('GuestRoute auth: ', auth)

  if(!auth.dbFilled) {
    return <Navigate to="/fill-database" />;
  }

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default GuestRoute;
