<template>
  <div>
    <vs-card class="user-list">
      <h3 slot="header">
        Usuários
        <vs-button color="success" type="filled" @click="tooglePopup()">Novo</vs-button>
      </h3>
      <vs-alert v-if="users.length === 0" active="true">
        Nenhum usuário cadastrado.
      </vs-alert>

      <vs-table v-else :data="users">
        <template slot="thead">
          <vs-th>
            Nome
          </vs-th>
          <vs-th>
            Email
          </vs-th>
          <vs-th>
            Telefone
          </vs-th>
          <vs-th>
            Ações
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <vs-td :data="data[indextr].name">
              {{data[indextr].name}}
            </vs-td>

            <vs-td :data="data[indextr].email">
              {{data[indextr].email}}
            </vs-td>

            <vs-td :data="data[indextr].callNumber">
              {{data[indextr].callNumber}}
            </vs-td>

            <vs-td :data="data[indextr].callNumber">
              <vs-button color="danger" type="filled" @click="removeUser(data[indextr])">Remove</vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-card>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  computed: {
    users: function() {
      return this.$store.state.users;
    },
  },
  methods: {
    tooglePopup: function() {
      this.$store.dispatch('openUserPopup');
    },
    removeUser: function(user) {
      this.$vs.loading();

      this.$store.dispatch('removeUser', {...user})
        .then(data => {
          this.$vs.loading.close();
          this.$store.dispatch('closeUserPopup');

          this.$vs.notify({
            title:'Sucesso!',
            text:'Usuáro removido com sucesso.',
            color:'success'
          });
        })
        .catch(err => {
          this.$vs.loading.close();
          this.$store.dispatch('closeUserPopup');

          this.$vs.notify({
            title:'Erro!',
            text:'Erro ao remover novo usuário.',
            color:'danger'
          });
        });
    }
  }
};
</script>

<style lang="scss">
  .user-list h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
