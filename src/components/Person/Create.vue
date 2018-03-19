<template id="add-person">
  <div>
    <h2>Add new person</h2>
    <form v-on:submit="createPerson">
      <div class="form-group">
        <label for="add-name">Name</label>
        <input class="form-control" id="add-name" v-model="person.name" required/>
      </div>
      <div class="form-group">
        <label for="add-description">Description</label>
        <textarea class="form-control" id="add-description" rows="10" v-model="person.description"></textarea>
      </div>
      <div class="form-group">
        <label for="add-price">Price, <span class="glyphicon glyphicon-euro"></span></label>
        <input type="number" class="form-control" id="add-price" v-model="person.price"/>
      </div>
      <button type="submit" class="button is-small is-success is-outlined">
        <icon name="thumbs-o-up" />&nbsp;Create
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

// import { persons, findPerson, findPersonKey, } from './index';
import { persons } from './utils';

export default {
  template: '#add-person',
  data() {
    return { person: { name: '', description: '', price: '' } };
  },
  methods: {
    createPerson() {
      const { person } = this;
      persons.push({
        id: Math.random().toString().split('.')[1],
        name: person.name,
        description: person.description,
        price: person.price,
      });
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
