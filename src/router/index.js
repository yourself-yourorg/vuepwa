import Vue from 'vue';
import Router from 'vue-router';

import HomeView from '@/components/HomeView';
import DetailView from '@/components/DetailView';
import PostView from '@/components/PostView';
import DumbA from '@/components/DumbA';
import DumbB from '@/components/DumbB';
import Header from '@/components/Header';
import Form from '@/components/Form';

import { Blog, Article } from '@/components/Blog';
import personRoutes from '@/components/Person';

import { store } from '../store/store';

Vue.use(Router);

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const baseRoutes = [

  {
    path: '/blog',
    name: 'blog',
    components: { default: Blog, hdr: Header },
  },
  {
    path: '/articles/:id',
    name: 'article',
    components: { default: Article, hdr: Header },
  },
  {
    path: '',
    name: 'home',
    components: { default: HomeView, hdr: Header },
  },
  {
    path: '/',
    name: 'root',
    components: { default: HomeView, hdr: Header },
  },
  {
    path: '/detail/:id',
    name: 'detail',
    components: { default: DetailView, hdr: Header },
  },
  {
    path: '/post',
    name: 'post',
    components: { default: PostView, hdr: Header },
  },
  {
    path: '/dc',
    name: 'DA',
    components: { default: DumbA, hdr: Header },
  },
  {
    path: '/db',
    name: 'DB',
    components: { default: DumbB, hdr: Header },
  },
  {
    path: '/form',
    name: 'form',
    components: { default: Form, hdr: Header },
  },
];

const routes = baseRoutes.concat(personRoutes);

const router = new Router({
  routes,
});

router.beforeEach((_to, _from, next) => {
  LG(`Routing from '${_from.name}' to '${_to.name}'. (WITH TOKEN :: Query '${_to.query.tkn}').`);

  if (window.lgr) {
    window.lgr.info(`Routing from '${_from.name}' to '${_to.name}'.`);
    if (_to.query.tkn) {
      window.lgr.info(`Query has '${_to.query.tkn}'.`);
      store.dispatch('keepTkn', _to.query.tkn).then(() => next());
    }
  }

  next();
});

export default router;
