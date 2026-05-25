import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // If no token exists, redirect to login page
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;