<template>
  <div @click="shutBurger" class="navbar-item has-dropdown is-hoverable">
    <router-link class="navbar-item"  :to="{ name: 'profile' }">
      Tests
    </router-link>
    <div class="navbar-dropdown is-boxed">
      <router-link class="navbar-item"  :to="{ name: 'emails' }">
        Emails
      </router-link>
      <router-link class="navbar-item"  :to="{ name: 'profile' }">
        Profile
      </router-link>
      <router-link class="navbar-item"  :to="{ name: 'protected' }">
        Protected
      </router-link>
      <router-link class="navbar-item"  :to="{ name: 'classified' }">
        Classified
      </router-link>
    </div>
  </div>
</template>

<script>

  import { shutBurgerMenu } from '../MainLayout/responsive';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    methods: {
      shutBurger() {
        shutBurgerMenu();
      },
    },
  };
</script>
