import Header from '@/components/Header';

import Protected from './Protected';
import Classified from './Classified';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export const routes = [ // eslint-disable-line import/prefer-default-export
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
