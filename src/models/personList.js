import { types } from 'mobx-state-tree';
import faker from 'faker';
import { min as _min, shuffle as _shuffle } from 'lodash';

import idGenerator from '../util/idGenerator';
import Person from './person';

const PersonList = types
  .model({
    people: types.array(Person),
  })
  .actions(self => ({
    addPerson(person) {
      self.people.push(person);
    },
    addRandomPerson() {
      self.addPerson({
        id: idGenerator.id,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: {
          streetAddress: faker.address.streetAddress(),
          city: faker.address.city(),
          zipCode: faker.address.zipCode(),
        },
      });
    },
    removePerson(id) {
      const index = Array.from(self.people.values()).findIndex(p => p.id === id);
      self.people[index].clearFriends();
      self.people.splice(index, 1);
    },
    clearAllFriends() {
      self.people.forEach(p => p.clearFriends());
    },
    generateFriendships(numberOfFriends = 1) {
      self.clearAllFriends();
      self.people.forEach(p => {
        const potentialNewFriends = self.people.filter(
          other =>
            !other.isFriendsWith(p) && other.friendCount < numberOfFriends && other.id !== p.id,
        );
        const initialFriendCount = p.friends.length;
        const potentialNewFriendsCount = potentialNewFriends.length;
        if (initialFriendCount >= numberOfFriends || potentialNewFriendsCount === 0) {
          return;
        }
        const toBeAdded = _min([numberOfFriends, potentialNewFriendsCount]);
        const newFriends = _shuffle(potentialNewFriends).slice(0, toBeAdded);
        newFriends.forEach(f => p.addFriend(f.id));
      });
    },
  }));

export default PersonList;
