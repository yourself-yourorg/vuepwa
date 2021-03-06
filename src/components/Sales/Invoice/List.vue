<template>
  <section>
    <b-loading :is-full-page="false" :active.sync="isBusy" :canCancel="true"></b-loading>
    <b-table
      :data="isEmpty ? [] : formattedInvoices"
      :columns="columns"
      :striped="true"
      paginated
      :per-page="20"
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
  import waitTil from 'wait-until';
  import { mapState, mapActions, mapGetters } from 'vuex';

  import { store as person } from '@/components/Admin/Person';
  import { store as product } from '@/components/Sales/Product';

  import InvoiceDetail from './RUDcards';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'InvoiceList',
    beforeMount() {
      LG(`


                    * * Ready to fetch invoices * *


        `);
      LG(person.state.list.length);
      LG(person.state.isFetchingList);
      LG(this.$store);
      let preload = 7;
      if (person.state.list.length > 0 || person.state.isFetchingList) {
        LG('Don\'t load persons');
        preload -= 4;
      }
      if (product.state.list.length > 0 || product.state.isFetchingList) {
        LG('Don\'t load products');
        preload -= 2;
      }
      if (this.invoices.length > 0 || this.isLoadingList) {
        LG('Don\'t load invoices');
        preload -= 1;
      }

      switch (preload) {
        case 7:
        case 6:
          LG('Load all');
          this.$store.dispatch('person/fetchAll').then(() => {
            LG('Loaded persons');
            this.$store.dispatch('product/fetchAll').then(() => {
              LG('Loaded products');
              this.onFetchInvoices();
            });
          });
          break;
        case 5:
        case 4:
          LG('Person then invoices');
          LG('Load all');
          this.$store.dispatch('person/fetchAll').then(() => {
            LG('Loaded persons');
            this.onFetchInvoices();
          });
          break;
        case 3:
        case 2:
          LG('Product then invoices');
          LG('Load all');
          this.$store.dispatch('product/fetchAll').then(() => {
            LG('Loaded products');
            this.onFetchInvoices();
          });
          break;
        case 1:
          LG('Load invoices');
          this.onFetchInvoices();
          break;
        default:
          LG('No loading needed');
      }
      // this.$store.dispatch('person/fetchAll').then((resp) => {
      //   LG(`

      //     ||||||||||||||||||||||||||||||||||||||||||||||||||`);
      //   LG(resp);
      // });

      // if (this.isLoadingList || this.invoices.length > 0) return;
      // this.onFetchInvoices();
    },
    props: {
      // anObj: { tst: 'passed in' },
      tst: 'passed in with props',
    },
    data() {
      const invoices = [];
      return {
        anObj: { tst: 'passed in as data' },
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
      formattedInvoices() {
        return this.invoices.map((inv) => {
          const invoice = {};
          Object.entries(inv).forEach(([key, value]) => {
            invoice[key] = value.str || value;
          });
          return invoice;
        });
      },
      isBusy() {
        return this.isLoadingList || this.isUpdating || this.isCreating;
      },
    },

    methods: {
      // ...mapActions(['logIn', 'handle401', 'notifyUser']),
      ...mapActions(['handle401', 'notifyUser']),
      ...mapActions('invoice', {
        fetchInvoices: 'fetchAll',
        setColumns: 'setColumns',
      }),
      onFetchInvoices() {
        LG(' * * Try to fetch invoices * *');
        waitTil()
          .interval(100)
          .times(20)
          .condition(() => !person.state.isFetchingList && !product.state.isFetchingList)
          .done(() => this.fetchInvoices());
      },
    },
  };

</script>


<style>
  div.cardMode {
    padding-bottom: 25px;
  }
</style>
