import Vue from 'vue';
import Router from 'vue-router';

import Splash from '@/components/Splash';
import HomeView from '@/components/HomeView';
import DetailView from '@/components/DetailView';
import PostView from '@/components/PostView';
import DumbA from '@/components/DumbA';
import DumbB from '@/components/DumbB';
import Header from '@/components/Header';

import { Blog, Article } from '@/components/Blog';

Vue.use(Router);

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const router = new Router({

  routes: [
    {
      path: '',
      name: 'splash',
      component: Splash,
    },
    {
      path: '/',
      name: 'root',
      component: Splash,
    },
    {
      path: '/home',
      name: 'home',
      components: { default: HomeView, hdr: Header },
    },
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
  ],
});

export default router;
