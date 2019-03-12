/* eslint-disable no-param-reassign */

import { types } from 'mobx-state-tree';
import { last as _last } from 'lodash';

import Address from './address';

const sortByLenses = {
  name: obj => obj.fullName,
  city: obj => obj.address.city,
};

const comparisonOperators = {
  ascending: lens => (a, b) => lens(a) > lens(b),
  descending: lens => (a, b) => lens(a) < lens(b),
};

const getComparisonFunction = (sortBy, sortOrder) =>
  comparisonOperators[sortOrder](sortByLenses[sortBy]);

export const sortByOptions = ['none', 'name', 'city'];
const defaultSortBy = 'none';

export const sortOrderOptions = ['ascending', 'descending'];
const defaultSortOrder = 'ascending';

const Person = types
  .model({
    id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    address: Address,
    friendsSortBy: types.optional(types.enumeration('FriendsSortBy', sortByOptions), defaultSortBy),
    friendsSortOrder: types.optional(
      types.enumeration('FriendsSortOrder', sortOrderOptions),
      defaultSortOrder,
    ),
    friends: types.array(types.reference(types.late(() => Person))),
  })
  .views(self => ({
    get fullName() {
      return `${self.firstName} ${self.lastName}`;
    },
    get friendCount() {
      return self.friends.length;
    },
    get sortedFriends() {
      const { friendsSortBy: sortBy, friendsSortOrder: sortOrder } = self;
      if (sortBy === 'none') {
        return self.friends;
      }
      return self.friends.concat().sort(getComparisonFunction(sortBy, sortOrder));
    },
    isFriendsWith(friend) {
      return self.friends.find(p => p.id === friend.id) !== undefined;
    },
  }))
  .actions(self => ({
    addFriend(id) {
      // eslint-disable-next-line eqeqeq
      if (self.friends.find(f => f.id == id) != undefined) {
        return;
      }
      self.friends.push(id);
      const friend = _last(self.friends);
      friend.addFriend(self.id);
    },
    addManyFriends(ids) {
      ids.forEach(id => self.addFriend(id));
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
    setSortBy(sortBy) {
      self.friendsSortBy = sortBy;
    },
    setSortOrder(sortOrder) {
      self.friendsSortOrder = sortOrder;
    },
  }));

export default Person;
