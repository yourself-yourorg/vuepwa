import PouchDB from 'pouchdb-browser';
import relater from '@movilizame/relational-pouch';
import finder from 'pouchdb-find';
import liveFinder from 'pouchdb-live-find';
import authenticator from 'pouchdb-authentication';

const LG = console.log; // eslint-disable-line no-console, no-unused-vars

const plugIn = (plugin) => {
  PouchDB.plugin(plugin);
};

const install = (VueJs, options = {}) => {
  const Vue = VueJs;
  if (!options.localDatabaseName) throw new Error('VuePouchDB Error → local database name is required!');
  if (!options.remoteDatabaseURI) throw new Error('VuePouchDB Error → remote database URI is required!');

  PouchDB.plugin(relater);
  PouchDB.plugin(finder);
  PouchDB.plugin(liveFinder);
  PouchDB.plugin(authenticator);
  const localDatabase = new PouchDB(options.localDatabaseName);

  localDatabase.createIndex({
    index: {
      fields: ['codigo', 'type'],
      name: 'idxBottleCode',
    },
  }).then((result) => {
    LG(`New index ${result}`);
    LG(result);
  }).catch((err) => {
    LG(`Index creation failure: ${err}`);
    LG(err);
  });

  localDatabase.setSchema([
    {
      singular: 'aBottle',
      plural: 'allBottles',
      relations: {
        author: { belongsTo: 'aPerson' },
      },
    },
    {
      singular: 'aPerson',
      plural: 'allPersons',
      relations: {
        posts: { hasMany: 'aBottle' },
      },
    },
  ]);

  LG('---------- localDatabase --------');
  LG(localDatabase);
  LG(localDatabase.rel);

  const max = 15000;
  const min = 12345;
  const rnd = (Math.random() * (max - min)) + min;
  localDatabase.rel.save('aPerson', {
    _id: `aPerson_${rnd}`,
    codigo: '123',
    ruc_cedula: '1713931416001',
    nombre: 'Hasan M. J. Bramwell',
    direccion: 'Tumbaco, Sector la Cerámica',
    telefono: '237-2748',
    distribuidor: 'no',
    retencion: 'no',
  });

  localDatabase.rel.save('aBottle', {
    _id: `aBottle_${(Math.random() * (max - min)) + min}`,
    codigo: 'IBAA001',
    type: 'bottle',
    fechaCompra: '2014-09-01',
    ubicacion: 'cliente',
    ent: 4,
    rec: 3,
    ultimo: `aPerson_${rnd}`,
  });


  const rdbBottles = new PouchDB(options.remoteDatabaseURI);
  localDatabase.sync(rdbBottles, { live: true })
    .on('change', (repl) => {
      LG(`Database replication: ${repl.direction} ${repl.change.docs.length} records.`);
      LG(repl);
    })
    .on('error', err => LG(`Database error ${err}`));


  Vue.pouch = localDatabase;
  Vue.prototype.$pouch = localDatabase;
};

export default {
  install,
  plugIn,
  PouchDB,
};
