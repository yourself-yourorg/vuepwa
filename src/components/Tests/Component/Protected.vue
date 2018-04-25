<template>
  <div>
    <h1>Some Protected Sections!</h1>
    <hr />
    <p>Unprotected text</p>

    <p v-show="$isAllowed('viewParagraph')">Protected text!</p>
 
    <hr />
    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'root'}">
      <icon name="arrow-circle-up" />
      &nbsp;Home
    </router-link>
    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'classified'}">
      <icon name="arrow-circle-right" />
      &nbsp;Classified
    </router-link>
  </div>
</template>

<script>
// import elementLevelProtection from '@/accessControl/Perimeters/Protected';
import { perimeters as acl } from '@/accessControl';

export default {
  perimeters: [acl.protectedPerimeter],
};
</script>
