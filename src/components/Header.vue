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

    <a class="button is-small" @click="qtst">
      Quick Test
    </a>

    <p>
      <input
        type="radio"
        name="role"
        value="admin"
        v-model="role"
        @change="onRoleChange" />
      <label>Admin</label>
    </p>
    <p>
      <input
        type="radio"
        name="role"
        value="user"
        v-model="role"
        @change="onRoleChange" />
      <label>Regular User</label>
    </p>

<!-- 
    <b-field label="Simple">
      <b-select placeholder="Select a name">
        <option
          v-for="option in data"
          :value="option.id"
          :key="option.id">
          {{ option.user.first_name }}
        </option>
      </b-select>
    </b-field>
 -->

    <table class="table is-narrow is-hoverable">
      <thead><tr><th>Resource</th><th colspan=2 class="text-center">Privilege</th></tr></thead>
      <tbody>
        <tr v-for="row in axsLvlTblDef">
          <th>{{ row.name }}</th>
          <td>
            <b-field>
              <b-select :placeholder="row.name" v-model="axsLvl[row.name]">
                <option v-for="l in axsLvls" :value="l.id" :key="l.id">{{ l.axs }}</option>
              </b-select>
            </b-field>
          </td>
          <td>{{ axsLvls[axsLvl[row.name]].axs }}</td>
<!-- 
          <td>
            <b-field>
              <b-select placeholder="Classified" v-model="axsLvl.Classified">
                <option v-for="l in axsLvls" :value="l.id" :key="l.id">{{ l.axs }}</option>
              </b-select>
            </b-field>
          </td>
          <td>{{ axsLvls[axsLvl.Classified].axs }}</td>
 -->
        </tr>
      </tbody>
      <tfoot><tr><th>Resource</th><th colspan=2 class="text-center">Privilege</th></tr></tfoot>
    </table>

    <ul is-pulled-left>
      <li><b-icon size="is-small" icon="unlock-alt" />
        <router-link :to="{ name: 'protected' }">
          Protected
        </router-link>
      </li>
      <li><b-icon size="is-small" icon="user-secret" />
        <router-link :to="{ name: 'classified' }">
          Classified
        </router-link>
      </li>
    </ul>

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

  import { mapMutations, mapState } from 'vuex';

  import authentication from './Auth';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  const axsLvls = ['No Access', 'View Only', 'Comment', 'Alter', 'Own'];
  
  export default {
    data() {
      return {
        lvlAcl: 0,
        axsLvlSelectorOpen: false,
        role: 'admin',
        axsLvls: Array.from(axsLvls, (x, ix) => ({ id: ix, axs: x })),
        axsLvl: { Classified: 0, Protected: 0 },
        axsLvlTblDef: {
          Classified: { name: 'Classified' },
          Protected: { name: 'Protected' },
        },
        // axsRights: ['visitor'],
      };
    },
    computed: {
      ...mapState([
        'a12n.user',
      ]),

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
      ...mapMutations([
        'changeRole',
      ]),
      onRoleChange() {
        this.changeRole(this.role);
      },
      // ...mapActions(['setAxsRole']),
      setRole() {
        this.access = this.axsRights;
        // LG(`================================ ${this.access} vs ${this.axsRights}`);
        this.$store.dispatch('setAxsRole', { roles: this.axsRights });
      },
      qtst() {
        LG();
      },
      prog() {
        LG(' ------- prog -------');
      },
    },
  };
</script>

<style scoped>

  #hdr {
    text-align: center;
  }
</style>
