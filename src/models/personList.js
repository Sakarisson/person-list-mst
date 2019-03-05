import { types } from 'mobx-state-tree';
import faker from 'faker';

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
      });
    },
    removePerson(id) {
      const index = Array.from(self.people.values()).findIndex(p => p.id === id);
      self.people[index].clearFriends();
      self.people.splice(index, 1);
    },
  }));

export default PersonList;
