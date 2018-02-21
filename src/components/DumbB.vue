<template>
  <div>
    <button type="button" @click="increment()">Increment</button>
    <button type="button" @click="decrement()">Decrement</button>
    <div> Dumb #B -- count {{ counter }} </div>
  </div>
</template>

<script>

  import cfg from '../config';

  // const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    name: 'B',
    data() {
      return {
        counter: 0,
      };
    },
    watch: {
      counter(val) {
        window.ls.set(cfg.reroutesCounterName, val);
      },
    },
    created() {
      this.counter = window.ls.get(cfg.reroutesCounterName, 0);
      const self = this;
      window.ls.on(cfg.reroutesCounterName, (val) => { self.counter = val; });
    },
    methods: {
      increment() {
        this.counter += 1;
      },

      decrement() {
        this.counter -= 1;
      },
    },
  };
</script>


<style scoped>
</style>
