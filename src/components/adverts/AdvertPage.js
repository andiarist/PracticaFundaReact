import React, { useState, useEffect } from 'react';
import { getAdvertDetail } from '../../api/adverts';
import { useParams, Redirect } from 'react-router-dom';
import Layout from '../../layout/Layout';

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
    return <div>{JSON.stringify(advert)}</div>;
  };

  return (
    <Layout title="mi anuncio">
      <div className="">{renderContent()}</div>
    </Layout>
  );
}
export default AdvertPages;
