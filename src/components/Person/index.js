import createCrudModule, { client } from 'vuex-crud';

import { variablizeTitles } from '@/utils/strings';

import Header from '@/components/Header';
import cfg from '@/config';

import List from './List';
import Retrieve from './Retrieve';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export const routes = [
  {
    path: '/persons',
    name: 'persons',
    components: { default: List, hdr: Header },
  },
  {
    path: '/person/:id',
    name: 'person',
    components: { default: Retrieve, hdr: Header },
  },
];

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

const RESOURCE = 'person';
export const store = createCrudModule({
  resource: RESOURCE, // The name of your CRUD resource (mandatory)
  idAttribute: 'codigo', // What should be used as ID
  // urlRoot: `${cfg.server}/api/${RESOURCE}`, // The url to fetch the resource
  urlRoot: `${cfg.server}`, // The url to fetch the resource person?s=1&c=3
  client,
  customUrlFn(_id, _pgntr) {
    LG(cfg.server);
    // LG(this.resource);

    LG(`using paginator --> ${_pgntr}`);
    const id = _id ? `/${_id}` : '';
    const pgntr = _pgntr ? `s=${_pgntr.s}&c=${_pgntr.c}` : 's=0&c=0';
    LG(`using customUrlFn( ${id}, ${pgntr} )`);
    LG(`URI :: ${cfg.server}/api/${RESOURCE}${id}?${pgntr}`);
    const URI = `${cfg.server}/api/${RESOURCE}${id}?${pgntr}`;
    return URI;
  },
  parseSingle(response) {
    const { data, titles } = response.data[RESOURCE];
    const vars = variablizeTitles(titles);
    LG('parseSingle');
    LG(vars);

    // const mapped = [];
    const result = data.map((itm) => {
      // LG(`${itm[0]} -- ${idx} `);
      const mapping = {};
      itm.forEach((vl, ix) => {
        // LG(`  ${vl} -->> ${vars[ix]} `);
        mapping[vars[ix]] = vl;
        return vl;
      });
      // mapped[idx] = mapping;
      // LG(mapped[idx]);
      return mapping;
    });
    LG(result);
    return Object.assign({}, response, {
      data: result, // expecting array of objects with IDs
    });
  },
  parseList(response) {
    const { data, titles } = response.data[RESOURCE];
    const vars = variablizeTitles(titles);
    // LG('parseList');
    // LG(vars);

    // const mapped = [];
    const result = data.map((itm) => {
      // LG(`${itm[0]} -- ${idx} `);
      const mapping = {};
      itm.forEach((vl, ix) => {
        // LG(`  ${vl} -->> ${vars[ix]} `);
        mapping[vars[ix]] = vl;
        return vl;
      });
      // mapped[idx] = mapping;
      // LG(mapped[idx]);
      return mapping;
    });
    LG(result);
    return Object.assign({}, response, {
      data: result, // expecting array of objects with IDs
    });
  },
});

