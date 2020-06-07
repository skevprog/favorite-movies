import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import Loader from '../Loader';
import Alert from '../Alert';

const MoviesList = ({ state, onClick }) => {
  const renderCards = () => {
    const { movies = [] } = state.moviesData;
    return (movies.length
      ? movies.map((movieData = {}) => (
        <Card
          key={movieData.id}
          image={movieData.poster_path}
          title={movieData.original_title}
          onClick={() => onClick(movieData)}
        />
      ))
      : <Alert type="INFO" message="No movies found" />
    );
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
  onClick: () => {},
};

MoviesList.propTypes = {
  state: PropTypes.shape({
    moviesData: PropTypes.object,
    loading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default React.memo(MoviesList);
