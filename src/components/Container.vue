<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
};
</script>

<style lang="scss">
  .container {
    display: block;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 15px;
  }
</style>
