import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAutheticated } from './services/auth';

type PrivateRouteProps = {
  element: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  if (!isAutheticated()) {
    return <Navigate to="/" />;
  }
  return <>{element}</>;
};

export default PrivateRoute;