<template>
  <vs-card class="metric-active">
    <h3> Chamadas ativas </h3>
    <p class="metric-active__value">
      {{ activeCalls }}
    </p>
  </vs-card>
</template>

<script>
export default {
  name: 'MetricCard',
  computed: {
    activeCalls: function() {
      return this.$store.state.calls.filter(x => x.status !== 'call.finished').length;
    },
  },
};
</script>

<style lang="scss">
  .metric-active {
    background: linear-gradient(to bottom right, #3ba386, #79ff7d);
    color: #FFF;
    padding: 20px 20px 5px;

    h3 {
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 10px;
    }

    &__value {
      font-size: 38px;
    }
  }
</style>
