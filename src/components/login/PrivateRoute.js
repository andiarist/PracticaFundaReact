import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

function PrivateRoute(props) {
  console.log('props en PrivateRoute:', props);
  const { isLogged } = props;
  console.log('isLogged en PrivateRoute:', isLogged);
  const location = useLocation();
  console.log('location:', location);
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
}

export default PrivateRoute;
