<template>
  <div id="pauth">
    <b-collapse id="divTbl" :open="true">
      <button class="button is-small is-primary" slot="trigger">Authorizations Tester</button>
      <div>
        <table id="axsCtrl" class="table is-narrow is-hoverable is-size-6">
          <thead>
            <tr>
              <th id="colRsrc">Resource</th>
              <th id="colPrvlg">Privilege</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in domains">
              <th id="colRsrc" class="is-size-7">{{ row.name }}</th>
              <td id="colPrvlg">
                <b-field>
                  <b-select class="is-size-7" :placeholder="row.name" v-model="axsLvl[row.name]">
                    <option v-for="l in axsLvls" :value="l.id" :key="l.id">
                     {{ l.axs }}
                    </option>
                  </b-select>
                </b-field>
              </td>
              <td class="is-info is-hidden">{{ axsLvls[axsLvl[row.name]].axs }}</td>
            </tr>
          </tbody>
          <tfoot class="is-hidden">
            <tr>
              <th id="colRsrc">Resource</th>
              <th id="colPrvlg">Privilege</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </b-collapse>

    <div>
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
 -->
    </div>

  </div>
</template>


<script>

  // import { mapMutations, mapState, mapGetters } from 'vuex';
  import { mapMutations, mapState } from 'vuex';
  import { Levels as accessLevels } from '@/accessControl';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    data() {
      return {
        axsLvls: accessLevels.olvls,
        axsLvl: { Example: 0, Person: 0 },
        // axsLvlTblDef: {
        //   Classified: { name: 'Classified' },
        //   Protected: { name: 'Protected' },
        // },
        role: 'admin',
      };
    },
    computed: {
      ...mapState('a12n', ['domains']),
    },
    methods: {
      ...mapMutations('a12n', [
        'changeRole',
      ]),
      onRoleChange() {
        LG(`================================ ${this.domains}`);
        this.changeRole(this.role);
      },
    },
  };

  // import { mapMutations, mapState, mapGetters } from 'vuex';
  // import { Levels as accessLevels } from '@/accessControl';

  // import authentication from './Auth';


  // const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  // // const axsLvls = ['No Access', 'View Only', 'Comment', 'Alter', 'Own'];
  // LG('ACCESS LEVELS :::::::::::::');
  // LG(accessLevels.alvls[accessLevels.OWN]);

  // export default {
  //   data() {
  //     return {
  //       activeTab: 0,
  //       aclDebug: false,

  //       lvlAcl: 0,
  //       axsLvlSelectorOpen: false,
  //       role: 'admin',
  //       // axsLvls: Array.from(axsLvls, (x, ix) => ({ id: ix, axs: x })),
  //       axsLvls: accessLevels.olvls,
  //       axsLvl: { Classified: 0, Protected: 0 },
  //       axsLvlTblDef: {
  //         Classified: { name: 'Classified' },
  //         Protected: { name: 'Protected' },
  //       },
  //       // axsRights: ['visitor'],
  //     };
  //   },
  //   computed: {
  //     theVersion() {
  //       return window.version;
  //     },
  //     ...mapState([
  //       'a12n.user',
  //     ]),
  //     ...mapGetters({
  //       jwt: 'axsToken',
  //       isHere: 'isActive',
  //       isKnown: 'isAuthenticated',
  //     }),

  //     // axsRoles() {
  //     //   this.$store.dispatch('setAxsRole', { roles: this.access });
  //     //   return this.access;
  //     // },
  //     // axsRights: {
  //     //   get: () => {
  //     //     LG(` .  .  .  .  ${this.access} `);
  //     //     return this.access;
  //     //   },
  //     //   set: (roles) => {
  //     //     LG(` .  .  .  . ${roles} vs ${this.access} `);
  //     //     this.access = roles;
  //     //   },
  //     // },
  //   },
  //   components: {
  //     accessControl: authentication,
  //   },
  //   methods: {
  //     showTab() {
  //       return true;
  //     },
  //     ...mapMutations([
  //       'changeRole',
  //     ]),
  //     onRoleChange() {
  //       this.changeRole(this.role);
  //     },
  //     // ...mapActions(['setAxsRole']),
  //     setRole() {
  //       this.access = this.axsRights;
  //       // LG(`================================ ${this.access} vs ${this.axsRights}`);
  //       this.$store.dispatch('setAxsRole', { roles: this.axsRights });
  //     },
  //     qtst() {
  //       LG();
  //     },
  //     prog() {
  //       LG(' ------- prog -------');
  //     },
  //   },
  // };

</script>

<style scoped>

  #pauth {
    text-align: center;
  }

  #divTbl {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  #axsCtrl {
    width: 70%;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.05);
  }

  #colRsrc {
    text-align: right;
    vertical-align: bottom;
    padding-bottom: 8px;
  }
  #colPrvlg {
    text-align: left;
    padding-left: 18px;
  }
</style>
