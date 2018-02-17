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

    <section>
      <div class="block">
        <b-radio v-model="anonymity"
          :checked="anonymity !== 'Known'"
          native-value="Anonymous">
          Anonymous
        </b-radio>
        <b-radio v-model="anonymity"
          :checked="anonymity === 'Known'"
          :native-value=ALLOWED>
          Known
        </b-radio>
      </div>
      <p class="content">
        <b>Selection:</b>
        {{ anonymity }}
      </p>
    </section>
  </div>
</template>

<script>

  import cnf from '../config';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars
  // const KNOWN = 'Known';
  // const UNKNOWN = 'Anonymous';
  export default {
    name: 'auth',
    data() {
      return {
        counter: 0,
        tkn: null,
        authorized: false,
        anonymity: 'Anonymous',
        ALLOWED: 'Known',
      };
    },
    watch: {
      /* eslint-disable */
      tkn: function() {
        const self = this;
        self.authorized = self.tkn;
        self.authorized = self.anonymity === 'Known';
        window.lgr.info(`Auth.vue : ${self.authorized ? '' : 'NOT '}Authorized`);
      },
    },
    /* eslint-ensable */
    created() {
      const rt = this.$route;
      if(rt.params.authParam === 1) {
        LG(' intercept route change to check authenticity ...');
        LG(this.$route);
        // LG(this.$route.params);
        const forward = {
          name: rt.params.name,
          path: rt.params.name  ?  null  : rt.params.path,
          query: rt.query,
          params: {
            authParam: 2,
          },
        };

        if (rt.params.forward) {
          Object.entries(rt.params.forward).forEach( item => {
            forward.params[ item[0] ] = item[1];
          });
        }

        // LG(' ... proceeding ');
        // LG(forward);
        // LG(forward.params);

        this.$router.replace(forward);
      } else {
        this.tkn = ! this.tkn;
      }

      this.counter = window.ls.get('counter', 0);
      const self = this;
      // LG(this.counter);
      window.ls.on('counter', (val) => {
        self.tkn = !self.tkn;
        LG('..... ' + val + '..... ' + self.tkn);
      });
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
  };
</script>

<style>

</style>
