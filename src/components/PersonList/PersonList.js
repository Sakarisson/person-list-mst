import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { compose } from 'recompose';
import styled from 'styled-components';

import withStore from '../../hoc/withStore';
import PersonListElement from './PersonListElement';

const PeopleContainer = styled.div`
  display: grid;
  grid-template-columns: auto 100px;
  width: 50%;
`;

const PersonList = ({ store }) => (
  <PeopleContainer>
    {store.sortedPeople.map(person => (
      <PersonListElement
        person={person}
        remove={() => store.removePerson(person.id)}
        key={person.id}
      />
    ))}
  </PeopleContainer>
);

PersonList.propTypes = {
  store: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default compose(
  withStore,
  observer,
)(PersonList);
