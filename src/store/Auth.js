import jwt from 'jsonwebtoken';

import verifyToken from '@/utils/verifyToken';
import vue from '@/main';

import cfg from '../config';

const ACTIVE = 1;
const INACTIVE = 0;
const KNOWN = 1;
const UNKNOWN = 0;
const NULL_TOKEN = 'no token';

const LG = console.log; // eslint-disable-line no-unused-vars, no-console

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
  saveToken: (vx, pyld) => {
    const { token, payload } = pyld;
    if (payload) {
      window.lgr.info(`Auth(mutation) => Saving jwt. Permissions :: [${payload.permissions}]`);
      LG(payload.permissions);
      LG(vx);

      window.ls.set(cfg.tokenName, token);
      vx.accessToken = token;
      vx.nameUser = payload.name;
      vx.permissions = payload.permissions;
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
};

const actions = {
  keepTkn: (ctx, token) => {
    const payload = jwt.decode(token);
    if (payload) {
      LG(`
        keepTkn:`);
      const txtPrms = payload.permissions.replace(/'/g, '"');
      const prms = JSON.parse(txtPrms);

      Object.keys(prms).forEach((permission) => {
        ctx.dispatch('a12n/changePermissions', {
          resource: permission,
          setting: prms[permission],
        });
      });
      ctx.commit('saveToken', { token, payload });
    }
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
    if (vue.$route.name.includes('home')) return;
    window.lgr.info(`Auth(action) :: Set return route in local storage - ${cfg.returnRouteName}: "${vue.$route.name}"`);
    window.ls.set(cfg.returnRouteName, vue.$route.name);
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
