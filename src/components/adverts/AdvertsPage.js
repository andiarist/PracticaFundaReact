import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getAdverts } from '../../api/adverts';
import Advert from './Advert';
import FormFilter from './FormFilter';
import Layout from '../../layout/Layout';

//import AdvertsFilter from './AdvertsFilter';

import 'antd/dist/antd.css';
import { Form } from 'antd';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

function AdvertsPage() {
  const [adverts, setAdverts] = useState(null);
  const history = useHistory();
  let busqueda = '';

  useEffect(() => {
    getAdverts().then(setAdverts);
  }, []);

  function onFinish(values) {
    console.log('Valores del form: ', values);
    busqueda = '?';
    if (values.name) {
      busqueda += `name=${values.name}&`;
    }
    if (values.sale) {
      if (values.sale === 'Sell') {
        busqueda += `sale=true&`;
      } else if (values.sale === 'Buy') {
        busqueda += `sale=false&`;
      }
    }
    if (values.tags) {
      values.tags.map(tag => (busqueda += `tags=${tag}&`));
    }

    console.log('busqueda:', busqueda);
    getAdverts(busqueda).then(setAdverts);
  }

  const renderContent = () => {
    if (!adverts) {
      return null;
    }

    const advertsList = adverts.result.rows;

    return (
      <div className="advertsPage">
        <section>
          <h2>Bloque de filtrado</h2>
          <Form name="adverts-form" {...formItemLayout} onFinish={onFinish}>
            <FormFilter />
          </Form>
        </section>
        <section>
          <h2>Lista de anuncios</h2>
          {advertsList.map(advert => (
            <Advert key={advert._id} {...advert} history={history} />
          ))}
        </section>
      </div>
    );
  };

  return (
    <Layout title="Anuncios">
      <div className="">{renderContent()}</div>
    </Layout>
  );
}

export default AdvertsPage;
