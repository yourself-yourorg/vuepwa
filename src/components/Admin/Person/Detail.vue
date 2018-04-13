<template>
  <section>
    <nav class="panel">
      <p class="panel-heading">
            <span class="is-size-6">Registro #{{ p(id).codigo }}</span>
      </p>
      <b-tabs v-model="activeSubTab">
        <b-tab-item>
          <template slot="header">
            <p class="button is-small is-outlined">
              <b-icon icon="eye"></b-icon>
            </p>
          </template>
          <person-record :pers="p(id)"/>
        </b-tab-item>
        <b-tab-item>
          <template slot="header">
            <p class="button is-small is-info is-outlined">
              <b-icon icon="edit"></b-icon>
            </p>
          </template>
          <person-update :pers="p(id)"/>
        </b-tab-item>
        <b-tab-item>
          <template slot="header">
            <p class="button is-small is-danger is-outlined">
              <b-icon icon="trash"></b-icon>
            </p>
          </template>
          The record for "{{ p(id).nombre }}" will be marked for deletion, will no longer appear in the persons list, but will be kept for historical purposes.

          <nav class="level">
            <div class="level-right">
              <div class="level-item has-text-centered">
                <a class="button is-info" @click="activeSubTab = 0">Go back</a>
              </div>
            </div>
            <div class="level-left">
              <div class="level-item has-text-centered">
                <a class="button is-danger">Yes, Delete</a>
              </div>
            </div>
          </nav>
        </b-tab-item>
      </b-tabs>
    </nav>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Retrieve from './Retrieve';
  import Update from './Update';

  export default {
    name: 'Detail',
    props: ['id'],
    data() {
      return {
        activeSubTab: 0,
      };
    },
    methods: {
      switvh() { return 99; },
      q() { return { codigo: 125 }; },
    },
    components: {
      'person-record': Retrieve, // eslint-disable-line no-undef
      'person-update': Update, // eslint-disable-line no-undef
    },
    computed: {
      ...mapGetters('person', {
        p: 'getPerson',
      }),
    },
  };

</script>

