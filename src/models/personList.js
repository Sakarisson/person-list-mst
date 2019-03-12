import { types } from 'mobx-state-tree';

import Person from './person';

export const sortByOptions = ['none', 'firstName', 'lastName'];
export const sortOrderOptions = ['ascending', 'descending'];

const PersonList = types
  .model({
    people: types.array(Person),
  })
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
  }));

export default PersonList;
