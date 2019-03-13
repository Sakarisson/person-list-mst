import PersonList from './personList';

const mockPeople = [
  {
    id: '1',
    firstName: 'Bob',
    lastName: 'Allison',
    address: { streetAddress: 'a', zipCode: 'a', city: 'a' },
    friends: ['2'],
  },
  {
    id: '2',
    firstName: 'Charles',
    lastName: 'Bobson',
    address: { streetAddress: 'a', zipCode: 'a', city: 'a' },
    friends: ['1', '3'],
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Charlson',
    address: { streetAddress: 'a', zipCode: 'a', city: 'a' },
    friends: ['2'],
  },
];

describe('personList', () => {
  describe('model', () => {
    it('initializes properly', () => {
      expect(PersonList.create()).toMatchSnapshot();
    });

    it('initializes with existing people', () => {
      expect(
        PersonList.create({
          people: mockPeople,
        }),
      ).toMatchSnapshot();
    });

    it('initializes with sortBy firstName', () => {
      expect(PersonList.create({ sortBy: 'firstName' })).toMatchObject({ sortBy: 'firstName' });
    });

    it('initializes with sortBy lastName', () => {
      expect(PersonList.create({ sortBy: 'lastName' })).toMatchObject({ sortBy: 'lastName' });
    });

    it('initializes with sortOrder ascending', () => {
      expect(PersonList.create({ sortOrder: 'ascending' })).toMatchObject({
        sortOrder: 'ascending',
      });
    });

    it('initializes with sortOrder descending', () => {
      expect(PersonList.create({ sortOrder: 'descending' })).toMatchObject({
        sortOrder: 'descending',
      });
    });
  });

  describe('actions', () => {
    it('adds person', () => {
      const personList = PersonList.create({
        people: [
          {
            id: '1',
            firstName: 'Person',
            lastName: 'Persson',
            address: { streetAddress: 'Address', zipCode: '123', city: 'City' },
          },
        ],
      });
      personList.addPerson({
        id: '2',
        firstName: 'Jane',
        lastName: 'Doe',
        address: { streetAddress: 'Weirdplace', zipCode: '321', city: 'Town' },
      });
      expect(personList).toMatchSnapshot();
    });

    it('removes person', () => {
      const personList = PersonList.create({
        people: mockPeople,
      });
      personList.removePerson('1');
      expect(personList.people.map(p => p.id)).toEqual(['2', '3']);
    });

    it('clears all friends', () => {
      const personList = PersonList.create({ people: mockPeople });
      personList.clearAllFriends();
      expect(personList.people.map(p => p.friends)).toEqual([[], [], []]);
    });

    it('sets sortBy to none, firstName and lastName', () => {
      const personList = PersonList.create({});
      personList.setSortBy('none');
      expect(personList.sortBy).toBe('none');
      personList.setSortBy('firstName');
      expect(personList.sortBy).toBe('firstName');
      personList.setSortBy('lastName');
      expect(personList.sortBy).toBe('lastName');
    });

    it('sets sortOrder to ascending and descending', () => {
      const personList = PersonList.create({});
      personList.setSortOrder('ascending');
      expect(personList.sortOrder).toBe('ascending');
      personList.setSortOrder('descending');
      expect(personList.sortOrder).toBe('descending');
    });
  });

  describe('views', () => {
    it('sorts by firstName in ascending order', () => {
      const personList = PersonList.create({
        sortBy: 'firstName',
        sortOrder: 'ascending',
        people: mockPeople,
      });
      expect(personList.sortedPeople.map(p => p.id)).toEqual(['3', '1', '2']);
    });

    it('sorts by firstName in descending order', () => {
      const personList = PersonList.create({
        sortBy: 'firstName',
        sortOrder: 'descending',
        people: mockPeople,
      });
      expect(personList.sortedPeople.map(p => p.id)).toEqual(['2', '1', '3']);
    });

    it('sorts by lastName in ascending order', () => {
      const personList = PersonList.create({
        sortBy: 'lastName',
        sortOrder: 'ascending',
        people: mockPeople,
      });
      expect(personList.sortedPeople.map(p => p.id)).toEqual(['1', '2', '3']);
    });

    it('sorts by lastName in descending order', () => {
      const personList = PersonList.create({
        sortBy: 'lastName',
        sortOrder: 'descending',
        people: mockPeople,
      });
      expect(personList.sortedPeople.map(p => p.id)).toEqual(['3', '2', '1']);
    });
  });
});
