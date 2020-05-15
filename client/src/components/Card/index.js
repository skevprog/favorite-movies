import React, { memo } from 'react';
import PropTypes from 'prop-types';

const fallbackImage = require('../../assets/no-image-available.jpg');

const imageUrl = 'https://image.tmdb.org/t/p/w500';

const Card = ({
  image,
  title,
}) => {
  const addDefault = (e) => {
    e.target.src = fallbackImage;
  };
  return (
    <div className="movie-card">
      <img onError={addDefault} className="movie-image" src={`${imageUrl}${image}`} alt={title} />
      <p>{title}</p>
    </div>
  );
};

Card.defaultProps = {
  image: fallbackImage,
  title: '',
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
};


export default memo(Card);
