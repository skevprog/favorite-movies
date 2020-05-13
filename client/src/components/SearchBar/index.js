import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit, onChange, value }) => (
  <div className="search-container">
    <form action="" onSubmit={onSubmit}>
      <input className="input" type="text" name="movie" value={value} onChange={onChange} placeholder="Type something to search" />
      <button type="submit">Search</button>
    </form>
  </div>
);

SearchBar.defaultProps = {
  onSubmit: null,
  onChange: null,
  value: '',
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SearchBar;
