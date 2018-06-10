<template>
  <section>
    <b-loading :is-full-page="false" :active.sync="isBusy" :canCancel="true"></b-loading>
    <b-table
      :data="isEmpty ? [] : invoices"
      :columns="columns"
      :striped="true"
      paginated
      :per-page="4"
      :current-page="1"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="codigo"
      @details-open="(row, index) => $toast.open(`Expanded ${row.nombre}`)"
      focusable
      :narrowed="true"
      :mobile-cards="hasMobileCards">

      <template slot-scope="props" slot="header">
        <b-tooltip position="is-left" :active="!!props.column.meta" :label="props.column.meta" dashed>
          {{ props.column.label }}
        </b-tooltip>
      </template>

      <template slot="detail" slot-scope="{ row }">
        <invoice-detail :id="row.codigo" />
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

    <div class="control cardMode">
        <b-switch v-model="hasMobileCards">Modo tarjeta <small>(filas estrechas)</small></b-switch>
    </div>

    <div class="block">
        <button class="button is-small is-primary"
            @click="columnSelectorOpen = !columnSelectorOpen">
            Escoger Columnas
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

  import InvoiceDetail from './RUDcards';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'InvoiceList',
    perimeters: [acl.invoiceDetailPerimeter],
    beforeMount() {
      LG('\n * * Ready to fetch invoices * * \n');
      this.onFetchInvoices();
    },
    props: {
      // anObj: { tst: 'passed in' },
      tst: 'passed in with props',
    },
    data() {
      const invoices = [];
      return {
        anObj: { tst: 'passed in as data' },
        isLoading: true,
        hasMobileCards: false,
        isFullPage: false,
        isEmpty: false,
        defaultOpenedDetails: [4358],
        selected: invoices[1],
        columnSelectorOpen: false,
      };
    },
    components: {
      'invoice-detail': InvoiceDetail, // eslint-disable-line no-undef
    },

    computed: {
      ...mapGetters('invoice', {
        invoices: 'list',
        columns: 'getColumns',
        // currentTab: 'getCurrentTab',
      }),
      ...mapGetters({
        loggedIn: 'isAuthenticated',
        // accessExpiry: 'accessExpiry',
      }),

      ...mapState('invoice', {
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
      ...mapActions('invoice', {
        fetchInvoices: 'fetchList',
        // createInvoice: 'create',
        setColumns: 'setColumns',
        // setTab: 'setCurrentTab',
      }),
      onFetchInvoices() {
        LG(' * * Try to fetch invoices * *');
        this.fetchInvoices({ customUrlFnArgs: { s: 1, c: 100 } })
          .then((resp) => {
            LG(' * * Fetched invoices * *');
            LG(resp.columns);
            this.setColumns(resp.columns);
          })
          .catch((e) => {
            LG(`*** Error while fetching invoices :: >${e.message}<***`);
            LG(e.message);
            if (e.message.endsWith('401')) {
              this.handle401();
            } else {
              this.notifyUser({
                txt: `Error fetching invoices :: ${e.message}`,
                lvl: 'is-danger',
              });
            }
          });
      },

      // onCreateInvoice() {
      //   this.createInvoice({
      //     data: {
      //       store: 'invoice',
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


<style>
  div.cardMode {
    padding-bottom: 25px;
  }
</style>
