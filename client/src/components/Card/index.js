import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import './Card.css';

const Card = ({
  image,
  title,
  onClick,
}) => (
  <div className="movie-card" onClick={(movieData) => onClick(movieData)}>
    <Image image={image} className="movie-image" alt={title} />
    <p>{title}</p>
  </div>
);
Card.defaultProps = {
  image: null,
  title: '',
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
};

export default memo(Card);
