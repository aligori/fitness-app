import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const savedAuth = localStorage.getItem('auth')
  console.log(savedAuth, 'savedAuth')
  const [auth, setAuth] = useState(savedAuth ? JSON.parse(savedAuth) : {});

  const onAuthChange = (auth) => {
    console.log('onAuthChange', auth)
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth)
  }

  return <AuthContext.Provider value={[auth, onAuthChange]}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
