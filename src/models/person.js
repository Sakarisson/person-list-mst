import { types } from 'mobx-state-tree';

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
      const serialized = self.toJSON();
      if (serialized.friends.includes(id) || id === self.id) {
        return;
      }
      self.friends.push(id);
      const index = self.toJSON().friends.findIndex(f => f === id);
      const friend = self.friends[index];
      friend.addFriend(self.id);
    },
    removeFriend(id) {
      const friends = Array.from(self.friends.values());
      const index = friends.findIndex(f => f.id === id);
      if (index >= 0) {
        const toBeRemoved = self.friends[index];
        self.friends.splice(index, 1);
        toBeRemoved.removeFriend(self.id);
      }
    },
    clearFriends() {
      const friendIds = Array.from(self.friends.values()).map(f => f.id);
      friendIds.forEach(id => self.removeFriend(id));
    },
  }));

export default Person;
