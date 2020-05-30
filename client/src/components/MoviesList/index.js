import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import Loader from '../Loader';
import Alert from '../Alert';

const MoviesList = ({ state }) => {
  const renderCards = () => {
    const { movies = [] } = state.moviesData;
    return (!movies.length
      ? <Alert type="INFO" message="No movies found" />
      : movies.map(({
        poster_path,
        original_title,
        id,
      } = {}) => (
        <Card
          key={id}
          image={poster_path}
          title={original_title}
        />
      )));
  };
  const renderMovies = () => {
    const { loading, errorMessage } = state;
    if (errorMessage) {
      return (<Alert type="ERROR" message={errorMessage} />);
    }
    if (loading) {
      return <Loader />;
    }
    return renderCards();
  };
  return (
    <div className="movies-container">
      {renderMovies()}
    </div>
  );
};

MoviesList.defaultProps = {
  state: {},
};

MoviesList.propTypes = {
  state: PropTypes.objectOf(PropTypes.object),
};

export default MoviesList;
