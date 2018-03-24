import Vuex from 'vuex';
import Vue from 'vue';

import { formulateState, formulateGetters, formulateMutations } from 'vue-formulate';

import articles from './articles';

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
  },
});

export const dummy = 'shut up eslint';
