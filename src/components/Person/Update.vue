<template id="person-edit">
  <div>
    <h2>Edit person</h2>
    <form v-on:submit="updatePerson">
      <div class="form-group">
        <label for="edit-name">Name</label>
        <input class="form-control" id="edit-name" v-model="person.name" required/>
      </div>
      <div class="form-group">
        <label for="edit-description">Description</label>
        <textarea class="form-control" id="edit-description" rows="3" v-model="person.description"></textarea>
      </div>
      <div class="form-group">
        <label for="edit-price">Price, <span class="glyphicon glyphicon-euro"></span></label>
        <input type="number" class="form-control" id="edit-price" v-model="person.price"/>
      </div>

      <button type="submit" class="button is-small is-success is-outlined">
        <icon name="thumbs-o-up" />&nbsp;Save
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
  template: '#person-edit',
  data() {
    return { person: findPerson(this.$route.params.person_id) };
  },
  methods: {
    updatePerson() {
      const { person } = this;
      persons[findPersonKey(person.id)] = {
        id: person.id,
        name: person.name,
        description: person.description,
        price: person.price,
      };
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
