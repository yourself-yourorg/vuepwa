import { createSandbox, StrictGoverness } from 'vue-kindergarten';

import { store } from '@/store';
import perimeterDefs from './perimeters';
import { Levels } from './BasePerimeter';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export const currentUser = {
  // Getter of your current user.
  // If you use store, then store will be passed
  child: vx => (vx ? vx.state.a12n.user : null),

  // child: (store) =>
  //   return store.state.user;
  //   // or
  //   // return decode(localStorage.getItem('jwt'));
  //   // or your very own logic..
  // }
};

const prepareSandBoxGuards = (t, f, nxt) => { // eslint-disable-line no-unused-vars
  LG(`accessControl beforeEach ==> Query has '${t.name}'.`);
  if (window.lgr) window.lgr.info(`accessControl beforeEach ==> Query has '${t.name}'.`);
  const perimeter = perimeterDefs[`${t.name}Perimeter`];
  if (perimeter) {
    let sandbox = null;

    sandbox = createSandbox(currentUser.child(store), {
      perimeters: [
        perimeter,
      ],
      // governess: new RouteGoverness({ from, t, nxt }),
      governess: new StrictGoverness(),
    });
    LG('~~~~~~~~~~~~   sandbox   ~~~~~~~~~~~~');
    LG(sandbox.guard('route'));
    return sandbox.guard('route');
  }
  return nxt();
};

export const beforeEach = [
  prepareSandBoxGuards,
];

const collectDomains = () => {
  const ret = {};
  Object.entries(perimeterDefs).map((p) => {
    const name = p[1].resource;
    ret[name] = {
      name,
      level: Levels.alvls[Levels.NO_ACCESS],
    };
    return true;
  });
  return ret;
};

// const domains = collectDomains();

const state = {
  user: {
    info: {
      name: 'Bob',
      role: 'admin',
    },
    permissions: {
      // Person: Levels.NO_ACCESS,
      // Person: Levels.VIEW_ONLY,
      // Person: Levels.COMMENT,
      // Person: Levels.ALTER,
      Person: Levels.OWN,

      // Example: Levels.NO_ACCESS,
      Example: Levels.VIEW_ONLY,
      // Example: Levels.COMMENT,
      // Example: Levels.ALTER,
      // Example: Levels.OWN,
    },
  },
  domains: collectDomains(),
};

const getters = {
  getUserPermissions: vx => vx.user.permissions,
};

const mutations = {
  changeRole(vx, newRole) {
    LG(vx);
    vx.user.info.role = newRole; // eslint-disable-line no-param-reassign
  },
  changePermission(vx, chg) {
    window.lgr.info(`Access Control (mutation) :: changePermissions of "${chg.resource}"`);
    vx.user.permissions[chg.resource] = chg.setting; // eslint-disable-line no-param-reassign
    LG(vx.user.permissions);
  },
};

const actions = {
  changePermissions(vx, _permissions) {
    vx.commit('changePermission', _permissions);
    // LG('vx.actions');
    // LG(vx);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

const Perimeters = perimeterDefs;


const rsrc = new Set();
Object.values(Perimeters).forEach((x) => {
  rsrc.add(x.resource);
});
const Resources = Array.from(rsrc);


export { Levels, Perimeters, Resources };
