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
  }));

export default Person;
