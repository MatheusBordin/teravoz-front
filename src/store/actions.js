import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:4000/api/v1/'
});

const mockRequest = axios.create({
  baseURL: 'http://localhost:5000/'
});

export default {
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
};
