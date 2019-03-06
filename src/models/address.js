import { types } from 'mobx-state-tree';

const Address = types.model({
  streetAddress: types.string,
  city: types.string,
  zipCode: types.string,
});

export default Address;
