import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ title }) => (<h1 className="title">{title}</h1>);

Title.defaultProps = {
  title: '',
};

Title.propTypes = {
  title: PropTypes.string,
};

export default React.memo(Title);
