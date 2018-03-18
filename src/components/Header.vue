<template>
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
        v0.0.9
      </div>
      <div class="level-item">
        <accessControl></accessControl>
      </div>
    </div>
  </nav>
</template>

<script>

  import authentication from './Auth';

  export default {
    components: {
      accessControl: authentication,
    },
  };
</script>

<style scoped>

</style>
