import React from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react-lite';

import withStore from '../../hoc/withStore';
import PersonListElement from './PersonListElement';

const PersonList = ({ store }) =>
  useObserver(() => (
    <div>
      {store.people.map(person => (
        <PersonListElement
          person={person}
          remove={() => store.removePerson(person.id)}
          key={person.id}
        />
      ))}
    </div>
  ));

PersonList.propTypes = {
  store: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default withStore(PersonList);
