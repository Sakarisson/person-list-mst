import React from 'react';
import { observer } from 'mobx-react';

import compose from '../util/compose';
import withStore from '../hoc/withStore';
import PersonList from './PersonList';

const Home = () => <PersonList />;

export default compose(
  withStore,
  observer,
)(Home);
