<template>
  <main>
<!--
    <button data-cyp="fetch-persons" class="fetch-persons" @click="onFetchPersons">Fetch Persons</button>
    <button class="create-person" @click="onCreatePerson">Add Person</button>
-->

    <b-loading :is-full-page="false" :active.sync="isLoadingList" :canCancel="true"></b-loading>

    <b-tabs>
      <b-tab-item label="Persons">
        <b-table :data="persons" :columns="columns"
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
      <b-tab-item label="Add Person">
        Add a new person here.
      </b-tab-item>
    </b-tabs>

    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'home'}">
      <icon name="arrow-circle-left" />
      &nbsp;Home
    </router-link>
  </main>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import PersonDetail from './Detail';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'Person',
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
        defaultOpenedDetails: [124],
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
      }),

      ...mapState('person', {
        isLoadingList: 'isFetchingList',
      }),
    },

    methods: {
      onFetchPersons() {
        LG(' * * Try to fetch persons * *');
        this.fetchPersons({ customUrlFnArgs: { s: 1, c: 10 } })
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

      // onCreatePerson() {
      //   this.createPerson({
      //     data: {
      //       title: ipsum.generateSentence(),
      //       content: ipsum.generateParagraph(),
      //     },
      //   });
      // },

      ...mapActions('person', {
        fetchPersons: 'fetchList',
        createPerson: 'create',
        setColumns: 'setColumns',
      }),
      ...mapActions(['logIn']),
    },
  };
</script>
