<template>
  <div id="app">
    <Container>
      <Navbar />
      <transition :name="transitionName" mode="out-in">
        <router-view/>
      </transition>
    </Container>

    <CallButton />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Container from './components/Container.vue';
import CallButton from './components/CallButton.vue';
import SocketService from './services/socket.js';

export default {
  components: { Navbar, Container, CallButton },

  data() {
    return { transitionName: 'slide-right' };
  },

  created() {
    this.$store.dispatch('getUsers');

    SocketService.onCallList((calls) => this.$store.dispatch('setCalls', calls));
    SocketService.onCallAdded((call) => this.$store.dispatch('addCall', call));
    SocketService.onCallUpdated((call) => this.$store.dispatch('updateCall', call));
    SocketService.onCallRemoved((call) => this.$store.dispatch('updateCall', call));
  },

  watch: {
    '$route': function(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: 'Lato', sans-serif;
  background: #f1f1f1;
}

#app {
  width: 100%;
  height: 100%;
}

.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
