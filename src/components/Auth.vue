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

  import cnf from '../config';

  export default {
    name: 'auth',
    data() {
      return {
        tkn: 'qqqq',
      };
    },
    methods: {
      getAccessToken: (_accessToken, _storage) => {
        const ky = 'tkn';
        let accessToken = _accessToken;
        if (typeof _storage !== 'undefined') {
          const storedToken = _storage.get(ky);
          if (accessToken) {
            _storage.set(ky, accessToken, cnf.tokenTimeToLive);
            window.lgr.info(`URI query token saved to Local Storage '${accessToken}'`);
            const redir = window.location.href.replace(`?${ky}=${accessToken}`, '');
            location.assign(redir);
            window.lgr.debug('Redirected to same URI without token.');
          } else if (storedToken) {
            accessToken = storedToken;
            _storage.set(ky, accessToken, cnf.tokenTimeToLive);
            window.lgr.debug(`Using token from local storage '${accessToken}'.`);
          } else {
            window.lgr.info('Neither stored nor new token found.');
          }
        } else {
          window.lgr.warn('No local storage to use.');
        }
        return accessToken;
      },
      signOut() {
        const tkn = this.getAccessToken(this.tkn, this.$ls);
        window.lgr.debug(`Signing out '${tkn}'.`);
      },
      signUp() {
        const tkn = this.getAccessToken(this.tkn, this.$ls);
        window.lgr.debug(`Signing up '${tkn}'.`);
      },
      signIn() {
        const tkn = this.getAccessToken(this.tkn, this.$ls);
        window.lgr.debug(`Signing in '${tkn}'.`);
      },
    },
    computed: {
      authorized() {
        const tkn = this.getAccessToken(this.$route.query.tkn, this.$ls);
        window.lgr.info(`Auth.vue : ${tkn ? '' : 'NOT '}Authorized`);
        return tkn;
      },
    },
  };
</script>

<style>

</style>
