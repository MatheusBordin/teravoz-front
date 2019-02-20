export default {
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
};
