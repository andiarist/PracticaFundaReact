import React from 'react';
import Tipos from 'prop-types';

import 'antd/dist/antd.css';
import { Card, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './Advert.css';

const Advert = ({ _id, name, price, sale, tags, history }) => (
  <article
    className="advert-card"
    onClick={() => history.push(`/advert/${_id}`)}>
    <Card title={name} hoverable="true" style={{ width: 270 }}>
      <p>Precio: {price} €</p>
      <p>{sale ? 'Se vende' : 'Se busca'}</p>
      <div className="advert-tags">
        {tags.map(tag => (
          <Tag icon={<CheckCircleOutlined />} color="success" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  </article>
);

Advert.protoTypes = {
  name: Tipos.string.isRequired,
  price: Tipos.number.isRequired,
  sale: Tipos.bool.isRequired,
  tags: Tipos.arrayOf(Tipos.string),
};

export default Advert;
