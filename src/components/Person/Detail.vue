<template>
  <article :class="`person-${person.codigo}`">
    <router-link :to="{ name: 'person', params: { id: person.codigo } }">
      <h1>{{ person.nombre }}</h1>
    </router-link>

    <p>
      <a class="edit-person" href="javascript:void(0);" @click="onEdit">Edit (PATCH)</a>
      |
      <a class="replace-person" href="javascript:void(0);" @click="onReplace">Replace (PUT)</a>
      |
      <a class="delete-person" href="javascript:void(0);" @click="onDelete">Delete</a>
    </p>

    <p class="content">{{ person.telefono }}</p>
    <hr />
  </article>
</template>

<script>
  /* eslint-disable import/no-extraneous-dependencies */
  import { mapActions } from 'vuex';
  import Ipsum from 'bavaria-ipsum';
  /* eslint-enable */

  const ipsum = new Ipsum();

  export default {
    props: {
      person: {
        type: Object,
        required: true,
      },
    },

    methods: {
      ...mapActions('person', [
        'update',
        'replace',
        'destroy',
      ]),

      onEdit() {
        this.update({
          id: this.person.codigo,
          data: {
            title: ipsum.generateSentence(),
            content: ipsum.generateParagraph(),
          },
        });
      },

      onReplace() {
        this.replace({
          id: this.person.codigo,
          data: {
            title: ipsum.generateSentence(),
            content: ipsum.generateParagraph(),
          },
        });
      },

      onDelete() {
        this.destroy({
          id: this.person.codigo,
        });
      },
    },
  };
</script>
