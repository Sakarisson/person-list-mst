import React from 'react';
import PropTypes from 'prop-types';

const PersonPage = ({ person }) => (
  <div>
    <p>{`${person.fullName}'s page`}</p>
    <div>
      friends:
      {person.friends.map(friend => (
        <p key={friend.id}>{friend.fullName}</p>
      ))}
    </div>
  </div>
);

PersonPage.propTypes = {};

export default PersonPage;
