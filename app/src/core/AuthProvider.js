import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const accessToken = useSelector((state) =>
    _.get(state, 'authenticationReducer.access_token', null)
  );

  const value = {
    isAuthenticated: !!accessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
