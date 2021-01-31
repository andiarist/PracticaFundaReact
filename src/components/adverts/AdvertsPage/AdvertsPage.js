import React, { useState, useEffect } from 'react';
import Tipos from 'prop-types';
//import { useHistory } from 'react-router-dom';

import { getAdverts } from '../../../api/adverts';
import Advert from '../Advert';
import FormFilter from './FormFilter';
import Layout from '../../layout/Layout';

//import AdvertsFilter from './AdvertsFilter';

import { Row, Col, Empty } from 'antd';
import 'antd/dist/antd.css';

function AdvertsPage({ history }) {
  const [adverts, setAdverts] = useState(null);
  //const history = useHistory();
  //let busqueda = '';

  useEffect(() => {
    getAdverts().then(setAdverts);
  }, []);

  function onFinish(values) {
    console.log('Valores del form: ', values);
    let busqueda = '?';
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
    console.log('busqueda en advertsPage', busqueda);
    console.log('busqueda:', busqueda);
    getAdverts(busqueda).then(setAdverts);
  }

  const renderAdverts = () => {
    const advertsList = adverts.result.rows;
    if (advertsList.length === 0) {
      return <Empty />;
    }
    return (
      <Row>
        {advertsList.map(advert => (
          <Col span={8}>
            <Advert key={advert._id} {...advert} history={history} />
          </Col>
        ))}
      </Row>
    );
  };

  const renderContent = () => {
    if (!adverts) {
      return null;
    }

    return (
      <div className="advertsPage">
        <section>
          <h2>Bloque de filtrado</h2>
          <FormFilter onFinish={onFinish} />
        </section>
        <section>
          <h2>Lista de anuncios</h2>
          {renderAdverts()}
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

AdvertsPage.propTypes = {
  history: Tipos.object.isRequired,
};

export default AdvertsPage;
