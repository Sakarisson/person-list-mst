import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import compose from '../util/compose';
import withStore from '../hoc/withStore';
import PersonList from './PersonList';

const Home = ({ store }) => {
  console.log('home rendered');
  return <PersonList persons={store.persons} />;
};

Home.propTypes = {
  store: PropTypes.shape({
    persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default compose(
  withStore,
  observer,
)(Home);
