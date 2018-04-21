import { createSandbox, StrictGoverness } from 'vue-kindergarten';

import { store } from '@/store';
import perimeterDefs from './perimeters';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const accessLevels = [];

const NO_ACCESS = 0;
accessLevels[NO_ACCESS] = 'No Access';

const VIEW_ONLY = NO_ACCESS + 1;
accessLevels[VIEW_ONLY] = 'View Only';

const COMMENT = VIEW_ONLY + 1;
accessLevels[COMMENT] = 'Comment';

const ALTER = COMMENT + 1;
accessLevels[ALTER] = 'Alter';

const OWN = ALTER + 1;
accessLevels[OWN] = 'Own';

export const Levels = {
  alvls: accessLevels,
  olvls: Array.from(accessLevels, (x, ix) => ({ id: ix, axs: x })),
  NO_ACCESS,
  VIEW_ONLY,
  COMMENT,
  ALTER,
  OWN,
};

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

const state = {
  user: {
    info: {
      name: 'Bob',
      role: 'admin',
      permissions: 'admin',
    },
  },
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
  state,
  getters,
  mutations,
  actions,
};

export const perimeters = perimeterDefs;
