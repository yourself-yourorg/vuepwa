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
      <button type="submit" class="btn btn-primary">Save</button>
      <router-link class="btn btn-default" v-bind:to="{ name: 'persons' }">Cancel</router-link>
    </form>
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
