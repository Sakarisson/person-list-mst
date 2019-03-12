import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import SortSelect from './SortSelect';
import { sortOrderOptions, sortByOptions } from '../models/person';

const FriendsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const KeyDescription = styled.div`
  font-weight: bold;
  padding-bottom: 1em;
`;

const SortFriendsByContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SortFriendsByText = styled.div`
  line-height: 20px;
  font-size: 14px;
`;

const PersonPage = ({ person }) => (
  <div>
    <p>{`${person.fullName}'s page`}</p>
    <p>
      {person.firstName} lives at {person.address.streetAddress}, {person.address.zipCode},{' '}
      {person.address.city}
    </p>
    <div>
      {!!person.friends.length && (
        <Fragment>
          <SortFriendsByContainer>
            <SortFriendsByText>Sort friends by:</SortFriendsByText>
            <SortSelect
              values={sortByOptions.map(option => ({ key: option, name: option }))}
              selected={person.friendsSortBy}
              onChange={e => person.setSortBy(e.target.value)}
            />
          </SortFriendsByContainer>
          <SortFriendsByContainer>
            <SortFriendsByText>Sort friends order:</SortFriendsByText>
            <SortSelect
              values={sortOrderOptions.map(option => ({ key: option, name: option }))}
              selected={person.friendsSortOrder}
              onChange={e => person.setSortOrder(e.target.value)}
            />
          </SortFriendsByContainer>
          <FriendsContainer>
            <KeyDescription>Full name</KeyDescription>
            <KeyDescription>City</KeyDescription>
            {person.sortedFriends.map(friend => (
              <Fragment key={friend.id}>
                <Link to={`/people/${friend.id}`}>{friend.fullName}</Link>
                <div>{friend.address.city}</div>
              </Fragment>
            ))}
          </FriendsContainer>
        </Fragment>
      )}
    </div>
  </div>
);

PersonPage.propTypes = {
  person: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default observer(PersonPage);
