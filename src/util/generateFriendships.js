import { min as _min, shuffle as _shuffle } from 'lodash';

const getPotentialNewFriends = (people, person, maxFriends) =>
  people.filter(
    other =>
      !other.isFriendsWith(person) && other.friendCount < maxFriends && other.id !== person.id,
  );

const getNewFriends = (potentialNewFriends, toBeAdded) =>
  _shuffle(potentialNewFriends).slice(0, toBeAdded);

const generateFriendships = (store, maxFriends = 1) => {
  store.clearAllFriends();
  store.people.forEach(p => {
    const potentialNewFriends = getPotentialNewFriends(store.people, p, maxFriends);
    const initialFriendCount = p.friends.length;
    const potentialNewFriendsCount = potentialNewFriends.length;
    if (initialFriendCount >= maxFriends || potentialNewFriendsCount === 0) {
      return;
    }
    const toBeAdded = _min([maxFriends, potentialNewFriendsCount]);
    const newFriends = getNewFriends(potentialNewFriends, toBeAdded);
    p.addManyFriends(newFriends.map(f => f.id));
  });
};

export default generateFriendships;
