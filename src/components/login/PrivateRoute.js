import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
  console.log('props en PrivateRoute:', props);
  const { isLogged } = props;
  console.log('isLogged en PrivateRoute:', isLogged);
  return isLogged ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
