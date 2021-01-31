import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../layout/Layout';
import './NewAdvertPage.css';

import { createNewAdvert } from '../../api/adverts';

function NewAdvertPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sale, setSale] = useState(null);
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState('');

  const history = useHistory();

  const handleChangeName = event => setName(event.target.value);
  const handleChangePrice = event => setPrice(event.target.value);
  const handleChangeSale = event => {
    //console.log('event.target.value:', event.target.value);
    event.target.value === 'sell' ? setSale(true) : setSale(false);
  };

  //console.log('sale:', sale);

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

  const readPhoto = file => {
    console.log('file:', file);
    if (file) {
      const fileData = new FileReader();
      fileData.onload = function () {
        let dataURL = fileData.result;
        setPhoto(dataURL);
      };
      fileData.readAsDataURL(file);
    }
  };

  const handleChangePhoto = event => {
    const file = event.target.files[0];
    readPhoto(file);
  };

  //console.log('tags:', tags);

  const setData = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    formData.append('price', price);
    formData.append('photo', photo);
    tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));

    return formData;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const advert = setData();
    console.log('advert:', advert);

    createNewAdvert(advert)
      .then(({ result: advert }) => {
        console.log(advert);
        //console.log(history);
        history.push(`/adverts/${advert._id}`);
      })
      .catch(error => console.log(error));
  };

  const renderContent = () => {
    return (
      <div>
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
          <select multiple value={tags} onChange={handleChangeTags}>
            Tags:
            <option value="lifestyle">lifestyle</option>
            <option value="motor">motor</option>
            <option value="mobile">mobile</option>
          </select>
          <br />
          <button type="submit" className="">
            Crear anuncio
          </button>
        </form>
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
