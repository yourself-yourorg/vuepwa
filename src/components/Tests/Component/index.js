import { createSandbox, StrictGoverness } from 'vue-kindergarten';

import { store } from '@/store';
import Header from '@/components/Header';
import { currentUser } from '@/accessControl';

import Protected from './Protected';
import Classified from './Classified';

import * as perimeters from './Perimeters';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export const routes = [
  {
    path: '/protected',
    name: 'protected',
    components: { default: Protected, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/classified',
    name: 'classified',
    components: { default: Classified, hdr: Header },
    meta: { permission: 'visitor' },
  },
];

export const beforeEach = [
  (t, f, nxt) => { // eslint-disable-line no-unused-vars
    const perimeter = perimeters[`${t.name}Perimeter`];
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
