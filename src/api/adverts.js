import client from './client';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;

export const getAdverts = busqueda => {
  let url = '/apiv1/adverts';
  if (busqueda) {
    url += `${busqueda}`;
  }
  return client.get(url);
};

export const getAdvertDetail = advertId => {
  const url = `/apiv1/adverts/${advertId}`;
  return client.get(url);
};

export const createNsewAdvert = () => {
  return client.post();
};
