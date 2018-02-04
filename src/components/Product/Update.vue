<template id="product-edit">
  <div>
    <h2>Edit product</h2>
    <form v-on:submit="updateProduct">
      <div class="form-group">
        <label for="edit-name">Name</label>
        <input class="form-control" id="edit-name" v-model="product.name" required/>
      </div>
      <div class="form-group">
        <label for="edit-description">Description</label>
        <textarea class="form-control" id="edit-description" rows="3" v-model="product.description"></textarea>
      </div>
      <div class="form-group">
        <label for="edit-price">Price, <span class="glyphicon glyphicon-euro"></span></label>
        <input type="number" class="form-control" id="edit-price" v-model="product.price"/>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
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
