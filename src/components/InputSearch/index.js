import React from 'react';
import { MdSearch } from 'react-icons/md';

import { debounce } from 'lodash';

// import { Container, Search } from './styles';

export default function InputSearch({ handleSearch, ...rest }) {
  const search = debounce(value => handleSearch(value), 400);

  function handleChange(e) {
    search(e.target.value);
  }

  return (
    <>
      <MdSearch size={24} />
      <input onChange={handleChange} {...rest} />
    </>
  );
}
