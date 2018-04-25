<template>
  <div>
    <div class="control">
      <b-switch v-model="aclDebug" type="is-danger">
        Debug
      </b-switch>
    </div>

    <div v-if="aclDebug">      
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone">

        <!--/div>
        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone" -->
        <router-link class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" :to="{ name: 'persons' }">
          <i class="material-icons">Persons</i>
        </router-link>
        <router-link class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" :to="{ name: 'ohv' }">
          <i class="material-icons">Old Home </i>
        </router-link>
        </div>
      </div>
      <a class="button is-small">{{ isHere }}</a><a class="button is-small">{{ isKnown }}</a>
      <p class="content">
        <b>Privileges:</b>
        { { access } }
      </p>
      <div>
        Token signature :: " {{ jwt.split(".")[2] }} "
      </div>
      <a class="button is-small" @click="qtst">
        Quick Tests
      </a>
    </div>
    <div v-else class="is-small">Version :: v{{theVersion}}</div>
  </div>
</template>

<script>

  // import { mapMutations, mapState, mapGetters } from 'vuex';
  import { mapGetters } from 'vuex';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars
  export default {
    data() {
      return {
        aclDebug: false,
      };
    },
    methods: {
      qtst() {
        LG(' ------- Quick Test -------');
      },
    },
    computed: {
      theVersion() {
        return window.version;
      },
      ...mapGetters({
        jwt: 'axsToken',
        isHere: 'isActive',
        isKnown: 'isAuthenticated',
      }),
    },
  };

</script>
