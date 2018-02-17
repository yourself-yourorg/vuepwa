<template>
  <div>
    Dumb #A --> {{ counter }}
  </div>
</template>

<script>
  // Import the EventBus.
  // import EventBus from '../event-bus';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'A',
    data() {
      return {
        counter: 0,
      };
    },
    created() {
      this.counter = window.ls.get('counter', 0);
      const self = this;
      window.ls.on('counter', (val) => { self.counter = val; });
    },
  };
</script>


<style scoped>
</style>
