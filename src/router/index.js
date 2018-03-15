import Vue from 'vue';
import Router from 'vue-router';

import HomeView from '@/components/HomeView';
import DetailView from '@/components/DetailView';
import PostView from '@/components/PostView';
import DumbA from '@/components/DumbA';
import DumbB from '@/components/DumbB';
import Header from '@/components/Header';
import Auth from '@/components/Auth';

// import Blog from '@/components/Blog';
// import Article from '@/components/Article';

import { Blog, Article } from '@/components/Blog';

import { store } from '../store/store';

Vue.use(Router);

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const router = new Router({

  routes: [
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
      path: '/ac',
      name: 'chkAuth',
      component: Auth,
    },
  ],
});

router.beforeEach((_to, _from, next) => {
  LG(`Routing from '${_from.name}' to '${_to.name}'. (WITH TOKEN :: Query '${_to.query.tkn}').`);

  if (window.lgr) {
    window.lgr.info(`Routing from '${_from.name}' to '${_to.name}'.`);
    if (_to.query.tkn) {
      window.lgr.info(`Query has '${_to.query.tkn}'.`);
      store.dispatch('keepTkn', _to.query.tkn).then(() => next());
    // } else {
    //   store.dispatch('viewChange');
    }
  }

  //   if (_to.params.authParam > 0) {
  //     // LG.('>> Authentication detour completed ...');
  next();
  //   } else {
  //     let counter;
  //     if (window.ls) {
  //       counter = window.ls.get(cfg.reroutesCounterName, 0);
  //       window.ls.set(cfg.reroutesCounterName, counter += 1);
  //     }

  //     // LG('>> Detour to check authentication...');

  //     router.replace({
  //       name: 'chkAuth',
  //       params: {
  //         name: _to.name,
  //         path: _to.path,
  //         authParam: 1,
  //         forward: _to.params,
  //       },
  //       query: _to.query,
  //     });
  //   }
});

export default router;
