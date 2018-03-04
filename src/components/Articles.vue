<!-- src/components/Articles -->
 
<template>
  <main>
    <article v-for="article in articleList">
      <h1>{{ article.title }}</h1>
      <p>{{ article.content }}</p>
    </article>
  </main>
</template>
 
<script>
  import { mapGetters, mapActions, mapState } from 'vuex';

  export default {
    name: 'articles',

    computed: {
      ...mapGetters('articles', {
        articleList: 'list',
      }),

      ...mapState([
        'route', // vuex-router-sync
      ]),
    },

    methods: {
      ...mapActions('articles', {
        fetchArticles: 'fetchList',
      }),

      fetchData() {
        return this.fetchArticles();
      },
    },

    watch: {
      $route: 'fetchData',
    },

    created() {
      this.fetchData();
    },
  };
</script>
