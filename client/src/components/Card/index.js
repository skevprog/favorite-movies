import React from 'react';

const Card = ({ image, title, onClick, movieId }) => (
  <div className="movie-card" onClick={() => onClick(movieId)}>
    <img className="movie-image" src={image} alt={title} />
    <p>{title}</p>
  </div>
);


export default Card;
