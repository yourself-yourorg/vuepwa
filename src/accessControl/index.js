import { createSandbox, StrictGoverness } from 'vue-kindergarten';

import { store } from '@/store';
import perimeterDefs from './perimeters';
import { Levels } from './BasePerimeter';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export const currentUser = {
  // Getter of your current user.
  // If you use store, then store will be passed
  child: vx => (vx ? vx.state.a12n.user.info : null),

  // child: (store) =>
  //   return store.state.user;
  //   // or
  //   // return decode(localStorage.getItem('jwt'));
  //   // or your very own logic..
  // }
};


export const beforeEach = [
  (t, f, nxt) => { // eslint-disable-line no-unused-vars
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
      return sandbox.guard('route');
    }
    return nxt();
  },
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
      permissions: {
        Person: 'Owner',
        // Example: Levels.alvls[Levels.NO_ACCESS],
        Example: Levels.alvls[Levels.VIEW_ONLY],
        // Example: Levels.alvls[Levels.COMMENT],
        // Example: Levels.alvls[Levels.ALTER],
        // Example: Levels.alvls[Levels.OWN],
      },
    },
  },
  domains: collectDomains(),
};

const getters = {};

const mutations = {
  changeRole(vx, newRole) {
    LG(vx);
    vx.user.info.role = newRole; // eslint-disable-line no-param-reassign
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export const perimeters = perimeterDefs;
export { Levels };
