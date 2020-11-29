import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';

import storage from './utils/storage';
import { configureClient } from './api/client';

const auth = storage.get('auth') || { ok: false, token: null };

configureClient(auth.token);

ReactDOM.render(
  <BrowserRouter>
    <App initiallyLoggedUser={auth.ok} />
  </BrowserRouter>,
  document.getElementById('root'),
);
