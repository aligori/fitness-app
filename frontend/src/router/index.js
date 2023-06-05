import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import GuestRoute from '@router/GuestRoute';
import AuthRoute from '@router/AuthRoute';
import HomePage from '@pages/HomePage';
import { Routes } from 'react-router';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route exact path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route exact path="/" element={<HomePage />} />
          {/* <Route exact path="/users" element={<UsersPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
