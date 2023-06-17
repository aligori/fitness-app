import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const savedAuth = localStorage.getItem('auth')
  const [auth, setAuth] = useState(savedAuth ? JSON.parse(savedAuth) : {});

  const onAuthChange = (auth) => {
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth)
  }

  return <AuthContext.Provider value={[auth, onAuthChange]}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
