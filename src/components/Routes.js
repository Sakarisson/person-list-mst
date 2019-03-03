import React from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import compose from '../util/compose';
import withStore from '../hoc/withStore';
import Home from './Home';
import Person from './PersonList/PersonListElement';

const Routes = ({ store }) => [
  <Route exact path="/" component={Home} key="home" />,
  ...store.persons.map(person => (
    <Route
      exact
      path={`/people/${person.id}`}
      component={() => <Person person={person} />}
      key={person.id}
    />
  )),
];

export default compose(
  withStore,
  observer,
)(Routes);
