import React from 'react';
import PropTypes from 'prop-types';

const PersonListElement = ({ person: { fullName } }) => <div>{fullName}</div>;

PersonListElement.propTypes = {
  person: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
};

export default PersonListElement;
