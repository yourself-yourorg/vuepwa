<template>
  <div>
    Dumb #A --> {{ counter }}
  </div>
</template>

<script>

  import cfg from '../config';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'A',
    data() {
      return {
        counter: 0,
      };
    },
    created() {
      this.counter = window.ls.get(cfg.reroutesCounterName, 0);
      const self = this;
      window.ls.on(cfg.reroutesCounterName, (val) => { self.counter = val; });
    },
  };
</script>


<style scoped>
</style>
