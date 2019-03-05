import React from 'react';
import { Route } from 'react-router-dom';

import withStore from '../hoc/withStore';
import Home from './Home';
import PersonPage from './PersonPage';

const Routes = ({ store }) => [
  <Route exact path="/" component={Home} key="home" />,
  ...store.people.map(person => (
    <Route
      exact
      path={`/people/${person.id}`}
      component={() => <PersonPage person={person} />}
      key={person.id}
    />
  )),
];

export default withStore(Routes);
