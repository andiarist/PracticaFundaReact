import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../App/App';

//console.log('private route authcontext:', AuthContext);

function PrivateRoute(props) {
  //console.log('props en PrivateRoute:', props);
  //const { isLogged } = props;
  //console.log('isLogged en PrivateRoute:', isLogged);

  const { isLogged } = useContext(AuthContext);
  // console.log('private route authcontext:', useContext(AuthContext));
  // console.log('private route isLogged:', isLogged);

  //
  //

  return isLogged ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
