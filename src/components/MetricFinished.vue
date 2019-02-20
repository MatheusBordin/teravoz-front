<template>
  <vs-card class="metric-finished">
    <h3> Chamadas finalizadas </h3>
    <p class="metric-active__value">
      {{ finishedCalls }}
    </p>
  </vs-card>
</template>

<script>
export default {
  name: 'MetricCard',
  computed: {
    finishedCalls: function() {
      return this.$store.state.calls.filter(x => x.status === 'call.finished').length;
    },
  },
};
</script>

<style lang="scss">
  .metric-finished {
    background: linear-gradient(to bottom right, #b9943f, #fbcf50);
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
