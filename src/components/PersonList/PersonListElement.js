import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useObserver } from 'mobx-react-lite';

const RemovePersonButton = styled.button``;

const PersonListElement = ({ person, remove }) =>
  useObserver(() => (
    <Fragment>
      <Link to={`/people/${person.id}`}>{person.fullName}</Link>
      <RemovePersonButton onClick={remove}>Remove</RemovePersonButton>
    </Fragment>
  ));

PersonListElement.propTypes = {
  person: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

export default PersonListElement;
