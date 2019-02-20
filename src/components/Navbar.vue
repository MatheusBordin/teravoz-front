<template>
  <nav class="navbar">
    <h1 class="navbar__brand">Teravoz</h1>

    <div class="navbar__content">
      <vs-button color="primary" :type="homeLinkType" @click="navigate('home')">Inicio</vs-button>
      <vs-button color="primary" :type="userLinkType" @click="navigate('user')">Usuários</vs-button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    homeLinkType: function() {
      return this.$route.name === 'home' ? 'gradient' : 'line';
    },
    userLinkType: function() {
      return this.$route.name === 'user' ? 'gradient' : 'line';
    },
  },
  methods: {
    navigate: function(name) {
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss">
  .navbar {
    display: flex;
    width: 100%;
    height: 120px;
    justify-content: space-between;
    align-items: center;

    &__brand {
      color: #666;
      font-weight: 300;
    }

    &__brand::before {
      display: inline-block;
      content: "T";
      font-weight: 300;
      width: 50px;
      height: 50px;
      margin-right: 20px;
      border: 1px solid #CCC;
      border-radius: 4px;
      text-align: center;
      line-height: 50px;
      color: #CCC;
    }

    &__content button {
      margin: 0 2.5px;
    }
  }
</style>
