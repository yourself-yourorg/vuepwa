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
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">{{ p(id).tipo_de_documento }}</p>
                  <p class="is-size-5">{{ p(id).ruc_cedula }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Nombre</p>
                  <p class="is-size-5">{{ p(id).nombre }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Telefono</p>
                  <p class="is-size-5">{{ p(id).telefono }}</p>
                </div>
              </div>
            </nav>
            <nav class="level">
              <div class="level-right">
                <div class="level-item has-text-centered">
                  <div>
                  <p class="heading">Direccion</p>
                  <p class="is-size-5">{{ p(id).direccion }}</p>
                  </div>
                </div>
              </div>
              <div class="level-left">
                <div class="level-item has-text-centered">
                  <div v-bind:class="[p(id).distribuidor === 'no' ? 'price--line-through' : '']">
                    Distribuidor
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div v-bind:class="[p(id).retencion === 'no' ? 'price--line-through' : '']">
                    Retencion
                  </div>
                </div>
              </div>
            </nav>
        </b-tab-item>
        <b-tab-item>
          <template slot="header">
            <p class="button is-small is-info is-outlined">
              <b-icon icon="edit"></b-icon>
            </p>
          </template>
          Person edit form not implemented yet
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
    computed: {
      ...mapGetters('person', {
        p: 'getPerson',
      }),
    },
  };

</script>

<style scoped>
  div.price--line-through{
      background-color: transparent;
      background-image: -webkit-gradient(linear, 19.1% -7.9%, 81% 107.9%, color-stop(0, #fff), color-stop(.48, #fff), color-stop(.5, #000), color-stop(.52, #fff), color-stop(1, #fff));
      background-image: -webkit-repeating-linear-gradient(287deg, #fff 0%, #fff 48%, #000 50%, #fff 52%, #fff 100%);
      background-image: repeating-linear-gradient(163deg, #fff 0%, #fff 48%, #000 50%, #fff 52%, #fff 100%);
      background-image: -ms-repeating-linear-gradient(287deg, #fff 0%, #fff 48%, #000 50%, #fff 52%, #fff 100%); 
  }
</style>
