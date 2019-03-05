import { types } from 'mobx-state-tree';
import { last as _last } from 'lodash';

const Person = types
  .model({
    id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    friends: types.array(types.reference(types.late(() => Person))),
  })
  .views(self => ({
    get fullName() {
      return `${self.firstName} ${self.lastName}`;
    },
  }))
  .actions(self => ({
    addFriend(id) {
      if (self.friends.find(f => f.id === id) !== undefined) {
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
