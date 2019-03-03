import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import compose from '../../util/compose';
import withStore from '../../hoc/withStore';
import PersonListElement from './PersonListElement';

const PersonList = ({ store }) => (
  <div>
    {store.persons.map(person => (
      <PersonListElement person={person} key={person.id} />
    ))}
  </div>
);

PersonList.propTypes = {
  store: PropTypes.shape({
    persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default compose(
  withStore,
  observer,
)(PersonList);
