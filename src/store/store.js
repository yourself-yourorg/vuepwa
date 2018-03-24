import Vuex from 'vuex';
import Vue from 'vue';

import { formulateState, formulateGetters, formulateMutations } from 'vue-formulate';

import { store as person } from '@/components/Person';
import { store as articles } from '@/components/Blog';

// import articles from './articles';

import Auth from './Auth';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

Vue.use(Vuex);

export const store = new Vuex.Store({ // eslint-disable-line new-cap
  state: {
    counter: 0,
    ...formulateState()(),
  },

  getters: {
    theCounter: state => ({ cntr: state.counter, other: 'okok' }),
    theFormData: () => ({ email: 'a@b.ca', password_confirmation: 'qwer', password: 'qwer' }),
    ...formulateGetters(),
  },

  mutations: {
    /* eslint-disable no-param-reassign */
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
    increment: ({ commit }) => { commit('increment'); },
    decrement: ({ commit }) => { commit('decrement'); },
    fillForm: ({ commit }) => { commit('fillForm'); },
  },

  modules: {
    Auth,
    articles,
    person,
  },
});

export const dummy = 'shut up eslint';
