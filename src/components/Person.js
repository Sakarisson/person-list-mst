import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ person: { fullName } }) => <div>{fullName}</div>;

Person.propTypes = {
  person: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Person;
