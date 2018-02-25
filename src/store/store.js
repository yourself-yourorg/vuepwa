import Vuex from 'vuex';
import Vue from 'vue';

import Auth from './Auth';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

Vue.use(Vuex);

export const store = new Vuex.Store({ // eslint-disable-line new-cap
  state: {
    counter: 0,
  },
  getters: {
    theCounter: state => ({ cntr: state.counter, other: 'okok' }),
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
  },
  actions: {
    increment: ({ commit }) => { commit('increment'); },
    decrement: ({ commit }) => { commit('decrement'); },
  },
  modules: {
    Auth,
  },
});

export const dummy = 'shut up eslint';
