import { types } from 'mobx-state-tree';

import Person from './person';

const sortByLenses = {
  none: () => true,
  firstName: obj => obj.firstName,
  lastName: obj => obj.lastName,
};

const comparisonOperators = {
  ascending: lens => (a, b) => lens(a) > lens(b),
  descending: lens => (a, b) => lens(a) < lens(b),
};

const getComparisonFunction = (sortBy, sortOrder) =>
  comparisonOperators[sortOrder](sortByLenses[sortBy]);

export const sortByOptions = ['none', 'firstName', 'lastName'];
export const sortOrderOptions = ['ascending', 'descending'];

const PersonList = types
  .model({
    people: types.array(Person),
    sortBy: types.optional(types.enumeration('SortBy', sortByOptions), 'none'),
    sortOrder: types.optional(types.enumeration('SortOrder', sortOrderOptions), 'ascending'),
  })
  .views(self => ({
    get sortedPeople() {
      return self.people.concat().sort(getComparisonFunction(self.sortBy, self.sortOrder));
    },
  }))
  .actions(self => ({
    addPerson(person) {
      self.people.push(person);
    },
    removePerson(id) {
      const index = Array.from(self.people.values()).findIndex(p => p.id === id);
      self.people[index].clearFriends();
      self.people.splice(index, 1);
    },
    clearAllFriends() {
      self.people.forEach(p => p.clearFriends());
    },
    setSortBy(sortBy) {
      self.sortBy = sortBy;
    },
    setSortOrder(sortOrder) {
      self.sortOrder = sortOrder;
    },
  }));

export default PersonList;
