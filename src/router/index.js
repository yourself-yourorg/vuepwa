import Vue from 'vue';
import Router from 'vue-router';
// import _ from 'lodash';

import HomeView from '@/components/HomeView';
import DetailView from '@/components/DetailView';
import PostView from '@/components/PostView';
import DumbA from '@/components/DumbA';
import DumbB from '@/components/DumbB';
import Header from '@/components/Header';
import Auth from '@/components/Auth';

Vue.use(Router);

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const router = new Router({

  routes: [
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
  LG(`router.beforeEach => from: ${_from.name} to: ${_to.name} `);
  // LG(_to);
  // LG(_to.params);
  // LG(_to.params.authParam);
  // LG('...................');

  if (_to.params.authParam > 0) {
    LG('Transitioning >>>');
    next();
  } else {
    let counter;
    if (window.ls) {
      counter = window.ls.get('counter', 0);
      window.ls.set('counter', counter += 1);
    }

    // LG(`router.beforeEach => (${counter})`);
    LG('....... re-route to check authorization .......');

    router.replace({
      name: 'chkAuth',
      params: {
        name: _to.name,
        path: _to.path,
        authParam: 1,
        forward: _to.params,
      },
      query: _to.query,
    });
  }
});

export default router;
