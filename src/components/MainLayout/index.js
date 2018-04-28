import { routes as example } from '@/components/Tests/Component';
import { routes as person } from '@/components/Admin/Person';

import BaseLayer from './BaseLayer';
import NavBar from './NavBar';

import UserEmailsSubscriptions from './UserEmailsSubscriptions';
import UserProfile from './UserProfile';
import UserProfilePreview from './UserProfilePreview';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

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
  .concat(local);

LG('............');
LG(children);
LG('............');
export const routes = [ // eslint-disable-line import/prefer-default-export
  {
    path: '',
    name: 'home',
    // You could also have named views at tho top
    component: BaseLayer,
    children,
  },
  {
    path: '/',
    name: 'root',
    // You could also have named views at tho top
    component: BaseLayer,
    children,
  },
];

