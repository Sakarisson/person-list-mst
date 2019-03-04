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
  }));

export default PersonList;
