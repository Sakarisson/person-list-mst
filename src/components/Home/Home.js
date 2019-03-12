import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { sortByOptions, sortOrderOptions } from '../../models/personList';
import generateFriendships from '../../util/generateFriendships';
import withStore from '../../hoc/withStore';
import PersonList from '../PersonList';
import AddPeople from './AddPeople';
import SortSelect from '../SortSelect';

const SortByContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SortByText = styled.div`
  line-height: 20px;
  font-size: 14px;
`;

const Home = ({ store }) => (
  <div>
    <AddPeople people={store.people} />
    <SortByContainer>
      <SortByText>Sort people by:</SortByText>
      <SortSelect
        values={sortByOptions.map(option => ({ key: option, name: option }))}
        selected={store.sortBy}
        onChange={e => store.setSortBy(e.target.value)}
      />
    </SortByContainer>
    <SortByContainer>
      <SortByText>Sort people by:</SortByText>
      <SortSelect
        values={sortOrderOptions.map(option => ({ key: option, name: option }))}
        selected={store.sortOrder}
        onChange={e => store.setSortOrder(e.target.value)}
      />
    </SortByContainer>
    {store.people.length > 1 && (
      <button type="button" onClick={() => generateFriendships(store, 5)}>
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
