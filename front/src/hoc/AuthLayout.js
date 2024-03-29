import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
