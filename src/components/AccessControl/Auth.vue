<template>
  <div>
    <div v-if="authorized">
      <a class="button" @click="signOut">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
        <span>{{ $t('label.signout') }}</span>
      </a>
    </div>
    <div v-else="authorized">
      <a class="button" @click="signUp">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        <span>{{ $t('label.signup') }}</span>
      </a>
      &nbsp;
      <a class="button" @click="signIn">
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
    name: 'auth',
    data() {
      return {
        tkn: 'qqqq',
      };
    },
    methods: {
      signOut() {
        LG('sign out');
        LG(this.tkn);
        LG(this.$ls);
        LG('~~~~~~~~~~~~  ~~~~~~~~~~~~~');
        LG(this.$route);
        auth.getAccessToken(this.tkn, this.$ls);
        LG('~~~~~~~~~~~~~~~~~~~~~~~~~');
      },
      signUp() {
        LG('sign up');
        LG(this.$route);
        LG('~~~~~~~~~~~~~~~~~~~~~~~~~|');
        // this.$router.push({ name: 'detail', params: { id } });
        auth.getAccessToken(this.tkn, this.$ls);
      },
      signIn() {
        LG('sign in');
      },
    },
    computed: {
      authorized() {
        this.tkn = this.$route.query.tkn;
        LG(this);
        LG(`Auth.vue...... ${this}`);
        auth.getAccessToken();
        return this.tkn;
      },
    },
  };
</script>

<style>

</style>
