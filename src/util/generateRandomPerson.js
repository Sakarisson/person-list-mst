import faker from 'faker';

import idGenerator from './idGenerator';

const generateRandomPerson = () => ({
  id: idGenerator.id,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: {
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    zipCode: faker.address.zipCode(),
  },
});

export default generateRandomPerson;
