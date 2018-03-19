<template id="person">
  <div>
    <h2>{{ person.name }}</h2>
    <b>Description: </b>
    <div>{{ person.description }}</div>
    <b>Price:</b>
    <div>{{ person.price }}<span class="glyphicon glyphicon-euro"></span></div>
    <br/>
    <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'home'}">
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
import { findPerson } from './utils';

export default {
  template: '#person',
  data() {
    return { person: findPerson(this.$route.params.person_id) };
  },
};
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
</style>
