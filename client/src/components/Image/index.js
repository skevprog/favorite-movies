import React from 'react';

const fallbackImage = require('../../assets/no-image-available.jpg');

const imageUrl = 'https://image.tmdb.org/t/p/w500';

const Image = ({ image, alt, ...rest }) => {
  const addDefault = (e) => {
    e.target.src = fallbackImage;
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <img onError={addDefault} {...rest} src={`${imageUrl}${image}`} alt={alt} />
  );
};

export default Image;
