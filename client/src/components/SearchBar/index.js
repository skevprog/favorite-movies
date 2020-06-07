import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleOnChange = (e) => setSearchValue(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    search(searchValue);
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
  search: () => {},
};

SearchBar.propTypes = {
  search: PropTypes.func,
};

export default React.memo(SearchBar);
