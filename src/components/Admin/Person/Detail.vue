<template>
  <article>
    <div>{{ row.nombre }}</div>
  </article>
</template>

<script>

  export default {
    name: 'Detail',
    props: ['row'],
  };
</script>
