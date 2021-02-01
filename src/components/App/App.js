import React, { useState } from 'react';
import Tipos from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../login/PrivateRoute';

import LoginPage from '../login/LoginPage';
import AdvertsPage from '../adverts/AdvertsPage/AdvertsPage';
import AdvertPage from '../adverts/AdvertPage';
import NewAdvertPage from '../adverts/NewAdvertPage/NewAdvertPage';
import NotFoundPage from '../layout/NotFoundPage';

export const AuthContext = React.createContext();

function App({ initiallyLoggedUser }) {
  const [loggedUser, setloggedUser] = useState(initiallyLoggedUser);

  const handleLogin = loggedUser => setloggedUser(loggedUser);

  return (
    <AuthContext.Provider
      value={{
        isLogged: loggedUser,
      }}>
      <div className="App">
        <Switch>
          <Route path="/login" exact>
            {({ history }) => (
              <LoginPage onLogin={handleLogin} history={history} />
            )}
          </Route>
          <PrivateRoute path="/" exact component={AdvertsPage} />

          <PrivateRoute path="/adverts" exact component={AdvertsPage} />

          <PrivateRoute path="/adverts/new" exact>
            <NewAdvertPage />
          </PrivateRoute>

          <PrivateRoute path="/adverts/:id" exact>
            <AdvertPage />
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
