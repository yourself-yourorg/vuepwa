<template id="person-list">
  <div>
    <div class="actions">
      <router-link class="btn btn-default" v-bind:to="{ name: 'person-add'}">
        <span class="glyphicon glyphicon-plus"></span>
        Add person
      </router-link>
    </div>
    <div class="filters row">
      <div class="form-group col-sm-3">
        <label for="search-element">Person name</label>
        <input v-model="searchKey" class="form-control" id="search-element" requred/>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th class="col-sm-2">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="person in filteredPersons">
        <td>
          <router-link v-bind:to="{name: 'person', params: {person_id: person.id}}">{{ person.name }}</router-link>
        </td>
        <td>{{ person.description }}</td>
        <td>
          {{ person.price }}
          <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
        </td>
        <td>
          <router-link class="btn btn-warning btn-xs" v-bind:to="{name: 'person-edit', params: {person_id: person.id}}">Edit</router-link>
          <router-link class="btn btn-danger btn-xs" v-bind:to="{name: 'person-delete', params: {person_id: person.id}}">Delete</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>

import { persons } from './utils';

export default {
  template: '#person-list',
  data() {
    return { persons, searchKey: '' };
  },
  computed: {
    filteredPersons() {
      return this.persons.filter(
        person => this.searchKey === '' ||
                    person.name.indexOf(this.searchKey) !== -1,
        this,
      );
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
