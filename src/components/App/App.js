import React, { useState } from 'react';
import Tipos from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../login/PrivateRoute';

import LoginPage from '../login/LoginPage';
import AdvertsPage from '../adverts/AdvertsPage';
import AdvertPage from '../adverts/AdvertPage';
import NewAdvertPage from '../adverts/NewAdvertPage';
import NotFoundPage from '../../utils/NotFoundPage';

function App(props) {
  const { initiallyLoggedUser } = props;
  console.log('props:', props);
  console.log('initiallyLoggedUser al principio de App: ', initiallyLoggedUser);
  const [loggedUser, setloggedUser] = useState(initiallyLoggedUser);

  const handleLogin = loggedUser => setloggedUser(loggedUser);
  console.log('loggedUser en App: ', loggedUser);
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact>
          {({ history, location }) => (
            <LoginPage
              onLogin={handleLogin}
              history={history}
              location={location}
            />
          )}
        </Route>
        <PrivateRoute
          path="/"
          exact
          component={AdvertsPage}
          isLogged={loggedUser}
        />
        <PrivateRoute path="/adverts" exact isLogged={loggedUser}>
          <AdvertsPage />
        </PrivateRoute>
        <PrivateRoute
          path="/advert/:id"
          exact
          component={AdvertPage}
          isLogged={loggedUser}
        />
        <PrivateRoute path="/adverts/new" exact isLogged={loggedUser}>
          <NewAdvertPage />
        </PrivateRoute>
        <PrivateRoute path="/404" exact isLogged={loggedUser}>
          <NotFoundPage />
        </PrivateRoute>
        <PrivateRoute>
          <Redirect to="/404" isLogged={loggedUser} />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

App.propTypes = {
  initiallyLoggedUser: Tipos.bool,
};

export default App;
