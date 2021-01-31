import React, { useState } from 'react';
import Tipos from 'prop-types';

import SelectTags from '../SelectTags';

function FormNewAdvert({ onSubmit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sale, setSale] = useState(null);
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);

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
  //console.log(tags);

  const handleChangePhoto = event => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const setData = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    formData.append('price', price);
    formData.append('photo', photo);
    tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));

    return formData;
  };
  //const { onSubmit } = props;
  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(setData());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleChangePhoto}
        accept="image/png, image/jpeg"
      />
      <br />
      <input
        className="input-form"
        type="name"
        name="name"
        value={name}
        onChange={handleChangeName}
        required
      />
      <input
        className="input-form"
        type="number"
        name="price"
        value={price}
        onChange={handleChangePrice}
        required
      />
      <input
        className=""
        type="radio"
        name="sale"
        value="sell"
        onChange={handleChangeSale}
        required
      />
      Sale
      <input
        className=""
        type="radio"
        name="sale"
        value="buy"
        onChange={handleChangeSale}
        required
      />
      Buy
      <br />
      <SelectTags onChange={handleChangeTags} value={tags} />
      <br />
      <button type="submit" className="">
        Crear anuncio
      </button>
    </form>
  );
}
FormNewAdvert.propTypes = {
  onSubmit: Tipos.func.isRequired,
};

export default FormNewAdvert;
