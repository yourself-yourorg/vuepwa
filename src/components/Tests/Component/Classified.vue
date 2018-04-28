<template>
  <div>
    <h1>Classified Information!</h1>
    <hr />
    <p>Protected by routing, but otherwise exposed</p>
    <hr />
    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'root'}">
      <icon name="arrow-circle-up" />
      &nbsp;Home
    </router-link>
    <router-link class="button is-small is-link is-outlined" v-bind:to="{name: 'protected'}">
      <icon name="arrow-circle-left" />
      &nbsp;Protected
    </router-link>
  </div>
</template>
