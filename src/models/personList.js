import { types } from 'mobx-state-tree';

import Person from './person';

const PersonList = types
  .model({
    people: types.array(Person),
  })
  .actions(self => ({
    addPerson(person) {
      self.people.push(person);
    },
  }));

export default PersonList;
