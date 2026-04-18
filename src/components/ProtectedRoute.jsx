import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo || !userInfo.token) {
    // If no user/token, redirect to login
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
