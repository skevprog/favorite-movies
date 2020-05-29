import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const MESSAGE_TYPE = {
  INFO: 'info',
  ERROR: 'error',
};

const Alert = ({ message, type }) => <h2 className={`alert ${MESSAGE_TYPE[type]}`}>{message}</h2>;

Alert.defaultProps = {
  message: '',
  type: MESSAGE_TYPE.INFO,
};

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Alert;
