<template>
  <section>
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <router-link to="/">
          <div class="level-item">
            <img
              src="static/img/WaterDrop_50.png"
              alt="Iridium Blue Logo">
              <span data-cyp="appTitle" style="font-family: 'Advent Pro'; font-size: 48px;">iridium blue</span>
          </div>
        </router-link>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <accessControl></accessControl>
        </div>
      </div>
    </nav>
    <div class="block">
      <b-radio v-model="lvlAcl" native-value=0>Visitor</b-radio>
      <b-radio v-model="lvlAcl" native-value=1>Member</b-radio>
      <b-radio v-model="lvlAcl" native-value=2>Distributor</b-radio>
      <b-radio v-model="lvlAcl" native-value=3>Staff</b-radio>
      <b-radio v-model="lvlAcl" native-value=4>Manager</b-radio>
      <b-radio v-model="lvlAcl" native-value=5>Owner</b-radio>
      <b-radio v-model="lvlAcl" native-value=6>Legal Representative</b-radio>
    </div>
    <p class="content">
      <b>Access Level:</b>
      {{ lvlAcl }}
    </p>
  </section>
</template>

<script>

  import authentication from './Auth';

  export default {
    data() {
      return {
        lvlAcl: 0,
      };
    },
    components: {
      accessControl: authentication,
    },
  };
</script>

<style scoped>

</style>
