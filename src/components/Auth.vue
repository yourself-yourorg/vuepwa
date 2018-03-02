<template>
  <div>
    <div> Token signature :: '{{ jwt.split(".")[2] }}'</div>
    <div v-if="isKnown && isHere">
      <a class="button" data-cyp="logOut" @click="logOut">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
        <span>{{ $t('label.signout') }}, {{ user }}</span>
      </a>
    </div>
    <div v-else="isKnown && isHere">
      &nbsp;
      <a class="button" data-cyp="logIn" @click="logIn">
        <span class="icon">
          <i class="fas fa-sign-in-alt"></i>
        </span>
        <span>{{ $t('label.signin') }}</span>
      </a>
    </div>
    <div data-cyp="activity"> Activity {{ isHere }} </div>
    <div> Authenticated {{ isKnown }} </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  import cfg from '../config';

  // const LG = console.log; // eslint-disable-line no-console, no-unused-vars
  // const actv = 'active';
  // const ACTIVE = 1;
  // const INACTIVE = 0;

  // const ky = 'tkn';
  // const processAccessToken = (_accessToken, _storage) => {
  //   let accessToken = _accessToken;
  //   if (typeof _storage !== 'undefined') {
  //     const storedToken = _storage.get(ky);
  //     window.lgr.debug(`Auth.vue :: Inbound ${accessToken}.  Stored : ${storedToken}`);
  //     if (accessToken) {
  //       _storage.set(ky, accessToken, cfg.tokenTimeToLive);
  //       window.lgr.info('Auth.vue :: URI query token saved to Local Storage.');
  //       window.lgr.debug(`Auth.vue :: Query token :: '${accessToken}'`);
  //       const redir = window.location.href.replace(`?${ky}=${accessToken}`, '');
  //       location.assign(redir);
  //       window.lgr.debug('Auth.vue :: Redirected to same URI without token.');
  //     } else if (storedToken) {
  //       accessToken = storedToken;
  //       _storage.set(ky, accessToken, cfg.tokenTimeToLive);
  //       window.lgr.debug(`Auth.vue :: Using token from local storage '${accessToken}'.`);
  //     } else {
  //       window.lgr.info('Auth.vue :: Neither stored nor new token found.');
  //     }
  //   } else {
  //     window.lgr.warn('Auth.vue :: No local storage to use.');
  //   }
  //   return accessToken;
  // };

  // const authenticate = () => {
  //   window.authenticateCallback = (token) => {
  //     window.lgr.info(`Auth.vue :: Authentication callback, got '${token}'.`);
  //     // accessToken = token;
  //     // $('#accessToken').val(accessToken);
  //   };
  //   // window.location.assign(cfg.server + cfg.authPath);
  // };

  // // const doSignUp = (_storage) => {
  // const doSignUp = () => {
  //   window.lgr.info('Auth.vue :: Do sign up');
  //   authenticate();
  // };

  // const doSignIn = (_accessToken, _storage) => {
  //   window.lgr.debug(`Auth.vue :: Do sign in ('${_accessToken}')`);
  //   const tkn = processAccessToken(_accessToken, _storage);
  //   if (tkn) {
  //     window.lgr.debug(`Auth.vue :: Signing in '${tkn}'.`);
  //   } else {
  //     window.lgr.debug('Auth.vue :: Call sign up ');
  //     // doSignUp(_accessToken, _storage);
  //     doSignUp();
  //   }
  // };

  // const isActive = (_storage) => {
  //   const state = _storage.get(actv) === ACTIVE;
  //   return state;
  // };

  // const setActive = (_state, _storage) => {
  //   _storage.set(actv, _state); // eslint-disable-line no-console
  // };

  // const sharedMultiTab = [
  //   { var: cfg.tokenName, set: (pyld) => {
  //       window.lgr.warn(`New token value in local store :: ${pyld}`);
  //       self.keepTkn(pyld);
  //   } },
  // ];

  const vm = {
    name: 'auth',
    data() {
      return {
        // counter: 0,
        // sentinel: false,
        tkn: null,
        axStkn: 'unused',
        isActive: 'unused',
      };
    },
    // watch: {
    //   /* eslint-disable */
    //   sentinel: function() {
    //     window.lgr.info(`Auth.vue :: Sentinel toggled ***`);
    //     // if ( isActive(window.ls) ) {
    //     //   this.tkn = processAccessToken(false, window.ls)
    //     //   window.lgr.debug(this.tkn);
    //     //   if ( this.tkn ) {
    //     //     this.authenticated = true;
    //     //     window.lgr.info(`Auth.vue :: Authenticated`);
    //     //   } else {
    //     //     authenticate();
    //     //   }
    //     // } else {
    //     //   this.authenticated = false;
    //     //   window.lgr.info(`Auth.vue :: Inactive`);
    //     // }
    //     this.$forceUpdate;
    //   },
    //   /* eslint-enable */
    // },
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
      const self = this;

      // this.isActive = window.ls.get(cfg.activityName, 0);
      window.ls.on(cfg.activityName, (pyld) => {
        window.lgr.warn(`Auth.vue :: Activity updated :: ${pyld}`);
        self.setActivity(pyld);
      });

      window.ls.on(cfg.authName, (pyld) => {
        window.lgr.warn(`Auth.vue :: Auth updated :: ${pyld}`);
        self.setAuth(pyld);
      });

      this.axStkn = window.ls.get(cfg.tokenName, 0);
      window.ls.on(cfg.tokenName, (pyld) => {
        window.lgr.warn(`Auth.vue :: New token value in local store :: ${pyld}`);
        self.keepTkn(pyld);
        // this.axStkn = pyld;
        // self.sentinel = !self.sentinel;
      });

      // ***************************

      // this.counter = window.ls.get(cfg.reroutesCounterName, 0);
      // // window.lgr.debug(this.counter);
      // window.ls.on(cfg.reroutesCounterName, (val) => {
      //   self.sentinel = !self.sentinel;
      //   window.lgr.warn(`Auth.vue :: ..... ${val} ..... ${self.sentinel}`);
      // });

      window.lgr.debug('Auth.vue :: created');
      // const rt = this.$route;

      // if (rt.query[cfg.tokenName]) {
      //   const accessToken = rt.query[cfg.tokenName];
      //   window.lgr.debug(`Auth.vue :: Got token '${accessToken}' from route`);
      //   // this.tkn = processAccessToken(accessToken, window.ls);
      //   delete rt.query[cfg.tokenName];
      // }

      // window.lgr.debug(`Auth.vue :: instance was created for '${rt.path}'`);
      // if (rt.params.authParam === 1) {
      //   window.lgr.debug('Auth.vue :: intercept route change to check authenticity ...');
      //   const forward = {
      //     name: rt.params.name,
      //     path: rt.params.name ? null : rt.params.path,
      //     query: rt.query,
      //     params: {
      //       authParam: 2,
      //     },
      //   };

      //   // window.lgr.debug(forward);
      //   // window.lgr.debug(forward.query);

      //   if (rt.params.forward) {
      //     Object.entries(rt.params.forward).forEach((item) => {
      //       forward.params[item[0]] = item[1];
      //     });
      //   }

      //   window.lgr.debug('Auth.vue ::  ... proceeding ');
      //   window.lgr.debug(forward.name);
      //   // window.lgr.debug(forward.params);

      //   this.$router.replace(forward);
      // } else {
      //   this.sentinel = !this.sentinel;
      // }

      // window.ls.on(cfg.tokenName, (pyld) => {
      //   window.lgr.warn(`New token value in local store :: ${pyld}`);
      //   self.keepTkn(pyld);
      // });
    },
    computed: {
      ...mapGetters({
        jwt: 'axsToken',
        isHere: 'isActive',
        isKnown: 'isAuthenticated',
        user: 'nameUser',
      }),
    },
    methods: {
      ...mapActions(['keepTkn', 'logIn', 'logOut', 'setActivity', 'setAuth']),
      // signOut() {
      //   window.lgr.debug('Auth.vue ::  Signing out.');
      // //   this.$ls.remove(ky);
      // //   setActive(INACTIVE, this.$ls);
      // //   this.kickIt();
      // //   // this.counter = this.$ls.get(cfg.reroutesCounterName, 0);
      // //   // this.$ls.set(cfg.reroutesCounterName, this.counter += 1);
      // //   // this.sentinel = !this.sentinel;
      // //   this.$router.go({ name: '' });
      // },
      // kickIt() {
      //   this.counter = this.$ls.get(cfg.reroutesCounterName, 0);
      //   this.$ls.set(cfg.reroutesCounterName, this.counter += 1);
      //   this.sentinel = !this.sentinel;
      // },
      // signUp() {
      //   window.lgr.debug('Auth.vue ::  Signing up.');
      // //   setActive(ACTIVE, this.$ls);
      // //   const tkn = processAccessToken(this.tkn, this.$ls);
      // //   window.lgr.debug(`Signing up '${tkn}'.`);
      // },

      // // OLDsignIn() {
      // //   setActive(ACTIVE, this.$ls);
      // //   doSignIn(this.tkn, this.$ls);
      // //   this.kickIt();
      // // },
    },
  };

export default vm;

</script>

<style>

</style>
