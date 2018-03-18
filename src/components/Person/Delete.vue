<template id="person-delete">
  <div>
    <h2>Delete person {{ person.name }}</h2>
    <form v-on:submit="deletePerson">
      <p>The action cannot be undone.</p>
      <button type="submit" class="btn btn-danger">Delete</button>
      <router-link class="btn btn-default" v-bind:to="{ name: 'persons' }">Cancel</router-link>
    </form>
  </div>
</template>


<script>

import { persons, findPerson, findPersonKey } from './utils';

export default {
  template: '#person-delete',
  data() {
    return { person: findPerson(this.$route.params.person_id) };
  },
  methods: {
    deletePerson() {
      persons.splice(findPersonKey(this.$route.params.person_id), 1);
      this.$router.push({ name: 'persons' });
    },
  },
};
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
</style>
