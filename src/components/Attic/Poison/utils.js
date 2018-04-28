// const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export const persons = [
  {
    id: 1, name: 'Zaphod', description: 'Of two minds', email: 'zaphod@a.ca',
  },
  {
    id: 2, name: 'Trillian', description: 'Dreamboat.', email: 'trillian@a.es',
  },
  {
    id: 3, name: 'Arthur', description: 'Mr. Mediocrity.', email: 'adent@a.uk',
  },
];

export const findPersonKey = (personId) => {
  for (let key = 0; key < persons.length; key += 1) {
    if (persons[key].id === Number.parseInt(personId, 10)) {
      return key;
    }
  }
  return null;
};

export const findPerson = personId => persons[findPersonKey(personId)];
