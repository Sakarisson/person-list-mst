import { types } from 'mobx-state-tree';

import Person from './person';

const PersonList = types
  .model({
    persons: types.array(Person),
  })
  .actions(self => ({
    addPerson(person) {
      self.persons.push(person);
    },
  }));

export default PersonList;
