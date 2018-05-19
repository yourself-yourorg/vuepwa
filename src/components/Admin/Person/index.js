import createCrudModule, { client } from 'vuex-crud';
import { store as vuex } from '@/store';

import { variablizeTitles } from '@/utils/strings';

// import Header from '@/components/Header';
import cfg from '@/config';

import List from './List';
import Retrieve from './Retrieve';
import columns from './column_specs';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export const routes = [
  {
    path: 'persons',
    name: 'persons',
    component: List,
  },
  // {
  //   path: '/persons',
  //   name: 'persons',
  //   components: { default: List, hdr: Header },
  // },
  {
    path: 'person/:id',
    name: 'person',
    component: Retrieve,
  },
  // {
  //   path: 'person/:id',
  //   name: 'person',
  //   components: { default: Retrieve, hdr: Header },
  // },
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

const IDATTRIBUTE = 'codigo';
const RESOURCE = 'person';
export const store = createCrudModule({
  resource: RESOURCE, // The name of your CRUD resource (mandatory)
  idAttribute: IDATTRIBUTE, // What should be used as ID
  // urlRoot: `${cfg.server}/api/${RESOURCE}`, // The url to fetch the resource
  urlRoot: `${cfg.server}`, // The url to fetch the resource person?s=1&c=3
  client,
  state: {
    columns,
    currentTab: 0,
    enums: {},
  },
  actions: {
    /* eslint-disable no-unused-vars */
    setColumns: ({ commit }, cols) => {
      window.lgr.info('Person.index --> actions.setColumns');
      LG(cols);
      commit('tableColumns', cols);
    },
    setCurrentTab: ({ commit }, numTab) => {
      window.lgr.info(`Person.index --> actions.setCurrentTab -- ${numTab}`);
      commit('tab', numTab);
    },
    setEnums: ({ commit }, enums) => {
      window.lgr.info('Person.index --> actions.setEnums');
      commit('enums', enums);
    },
    saveForm: ({ commit }, _form) => {
      window.lgr.info('Person.index --> actions.saveForm');
      const form = _form;

      form.retencion = form.retencion ? 'si' : 'no';
      form.distribuidor = form.distribuidor ? 'si' : 'no';

      LG(form.retencion);
      LG(form);
      // commit('tableColumns', cols);
    },
    /* eslint-enable no-unused-vars */
  },
  getters: {
    getCurrentTab: vx => vx.currentTab,
    getColumns: vx => vx.columns,
    getPersons: vx => vx.list,
    getEnums: vx => vx.enums,
    getPerson: vx => id => vx.entities[id],
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    tab: (vx, numTab) => {
      window.lgr.debug(`Person.index --> mutations.tab -- ${numTab}`);
      vx.currentTab = numTab;
    },
    enums: (vx, enums) => {
      vx.enums = enums;
    },
    tableColumns: (vx, cols) => {
      window.lgr.debug('Person.index --> mutation.tableColumns');
      vx.columns = cols;
    },
    /* eslint-enable no-param-reassign */
  },
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

  onCreateSuccess() {
    vuex.dispatch('person/fetchList', { customUrlFnArgs: { s: 1, c: 100 } });
    vuex.dispatch('person/setCurrentTab', 0);
    window.lgr.info('Person.index --> mutation.onCreateSuccess OK!');
  },

  parseSingle(response) {
    // LG('parseSingle');
    // LG(response);

    const objID = {};
    objID[IDATTRIBUTE] = response.data.newID;
    return Object.assign({}, response, {
      data: objID, // expecting object with ID
    });
  },

  parseList(response) {
    const {
      data,
      titles,
      meta,
      enums,
    } = response.data[RESOURCE];

    const vars = variablizeTitles(titles);

    const result = data.map((itm) => {
      // LG(`${itm[0]} -- ${idx} `);
      const mapping = {};
      itm.forEach((vl, ix) => {
        // LG(`  ${vars[ix]} -->> ${vl} `);
        if (vars[ix] === 'retencion' || vars[ix] === 'distribuidor') {
          mapping[vars[ix]] = vl === 'si';
        } else {
          mapping[vars[ix]] = vl;
        }
        return vl;
      });
      return mapping;
    });
    // LG(' * * Parsed persons data * * ');
    // LG('store');
    // LG(store);
    // LG('result');
    // LG(result);
    // LG('meta');
    // LG(meta);
    // LG('enums');
    // LG(enums);
    vuex.dispatch('person/setEnums', enums);
    // LG(' - - - - - - - - - - ');
    return Object.assign({}, response, {
      data: result, // expecting array of objects with IDs
      columns: meta,
      enums,
    });
  },
});
