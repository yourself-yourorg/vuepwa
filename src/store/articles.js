import createCrudModule from 'vuex-crud';

import cfg from '../config';

const RESOURCE = 'articles';
export default createCrudModule({
  resource: RESOURCE, // The name of your CRUD resource (mandatory)
  idAttribute: 'id', // What should be used as ID
  urlRoot: `${cfg.server}/api/${RESOURCE}`, // The url to fetch the resource
});
