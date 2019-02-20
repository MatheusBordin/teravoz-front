<template>
  <vs-popup class="user-create" title="Novo usuário" :active.sync="showPopup">
    <vs-input class="user-create__input" size="large" label-placeholder="Nome" v-model="user.name"/>

    <vs-row>
      <vs-col vs-xs="12" vs-sm="12" vs-lg="6">
        <vs-input class="user-create__input" size="large" label-placeholder="E-Mail" v-model="user.email"/>
      </vs-col>
      <vs-col vs-xs="12" vs-sm="12" vs-lg="6">
        <vs-input class="user-create__input" size="large" label-placeholder="Telefone" v-model="user.callNumber"/>
      </vs-col>
    </vs-row>

    <vs-button :disabled="!userValid" class="user-create__action" size="large" color="primary" type="filled" @click="createUser()">Save</vs-button>
  </vs-popup>
</template>

<script>
export default {
  name: 'UserCreate',
  data() {
    return {
      user: {},
    };
  },
  computed: {
    showPopup: {
      get: function() {
        return this.$store.state.userPopupOpened;
      },
      set: function(value) {
        if (value) {
          this.$store.dispatch('openUserPopup');
        } else {
          this.$store.dispatch('closeUserPopup');
        }
      }
    },
    userValid: function() {
      return !!this.user.name && !!this.user.email && !!this.user.callNumber;
    }
  },
  methods: {
    createUser: function() {
      this.$vs.loading();

      this.$store.dispatch('createUser', {...this.user})
        .then(data => {
          this.$vs.loading.close();
          this.user = {};
          this.showPopup = false;

          this.$vs.notify({
            title:'Sucesso!',
            text:'Usuáro criado com sucesso.',
            color:'success'
          });
        })
        .catch(err => {
          this.$vs.loading.close();
          this.user = {};
          this.showPopup = false;

          this.$vs.notify({
            title:'Erro!',
            text:'Erro ao criar novo usuário.',
            color:'danger'
          });
        });
    }
  }
}
</script>

<style lang="scss">
  .user-create {
    &__input {
      width: calc(100% - 5px);
      margin: 12.5px 2.5px;
    }

    &__action {
      margin-top: 15px;
    }
  }
</style>
