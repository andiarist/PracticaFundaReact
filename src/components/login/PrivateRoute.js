import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../App/App';

//console.log('private route authcontext:', AuthContext);

function PrivateRoute(props) {
  const { isLogged } = useContext(AuthContext);

  return isLogged ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
