import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react-lite';

import compose from '../../util/compose';
import withStore from '../../hoc/withStore';
import PersonList from '../PersonList';
import AddPeople from './AddPeople';

const Home = ({ store }) =>
  useObserver(() => (
    <div>
      <AddPeople people={store.people} />
      {store.people.length > 1 && (
        <button type="button" onClick={() => store.generateFriendships(5)}>
          Generate friendships
        </button>
      )}
      {!!store.people.length && (
        <Fragment>
          <p>People:</p>
          <PersonList store={store} />
        </Fragment>
      )}
    </div>
  ));

Home.propTypes = {
  store: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default compose(withStore)(Home);
