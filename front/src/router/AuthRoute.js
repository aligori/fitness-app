import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router';
import {AuthContext} from "../context/AuthProvider.js";

const AuthRoute = () => {
  const [auth] = useContext(AuthContext);

  if(!auth.dbFilled) {
    return <Navigate to="/fill-database" />;
  }

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthRoute;
