import axios from 'axios';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;

const client = axios.create({
  baseURL,
});

const setAuthorizationHeader = token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

client.login = credentials =>
  client.post('/apiv1/auth/login', credentials).then(auth => {
    setAuthorizationHeader(auth.token);
    return auth;
  });

client.logout = () => removeAuthorizationHeader();

client.interceptors.response.use(response => response.data);

export const configureClient = token => {
  if (token) {
    setAuthorizationHeader(token);
  }
};

export default client;
