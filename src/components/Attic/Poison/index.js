import createCrudModule, { client } from 'vuex-crud';
// import { store as baseStore } from '@/store/store';
import cfg from '@/config';

import Header from '@/components/Header';

import PersonAdd from './Create';
import PersonDelete from './Delete';
import PersonList from './List';
import Person from './Retrieve';
import PersonEdit from './Update';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

// const storeX = {
//   state: {
//     personX: 0,
//   },

//   getters: {
//     dataPerson: () => ({ email: 'a@b.uk', description: 'qwer', name: 'qwer' }),
//   },

//   mutations: {
//     /* eslint-disable no-param-reassign */
//     fillFormPerson: (state) => {
//       LG('QQQQQ  QQQQQQ');
//       LG(state);
//       state.values.person = {
//         email: 'a@b.es',
//         description: 'qwer',
//         name: 'qwer',
//       };
//     },
//     /* eslint-enable no-param-reassign */
//   },

//   actions: {
//     // fillPerson: ({ commit }) => { commit('fillFormPerson'); },
//     fillPerson: ({ commit }) => { commit('fillFormPerX'); },
//   },

// };

const RESOURCE = 'persons';
export const store = createCrudModule({
  resource: RESOURCE, // The name of your CRUD resource (mandatory)
  idAttribute: 'id', // What should be used as ID
  urlRoot: `${cfg.server}/api/${RESOURCE}`, // The url to fetch the resource
  client,
  // getters: {
  //   dataPerson: () => ({ email: 'a@b.uk', description: 'qwer', name: 'qwer' }),
  // },
  // onFetchListError: () => {
  //   // LG(`*******  ?? 401 ?? ******\n${err}`);
  //   baseStore.dispatch('logIn');
  // },
  // onFetchSingleError: () => {
  //   baseStore.dispatch('logIn');
  // },
  // onCreateError: () => {
  //   baseStore.dispatch('logIn');
  // },
  // onUpdateError: () => {
  //   baseStore.dispatch('logIn');
  // },
  // onReplaceError: () => {
  //   baseStore.dispatch('logIn');
  // },
  // onDestroyError: () => {
  //   baseStore.dispatch('logIn');
  // },
});


export const routes = [
  {
    path: '/poison/add',
    name: 'poison-add',
    components: { default: PersonAdd, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/poison/:person_id/edit',
    name: 'poison-edit',
    components: { default: PersonEdit, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/poison/:person_id/delete',
    name: 'poison-delete',
    components: { default: PersonDelete, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/poison/:person_id',
    name: 'poison',
    components: { default: Person, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/poison/',
    name: 'poisons',
    components: { default: PersonList, hdr: Header },
    meta: { permission: 'visitor' },
  },
];
