<template>
  <div class="metric">
    <vs-row>
      <vs-col vs-xs="6" vs-sm="6" vs-lg="6">
        <div class="metric__active">
          <MetricActive />
        </div>
      </vs-col>
      <vs-col vs-xs="6" vs-sm="6" vs-lg="6">
        <div class="metric__finished">
          <MetricFinished />
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import MetricActive from './MetricActive.vue';
import MetricFinished from './MetricFinished.vue';

export default {
  name: 'Metric',
  components: { MetricActive, MetricFinished },
};
</script>

<style lang="scss">
  .metric {
    &__active {
      padding-right: 10px;
    }

    &__finished {
      padding-left: 10px;
    }
  }
</style>
