import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const request = axios.create({
  baseURL: 'http://localhost:4000/api/v1/'
});

const mockRequest = axios.create({
  baseURL: 'http://localhost:5000/'
});

export default new Vuex.Store({
  state: {
    calls: [],
    users: [],
    userPopupOpened: false
  },
  mutations: {
    updateCall(state, call) {
      const idx = state.calls.findIndex(x => x.teravozId === call.teravozId);
      state.calls.splice(idx, 1, call);
    },
    removeCall(state, call) {
      const idx = state.calls.findIndex(x => x.teravozId === call.teravozId);
      state.calls.splice(idx, 1);
    },
    addCall(state, call) {
      state.calls.unshift(call);
    },
    setCalls(state, calls) {
      state.calls = calls;
    },
    setUsers(state, users) {
      state.users = users;
    },
    addUser(state, user) {
      state.users.push(user);
    },
    removeUser(state, user) {
      const idx = state.users.findIndex(x => x._id === user._id);
      state.users.splice(idx, 1);
    },
    setUserPopupStatus(state, value) {
      state.userPopupOpened = value;
    }
  },
  actions: {
    updateCall({ commit }, call) {
      commit('updateCall', call);
    },
    removeCall({ commit }, call) {
      commit('removeCall', call);
    },
    addCall({ commit }, call) {
      commit('addCall', call);
    },
    setCalls({ commit }, calls) {
      commit('setCalls', calls);
    },
    getUsers({ commit }) {
      request.get('/user')
        .then(response => {
          commit('setUsers', response.data);
        });
    },
    createUser({ commit }, user) {
      return request.post('/user', user)
        .then(response => {
          commit('addUser', response.data);
          return response.data;
        });
    },
    removeUser({ commit }, user) {
      return request.delete(`/user/${user._id}`)
        .then(response => {
          commit('removeUser', response.data);
          return response.data;
        });
    },
    openUserPopup({ commit }) {
      commit('setUserPopupStatus', true);
    },
    closeUserPopup({ commit }) {
      commit('setUserPopupStatus', false);
    },
    createCall({ commit }, phone) {
      return mockRequest.post(`/call/${phone}`);
    }
  },
});
