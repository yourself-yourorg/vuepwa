<template>
  <div>
    <formulate
      :name="formUid"
      class="my-form"
      v-if="!values"
      @submit="saveForm"

      :initial="pers"
    >
      <formulate-element
        name="codigo"
        type="hidden"
        placeholder="-1"
      />
        <article class="tile is-child box">
          <h3 class="title">Person</h3>

          <div class="columns">
            <div class="column">
              <div class="control">
                <label class="label">Nombre</label>

                <formulate-element
                  name="nombre"
                  type="text"
                  placeholder="Doink"
                />

              </div>
            </div>
            <div class="column">
              <div class="control">
                <label class="label">Telefono</label>

                <formulate-element
                  name="telefono"
                  type="tel"
                  placeholder="23452345"
                />

              </div>
            </div>
            <div class="control">

              <formulate-element
                type="submit"
                name="Save"
                elementClasses="button is-info"
              />

            </div>
          </div>
        </article>
    </formulate>
    <code
      v-else
      class="my-form my-form--code"
      v-text="values"
    />
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['pers'],
  data() {
    return { values: false };
  },
  computed: {
    ...mapGetters('person', {
      p: 'getPerson',
    }),
    formUid() {
      return `pers_${this.pers.codigo}`;
    },
  },
  methods: {
    // useFormData(vals) {
    //   this.values = JSON.stringify(vals, null, 2);
    // },
    ...mapActions('person', {
      saveForm: 'saveForm',
    }),
  },
};

</script>

<style>

/*
button.Fill {
    margin-bottom: 25px;
}

code {
  white-space: pre;
}
::-webkit-input-placeholder {
  color: lightgray;
}
::-moz-placeholder {
  color: lightgray;
}
:-ms-input-placeholder {
  color: lightgray;
}
:-moz-placeholder {
  color: lightgray;
}

.my-form {
  box-sizing: border-box;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
  background-color: white;
  border-radius: .25em;
  padding: 2em;
  margin: auto;
  min-width: 100px;
}


.formulate-element {
  font-size: 1em;
  margin-bottom: 1em;
}

.formulate-element:last-child {
  margin-bottom: 0;
}

.formulate-errors {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.formulate-errors li {
  margin: .25em 0;
  font-size: 14px;
  color: red;
  font-style: italic;
}
*/
</style>
