import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import generateRandomPerson from '../../util/generateRandomPerson';
import withStore from '../../hoc/withStore';

const addPeople = (store, count) => {
  for (let i = 0; i < count; i += 1) {
    store.addPerson(generateRandomPerson());
  }
};

const Container = styled.div`
  margin-bottom: 2em;
`;

const AddPeople = ({ store }) => {
  const [peopleCount, setPeopleCount] = useState(0);

  return (
    <Container>
      <button type="button" onClick={() => addPeople(store, peopleCount)}>
        Add multiple people
      </button>
      <input type="number" value={peopleCount} onChange={e => setPeopleCount(e.target.value)} />
    </Container>
  );
};

AddPeople.propTypes = {
  store: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default withStore(AddPeople);
