import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import compose from '../../util/compose';
import withStore from '../../hoc/withStore';
import PersonList from '../PersonList';
import AddPeople from './AddPeople';

const Home = ({ store }) => (
  <div>
    <AddPeople people={store.persons} />
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
