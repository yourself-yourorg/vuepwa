import createCrudModule, { client } from 'vuex-crud';

import Header from '@/components/Header';
import cfg from '@/config';

import List from './List';
import Retrieve from './Retrieve';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export const routes = [
  {
    path: '/products',
    name: 'products',
    components: { default: List, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/product/:product_id',
    name: 'product',
    components: { default: Detail, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/product/add',
    name: 'add-product',
    components: { default: Single, hdr: Header },
    meta: { permission: 'visitor' },
  },
  {
    path: '/product/:product_id/upd',
    name: 'upd-product',
    components: { default: Single, hdr: Header },
    meta: { permission: 'visitor' },
  },
];

const RESOURCE = 'product';
export const store = createCrudModule({
  resource: RESOURCE, // The name of your CRUD resource (mandatory)
  idAttribute: 'codigo', // What should be used as ID
  urlRoot: `${cfg.server}/api/${RESOURCE}`, // The url to fetch the resource
  client,
});
