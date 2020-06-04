import React from 'react';
import Image from '../Image';
import './MovieDetails.css';

const MovieDetail = ({ close, movieData }) => {
  const {
    popularity, overview, releaseDate, poster_path, title, vote_average,
  } = movieData;
  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <button type="button" className="modal-close-button" aria-label="Close" onClick={close}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-header">
            <h2>
              {title}
            </h2>
          </div>
          <div>
            <p>{overview}</p>
            <h4>
              Popularity:
              {' '}
              {popularity}
            </h4>
            <h4>
              Release Date:
              {' '}
              {releaseDate}
            </h4>
            <h3>
              Votes:
              {' '}
              {vote_average}
            </h3>
          </div>
          <Image image={poster_path} alt={title} />
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
