import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import compose from '../../util/compose';
import withStore from '../../hoc/withStore';
import PersonList from '../PersonList';
import AddPeople from './AddPeople';

const Home = ({ store }) => (
  <div>
    <AddPeople people={store.people} />
    <PersonList people={store.people} />
  </div>
);

Home.propTypes = {
  store: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default compose(
  withStore,
  observer,
)(Home);
