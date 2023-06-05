import React from 'react';
import AppRoutes from '@router/index';
import Notification from 'react-notify-toast';
import FullPageSpinner from '@hoc/partials/FullPageSpinner';
import AuthProvider from '@core/AuthProvider';

const App = () => {
  return (
    <>
      <Notification options={{ zIndex: 2000, top: 10 }} />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <FullPageSpinner />
    </>
  );
};

export default App;
