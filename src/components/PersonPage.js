import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

const PersonPage = ({ person }) => (
  <div>
    <p>{`${person.fullName}'s page`}</p>
    <p>
      {person.firstName} lives at {person.address.streetAddress}, {person.address.zipCode},{' '}
      {person.address.city}
    </p>
    <div>
      {!!person.friends.length && 'friends:'}
      {person.friends.map(friend => (
        <p key={friend.id}>
          <Link to={`/people/${friend.id}`}>{friend.fullName}</Link>
        </p>
      ))}
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
