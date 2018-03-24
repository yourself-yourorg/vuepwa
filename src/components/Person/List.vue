<template>
  <main>
    <button data-cyp="fetch-persons" class="fetch-persons" @click="onFetchPersons">Fetch Persons</button>
    <button class="create-person" @click="onCreatePerson">Create New Retrieve</button>

    <div id="persons" v-if="persons.length">
      <person-record
        v-for="person in persons"
        :person="person"
        :key="person.codigo" />
      <!-- div v-for="person in persons">
        <p>{{  person.nombre  }}</p>
      </div -->
    </div>
  </main>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies */
  import { mapActions, mapGetters } from 'vuex';
  import Ipsum from 'bavaria-ipsum';
  /* eslint-enable */
  import Detail from './Detail';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  const ipsum = new Ipsum();

  export default {
    name: 'Person',
    components: {
      'person-record': Detail,
    },

    computed: {
      ...mapGetters('person', {
        persons: 'list',
      }),
    },

    methods: {
      onFetchPersons() {
        LG(' * * Try to fetch persons * *');
        this.fetchPersons({ customUrlFnArgs: { s: 1, c: 3 } })
          .then(() => { LG(' * * Fetched persons * *'); })
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
      }),
    },
  };
</script>
