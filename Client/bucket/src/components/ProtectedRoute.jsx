import React from 'react';
import { useAuth } from '../hooks/useAuth'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated: _isAuthenticated } = useAuth(); // Prefix with _ if unused

  // For testing - allow access to all pages
  return children;

  // Uncomment when backend is ready:
  // return _isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;