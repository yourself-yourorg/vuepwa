<template>
  <div>
    <div> Token signature :: '{{ jwt.split(".")[2] }}'</div>
    <div v-if="isKnown && isHere">
      <a class="button" data-cyp="logOut" @click="logOut">
        <span name="icon"><icon name="sign-out" /></icon></span>&nbsp;{{ $t('label.signout') }}, {{ user }}
      </a>
    </div>
    <div v-else="isKnown && isHere">
      &nbsp;
      <a class="button" data-cyp="logIn" @click="logIn">
        <icon name="sign-in" />&nbsp;{{ $t('label.signin') }}
      </a>
    </div>
    <div data-cyp="activity"> Activity {{ isHere }} </div>
    <div> Authenticated {{ isKnown }} </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  import cfg from '../config';

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

      window.lgr.debug('Auth.vue :: created');
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
    },
  };

export default vm;

</script>

<style>

span[name="icon"] {
  font-size: 200%;
}

</style>
