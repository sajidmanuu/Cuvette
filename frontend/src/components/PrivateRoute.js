import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // If user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user's role is not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // Render the protected route
  return <Outlet />;
};

export default PrivateRoute;
