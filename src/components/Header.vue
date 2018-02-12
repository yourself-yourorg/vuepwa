<template>
  <nav class="level">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item">
        <img
          src="static/img/WaterDrop_50.png"
          alt="Demo of a microservice SPA PWA">
          <span style="font-family: 'Advent Pro'; font-size: 48px;">iridium blue</span>
      </div>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <div class="level-item">
        <accessControl></accessControl>
      </div>
    </div>
  </nav>
</template>

<script>

  import accessControl from './AccessControl';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    components: {
      accessControl: accessControl.Auth,
    },
    // data() {
    //   return {
    //     scrap: 'Scrap',
    //   };
    // },
  };
</script>

<style scoped>

</style>
