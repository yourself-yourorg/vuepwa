export const persons = [
  {
    id: 1, name: 'Angular', description: 'Superheroic JavaScript MVW Framework.', price: 100,
  },
  {
    id: 2, name: 'Ember', description: 'A framework for creating ambitious web applications.', price: 100,
  },
  {
    id: 3, name: 'React', description: 'A JavaScript Library for building user interfaces.', price: 100,
  },
];

export const findPersonKey = (personId) => {
  for (let key = 0; key < persons.length; key += 1) {
    if (persons[key].id === personId) {
      return key;
    }
  }
  return null;
};

export const findPerson = personId => persons[findPersonKey(personId)];

// export default {
//   persons,
//   findPerson,
//   findPersonKey,
// };
