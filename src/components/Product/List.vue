<template id="product-list">
  <div>
    <div class="actions">
      <router-link class="btn btn-default" v-bind:to="{path: '/add-product'}">
        <span class="glyphicon glyphicon-plus"></span>
        Add product
      </router-link>
    </div>
    <div class="filters row">
      <div class="form-group col-sm-3">
        <label for="search-element">Product name</label>
        <input v-model="searchKey" class="form-control" id="search-element" requred/>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th class="col-sm-2">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in filteredProducts">
        <td>
          <router-link v-bind:to="{name: 'product', params: {product_id: product.id}}">{{ product.name }}</router-link>
        </td>
        <td>{{ product.description }}</td>
        <td>
          {{ product.price }}
          <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
        </td>
        <td>
          <router-link class="btn btn-warning btn-xs" v-bind:to="{name: 'product-edit', params: {product_id: product.id}}">Edit</router-link>
          <router-link class="btn btn-danger btn-xs" v-bind:to="{name: 'product-delete', params: {product_id: product.id}}">Delete</router-link>
        </td>
      </tr>
      </tbody>
    </table>
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
