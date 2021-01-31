import client from './client';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;

export const getAdverts = busqueda => {
  let url = '/apiv1/adverts';
  if (busqueda) {
    url += `${busqueda}`;
  }
  return client.get(url);
};

const urlBase = '/apiv1/adverts/';

export const getAdvertDetail = advertId =>
  client.get(`${urlBase}${advertId}`).then(response => {
    if (response.result.photo) {
      response.result.photoUrl = `${baseURL}${response.result.photo.replace(
        /\\/g,
        '/',
      )}`;
    } else {
      response.result.photoUrl = '';
    }

    return response;
  });

export const deleteAdvert = advertId => client.delete(`${urlBase}${advertId}`);

export const createNewAdvert = advert => {
  return client.post('/apiv1/adverts', advert);
};

export const getTags = () => client.get(`${urlBase}tags`);
