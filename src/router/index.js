import Vue from 'vue';
import Router from 'vue-router';

import { routes as person } from '@/components/Admin/Person';
import Header from '@/components/Header';

import HomeView from '@/components/HomeView';
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
    meta: { permission: 'visitor' },
  },
  {
    path: '/',
    name: 'root',
    components: { default: HomeView, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/ohv',
    name: 'ohv',
    components: { default: OldHomeView, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/post',
    name: 'post',
    components: { default: PostView, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/detail/:id',
    name: 'detail',
    components: { default: DetailView, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/dc',
    name: 'DA',
    components: { default: DumbA, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/db',
    name: 'DB',
    components: { default: DumbB, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/form',
    name: 'form',
    components: { default: Form, hdr: Header },
    meta: { permission: 'visitor' },
  },
];

const routes = baseRoutes.concat(blog).concat(person).concat(poison);

const router = new Router({
  routes,
});

router.beforeEach((_to, _from, next) => {
  LG(`Routing from '${_from.name}' to '${_to.name}'. Params '${_from.params}').`);
  LG(_to);
  LG(_from);

  if (window.lgr) {
    window.lgr.info(`Routing from '${_from.name}' to '${_to.name}'.`);
    if (_to.query.tkn) {
      window.lgr.info(`Query has '${_to.query.tkn}'.`);
      store.dispatch('keepTkn', _to.query.tkn).then(() => next());
    }
  }

  next();
});

// router.afterEach((_to, _from) => {
//   LG(`Have rerouted from '${_from.name}' to '${_to.name}'.`);
//   LG(_to);
// });

export default router;
