import client from './client';

import storage from '../utils/storage';

export const login = credentials =>
  client.login(credentials).then(auth => {
    const { remember } = credentials;
    const { ok, token } = auth;
    if (remember) {
      storage.set('auth', { ok, token });
    }
    return auth.ok;
  });
