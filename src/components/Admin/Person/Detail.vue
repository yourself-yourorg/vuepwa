<template>
  <article>
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Codigo</p>
            <p class="is-size-5">{{ p(id).codigo }}</p>
          </div>
        </div>
      </div>
      <div class="level-left">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Distribuidor?</p>
            <p class="is-size-5">{{ p(id).distribuidor }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Retencion?</p>
            <p class="is-size-5">{{ p(id).retencion }}</p>
          </div>
        </div>
      </div>
    </nav>
    <nav class="level is-mobile">
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
    <div class="has-text-centered">
      <span class="is-size-5">{{ p(id).direccion }}</span>
    </div>
  </article>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Detail',
    props: ['id'],
    computed: {
      ...mapGetters('person', {
        persons: 'list',
        columns: 'getColumns',
        p: 'getPerson',
      }),
    },
  };
</script>
