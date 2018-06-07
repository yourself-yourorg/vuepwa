<template>
  <div @click="shutBurger" class="navbar-item has-dropdown is-hoverable">
    <router-link class="navbar-item" :to="{ name: 'profile' }">
      Shop
    </router-link>
    <div class="navbar-dropdown is-boxed">
      <router-link class="navbar-item" :to="{ name: 'invoices/list' }">
        Invoicing
      </router-link>
      <router-link class="navbar-item" :to="{ name: 'products/list' }">
        Products
      </router-link>
      <router-link class="navbar-item" :to="{ name: 'profile' }">
        Payment
      </router-link>
      <router-link class="navbar-item" :to="{ name: 'profile' }">
        Bottle Returns
      </router-link>
    </div>
  </div>
</template>

<script>

  import { shutBurgerMenu } from '@/utils/responsive';

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {
    methods: {
      shutBurger() {
        // LG('------ ************ -----');
        shutBurgerMenu();
      },
    },
  };
</script>
