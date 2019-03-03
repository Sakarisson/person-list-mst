import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import compose from '../util/compose';
import withStore from '../hoc/withStore';
import Person from './Person';

const Home = ({ store }) => (
  <div>
    {store.persons.map(person => (
      <Person person={person} key={person.id} />
    ))}
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
