import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import FillDatabasePage from "../pages/FillDatabasePage.js";
import LoginPage from "../pages/LoginPage.js";
import GuestRoute from "./GuestRoute.js";
import AuthRoute from "./AuthRoute.js";
import AuthProvider from "../context/AuthProvider";
import {Toaster} from "react-hot-toast";
import Dashboard from "../pages/Dashboard";
import CategoryPage from "../pages/CategoryPage";
import PlanPage from "../pages/PlanPage";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route exact path="/fill-database" element={<FillDatabasePage />} />
        <Route element={<GuestRoute />}>
          <Route exact path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/categories/:id" element={<CategoryPage />} />
          <Route exact path="/plans/:id" element={<PlanPage />} />
        </Route>
      </Routes>
      </AuthProvider>
      <Toaster />
    </Router>
  );
};

export default AppRoutes;
