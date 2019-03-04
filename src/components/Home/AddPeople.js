import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import faker from 'faker';

import idGenerator from '../../util/idGenerator';

const addRandomPerson = store =>
  store.addPerson({
    id: idGenerator.id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  });

const AddPersonButton = styled.button`
  margin-bottom: 2em;
`;

const AddMultiplePeople = props => (
  <div>
    <button>Add multiple people</button>
  </div>
);

AddMultiplePeople.propTypes = {};

export default AddMultiplePeople;
