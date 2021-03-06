<template>
  <section>
    <b-loading :is-full-page="false" :active.sync="isBusy" :canCancel="true"></b-loading>
    <b-table
      :data="isEmpty ? [] : prods"
      :columns="columns"
      :striped="true"
      paginated
      :per-page="20"
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

        <product-detail :id="row.codigo" />
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

  import ProductDetail from './Retrieve';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'ProductList',
    beforeMount() {
      LG('\n * * Ready to fetch products * * \n');
      if (this.isLoadingList || this.products.length > 0) return;
      this.onFetchProducts();
    },
    props: {
      tst: { val: 'passed in with props' },
    },
    data() {
      const products = [];
      return {
        anObj: { tst: 'passed in as data' },
        isFullPage: false,
        isEmpty: false,
        defaultOpenedDetails: [123],
        selected: products[1],
        columnSelectorOpen: false,
      };
    },
    components: {
      'product-detail': ProductDetail, // eslint-disable-line no-undef
    },
    computed: {
      ...mapGetters('product', {
        products: 'list',
        prod: 'getProduct',
        columns: 'getColumns',
      }),
      ...mapGetters({
        loggedIn: 'isAuthenticated',
      }),

      ...mapState('product', {
        isLoadingList: 'isFetchingList',
        isUpdating: 'isUpdating',
        isCreating: 'isCreating',
      }),
      isBusy() {
        return this.isLoadingList || this.isUpdating || this.isCreating;
      },
      prods() {
        return this.products.map((prod) => {
          // LG('>>>>>>>>>>>>>');
          const aProd = prod;
          Object.keys(aProd).forEach((attr) => {
            // LG('>>>>>>');
            // LG(attr);
            // LG(aProd[attr]);
            aProd[attr] = aProd[attr].str || aProd[attr];
          });
          // if (aProd[0] === 997) {
          //   LG('>>>>>>');
          //   LG(aProd);

          //   Object.keys(aProd).forEach((attr) => {
          //     LG('>>>>>>');
          //     LG(attr);
          //     LG(aProd[attr]);
          //     aProd[attr] = aProd[attr].str || aProd[attr];
          //   });
          //   LG(aProd);
          //   LG(prod);
          // }
          return aProd;
        });
      },
    },

    methods: {
      ...mapActions(['handle401', 'notifyUser']),
      ...mapActions('product', {
        fetchProducts: 'fetchAll',
        setColumns: 'setColumns',
      }),
      onFetchProducts() {
        LG(' * * Try to fetch products * *');
        this.fetchProducts();
      },
    },
  };
</script>
