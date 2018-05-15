import jwt from 'jsonwebtoken';

import verifyToken from '@/utils/verifyToken';

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
  permissions: '',
  accessLevel: '',
};

const getters = {
  axsToken: vx => vx.accessToken,
  isActive: vx => vx.active,
  isAuthenticated: vx => vx.authenticated,
  nameUser: vx => vx.nameUser,
  accessLevel: vx => vx.accessLevel,
  permissions: vx => vx.permissions,
};

const mutations = {
  /* eslint-disable no-param-reassign, no-unused-vars */
  saveToken: (vx, payload) => {
    const pyld = jwt.decode(payload);
    if (pyld) {
      window.lgr.info(`Auth(mutation) => Saving jwt. Permissions :: [${pyld.permissions}]`);
      LG(pyld.permissions);

      window.ls.set(cfg.tokenName, payload);
      vx.accessToken = payload;
      vx.nameUser = pyld.name;
      vx.permissions = pyld.permissions;
      vx.accessLevel = vx.nameUser === 'Iridium Blue' ? 'admin' : 'user';
      // vx.access = vx.nameUser === 'Iridium Blue' ? ['staff'] : ['visitor'];
      // window.lgr.info(`Auth(mutation) :: Setting access '${vx.access}'`);
      window.ls.set(cfg.authName, KNOWN);
      vx.authenticated = KNOWN;
      window.ls.set(cfg.activityName, KNOWN);
      vx.active = ACTIVE;
    }
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
  refreshToken: (_ctx, _pyld) => {
    let pyld = _pyld;
    let result = NULL_TOKEN;

    LG('--------------  VALIDATE TOKEN ------------------');
    LG('pyld');
    LG(pyld);
    if (pyld) {
      LG(jwt.decode(pyld));
    } else {
      pyld = NULL_TOKEN;
    }

    let whichToken = 0;
    const USE_PAYLOAD_TOKEN = 1;
    const USE_STORED_TOKEN = 2;
    const USE_LATEST_TOKEN = 3;

    let payloadToken = null;
    let payloadExp = null;
    let storedToken = null;
    let storedExp = null;

    LG('check pyld token');
    try {
      payloadToken = verifyToken(pyld);
      payloadExp = jwt.decode(pyld).exp;
      whichToken += USE_PAYLOAD_TOKEN;
    } catch (e) {
      LG(`Payload token invalid :: ${e}`);
      // LG(e);
    }

    LG('Check stored token');
    try {
      storedToken = window.ls.get(cfg.tokenName, NULL_TOKEN);
      storedExp = jwt.decode(_ctx.getters.axsToken).exp;
      whichToken += USE_STORED_TOKEN;
    } catch (e) {
      LG(`Stored token invalid :: ${e}`);
      // LG(e);
    }

    let usePayloadToken;
    switch (whichToken) {
      case 1:
        LG('Committing token from payload');
        result = payloadToken;
        break;
      case 2:
        LG('Refreshing stored token from payload');
        result = storedToken;
        break;
      case 3:
        usePayloadToken = payloadExp > storedExp;
        LG(`Refreshing ${usePayloadToken ? 'payload token' : 'stored token'} from payload`);
        result = usePayloadToken ? payloadToken : storedToken;
        break;
      default:
    }

    _ctx.commit('saveToken', result);
    // if (tkn === NULL_TOKEN) return;
    // LG(tkn);
    // LG(ctx.getters.axsToken);

    // LG(jwt.decode(ctx.state.accessToken).exp);
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
