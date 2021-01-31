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
    event.target.value === 'sell' ? setSale(true) : setSale(false);
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

    let search = '?';
    if (name) {
      search += `name=${name}&`;
    }
    if (sale) {
      if (sale) {
        search += `sale=true&`;
      } else {
        search += `sale=false&`;
      }
    }
    if (tags) {
      search += `tags=`;
      tags.map(tag => (search += `${tag},`));
    }
    console.log('setFilters', search);

    return search;
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
