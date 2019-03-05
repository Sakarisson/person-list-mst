import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const RemovePersonButton = styled.button``;

const PersonListElement = ({ person: { id, fullName }, remove }) => (
  <Container>
    <Link to={`/people/${id}`}>{fullName}</Link>
    <RemovePersonButton onClick={remove}>Remove</RemovePersonButton>
  </Container>
);

PersonListElement.propTypes = {
  person: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

export default PersonListElement;
