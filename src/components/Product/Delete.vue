<template id="product-delete">
  <div>
    <h2>Delete product {{ product.name }}</h2>
    <form v-on:submit="deleteProduct">
      <p>The action cannot be undone.</p>
      <button type="submit" class="btn btn-danger">Delete</button>
      <router-link class="btn btn-default" v-bind:to="'/'">Cancel</router-link>
    </form>
  </div>
</template>


<script>
export default {
};
</script>
<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
</style>
