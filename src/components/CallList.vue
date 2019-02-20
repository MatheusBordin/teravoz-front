<template>
  <div>
    <vs-card class="call-list">
      <h3 slot="header">{{ title }}</h3>
      <vs-alert v-if="calls.length === 0" active="true">
        Nenhuma chamada no momento.
      </vs-alert>

      <vs-table max-items="10" pagination v-else :data="calls">
        <template slot="thead">
          <vs-th>
            Status
          </vs-th>
          <vs-th>
            Fila
          </vs-th>
          <vs-th>
            Recepcionista
          </vs-th>
          <vs-th>
            Número do recepcionista
          </vs-th>
          <vs-th>
            Número do usuario
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <vs-td :data="data[indextr].status">
              {{data[indextr].status}}
            </vs-td>

            <vs-td :data="data[indextr].queue">
              {{data[indextr].queue}}
            </vs-td>

            <vs-td :data="data[indextr].receptionist">
              {{data[indextr].receptionist}}
            </vs-td>

            <vs-td :data="data[indextr].receptionistNumber">
              {{data[indextr].receptionistNumber}}
            </vs-td>

            <vs-td :data="data[indextr].userNumber">
              {{data[indextr].userNumber}}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-card>
  </div>
</template>

<script>
export default {
  name: 'CallList',
  props: ['calls', 'title']
};
</script>

<style lang="scss">
  .call-list {
    margin-top: 15px;
  }
</style>
