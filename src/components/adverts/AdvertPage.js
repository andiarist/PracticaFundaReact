import React, { useState, useEffect } from 'react';
import { getAdvertDetail } from '../../api/adverts';
import { useParams, Redirect } from 'react-router-dom';
import Layout from '../layout/Layout';

import 'antd/dist/antd.css';
import { Image } from 'antd';

function AdvertPages() {
  const [advert, setAdvert] = useState({});
  const [error, setError] = useState(null);

  const advertId = useParams().id;

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
    console.log('myAdvert:', myAdvert);

    return <div>{JSON.stringify(myAdvert)}</div>;
  };

  return (
    <Layout title="mi anuncio">
      <div className="">{renderContent()}</div>
    </Layout>
  );
}
export default AdvertPages;
