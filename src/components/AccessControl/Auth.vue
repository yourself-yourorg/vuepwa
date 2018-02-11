<template>
  <div>
    <div v-if="authorized">
      <a class="button" @click="changeUp">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
        <span>{{ $t('label.signout') }}</span>
      </a>
    </div>
    <div v-else="authorized">
      <a class="button">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        <span>{{ $t('label.signup') }}</span>
      </a>
      &nbsp;
      <a class="button">
        <span class="icon">
          <i class="fas fa-sign-in-alt"></i>
        </span>
        <span>{{ $t('label.signin') }}</span>
      </a>
    </div>
  </div>
</template>

<script>

  import auth from './auth';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'hello',
    // camelCase in JavaScript
    props: ['somethinggood'],
    methods: {
      changeUp() {
        this.who = 'changed up';
      },
    },
    computed: {
      authorized() {
        const tkn = this.$route.query.tkn;
        // LG(`Auth.vue...... ${tkn}`);
        auth.getAccessToken();
        return tkn;
      },
    },
  };
</script>

<style>

</style>
