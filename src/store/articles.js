import createCrudModule, { client } from 'vuex-crud';

import { store } from './store';
import cfg from '../config';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

client.interceptors.request.use((_payload) => {
  const payload = _payload;
  const token = window.ls.get(cfg.tokenName);

  if (token != null) {
    payload.headers.Authorization = `JWT ${token}`;
  }

  return payload;
}, (error) => {
  LG('request failed');
  return Promise.reject(error);
});

const RESOURCE = 'articles';
export default createCrudModule({
  resource: RESOURCE, // The name of your CRUD resource (mandatory)
  idAttribute: 'id', // What should be used as ID
  urlRoot: `${cfg.server}/api/${RESOURCE}`, // The url to fetch the resource
  client,
  onFetchListError: () => {
    // LG(`*******  ?? 401 ?? ******\n${err}`);
    store.dispatch('logIn');
  },
  onFetchSingleError: () => {
    store.dispatch('logIn');
  },
  onCreateError: () => {
    store.dispatch('logIn');
  },
  onUpdateError: () => {
    store.dispatch('logIn');
  },
  onReplaceError: () => {
    store.dispatch('logIn');
  },
  onDestroyError: () => {
    store.dispatch('logIn');
  },
});
