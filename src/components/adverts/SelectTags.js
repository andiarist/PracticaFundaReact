import React, { useState, useEffect } from 'react';

import { getTags } from '../../api/adverts';

const SelectTags = props => {
  const [tagList, setTagList] = useState(null);

  useEffect(() => {
    getTags().then(({ result }) => setTagList(result));
  }, []);

  if (!tagList) {
    return null;
  }

  return (
    <select multiple {...props}>
      Tags:
      {tagList.map(tag => (
        <option key={tag}>{tag}</option>
      ))}
    </select>
  );
};

export default SelectTags;
