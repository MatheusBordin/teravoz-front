<template>
  <div id="app">
    <Container>
      <Navbar />
      <router-view/>
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

  created() {
    this.$store.dispatch('getUsers');

    SocketService.onCallList((calls) => this.$store.dispatch('setCalls', calls));
    SocketService.onCallAdded((call) => this.$store.dispatch('addCall', call));
    SocketService.onCallUpdated((call) => this.$store.dispatch('updateCall', call));
    SocketService.onCallRemoved((call) => this.$store.dispatch('updateCall', call));
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
</style>
