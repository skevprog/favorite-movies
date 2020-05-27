import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Pagination = ({
  totalPages,
  currentPage,
  onPrevPageClick,
  totalResults,
  onNextPageClick,
}) => (
  <div className="pagination">
    <div className="results">
      Total Results
      {' '}
      {totalResults}
    </div>
    <div className="buttons-container">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={onPrevPageClick}
      >
        Previous
      </button>
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={onNextPageClick}
      >
        Next
      </button>
    </div>
    <div className="results">
      Page
      {' '}
      {currentPage}
      {' '}
      of
      {' '}
      {totalPages}
      {' '}
      pages
    </div>
  </div>
);

Pagination.defaultProps = {
  totalPages: 0,
  currentPage: 0,
  totalResults: 0,
  onPrevPageClick: null,
  onNextPageClick: null,
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  totalResults: PropTypes.number,
  onPrevPageClick: PropTypes.func,
  onNextPageClick: PropTypes.func,
};

export default React.memo(Pagination);
