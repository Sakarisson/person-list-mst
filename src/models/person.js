import { types } from 'mobx-state-tree';
import { last as _last } from 'lodash';

import Address from './address';

const Person = types
  .model({
    id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    address: Address,
    friends: types.array(types.reference(types.late(() => Person))),
  })
  .views(self => ({
    get fullName() {
      return `${self.firstName} ${self.lastName}`;
    },
    get friendCount() {
      return self.friends.length;
    },
  }))
  .actions(self => ({
    isFriendsWith(friend) {
      return self.friends.find(p => p.id === friend.id) !== undefined;
    },
    addFriend(id) {
      // eslint-disable-next-line eqeqeq
      if (self.friends.find(f => f.id == id) != undefined) {
        return;
      }
      self.friends.push(id);
      const friend = _last(self.friends);
      friend.addFriend(self.id);
    },
    removeFriend(id) {
      const index = self.friends.findIndex(f => f.id === id);
      if (index >= 0) {
        const toBeRemoved = self.friends[index];
        self.friends.splice(index, 1);
        toBeRemoved.removeFriend(self.id);
      }
    },
    clearFriends() {
      self.friends.forEach(f => self.removeFriend(f.id));
    },
  }));

export default Person;
