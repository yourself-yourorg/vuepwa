<template>
  <section>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Persons">
        <router-view name="personsList"/>
      </b-tab-item>
      <b-tab-item :visible="$isAllowed('minorEdits')" label="Add Person">
        <Create/>

<!--
        Add a new person here.
        <a class="button is-outlined is-small" @click="qtst">
          Add
        </a>
 -->
      </b-tab-item>
    </b-tabs>

    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'home'}">
      <icon name="arrow-circle-up" />
      &nbsp;Home
    </router-link>
  </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'; // eslint-disable-line no-unused-vars

  import { Perimeters as acl } from '@/accessControl';
  import { store } from '@/store';

  import Create from './Create';

  const LG = console.log; // eslint-disable-line no-unused-vars, no-console

  export default {
    name: 'Person',
    perimeters: [acl.personDetailPerimeter],
    components: {
      Create,
    },
    computed: {
      ...mapGetters('person', {
        currentTab: 'getCurrentTab',
      }),
      activeTab: {
        get: () => store.state.person.currentTab,
        set: newTab => store.dispatch('person/setCurrentTab', newTab),
      },
    },
    methods: {
      qtst() {
        LG(' ------- Quick Test -------');
        this.onCreatePerson();
      },
      onCreatePerson() {
        this.createPerson({
          data: {
            store: 'person',
            mode: 'post',
            data: {
              ruc_cedula: '0708217086001',
              nombre: 'Jesu Cristo',
              direccion: '#1 Pearly Gates',
              telefono: '099-444-4719',
              distribuidor: 'si',
              retencion: 'si',
              tipo: '_04',
              scabetti: '333',
              tipo_de_documento: 'RUC',
            },
          },
        });
      },
      ...mapActions('person', {
        createPerson: 'create',
        setTab: 'setCurrentTab',
      }),
    },
  };
</script>
