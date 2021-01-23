import React, { useState, useEffect } from 'react';
import { getAdvertDetail } from '../../api/adverts';
import { useParams, Redirect } from 'react-router-dom';
import Layout from '../layout/Layout';
import Advert from './Advert';

import 'antd/dist/antd.css';
import { Image } from 'antd';

function AdvertPage() {
  const [advert, setAdvert] = useState({});
  const [error, setError] = useState(null);

  const advertId = useParams().id;
  //console.log('advertId:', advertId);
  //const anuncio = getAdvertDetail(advertId);
  //console.log(anuncio);

  useEffect(() => {
    getAdvertDetail(advertId)
      .then(advert => setAdvert(advert))
      .catch(error => setError(error));
  }, []);

  const renderContent = () => {
    if (error) {
      return <Redirect to="/404" />;
    }
    if (!advert) {
      console.log('Dentro del if del no advert');
      return null;
    }
    const myAdvert = advert.result;
    //console.log('myAdvert:', myAdvert);
    const { _id, name, price, sale, tags, photo } = myAdvert;

    //return <div>{JSON.stringify(advert.result)}</div>;
    return (
      <div>
        <Advert key={myAdvert._id} {...myAdvert} />
        <Image width={200} src={photo} />
      </div>
    );
  };

  return (
    <Layout title="mi anuncio">
      <div className="">{renderContent()}</div>
    </Layout>
  );
}
export default AdvertPage;
