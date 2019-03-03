import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

const PersonListElement = ({ person: { id, fullName } }) => (
  <Container>
    <Link to={`/people/${id}`}>{fullName}</Link>
  </Container>
);

PersonListElement.propTypes = {
  person: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
};

export default PersonListElement;
