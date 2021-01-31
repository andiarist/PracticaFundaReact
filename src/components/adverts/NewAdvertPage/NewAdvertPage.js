import React from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../../layout/Layout';
import FormNewAdvert from './FormNewAdvert';
import './NewAdvertPage.css';

import { createNewAdvert } from '../../../api/adverts';

function NewAdvertPage() {
  const history = useHistory();

  const handleSubmit = advert => {
    createNewAdvert(advert)
      .then(({ result: advert }) => {
        console.log(advert);
        history.push(`/adverts/${advert._id}`);
      })
      .catch(error => console.log(error));
  };

  const renderContent = () => {
    return (
      <div>
        <FormNewAdvert onSubmit={handleSubmit} />
      </div>
    );
  };

  return (
    <Layout title="New Advert">
      <div className="">{renderContent()}</div>
    </Layout>
  );
}
export default NewAdvertPage;
