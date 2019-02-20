<template>
  <div class="home">
    <Metric />
    <CallList :calls="activeCalls" title="Chamadas ativas" />
    <CallList :calls="finishedCalls" title="Chamadas finalizadas" />
  </div>
</template>

<script>
import Metric from '@/components/Metric.vue'
import CallList from '@/components/CallList.vue'

export default {
  name: 'Home',
  components: {
    Metric,
    CallList,
  },
  computed: {
    activeCalls: function() {
      return this.$store.state.calls.filter(x => x.status !== 'call.finished');
    },
    finishedCalls: function() {
      return this.$store.state.calls.filter(x => x.status === 'call.finished');
    }
  }
}
</script>
