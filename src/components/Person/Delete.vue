<template id="person-delete">
  <div>
    <h2>Delete person {{ person.name }}</h2>
    <form v-on:submit="deletePerson">
      <p>The action cannot be undone.</p>
      <button type="submit" class="button is-small is-danger is-outlined">
        <icon name="thumbs-o-up" />&nbsp;Delete
      </button>
      <router-link class="button is-small is-black is-outlined" v-bind:to="{ name: 'persons' }">
        <icon name="hand-stop-o" />&nbsp;Cancel
      </router-link>
    </form>
    <hr />
    <router-link class="button is-small is-primary is-outlined" v-bind:to="{name: 'home'}">
      <icon name="home" />
      &nbsp;Home
    </router-link>
    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'persons'}">
      <icon name="arrow-circle-left" />
      &nbsp;Persons
    </router-link>
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
    deletePerson(e) {
      e.preventDefault();
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
