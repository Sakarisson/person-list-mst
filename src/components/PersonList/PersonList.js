import React from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react-lite';
import styled from 'styled-components';

import withStore from '../../hoc/withStore';
import PersonListElement from './PersonListElement';

const PeopleContainer = styled.div`
  display: grid;
  grid-template-columns: auto 100px;
  width: 50%;
`;

const PersonList = ({ store }) =>
  useObserver(() => (
    <PeopleContainer>
      {store.sortedPeople.map(person => (
        <PersonListElement
          person={person}
          remove={() => store.removePerson(person.id)}
          key={person.id}
        />
      ))}
    </PeopleContainer>
  ));

PersonList.propTypes = {
  store: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default withStore(PersonList);
