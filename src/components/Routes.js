import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { compose } from 'recompose';
import { observer } from 'mobx-react';

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

export default compose(
  withRouter,
  withStore,
  observer,
)(Routes);
