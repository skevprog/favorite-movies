import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleOnChange = (e) => setSearchValue(e.target.value);

  const resetInputField = () => {
    setSearchValue('');
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };
  return (
    <div className="search-container">
      <form onSubmit={handleOnSubmit} className="form">
        <input className="input" type="text" name="movie" value={searchValue} onChange={handleOnChange} placeholder="Type something to search" />
      </form>
    </div>
  );
};

SearchBar.defaultProps = {
  search: null,
};

SearchBar.propTypes = {
  search: PropTypes.func,
};

export default SearchBar;
