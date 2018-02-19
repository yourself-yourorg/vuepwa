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

  // const LG = console.log; // eslint-disable-line no-console, no-unused-vars
  const LG = window.lgr; // eslint-disable-line no-console, no-unused-vars

  const processAccessToken = (_accessToken, _storage) => {
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
  };

  const authenticate = () => {
    window.authenticateCallback = (token) => {
      window.lgr.info(`Authentication callback, got '${token}'.`);
      // accessToken = token;
      // $('#accessToken').val(accessToken);
    };
    window.location.assign(cnf.server + cnf.authPath);
  };

  // const doSignUp = (_storage) => {
  const doSignUp = () => {
    window.lgr.info('Do sign up');
    authenticate();
  };

  const doSignIn = (_accessToken, _storage) => {
    window.lgr.info(`Do sign in ('${_accessToken}')`);
    const tkn = processAccessToken(_accessToken, _storage);
    if (tkn) {
      window.lgr.debug(`Signing in '${tkn}'.`);
    } else {
      window.lgr.debug('Call sign up ');
      // doSignUp(_accessToken, _storage);
      doSignUp();
    }
  };

  // const KNOWN = 'Known';
  // const UNKNOWN = 'Anonymous';
  export default {
    name: 'auth',
    data() {
      return {
        counter: 0,
        sentinel: false,
        tkn: null,
        authorized: false,
        anonymity: 'Anonymous',
        ALLOWED: 'Known',
      };
    },
    watch: {
      /* eslint-disable */
      sentinel: function() {
        const self = this;
        self.authorized = self.sentinel;
        self.authorized = self.anonymity === 'Known';
        window.lgr.info(`Auth.vue : ${self.authorized ? '' : 'NOT '}Authorized`);
      },
    },
    /* eslint-enable */
    // beforeDestroy() {
    //   window.lgr.debug('Auth.vue : beforeDestroy');
    // },
    // mounted() {
    //   window.lgr.debug('Auth.vue : mounted');
    // },
    // destroyed() {
    //   window.lgr.debug('Auth.vue : destroyed');
    // },
    created() {
      window.lgr.debug('Auth.vue : created');
      const rt = this.$route;

      if (rt.query[cnf.tokenName]) {
        const accessToken = rt.query[cnf.tokenName];
        window.lgr.debug(`Got token  ${accessToken}`);
        delete rt.query[cnf.tokenName];
      }

      window.lgr.debug(`Created for '${rt.params.authParam}'`);
      if (rt.params.authParam === 1) {
        window.lgr.debug(' intercept route change to check authenticity ...');
        const forward = {
          name: rt.params.name,
          path: rt.params.name ? null : rt.params.path,
          query: rt.query,
          params: {
            authParam: 2,
          },
        };

        // window.lgr.debug(forward);
        // window.lgr.debug(forward.query);

        if (rt.params.forward) {
          Object.entries(rt.params.forward).forEach((item) => {
            forward.params[item[0]] = item[1];
          });
        }

        window.lgr.debug(' ... proceeding ');
        window.lgr.debug(forward.name);
        // window.lgr.debug(forward.params);

        this.$router.replace(forward);
      } else {
        this.sentinel = !this.sentinel;
      }

      this.counter = window.ls.get('counter', 0);
      const self = this;
      // window.lgr.debug(this.counter);
      window.ls.on('counter', (val) => {
        self.sentinel = !self.sentinel;
        window.lgr.debug(`..... ${val} ..... ${self.sentinel}`);
      });
    },
    methods: {
      signOut() {
        const tkn = processAccessToken(this.tkn, this.$ls);
        window.lgr.debug(`Signing out '${tkn}'.`);
      },
      signUp() {
        const tkn = processAccessToken(this.tkn, this.$ls);
        window.lgr.debug(`Signing up '${tkn}'.`);
      },
      signIn() {
        doSignIn(this.tkn, this.$ls);
        // const tkn = this.processAccessToken(this.tkn, this.$ls);
        // if (!tkn)
        // window.lgr.debug(`Signing in '${tkn}'.`);
      },
      // processAccessToken: (_accessToken, _storage) => {
      //   const ky = 'tkn';
      //   let accessToken = _accessToken;
      //   if (typeof _storage !== 'undefined') {
      //     const storedToken = _storage.get(ky);
      //     if (accessToken) {
      //       _storage.set(ky, accessToken, cnf.tokenTimeToLive);
      //       window.lgr.info(`URI query token saved to Local Storage '${accessToken}'`);
      //       const redir = window.location.href.replace(`?${ky}=${accessToken}`, '');
      //       location.assign(redir);
      //       window.lgr.debug('Redirected to same URI without token.');
      //     } else if (storedToken) {
      //       accessToken = storedToken;
      //       _storage.set(ky, accessToken, cnf.tokenTimeToLive);
      //       window.lgr.debug(`Using token from local storage '${accessToken}'.`);
      //     } else {
      //       window.lgr.info('Neither stored nor new token found.');
      //     }
      //   } else {
      //     window.lgr.warn('No local storage to use.');
      //   }
      //   return accessToken;
      // },
    },
  };
</script>

<style>

</style>
