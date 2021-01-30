import React, { useState, useEffect } from 'react';
import { getAdvertDetail } from '../../api/adverts';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { deleteAdvert } from '../../api/adverts';
import Layout from '../layout/Layout';
import Advert from './Advert';
import placeholder from '../../assets/placeholder.png';

import 'antd/dist/antd.css';
import { Image, Modal, Button } from 'antd';

function AdvertPage() {
  const [advert, setAdvert] = useState(null);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const advertId = useParams().id;
  const history = useHistory();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    deleteAdvert(advertId).then(() => {
      console.log('dentro del then de deleteAdvert');
      history.push('/');
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
    //return <div>{JSON.stringify(advert.result)}</div>;

    const myAdvert = advert.result;
    console.log(myAdvert);

    const { _id, name, price, sale, tags, photo, photoUrl } = myAdvert;

    // console.log('url de la fotoURL:', photoUrl);
    return (
      <div>
        <Advert key={myAdvert._id} {...myAdvert} />
        <Image width={200} src={photoUrl} fallback={placeholder} />
        <Button type="primary" onClick={showModal}>
          Delete Advert
        </Button>
        <Modal
          title="Delete Advert"
          visible={isModalVisible}
          onOk={handleDelete}
          onCancel={handleCancel}>
          <p>Are you sure you want to delete this advert?</p>
        </Modal>
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
