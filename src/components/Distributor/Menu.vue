<template>
  <div @click="shutBurger" class="navbar-item has-dropdown is-hoverable">
    <router-link class="navbar-item"  :to="{ name: 'profile' }">
      Distributor
    </router-link>
    <div class="navbar-dropdown is-boxed">
      <router-link class="navbar-item"  :style="canOpen('profile')" :to="{ name: 'profile' }">
        Sales
      </router-link>
      <router-link class="navbar-item"  :style="canOpen('profile')" :to="{ name: 'profile' }">
        Bonus
      </router-link>
      <router-link class="navbar-item"  :style="canOpen('profile')" :to="{ name: 'profile' }">
        Bottle Inventory
      </router-link>
    </div>
  </div>
</template>

<script>

  import { shutBurgerMenu } from '@/utils/responsive';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    methods: {
      canOpen(path) {
        return this.$can('only_view', path) ? '' : 'color: bisque;';
      },
      shutBurger() { shutBurgerMenu(); },
    },
  };
</script>
