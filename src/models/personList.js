import { types } from 'mobx-state-tree';

import Person from './person';

const PersonList = types.model({
  persons: types.array(Person),
});

export default PersonList;
