import React from 'react';
import { PropTypes } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import faker from 'faker';

import withStore from '../../hoc/withStore';
import idGenerator from '../../util/idGenerator';

const Container = styled.div`
  grid-area: header;
`;

const AddPersonButton = styled.button``;

const addRandomPerson = store =>
  store.addPerson({
    id: idGenerator.id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  });

const Header = ({ store }) => (
  <Container>
    <Link to="/">Home</Link>
    <AddPersonButton onClick={() => addRandomPerson(store)}>Add random person</AddPersonButton>
  </Container>
);

Header.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default withStore(Header);
