import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import compose from '../../util/compose';
import withStore from '../../hoc/withStore';
import PersonListElement from './PersonListElement';

const PersonList = ({ persons }) => (
  <div>
    {persons.map(person => (
      <PersonListElement person={person} key={person.id} />
    ))}
  </div>
);

PersonList.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default compose(
  withStore,
  observer,
)(PersonList);
