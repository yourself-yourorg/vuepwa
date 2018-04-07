<template>
  <section>
    <div class="block">
      <button class="button" @click="activeTab = 0">Set Pictures</button>
    </div>

    <b-tabs v-model="activeTab">
      <b-tab-item label="Pictures">
        Lorem ipsum dolor sit amet.
      </b-tab-item>

      <b-tab-item label="Bottles">
          <person-detail :id="128" />
      </b-tab-item>

      <b-tab-item :visible="showAdmin" label="Admin">
        What light is light, if Silvia be not seen? <br>
        What joy is joy, if Silvia be not by— <br>
        Unless it be to think that she is by <br>
        And feed upon the shadow of perfection? <br>
        Except I be by Silvia in the night, <br>
        There is no music in the nightingale.
      </b-tab-item>

      <b-tab-item label="Orders" disabled>
        Nunc nec velit nec libero vestibulum eleifend.
        Curabitur pulvinar congue luctus.
        Nullam hendrerit iaculis augue vitae ornare.
        Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
      </b-tab-item>
    </b-tabs>
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
    <div class="is-large">v0.0.18</div>
  </section>
</template>

<script>

  import jwt from 'jsonwebtoken';
  import { mapGetters } from 'vuex';

  import PersonDetail from './Admin/Person/Detail';

  import cfg from '../config';
  // import data from '../data';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    data() {
      return {
        activeTab: 1,
      };
    },
    computed: {
      showAdmin() {
        return this.$store.getters.accessLevel.toString() === 'admin';
      },
      ...mapGetters({
        jwt: 'axsToken',
      }),
    },
    components: {
      'person-detail': PersonDetail, // eslint-disable-line no-undef
    },
    methods: {
      displayDetails(id) {
        this.$router.push({ name: 'detail', params: { id } });
      },
      qiktst() {
        const accessToken = this.jwt;
        const url = `${cfg.server}/api/person?s=1&c=3`;

        this.$log.info(`  +++ Quick Test '${url}' +++ `);
        const headers = {};
        if (accessToken) {
          headers.Authorization = `JWT ${accessToken}`;
        }

        fetch(`${url}`, { headers })
          .then((response) => {
            this.status = response.statusText;
            response.text().then((text) => {
              this.response = text;
            });
          });
      },
      logOutUser() {
        const accessToken = this.jwt;
        const memb = jwt.decode(accessToken).id;

        const headers = {};
        if (accessToken) {
          headers.Authorization = `JWT ${accessToken}`;
        }

        const url = `${cfg.server}/lgo/${memb}`;
        this.$log.info(` +++ LOG OUT USER '${memb}' AT '${url}' +++ `);

        fetch(`${url}`, { headers })
          .then((response) => {
            this.status = response.statusText;
            response.text().then((text) => {
              this.response = text;
            });
          });
      },
      purge() {
        const accessToken = this.jwt;
        const url = `${cfg.server}/purge`;

        this.$log.info(`  +++ PURGE USERS AT '${url}' +++ `);
        const headers = {};
        if (accessToken) {
          headers.Authorization = `JWT ${accessToken}`;
        }

        fetch(`${url}`, { headers })
          .then((response) => {
            this.status = response.statusText;
            response.text().then((text) => {
              this.response = text;
            });
          });
      },
    },
  };
</script>

<style scoped>

  .add-picture-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 998;
  }
  .image-card {
    position: relative;
    margin-bottom: 8px;
  }
  .image-card__picture > img {
    width:10%;
  }
  .image-card__comment {
    position: absolute;
    bottom: 0;
    height: 52px;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.5);
  }
  .image-card__comment > span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }

</style>
