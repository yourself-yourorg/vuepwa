<template>
  <main id="person">
    <p class="back">
      <router-link :to="{ name: 'persons' }">Back to Persons</router-link>
    </p>
    <person-record v-if="currentPerson" :person="currentPerson" />
  </main>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies */
  import { mapState, mapGetters, mapActions } from 'vuex';
  /* eslint-enable */
  import Detail from './Detail';

  export default {
    components: {
      'person-record': Detail,
    },

    computed: {
      ...mapGetters('person', {
        personById: 'byId',
      }),

      ...mapState([
        'route',
      ]),

      currentPerson() {
        return this.personById(this.route.params.id);
      },
    },

    methods: {
      ...mapActions('person', {
        fetchPerson: 'fetchSingle',
      }),

      fetchData() {
        return this.fetchPerson({
          id: this.route.params.id,
        });
      },
    },

    watch: {
      $route: 'fetchData',
    },

    created() {
      this.fetchData();
    },
  };
</script>
