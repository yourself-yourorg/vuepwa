<template>
  <div>
    <div v-if="authentic">
      <a class="button" @click="signOut">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
        <span>{{ $t('label.signout') }}</span>
      </a>
    </div>
    <div v-else="authentic">
      <!-- a class="button" @click="signUp">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        <span>{{ $t('label.signup') }}</span>
      </a -->
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

  import cfg from '../config';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars
  const ky = 'tkn';
  const actv = 'active';
  const ACTIVE = 1;
  const INACTIVE = 0;

  const processAccessToken = (_accessToken, _storage) => {
    let accessToken = _accessToken;
    if (typeof _storage !== 'undefined') {
      const storedToken = _storage.get(ky);
      window.lgr.debug(`Inbound ${accessToken}.  Stored : ${storedToken}`);
      if (accessToken) {
        _storage.set(ky, accessToken, cfg.tokenTimeToLive);
        window.lgr.info('URI query token saved to Local Storage.');
        window.lgr.debug(`Query token :: '${accessToken}'`);
        const redir = window.location.href.replace(`?${ky}=${accessToken}`, '');
        location.assign(redir);
        window.lgr.debug('Redirected to same URI without token.');
      } else if (storedToken) {
        accessToken = storedToken;
        _storage.set(ky, accessToken, cfg.tokenTimeToLive);
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
    window.location.assign(cfg.server + cfg.authPath);
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

  const isActive = (_storage) => {
    const state = _storage.get(actv) === ACTIVE;
    return state;
  };

  const setActive = (_state, _storage) => {
    _storage.set(actv, _state); // eslint-disable-line no-console
  };

  const vm = {
    name: 'auth',
    data() {
      return {
        counter: 0,
        sentinel: false,
        tkn: null,
        authentic: false,
      };
    },
    watch: {
      /* eslint-disable */
      sentinel: function() {
        if ( isActive(window.ls) ) {
          this.tkn = processAccessToken(false, window.ls)
          window.lgr.debug(this.tkn);
          if ( this.tkn ) {
            this.authentic = true;
            window.lgr.info(`Auth.vue : Authenticated`);
          } else {
            authenticate();
          }
        } else {
          this.authentic = false;
          window.lgr.info(`Auth.vue : Inactive`);
        }
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

      if (rt.query[cfg.tokenName]) {
        const accessToken = rt.query[cfg.tokenName];
        window.lgr.debug(`Got token  ${accessToken}`);
        this.tkn = processAccessToken(accessToken, window.ls);
        delete rt.query[cfg.tokenName];
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

      this.counter = window.ls.get(cfg.reroutesCounterName, 0);
      const self = this;
      // window.lgr.debug(this.counter);
      window.ls.on(cfg.reroutesCounterName, (val) => {
        self.sentinel = !self.sentinel;
        window.lgr.debug(`..... ${val} ..... ${self.sentinel}`);
      });
    },
    methods: {
      signOut() {
        window.lgr.debug('Signing out.');
        this.$ls.remove(ky);
        setActive(INACTIVE, this.$ls);
        this.counter = this.$ls.get(cfg.reroutesCounterName, 0);
        this.$ls.set(cfg.reroutesCounterName, this.counter += 1);
        this.sentinel = !this.sentinel;
        this.$router.go({ name: '' });
      },
      // signUp() {
      //   setActive(ACTIVE, this.$ls);
      //   const tkn = processAccessToken(this.tkn, this.$ls);
      //   window.lgr.debug(`Signing up '${tkn}'.`);
      // },
      signIn() {
        setActive(ACTIVE, this.$ls);
        doSignIn(this.tkn, this.$ls);
      },
    },
  };

export default vm;

</script>

<style>

</style>
