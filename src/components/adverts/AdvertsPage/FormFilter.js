import React, { useState } from 'react';
import Tipos from 'prop-types';

import SelectTags from '../SelectTags';

const FormFilter = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sale, setSale] = useState(null);
  const [tags, setTags] = useState([]);

  const handleChangeName = event => setName(event.target.value);
  const handleChangePrice = event => setPrice(event.target.value);
  const handleChangeSale = event => {
    if (event.target.value === 'sell') {
      setSale('sale');
    } else if (event.target.value === 'buy') {
      setSale('buy');
    } else {
      setSale(null);
    }
    //event.target.value === 'sell' ? setSale('sale') : setSale('buy');
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

    //let search = '?';
    //if (name) {
    //  search += `name=${name}&`;
    //}
    //if (sale) {
    //  if (sale === 'sale') {
    //    search += `sale=true&`;
    //  } else {
    //    search += `sale=false&`;
    //  }
    //}
    //if (tags.length) {
    //  search += `tags=`;
    //  tags.map(tag => (search += `${tag},`));
    //}
    //console.log('setFilters', search);
    //
    //return search.substring(0, search.length - 1);

    let params = {};

    if (name) {
      params.name = name;
    }
    if (price) {
      params.price = price;
    }
    if (sale) {
      if (sale === 'sale') {
        params.sale = true;
      } else {
        params.sale = false;
      }
    }
    if (tags.length) {
      //let tagsQuery = '';
      //tags.map(tag => (tagsQuery += `${tag},`));
      //params.tags = tagsQuery.substring(0, tagsQuery.length - 1);
      params.tags = tags.join(',');
      console.log('params.tags:', params.tags);
    }
    console.log('params:', params);
    return params;

    //let params = {
    //  name: name,
    //  price: price,
    //  sale: sale,
    //  tags: tags,
    //};

    //return search;
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
      <input
        className="input-form"
        type="number"
        name="price"
        value={price}
        onChange={handleChangePrice}
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
