import React, { useState } from 'react';
import Tipos from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../login/PrivateRoute';

import LoginPage from '../login/LoginPage';
import AdvertsPage from '../adverts/AdvertsPage';
import AdvertPage from '../adverts/AdvertPage';
import NewAdvertPage from '../adverts/NewAdvertPage';
import NotFoundPage from '../layout/NotFoundPage';

export const AuthContext = React.createContext();

function App({ initiallyLoggedUser }) {
  console.log('initiallyLoggedUser al principio de App: ', initiallyLoggedUser);
  const [loggedUser, setloggedUser] = useState(initiallyLoggedUser);

  const handleLogin = loggedUser => setloggedUser(loggedUser);
  console.log('loggedUser en App: ', loggedUser);
  return (
    <AuthContext.Provider value={{ isLogged: loggedUser }}>
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
          <PrivateRoute path="/" exact component={AdvertsPage} />
          <PrivateRoute path="/adverts" exact>
            <AdvertsPage />
          </PrivateRoute>
          <PrivateRoute path="/advert/:id" exact component={AdvertPage} />
          <PrivateRoute path="/adverts/new" exact>
            <NewAdvertPage />
          </PrivateRoute>
          <PrivateRoute path="/404" exact>
            <NotFoundPage />
          </PrivateRoute>
          <PrivateRoute>
            <Redirect to="/404" />
          </PrivateRoute>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

App.propTypes = {
  initiallyLoggedUser: Tipos.bool.isRequired,
};

export default App;
