<template>
  <div @click="shutBurger" class="navbar-item has-dropdown is-hoverable">
    <router-link class="navbar-item"  :to="{ name: 'profile' }">
      Tests
    </router-link>
    <div class="navbar-dropdown is-boxed">
      <router-link class="navbar-item"  :style="canOpen('profile')" :to="{ name: 'emails' }">
        Emails
      </router-link>
      <router-link class="navbar-item"  :style="canOpen('profile')" :to="{ name: 'profile' }">
        Profile
      </router-link>
      <router-link class="navbar-item"  :style="canOpen('protected')" :to="{ name: 'protected' }">
        Protected
      </router-link>
      <router-link class="navbar-item"  :style="canOpen('classified')" :to="{ name: 'classified' }">
        Classified
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
