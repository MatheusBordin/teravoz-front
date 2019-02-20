<template>
  <div>
    <vs-button
      class="call-button"
      size="large"
      radius
      color="primary"
      type="filled"
      icon="add"
      @click.stop="toggleInput()">
    </vs-button>

    <div class="call-number" v-if="inputOpened" @click.stop="">
      <input type="text" placeholder="Telefone" @keydown="unlockAutocomplete()" v-model="callNumber">
      <vs-button @click.stop="createNewCall()" class="call-number__btn" radius color="success" type="filled" icon="call"></vs-button>
      <ul v-if="!autocompleteLocked">
        <li v-if="autocompleteList.length === 0" @click.stop="setNumber(callNumber)">{{ callNumber }}</li>
        <li v-for="item of autocompleteList" :key="item.name" @click.stop="setNumber(item.callNumber)">
          {{ item.name }} - {{ item.callNumber }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallButton',

  data() {
    return {
      callNumber: '',
      inputOpened: false,
      hasUserSelected: false,
      prestine: true
    };
  },

  methods: {
    createNewCall: function() {
      this.$vs.loading();

      this.$store.dispatch('createCall', this.callNumber)
        .then(() => {
          this.$vs.loading.close();
          this.closeInput();
          this.callNumber = '';

          this.$vs.notify({
            title:'Sucesso!',
            text:'Processo de chamada iniciada.',
            color:'success'
          });
        })
        .catch(err => {
          this.$vs.loading.close();

          this.$vs.notify({
            title:'Erro!',
            text:'Erro ao iniciar a chamada.',
            color:'danger'
          });
        });
    },
    setNumber: function(number) {
      this.hasUserSelected = true;
      this.callNumber = number;
    },
    unlockAutocomplete: function() {
      this.hasUserSelected = false;
      this.prestine = false;
    },
    closeInput: function() {
      this.inputOpened = false;
      this.prestine = true;
    },
    openInput: function() {
      this.inputOpened = true;
    },
    toggleInput: function() {
      if (this.inputOpened) {
        this.closeInput();
      } else {
        this.openInput();
      }
    }
  },

  computed: {
    autocompleteLocked: function() {
      return this.hasUserSelected || this.prestine;
    },
    autocompleteList: function() {
      return this.$store.state.users.filter(x => !!x.callNumber.match(this.callNumber));
    }
  },

  created() {
    document.addEventListener('click', () => this.closeInput());
  }
}
</script>

<style lang="scss">
  .call-button {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 10;
  }

  .call-number {
    display: flex;
    align-items: center;
    position: fixed;
    width: 300px;
    height: 44px;
    max-width: calc(100% - 90px);
    bottom: 20px;
    right:  74px;
    border-radius: 21px;
    background: #FFF;
    z-index: 9;

    input {
      width: calc(100% - 44px);
      height: 44px;
      border: none;
      padding: 0 20px;
      z-index: 8;
      border-radius: 22px;
    }

    ul {
      position: fixed;
      bottom: 70px;
      right: 74px;
      width: 300px;
      max-height: 250px;
      overflow: auto;
      max-width: calc(100% - 90px);
      background: #f4f4f4;
      box-shadow: 0 -5px 15px 5px rgba(0, 0, 0, 0.05);
      z-index: 7;
      border-radius: 22px;
    }

    ul li {
      padding: 12.5px 20px;
      cursor: pointer;

      &:hover {
        background: #CCC;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #EEE;
      }
    }
  }
</style>
