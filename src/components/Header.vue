<template>
  <section id="hdr">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <router-link to="/">
              <img
                src="static/img/WaterDrop_50.png"
                alt="Iridium Blue Logo">
                <span data-cyp="appTitle" style="font-family: 'Advent Pro'; font-size: 48px;">iridium blue</span>
          </router-link>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <accessControl></accessControl>
        </div>
      </div>
    </nav>
<!--
        <div class="level-item">
          <button class="button is-small is-primary"
              @click="axsLvlSelectorOpen = !axsLvlSelectorOpen">
              Access Rights
          </button> &nbsp; &nbsp;
          <b-collapse class="panel" :open.sync="axsLvlSelectorOpen">



            <div class="block">
              <b-checkbox-button type="is-success" v-model="axsRights"
                @input="setRole" native-value="visitor" disabled>
                  Visitor
              </b-checkbox-button>
              <b-checkbox-button type="is-success" v-model="axsRights"
                @input="setRole" native-value="member">
                  Member
              </b-checkbox-button>
              <b-checkbox-button type="is-success" v-model="axsRights"
                @input="setRole" native-value="distributor">
                  Distributor
              </b-checkbox-button>
              <b-checkbox-button type="is-success" v-model="axsRights"
                @input="setRole" native-value="staff">
                  Staff
              </b-checkbox-button>
              <b-checkbox-button type="is-success" v-model="axsRights"
                @input="setRole" native-value="manager">
                  Manager
              </b-checkbox-button>
              <b-checkbox-button type="is-success" v-model="axsRights"
                @input="setRole" native-value="owner">
                  Owner
              </b-checkbox-button>
              <b-checkbox-button type="is-success" v-model="axsRights"
                @input="setRole" native-value="legalRepresentative">
                  Legal Representative
              </b-checkbox-button>
            </div>

          </b-collapse>
          <b-collapse :open="true">
            {{ axsRights }}
          </b-collapse>
        </div>
 -->
 
  </section>
</template>

<script>

  import authentication from './Auth';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    data() {
      return {
        lvlAcl: 0,
        axsLvlSelectorOpen: false,
        // axsRights: ['visitor'],
      };
    },
    computed: {
      // axsRoles() {
      //   this.$store.dispatch('setAxsRole', { roles: this.access });
      //   return this.access;
      // },
      // axsRights: {
      //   get: () => {
      //     LG(` .  .  .  .  ${this.access} `);
      //     return this.access;
      //   },
      //   set: (roles) => {
      //     LG(` .  .  .  . ${roles} vs ${this.access} `);
      //     this.access = roles;
      //   },
      // },
    },
    components: {
      accessControl: authentication,
    },
    methods: {
      // ...mapActions(['setAxsRole']),
      setRole() {
        this.access = this.axsRights;
        LG(`================================ ${this.access} vs ${this.axsRights}`);
        this.$store.dispatch('setAxsRole', { roles: this.axsRights });
      },
    },
  };
</script>

<style scoped>

  #hdr {
    text-align: center;
  }
</style>
