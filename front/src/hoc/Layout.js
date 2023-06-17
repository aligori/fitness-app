import React from 'react';
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-1">
          <Navbar />
          <div className="bg-gray-100">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
