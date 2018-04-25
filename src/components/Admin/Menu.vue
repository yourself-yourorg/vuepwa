<template>
  <div @click="shutBurger" class="navbar-item has-dropdown is-hoverable">
    <router-link class="navbar-item"  :to="{ name: 'profile' }">
      Admin
    </router-link>
    <div class="navbar-dropdown is-boxed">
      <router-link class="navbar-item"  :to="{ name: 'profile' }">
        User Management
      </router-link>
      <router-link class="navbar-item"  :to="{ name: 'profile' }">
        Accounts Payable
      </router-link>
      <router-link class="navbar-item"  :to="{ name: 'profile' }">
        Accounts Receivable
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
