<template>
  <section>
    <b-loading :is-full-page="false" :active.sync="isBusy" :canCancel="true"></b-loading>
    <b-table
      :data="isEmpty ? [] : products"
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

  import { Perimeters as acl } from '@/accessControl';

  import config from '@/config';

  import ProductDetail from './Retrieve';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'ProductList',
    perimeters: [acl.productDetailPerimeter],
    beforeMount() {
      LG('\n * * Ready to fetch products * * \n');
      this.onFetchProducts();
    },
    props: {
      // anObj: { tst: 'passed in' },
      tst: { val: 'passed in with props' },
    },
    data() {
      const products = [];
      return {
        anObj: { tst: 'passed in as data' },
        isLoading: true,
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
        // currentTab: 'getCurrentTab',
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
        const rslt = this.products;
        LG('-----------------------');
        LG(rslt);
        LG('-----------------------');
        // const rslt = this.products.map((_prod, idx) => {
        // const newProd = _prod;
        // this.columns.forEach((col) => {
        //   if (idx === 4) {
        //     LG(` ?? ${newProd[col.field]} ${newProd[col.field]}`);
        //     LG(col);
        //   }
        // });
        // return newProd;
        // });
        return rslt;
      },
    },

    methods: {
      onFetchProducts() {
        LG(' * * Try to fetch products * *');
        this.fetchProducts({ customUrlFnArgs: { s: 1, c: 100 } })
          .then((resp) => {
            LG(' * * Fetched products * *');
            LG(resp.columns);
            this.setColumns(resp.columns);
          })
          .catch((e) => {
            LG(`*** Error while fetching products :: ${e}***`);
            LG(this);
            LG(window.ls.storage);
            if (this.loggedIn < 1) {
              this.logIn();
            } else {
              window.ls.storage.removeItem(config.localStorageNameSpace + config.returnRouteName);
              this.$router.push({ path: '/' });
            }
          });
      },
      ...mapActions('product', {
        fetchProducts: 'fetchList',
        // createProduct: 'create',
        setColumns: 'setColumns',
        // setTab: 'setCurrentTab',
      }),
      ...mapActions(['logIn']),
    },
  };
</script>
