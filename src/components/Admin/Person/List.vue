<template>
  <main>
    <button data-cyp="fetch-persons" class="fetch-persons" @click="onFetchPersons">Fetch Persons</button>
<!--
    <button class="create-person" @click="onCreatePerson">Add Person</button>
-->

    <b-loading :is-full-page="false" :active.sync="isLoadingList" :canCancel="true"></b-loading>

    <b-field grouped group-multiline>
      <div v-for="(column, index) in columns" 
        :key="index"
        class="control">
        <b-checkbox v-model="column.visible">
          {{ column.meta }}
        </b-checkbox>
      </div>
    </b-field>

    <b-tabs>
  
      <b-tab-item label="Table">
        <b-table :data="persons" :columns="columns"
          :striped="true"
          paginated
          :per-page="5"
          :selected.sync="selected"
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
            <person-detail :row="row" />
          </template>

        </b-table>
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
