import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';

import App from './App';
import idGenerator from './helpers/idGenerator';
import PersonList from './models/personList';

const store = PersonList.create();

for (let id = 0; id < 10; id += 1) {
  store.addPerson({
    id: idGenerator.id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  });
}

window.store = store;

ReactDOM.render(<App store={store} />, document.getElementById('root'));
