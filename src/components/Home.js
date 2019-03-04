import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import faker from 'faker';

import idGenerator from '../util/idGenerator';
import compose from '../util/compose';
import withStore from '../hoc/withStore';
import PersonList from './PersonList';

const AddPersonButton = styled.button``;

const addRandomPerson = store =>
  store.addPerson({
    id: idGenerator.id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  });

const Home = ({ store }) => (
  <div>
    <AddPersonButton onClick={() => addRandomPerson(store)}>Add random person</AddPersonButton>
    <PersonList persons={store.persons} />
  </div>
);

Home.propTypes = {
  store: PropTypes.shape({
    persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default compose(
  withStore,
  observer,
)(Home);
