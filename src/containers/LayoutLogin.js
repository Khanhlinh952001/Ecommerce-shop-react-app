// LoginLayout.js
import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <div>
      <div className="login-content">
        {children}
      </div>
      
    </div>
  );
};

export default LoginLayout;
