import Vue from 'vue';
import Router from 'vue-router';

import Header from '@/components/Header';
import HomeView from '@/components/HomeView';

import { routes as mainLayout } from '@/components/MainLayout';
// import UserSettings from '@/components/MainLayout/UserSettings';
// import UserEmailsSubscriptions from '@/components/MainLayout/UserEmailsSubscriptions';
// import UserProfile from '@/components/MainLayout/UserProfile';
// import UserProfilePreview from '@/components/MainLayout/UserProfilePreview';

import { routes as person } from '@/components/Admin/Person';
import { beforeEach as exampleBeforeEachTasks } from '@/accessControl';

// import { routes as example } from '@/components/Tests/Component';

import OldHomeView from '@/components/Attic/OldHomeView';
import DetailView from '@/components/Attic/DetailView';
import PostView from '@/components/Attic/PostView';
import DumbA from '@/components/Attic/DumbA';
import DumbB from '@/components/Attic/DumbB';
import Form from '@/components/Attic/Form';

// import { Blog, Article } from '@/components/Blog';
import { routes as blog } from '@/components/Attic/Blog';
import { routes as poison } from '@/components/Attic/Poison';


import { store } from '../store';

Vue.use(Router);

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const baseRoutes = [

  {
    path: '',
    name: 'home',
    components: { default: HomeView, hdr: Header },
    // beforeEnter: (to, from, next) => {
    //   LG('*********************  beforeRouteEnter  ***************************');
    //   // LG(store);
    //   LG(store.getters.permissions);
    //   store._vm.access = store.getters.permissions; // eslint-disable-line no-underscore-dangle
    //   LG(store._vm.access); // eslint-disable-line no-underscore-dangle
    //   next();
    // },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/',
    name: 'oldroot',
    components: { default: HomeView, hdr: Header },
    // beforeEnter: (to, from, next) => {
    //   LG('*********************  beforeRouteEnter  ***************************');
    //   // LG(store);
    //   LG(store.getters.permissions);
    //   store._vm.access = store.getters.permissions; // eslint-disable-line no-underscore-dangle
    //   LG(store._vm.access); // eslint-disable-line no-underscore-dangle
    //   next();
    // },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/ohv',
    name: 'ohv',
    components: { default: OldHomeView, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/post',
    name: 'post',
    components: { default: PostView, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/detail/:id',
    name: 'detail',
    components: { default: DetailView, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/dc',
    name: 'DA',
    components: { default: DumbA, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/db',
    name: 'DB',
    components: { default: DumbB, hdr: Header },
    // meta: { permission: 'visitor' },
  },
  {
    path: '/form',
    name: 'form',
    components: { default: Form, hdr: Header },
    // meta: { permission: 'visitor' },
  },
];

const routes = baseRoutes
  .concat(mainLayout)
  .concat(person)
  // .concat(example)
  .concat(blog)
  .concat(poison);

const keepToken = (t, f, n) => {
  if (window.lgr) {
    window.lgr.debug(`Routing from '${f.name}' to '${t.name}'.`);
    if (t.query.tkn) {
      LG(`
???????????????????
 Do we ever get here?
???????????????????`);
      window.lgr.info(`Query has '${t.query.tkn}'.`);
      store.dispatch('keepTkn', t.query.tkn).then(() => n());
    }
  }
};

const beforeEachTasks = [
  keepToken,
  (t, f) => { LG(`TSK 0 ${t}, ${f}`); },
  // (t, f) => { LG(f); },
];

const beforeEach = beforeEachTasks.concat(exampleBeforeEachTasks);

const router = new Router({
  routes,
});

router.beforeResolve((_to, _from, next) => {
  LG(`beforeResolve :: '${_from.name}' to '${_to.name}'.`);
  LG(store._vm.access); // eslint-disable-line no-underscore-dangle
  next();
});

router.beforeEach((_to, _from, _next) => {
  LG(`Routing from '${_from.name}' to '${_to.name}'. Params '${_from.params}').`);
  LG(_to);
  LG(_from);

  beforeEach.forEach((tsk) => {
    tsk(_to, _from, _next);
  });

  _next();
});

export default router;
