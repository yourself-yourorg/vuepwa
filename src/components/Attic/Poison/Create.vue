<template id="add-person">
  <div>
    <formulate
      name="person"
      class="my-form"
      v-if="!values"
      @submit="processForm"

      :initial="formData"
    >
        <div class="tile is-child box">
          <h2 class="title">Person</h2>

          <button class="button is-info" type="button" @click="fillPerson">Fill</button>


          <div class="columns">
            <div class="column">
              <div class="control">
                <label class="label">Name</label>

                <formulate-element
                  name="name"
                  type="text"
                  placeholder="Who do you think you are?"
                  validation="required"
                />
              </div>
            </div>
            <div class="column">
              <div class="control">
                <label class="label">Description</label>

                <formulate-element
                  name="description"
                  type="text"
                  placeholder="Tell me everything about yourself. I've got a minute"
                  validation="required"
                />

              </div>
            </div>
            <div class="column">
              <div class="control">
                <label class="label">Email Address</label>

                <formulate-element
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  validation="required|email"
                />

              </div>
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

import { persons } from './utils';

export default {
  template: '#add-person',
  data() {
    return { values: false };
    // return { person: { name: '', description: '', email: '' } };
  },
  computed: {
    ...mapGetters({
      formData: 'dataPerson',
    }),
  },
  methods: {
    ...mapActions(['fillPerson']),
    processForm(vals) {
      this.values = JSON.stringify(vals, null, 2);
    },
    createPerson(e) {
      e.preventDefault();
      const { person } = this;
      persons.push({
        id: Math.random().toString().split('.')[1],
        name: person.name,
        description: person.description,
        email: person.email,
      });
      this.$router.push(
        { name: 'persons' },
        () => {
          window.lgr.info('this.$router.push completed ok.');
        },
        (error) => {
          window.lgr.error(`completed with error : ${error}.`);
        },
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
