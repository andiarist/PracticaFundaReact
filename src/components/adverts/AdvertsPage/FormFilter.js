import React, { useState } from 'react';
import Tipos from 'prop-types';

import SelectTags from '../SelectTags';

import 'antd/dist/antd.css';
import { Slider } from 'antd';

const FormFilter = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sale, setSale] = useState(null);
  const [tags, setTags] = useState([]);

  const handleChangeName = event => setName(event.target.value);
  const handleChangePrice = value => setPrice(value);

  const handleChangeSale = event => {
    if (event.target.value === 'sell') {
      setSale('sale');
    } else if (event.target.value === 'buy') {
      setSale('buy');
    } else {
      setSale(null);
    }
  };

  const handleChangeTags = event => {
    const options = event.target.options;
    const tagsSelected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        tagsSelected.push(options[i].value);
      }
    }

    setTags(tagsSelected);
  };

  const setFilters = () => {
    console.log('name:', name);
    console.log('price:', price);
    console.log('sale:', sale);
    console.log('tags:', tags);

    let params = {};

    if (name) {
      params.name = name;
    }
    if (price) {
      params.price = price.join('-');
      console.log('params.price:', params.price);
    }
    if (sale) {
      if (sale === 'sale') {
        params.sale = true;
      } else {
        params.sale = false;
      }
    }
    if (tags.length) {
      params.tags = tags.join(',');
      console.log('params.tags:', params.tags);
    }
    console.log('params:', params);
    return params;
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(setFilters());
  };

  return (
    <form name="adverts-form" onSubmit={handleSubmit}>
      <input
        className="input-form"
        type="name"
        name="name"
        value={name}
        onChange={handleChangeName}
      />
      <Slider
        range
        defaultValue={[200, 5000]}
        onChange={handleChangePrice}
        min={0}
        max={10000}
        tooltipPlacement="bottom"
      />
      <input
        className=""
        type="radio"
        name="sale"
        value="sell"
        onChange={handleChangeSale}
      />
      Sale
      <input
        className=""
        type="radio"
        name="sale"
        value="buy"
        onChange={handleChangeSale}
      />
      Buy
      <input
        className=""
        type="radio"
        name="sale"
        value="all"
        onChange={handleChangeSale}
      />
      All
      <br />
      <SelectTags onChange={handleChangeTags} value={tags} />
      <br />
      <button type="submit" className="">
        Buscar
      </button>
    </form>
  );
};
FormFilter.propTypes = {
  onSubmit: Tipos.func.isRequired,
};

export default FormFilter;
