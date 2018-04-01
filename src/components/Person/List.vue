<template>
  <main>
    <button data-cyp="fetch-persons" class="fetch-persons" @click="onFetchPersons">Fetch Persons</button>
    <button class="create-person" @click="onCreatePerson">Add Person</button>

    <b-loading :is-full-page="false" :active.sync="isLoadingList" :canCancel="true"></b-loading>

    <b-tabs>
  
      <b-tab-item label="Table">
        <b-table 
          :data="persons"
          paginated
          :per-page="5"
          :striped="true"
          :selected.sync="selected"
          :current-page="1"
          :opened-detailed="defaultOpenedDetails"
          detailed
          detail-key="codigo"
          @details-open="(row, index) => $toast.open(`Expanded ${row.nombre}`)"
          focusable>
          <template slot-scope="props">
            <b-table-column v-for="(column, index) in columns"
              :key="index"
              :label="column.label"
              :visible="column.visible">
              {{ props.row[column.field] }}
            </b-table-column>
          </template>
          <template slot="detail" slot-scope="props">
            Hi ya!
          </template>
        </b-table>
      </b-tab-item>

      <b-tab-item label="Selected">
        <template>{{ selected ? selected.nombre : '' }}</template>
      </b-tab-item>
    </b-tabs>

<!--


-->
    <b-field grouped group-multiline>
      <div v-for="(column, index) in columns" 
        :key="index"
        class="control">
        <b-checkbox v-model="column.visible">
          {{ column.meta }}
        </b-checkbox>
      </div>
    </b-field>

    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'home'}">
      <icon name="arrow-circle-left" />
      &nbsp;Home
    </router-link>
  </main>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies */
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Ipsum from 'bavaria-ipsum';
  /* eslint-enable */
  import Detail from './Detail';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  const ipsum = new Ipsum();

  export default {
    name: 'Person',
    data() {
      const persons = [];
      return {
        isLoading: true,
        isFullPage: false,
        defaultOpenedDetails: [124],
        selected: persons[1],
      };
    },
    components: {
      'person-record': Detail,
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
        this.fetchPersons({ customUrlFnArgs: { s: 1, c: 1000 } })
          .then((resp) => {
            LG(' * * Fetched persons * *');
            LG(resp.columns);
            this.setColumns(resp.columns);
          })
          .catch((e) => {
            LG(`*** Error while fetching persons :: ${e}***`);
          });
      },

      onCreatePerson() {
        this.createPerson({
          data: {
            title: ipsum.generateSentence(),
            content: ipsum.generateParagraph(),
          },
        });
      },

      ...mapActions('person', {
        fetchPersons: 'fetchList',
        createPerson: 'create',
        setColumns: 'setColumns',
      }),
    },
  };
</script>
