import createCrudModule, { client } from 'vuex-crud';

import { store as vuex } from '@/store';
import { store as person } from '@/components/Admin/Person';
import { store as product } from '@/components/Sales/Product';

import { variablizeTitles } from '@/utils/strings';

import { Resources } from '@/accessControl';


// import Header from '@/components/Header';
import cfg from '@/config';
import format from '@/utils/format';

import List from './List';
// import Create from './Create';
import Invoice from './Layout';
import Retrieve from './Retrieve';
import columns from './column_specs';

import { INVOICES, INVOICE, INVOICES_LIST } from './accessGroups';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const local = [{
  name: INVOICES_LIST,
  path: 'list',
  components: {
    invoicesList: List,
  },
}];

const children = []
  .concat(local);

export const routes = [
  {
    name: INVOICES,
    path: 'invoices',
    component: Invoice,
    children,
  },
  {
    name: INVOICE,
    path: 'invoice/:id',
    component: Retrieve,
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

const formatters = {
  processPersonFK(fkPerson) {
    const someone = person.state.entities[fkPerson];
    if (someone) return someone.nombre;
    return `Usuario #${fkPerson}`;
  },

  processDetailsJSON(_detail) {
    if (!product.state.entities) return _detail;
    if (Object.keys(product.state.entities).length < 1) return _detail;
    LG(`product.state.entities.length = ${Object.keys(product.state.entities).length}`);
    try {
      return JSON
        .parse(_detail.replace(/'/g, '"')).details
        .filter(d => d[0] > 0)
        .map(d => [product.state.entities[d[0]], d[1], d[2]]);
    } catch (e) {
      return _detail;
    }
  },
};

const IDATTRIBUTE = 'codigo';
const RESOURCE = 'invoice';
export const store = createCrudModule({
  resource: RESOURCE, // The name of your CRUD resource (mandatory)
  idAttribute: IDATTRIBUTE, // What should be used as ID
  // urlRoot: `${cfg.server}/api/${RESOURCE}`, // The url to fetch the resource
  urlRoot: `${cfg.server}`, // The url to fetch the resource invoice?s=1&c=3
  client,
  state: {
    columns,
    currentTab: 0,
    enums: {},
    paginator: { s: 1, c: 4 },
  },
  actions: {
    /* eslint-disable no-unused-vars */
    fetchAll: ({ dispatch }) => {
      LG('<<<<<< fetchAll >>>>>>');
      dispatch('fetchList', { customUrlFnArgs: store.state.paginator })
        .then((resp) => {
          LG(' * * Fetched invoices * *');
          LG(resp.columns);
          dispatch('setColumns', (resp.columns));
        })
        .catch((e) => {
          LG(`*** Error while fetching invoices :: >${e.message}<***`);
          LG(e.message);
          if (e.message.endsWith('401')) {
            dispatch('handle401', null, { root: true });
          } else {
            dispatch('notifyUser', {
              txt: `Error fetching invoices :: ${e.message}`,
              lvl: 'is-danger',
            }, { root: true });
          }
        });
    },

    setColumns: ({ commit }, cols) => {
      window.lgr.info('Invoice.index --> actions.setColumns');
      LG(cols);
      commit('tableColumns', cols);
    },
    setCurrentTab: ({ commit }, numTab) => {
      window.lgr.info(`Invoice.index --> actions.setCurrentTab -- ${numTab}`);
      commit('tab', numTab);
    },
    setEnums: ({ commit }, enums) => {
      window.lgr.info('Invoice.index --> actions.setEnums');
      commit('enums', enums);
    },
    updLocal: ({ commit }, record) => {
      LG('uuuuuuu Update local record uuuuuuuuuu');
      LG(`${record.data.mode} ${record.data.store} ${record.id}`);
      LG(record.data.data);
      commit('invoice', { id: record.id, data: record.data.data });
    },
    newLocal: ({ dispatch }, record) => {
      LG('uuuuuuu Append new local record uuuuuuuuuu');
      LG(`${record.data.mode} ${record.data.store}`);
    },
    saveForm: ({ dispatch }, _form) => {
      window.lgr.info('Invoice.index --> actions.saveForm');
      const model = _form;
      const pkge = {};

      model.retencion = _form.retencion ? 'si' : 'no';
      model.distribuidor = _form.distribuidor ? 'si' : 'no';

      LG('unununu save form ununununun');
      const permissions = {};
      Resources.map((rsrc) => {
        LG(`${rsrc} => ${model[rsrc]}`);
        permissions[rsrc] = model[rsrc];
        delete model[rsrc];
        return permissions[rsrc];
      });
      model.permissions = JSON.stringify(permissions).split('"').join("'");

      LG('model');
      LG(model);
      if (_form.codigo) {
        pkge.id = model.codigo;
        pkge.data = { mode: 'patch', data: model, store: 'invoice' };
        dispatch('update', pkge);
        // dispatch('updLocal', pkge);
        LG('store');
        LG(store);
      } else {
        delete model.codigo;
        pkge.data = { mode: 'post', data: model, store: 'invoice' };
        dispatch('newLocal', pkge);
        dispatch('create', pkge);
      }
    },
    backToListTab: ({ getters, dispatch }) => {
      vuex.dispatch('invoice/fetchList', { customUrlFnArgs: getters.getPaginator });
      vuex.dispatch('invoice/setCurrentTab', 0);
    },
    /* eslint-enable no-unused-vars */
  },

  getters: {
    getCurrentTab: vx => vx.currentTab,
    getColumns: vx => vx.columns,
    getInvoices: vx => vx.list,
    getEnums: vx => vx.enums,
    getPaginator: vx => vx.paginator,
    getInvoice: vx => id => vx.entities[id],
  },

  mutations: {
    /* eslint-disable no-param-reassign */
    tab: (vx, numTab) => {
      window.lgr.debug(`Invoice.index --> mutations.tab -- ${numTab}`);
      vx.currentTab = numTab;
    },
    invoice: (vx, payload) => {
      LG(`${payload.id} = ${payload.data.codigo}/${payload.data.nombre}`);
      vx.entities[payload.id] = payload.data;
    },
    enums: (vx, enums) => {
      vx.enums = enums;
    },
    tableColumns: (vx, cols) => {
      window.lgr.debug('Invoice.index --> mutation.tableColumns');
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
    vuex.dispatch('invoice/backToListTab');
    window.lgr.info('Invoice.index --> mutation.onCreateSuccess OK!');
  },

  onUpdateSuccess() {
    vuex.dispatch('invoice/backToListTab');
    window.lgr.info('Invoice.index --> mutation.onUpdateSuccess OK!');
  },

  parseSingle(response) {
    LG('parseSingle');
    LG(response.data);
    LG(vuex.state.invoice.entities[response.data.itemID]);

    const objID = {};
    objID[IDATTRIBUTE] = response.data.itemID;
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

    const result = data.map((_invoice, idx) => {
      const invoice = _invoice;
      const mapping = {};
      meta.forEach((col, ix) => {
        if (idx === 3) {
          // LG(` ?? ${col.field}`);
          // LG(` ?? ${invoice[ix]}`);
          // LG(` ==== ${format[col.type](invoice[ix])}`);
        }
        invoice[ix] = format[col.type](
          invoice[ix],
          {
            foreignKey1: { fn: formatters.processPersonFK, vl: invoice[ix] },
            JSON1: { fn: formatters.processDetailsJSON, vl: invoice[ix] },
          },
        );
      });

      invoice.forEach((vl, ix) => {
        // LG(`  ${vars[ix]} -->> ${vl} `);
        mapping[vars[ix]] = vl;
      });

      return mapping;
    });
    LG(' * * Parsed invoices data * * ');
    // LG('store');
    // LG(store);
    LG('result');
    LG(result);
    // LG('meta');
    // LG(meta);
    // LG('enums');
    // LG(enums);
    vuex.dispatch('invoice/setEnums', enums.StatusLookup);
    LG(' - - - - - - - - - -  Parsed invoice list  - - - - - - - - - - ');
    return Object.assign({}, response, {
      data: result, // expecting array of objects with IDs
      columns: meta,
      enums: typeof enums,
    });
  },
});
