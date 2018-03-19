<template id="person-list">
  <div>
    <div class="actions">
      <router-link class="button is-primary is-outlined" v-bind:to="{ name: 'person-add'}">
        <icon name="plus" />&nbsp;Add person
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
          <i class="glyphicon glyphicon-euro" aria-hidden="true"></i>
        </td>
        <td>
          <router-link class="button is-small is-info is-outlined" v-bind:to="{name: 'person-edit', params: {person_id: person.id}}">
            <icon name="pencil" />
          </router-link>
          <router-link class="button is-small is-danger is-outlined" v-bind:to="{name: 'person-delete', params: {person_id: person.id}}">
            <icon name="trash"></icon>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'home'}">
      <icon name="arrow-circle-left" />
      &nbsp;Home
    </router-link>
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
