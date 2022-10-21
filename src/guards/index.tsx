import React from 'react';
import { Redirect } from 'react-router-dom';
import { RoutesString } from 'routes/routesString';
import useAuthStore from 'stores/auth.store';

const Guard: React.FC<any> = ({ children }) => {
  const { tokens } = useAuthStore();
  if (tokens.accessToken) {
    // TODO: if (!tokens.accessToken) {...}
    return <Redirect to={RoutesString.AccessDenied} />;
  }
  return children;
};

export default Guard;
