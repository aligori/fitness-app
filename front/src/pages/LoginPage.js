import React from 'react';
import AuthLayout from "../hoc/AuthLayout.js";
import LoginForm from "../components/LoginForm.js";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
