import PersonList from './personList';
import Person from './person';

const mockPerson = {
  id: 'mock',
  firstName: 'John',
  lastName: 'Doe',
  address: {
    streetAddress: 'Street',
    zipCode: '123',
    city: 'City',
  },
};

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
    address: { streetAddress: 'a', zipCode: 'a', city: 'b' },
    friends: ['1', '3'],
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Charlson',
    address: { streetAddress: 'a', zipCode: 'a', city: 'c' },
    friends: ['2'],
  },
  mockPerson,
];

describe('Person', () => {
  describe('model', () => {
    it('initializes a new person', () => {
      const person = Person.create(mockPerson);
      expect(person).toMatchSnapshot();
    });
  });

  describe('views', () => {
    it('computes full name', () => {
      const person = Person.create(mockPerson);
      expect(person.fullName).toBe(`${mockPerson.firstName} ${mockPerson.lastName}`);
    });

    it('counts number of friends', () => {
      const person = Person.create({ ...mockPerson, friends: ['1', '2', '3'] });
      expect(person.friendCount).toBe(3);
    });

    it('sorts friends', () => {
      const personList = PersonList.create({
        people: mockPeople,
      });
      const person = personList.getPerson('2');
      person.setSortOrder('ascending');
      person.setSortBy('name');
      expect(person.sortedFriends.map(f => f.id)).toEqual(['3', '1']);
      person.setSortBy('city');
      expect(person.sortedFriends.map(f => f.id)).toEqual(['1', '3']);
      person.setSortOrder('descending');
      person.setSortBy('name');
      expect(person.sortedFriends.map(f => f.id)).toEqual(['1', '3']);
      person.setSortBy('city');
      expect(person.sortedFriends.map(f => f.id)).toEqual(['3', '1']);
    });

    it('tells whether or not a person is friends with another person', () => {
      const personList = PersonList.create({
        people: mockPeople,
      });
      const person1 = personList.getPerson('1');
      const person2 = personList.getPerson('2');
      const person3 = personList.getPerson('3');

      expect(person1.isFriendsWith(person2)).toBe(true);
      expect(person1.isFriendsWith(person3)).toBe(false);
    });
  });

  describe('actions', () => {
    it('adds friend', () => {
      const personList = PersonList.create({
        people: mockPeople,
      });
      const person = personList.getPerson('mock');
      person.addFriend('2');
      expect(person.friends.map(f => f.id)).toEqual(['2']);
    });

    it('adds many friends', () => {
      const personList = PersonList.create({
        people: mockPeople,
      });
      const person = personList.getPerson('mock');
      person.addManyFriends(['2', '3']);
      expect(person.friends.map(f => f.id)).toEqual(['2', '3']);
    });

    it('removes friend', () => {
      const personList = PersonList.create({
        people: mockPeople,
      });
      const person = personList.getPerson('2');
      expect(person.friends.map(f => f.id)).toEqual(['1', '3']);
      person.removeFriend('1');
      expect(person.friends.map(f => f.id)).toEqual(['3']);
    });

    it('clears friends', () => {
      const personList = PersonList.create({
        people: mockPeople,
      });
      const person = personList.getPerson('2');
      expect(person.friends.map(f => f.id)).toEqual(['1', '3']);
      person.clearFriends();
      expect(person.friends).toEqual([]);
    });

    it('sets sort by', () => {
      const person = Person.create(mockPerson);
      person.setSortBy('none');
      expect(person.friendsSortBy).toBe('none');
      person.setSortBy('name');
      expect(person.friendsSortBy).toBe('name');
      person.setSortBy('city');
      expect(person.friendsSortBy).toBe('city');
    });

    it('sets sort order', () => {
      const person = Person.create(mockPerson);
      person.setSortOrder('ascending');
      expect(person.friendsSortOrder).toBe('ascending');
      person.setSortOrder('descending');
      expect(person.friendsSortOrder).toBe('descending');
    });
  });
});
