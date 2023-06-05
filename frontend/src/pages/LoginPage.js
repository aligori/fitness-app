import React from 'react';
import LoginForm from '@components/Auth/LoginForm';
import AuthLayout from '@hoc/layouts/AuthLayout';

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
