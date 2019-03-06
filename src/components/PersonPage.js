import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const FriendsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const KeyDescription = styled.div`
  font-weight: bold;
  padding-bottom: 1em;
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
