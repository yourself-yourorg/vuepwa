<template>
  <div>
    i r i d i u m   b l u e
  </div>
</template>

<script>

  // const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'Splash',
    created: function () { // eslint-disable-line func-names, object-shorthand
      // LG('********* Splash View ********');
      const qry = this.$route.query;
      if (qry.tkn) delete qry.tkn;
      this.$router.push({ name: 'home', query: qry });
    },
  };
</script>


<style scoped>
</style>