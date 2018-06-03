import Vuex from 'vuex';
import Vue from 'vue';

import { formulateState, formulateGetters, formulateMutations } from 'vue-formulate';

import { store as person } from '@/components/Admin/Person';
import { store as product } from '@/components/Sales/Product';
import { store as articles } from '@/components/Attic/Blog';

// import articles from './articles';

import Auth from './Auth';
import a12n from '../accessControl'; // eslint-disable-line no-unused-vars

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

Vue.use(Vuex);

export const store = new Vuex.Store({ // eslint-disable-line new-cap
  state: {
    counter: 0,
    axsRights: ['visitor'],
    ...formulateState()(),
  },

  getters: {
    theRoles: (state) => {
      window.lgr.debug(state.axsRights);
      return state.axsRights;
    },
    theCounter: state => ({ cntr: state.counter, other: 'okok' }),
    theFormData: () => ({ email: 'a@b.ca', password_confirmation: 'qwer', password: 'qwer' }),
    ...formulateGetters(),
  },

  mutations: {
    /* eslint-disable no-param-reassign */
    axsRole: (state, pyld) => {
      window.lgr.debug(pyld.roles);
      // this.access = pyld.roles;
      state.axsRights = pyld.roles;
    },
    increment: (state) => {
      window.lgr.warn('UU');
      state.counter += 1;
    },
    decrement: (state) => {
      LG('DD');
      state.counter -= 1;
    },
    fillFormPerX: (state) => {
      LG('QQQQQ GG QQQQQQ');
      LG(state);
      state.values.person = {
        email: 'a@b.es',
        description: 'qwer',
        name: 'qwer',
      };
    },
    fillForm: (state) => {
      LG('QQQQQQQQQQQ');
      LG(state);
      state.values.registration = {
        email: 'a@b.c',
        password_confirmation: 'qwer',
        password: 'qwer',
      };
    },
    ...formulateMutations(),
  },

  actions: {
    setAxsRole: ({ commit }, pyld) => { commit('axsRole', pyld); },
    increment: (ctx) => {
      LG('QQQQQ  increment QQQQQQ');
      LG(ctx);
      return ctx.commit('increment');
    },
    decrement: ({ commit }) => { commit('decrement'); },
    fillForm: ({ commit }) => { commit('fillForm'); },
  },

  modules: {
    Auth,
    a12n,
    articles,
    person,
    product,
  },
});

export const dummy = 'shut up eslint';
