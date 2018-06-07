import { routes as example } from '@/components/Tests/Component';
import { routes as person } from '@/components/Admin/Person';
import { routes as product } from '@/components/Sales/Product';
import { routes as invoice } from '@/components/Sales/Invoice';

// import cfg from '@/config'; // eslint-disable-line no-unused-vars

// import { store } from '@/store'; // eslint-disable-line no-unused-vars

import BaseLayer from './BaseLayer';
import NavBar from './NavBar';

import UserEmailsSubscriptions from './UserEmailsSubscriptions';
import UserProfile from './UserProfile';
import UserProfilePreview from './UserProfilePreview';

const LG = console.log; // eslint-disable-line no-unused-vars, no-console

const baseRoutes = [];

const local = [{
  path: 'emails',
  name: 'emails',
  components: {
    nav_bar: NavBar,
    default: UserEmailsSubscriptions,
  },
  props: {
    nav_bar: { setTab: 'Admin' },
  },
}, {
  path: 'profile',
  name: 'profile',
  components: {
    nav_bar: NavBar,
    default: UserProfile,
    helper: UserProfilePreview,
  },
}];

const children = baseRoutes
  .concat(example)
  .concat(person)
  .concat(product)
  .concat(invoice)
  .concat(local);

// LG('............');
// LG(children);
// LG('............');

export const routes = [ // eslint-disable-line import/prefer-default-export
  {
    path: '',
    name: 'home',
    component: BaseLayer,
    children,
  },
];

