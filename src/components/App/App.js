import React, { useState } from 'react';
import Tipos from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from '../../components/login/LoginPage';
import AdvertsPage from '../adverts/AdvertsPage';
import AdvertPage from '../adverts/AdvertPage';
import NewAdvertPage from '../adverts/NewAdvertPage';
import NotFoundPage from '../../utils/NotFoundPage';

function App(initiallyLoggedUser) {
  const [loggedUser, setloggedUser] = useState(initiallyLoggedUser);

  const handleLogin = loggedUser => setloggedUser(loggedUser);
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact>
          {({ history }) => (
            <LoginPage onLogin={handleLogin} history={history} />
          )}
        </Route>
        <Route path="/" exact component={AdvertsPage} />
        <Route path="/adverts" exact isLogged={!!loggedUser}>
          <AdvertsPage />
        </Route>
        <Route path="/advert/:id" exact component={AdvertPage} />
        <Route path="/adverts/new" exact>
          <NewAdvertPage />
        </Route>
        <Route path="/404" exact>
          <NotFoundPage />
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

App.propTypes = {
  initiallyLoggedUser: Tipos.bool,
};

export default App;
