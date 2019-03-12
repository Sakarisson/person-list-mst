import PersonList from './personList';

describe('personList model', () => {
  it('initializes properly', () => {
    expect(PersonList.create()).toMatchSnapshot();
  });

  it('initializes with existing people', () => {
    expect(
      PersonList.create({
        people: [
          {
            id: '1',
            firstName: 'Person',
            lastName: 'Persson',
            address: { streetAddress: 'Address', zipCode: '123', city: 'City' },
          },
          {
            id: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            address: { streetAddress: 'Weirdplace', zipCode: '321', city: 'Town' },
          },
        ],
      }),
    ).toMatchSnapshot();
  });

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
      people: [
        {
          id: '1',
          firstName: 'Person',
          lastName: 'Persson',
          address: { streetAddress: 'Address', zipCode: '123', city: 'City' },
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          address: { streetAddress: 'Weirdplace', zipCode: '321', city: 'Town' },
        },
      ],
    });
    personList.removePerson('1');
    expect(personList).toMatchSnapshot();
  });
});
