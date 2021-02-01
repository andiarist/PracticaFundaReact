import React, { useState, useEffect } from 'react';
import { getAdvertDetail } from '../../api/adverts';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { deleteAdvert } from '../../api/adverts';
import Layout from '../layout/Layout';
import Advert from './Advert';
import placeholder from '../../assets/placeholder.png';

import 'antd/dist/antd.css';
import { Image } from 'antd';
import ConfirmButton from '../tools/ConfirmButton';

function AdvertPage() {
  const [advert, setAdvert] = useState(null);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const advertId = useParams().id;
  const history = useHistory();

  const handleDelete = () => {
    deleteAdvert(advertId).then(() => {
      history.push('/');
    });
  };

  useEffect(() => {
    getAdvertDetail(advertId)
      .then(advert => setAdvert(advert))
      .catch(error => setError(error));
  }, []);

  const renderContent = () => {
    if (error) {
      console.log('dentro del if de error', error);
      return <Redirect to="/404" />;
    }
    if (!advert) {
      console.log('Dentro del if del no advert', advert);
      return null;
    }

    const myAdvert = advert.result;

    //const { _id, name, price, sale, tags, photo, photoUrl } = myAdvert;
    const { photoUrl } = myAdvert;

    return (
      <div>
        <Advert key={myAdvert._id} {...myAdvert} />
        <Image width={200} src={photoUrl} fallback={placeholder} />
        <ConfirmButton
          acceptAction={handleDelete}
          confirmProps={{
            title: 'Delete Advert',
            message: 'Are you sure you want to delete this advert?',
          }}>
          Delete Advert
        </ConfirmButton>
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
