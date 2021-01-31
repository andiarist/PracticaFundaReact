import client from './client';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;

const url = '/apiv1/adverts';

export const getAdverts = params => {
  //let url = '/apiv1/adverts';
  //if (busqueda) {
  //  url += `${busqueda}`;
  //}
  return client.get(url, { params });
};

//const urlBase = '/apiv1/adverts/';

export const getAdvertDetail = advertId =>
  client.get(`${url}/${advertId}`).then(response => {
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

export const deleteAdvert = advertId => client.delete(`${url}/${advertId}`);

export const createNewAdvert = advert => {
  return client.post(url, advert);
};

export const getTags = () => client.get(`${url}/tags`);
