<template>
  <section>
    <b-loading :is-full-page="false" :active.sync="isBusy" :canCancel="true"></b-loading>
    <b-table
      :data="isEmpty ? [] : persons"
      :columns="columns"
      :striped="true"
      paginated
      :per-page="5"
      :current-page="1"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="codigo"
      @details-open="(row, index) => $toast.open(`Expanded ${row.nombre}`)"
      focusable>

      <template slot-scope="props" slot="header">
        <b-tooltip position="is-left" :active="!!props.column.meta" :label="props.column.meta" dashed>
          {{ props.column.label }}
        </b-tooltip>
      </template>

      <template slot="detail" slot-scope="{ row }">
        <person-detail :id="row.codigo" />
      </template>

      <template slot="empty">
        <section class="section">
          <div style="font-size:large;" class="content has-text-grey has-text-centered">
            <icon scale="3" name="thumbs-down" />
            <p>No results</p>
          </div>
        </section>
      </template>
    </b-table>

    <div class="block">
        <button class="button is-small is-primary"
            @click="columnSelectorOpen = !columnSelectorOpen">
            Column Selection
        </button>
    </div>

    <b-collapse class="panel" :open.sync="columnSelectorOpen">
      <ul>
        <b-field grouped group-multiline>
          <div v-for="(column, index) in columns"
            :key="index"
            class="control">
            <li>
              <b-checkbox v-model="column.visible">
                {{ column.meta }}
              </b-checkbox>
            </li>
          </div>
        </b-field>
      </ul>
    </b-collapse>
  </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';

  import { Perimeters as acl } from '@/accessControl';

  // import config from '@/config';


  import PersonDetail from './RUDcards';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'PersonList',
    perimeters: [acl.personDetailPerimeter],
    beforeMount() {
      LG('\n * * Ready to fetch persons * * \n');
      this.onFetchPersons();
    },
    props: {
      // anObj: { tst: 'passed in' },
      tst: 'passed in with props',
    },
    data() {
      const persons = [];
      return {
        anObj: { tst: 'passed in as data' },
        isLoading: true,
        isFullPage: false,
        isEmpty: false,
        defaultOpenedDetails: [123],
        selected: persons[1],
        columnSelectorOpen: false,
      };
    },
    components: {
      'person-detail': PersonDetail, // eslint-disable-line no-undef
    },

    computed: {
      ...mapGetters('person', {
        persons: 'list',
        columns: 'getColumns',
        // currentTab: 'getCurrentTab',
      }),
      ...mapGetters({
        loggedIn: 'isAuthenticated',
        // accessExpiry: 'accessExpiry',
      }),

      ...mapState('person', {
        isLoadingList: 'isFetchingList',
        isUpdating: 'isUpdating',
        isCreating: 'isCreating',
      }),
      isBusy() {
        return this.isLoadingList || this.isUpdating || this.isCreating;
      },
    },

    methods: {
      // ...mapActions(['logIn', 'handle401', 'notifyUser']),
      ...mapActions(['handle401', 'notifyUser']),
      ...mapActions('person', {
        fetchPersons: 'fetchList',
        // createPerson: 'create',
        setColumns: 'setColumns',
        // setTab: 'setCurrentTab',
      }),
      onFetchPersons() {
        LG(' * * Try to fetch persons * *');
        this.fetchPersons({ customUrlFnArgs: { s: 1, c: 100 } })
          .then((resp) => {
            LG(' * * Fetched persons * *');
            LG(resp.columns);
            this.setColumns(resp.columns);
          })
          .catch((e) => {
            LG(`*** Error while fetching persons :: >${e.message}<***`);
            LG(e.message);
            if (e.message.endsWith('401')) {
              this.handle401();
            } else {
              this.notifyUser({ txt: `Error while fetching persons :: ${e.message}`, lvl: 'is-warning' });
            }
          });
      },

      // onCreatePerson() {
      //   this.createPerson({
      //     data: {
      //       store: 'person',
      //       mode: 'post',
      //       data: {
      //         ruc_cedula: '0708217086001',
      //         nombre: 'Jesu Cristo',
      //         direccion: '#1 Pearly Gates',
      //         telefono: '099-444-4719',
      //         distribuidor: 'si',
      //         retencion: 'si',
      //         tipo: '_04',
      //         scabetti: '333',
      //         tipo_de_documento: 'RUC',
      //       },
      //     },
      //   });
      // },

    },
  };


// const now = (new Date().getTime() + 90000) / 1000;// 2 * 60 * 60 * 1000
// // const now = (new Date().getTime() + 7200000) / 1000; // 2 * 60 * 60 * 1000
// const exp = this.accessExpiry;
// const remaining = now - exp;
// LG(remaining > 1 ? 'expired' : `remaining validity (secs): ${remaining}`);

// LG(window.ls.storage);
// if (this.loggedIn < 1) {
//   this.logIn();
// } else if (remaining > 1) {
//   this.notifyUser({ txt: 'Your session expired. Logging you in again.', lvl: 'is-warning' });
//   this.logIn();
// } else {
//   this.notifyUser({ txt: 'Not aauthorized.', lvl: 'is-danger' });
//   window.ls.storage.removeItem(config.localStorageNameSpace + config.returnRouteName);
//   this.$router.push({ path: '/' });
// }

</script>
