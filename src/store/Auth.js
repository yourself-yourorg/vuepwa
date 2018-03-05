import jwt from 'jsonwebtoken';

import cfg from '../config';

const ACTIVE = 1;
const INACTIVE = 0;
const KNOWN = 1;
const UNKNOWN = 0;
const NULL_TOKEN = 'no token';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const state = {
  accessToken: NULL_TOKEN,
  active: INACTIVE,
  authenticated: UNKNOWN,
  nameUser: '',
};

const getters = {
  axsToken: vx => vx.accessToken,
  isActive: vx => vx.active,
  isAuthenticated: vx => vx.authenticated,
  nameUser: vx => vx.nameUser,
};

const mutations = {
  /* eslint-disable no-param-reassign, no-unused-vars */
  saveToken: (vx, payload) => {
    // window.lgr.info('Auth(mutation) :: Saving token');
    window.ls.set(cfg.tokenName, payload);
    vx.accessToken = payload;
    vx.nameUser = jwt.decode(payload).name;
    window.ls.set(cfg.authName, KNOWN);
    vx.authenticated = KNOWN;
    window.ls.set(cfg.activityName, KNOWN);
    vx.active = ACTIVE;
  },
  // toSignedIn: (vx) => {
  //   window.lgr.warn('Auth(mutation) :: Trying to sign in here');
  // },
  toSignedOut: (vx) => {
    window.lgr.warn('Auth(mutation) :: Requesting to sign out here');
    window.ls.set(cfg.tokenName, null);
    vx.accessToken = '';
  },
  activity: (vx, payload) => {
    window.lgr.warn('Auth(mutation) :: Changing activity state');
    vx.active = payload;
    window.ls.set(cfg.activityName, payload);
  },
  auth: (vx, payload) => {
    window.lgr.warn('Auth(mutation) :: Changing authentication state');
    vx.authenticated = payload;
    window.ls.set(cfg.authName, payload);
  },
  // incrementViewsCntr: (vx) => {
  //   if (window.lgr) window.lgr.warn('Auth(mutation) :: View change occurred');
  //   vx.counter = window.ls.get(cfg.reroutesCounterName, 0);
  //   window.ls.set(cfg.reroutesCounterName, vx.counter += 1);
  // },
};

const actions = {
  keepTkn: ({ commit }, payload) => {
    commit('saveToken', payload);
    // setTimeout(() => {
    //   commit('incrementViewsCntr'); // trick current age into rechecking auth status
    // }, 500);
  },
  // viewChange: ({ commit, dispatch }) => {
  //   commit('incrementViewsCntr');
  // },
  logIn: ({ commit, dispatch }) => {
    dispatch('setActivity', ACTIVE);
    dispatch('authenticate');
  },
  authenticate: ({ commit, dispatch }) => {
    const mode = process.env.STATIC_MODE;
    let url = '';
    window.lgr.info(`Auth(action) :: Authenticating... ${mode}`);
    url = `${cfg.server}${cfg.authPath}?mode=${mode}`;
    const testAuthUrlEnvVar = process.env[cfg.testAuthUrlEnvVar];
    window.lgr.info(`Auth(action) :: Faked authentication URL :: ${testAuthUrlEnvVar}`);
    if (testAuthUrlEnvVar) url = testAuthUrlEnvVar;
    window.location.assign(url);
  },
  logOut: ({ commit, dispatch }) => {
    dispatch('setActivity', INACTIVE);
    dispatch('setAuth', UNKNOWN);
    commit('toSignedOut');
  },
  setActivity: ({ commit }, payload) => {
    commit('activity', payload);
  },
  setAuth: ({ commit }, payload) => {
    commit('auth', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
