<template>
  <section>
<!--
    <button data-cyp="fetch-persons" class="fetch-persons" @click="onFetchPersons">Fetch Persons</button>
    <button class="create-person" @click="onCreatePerson">Add Person</button>
-->
    <b-loading :is-full-page="false" :active.sync="isLoadingList" :canCancel="true"></b-loading>

    <b-tabs v-model="activeTab">
      <b-tab-item label="Persons">
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

          <template slot-scope="props" slot="anonymous">
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
<!--
                <p>
                  <b-icon
                    icon="emoticon-sad"
                    size="is-large">
                  </b-icon>
                </p>
                <p>Nothing here.</p>
 -->
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

      </b-tab-item>
      <b-tab-item :visible="$isAllowed('minorEdits')" label="Add Person">
        Add a new person here.
        <a class="button is-outlined is-small" @click="qtst">
          Add
        </a>
      </b-tab-item>
    </b-tabs>

    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'home'}">
      <icon name="arrow-circle-up" />
      &nbsp;Home
    </router-link>
  </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';

  import { perimeters as acl } from '@/accessControl';

  import { store } from '@/store';

  import PersonDetail from './Detail';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'Person',
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
        currentTab: 'getCurrentTab',
      }),

      ...mapState('person', {
        isLoadingList: 'isFetchingList',
      }),
      activeTab: {
        get: () => store.state.person.currentTab,
        set: newTab => store.dispatch('person/setCurrentTab', newTab),
      },
    },

    methods: {
      qtst() {
        LG(' ------- Quick Test -------');
        this.onCreatePerson();
      },
      onFetchPersons() {
        LG(' * * Try to fetch persons * *');
        this.fetchPersons({ customUrlFnArgs: { s: 1, c: 100 } })
          .then((resp) => {
            LG(' * * Fetched persons * *');
            LG(resp.columns);
            this.setColumns(resp.columns);
          })
          .catch((e) => {
            LG(`*** Error while fetching persons :: ${e}***`);
            LG(this);
            this.logIn();
          });
      },

      onCreatePerson() {
        this.createPerson({
          data: {
            store: 'person',
            mode: 'post',
            data: {
              ruc_cedula: '0708217086001',
              nombre: 'Jesu Cristo',
              direccion: '#1 Pearly Gates',
              telefono: '099-444-4719',
              distribuidor: 'si',
              retencion: 'si',
              tipo: '_04',
              scabetti: '333',
              tipo_de_documento: 'RUC',
            },
          },
        });
      },

      ...mapActions('person', {
        fetchPersons: 'fetchList',
        createPerson: 'create',
        setColumns: 'setColumns',
        setTab: 'setCurrentTab',
      }),
      ...mapActions(['logIn']),
    },
  };
</script>
