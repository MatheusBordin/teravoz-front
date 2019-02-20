import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuesax from 'vuesax';
import UserCreate from '@/components/UserCreate.vue';
import state from '../../src/store/state';
import actions from '../../src/store/actions';
import mutations from '../../src/store/mutations';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuesax);

describe('UserCreate.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: state(),
      actions: {
        ...actions,
        createUser: (ctx, user) => Promise.resolve(user),
      },
      mutations,
    });
  });

  it('User must have email', () => {
    const wrapper = shallowMount(UserCreate, {
      localVue,
      store
    });

    wrapper.setData({
      user: {
        name: 'Matheus',
        callNumber: '0001'
      },
    });

    expect(wrapper.vm.userValid).toBe(false);
  });

  it('User must have call number', () => {
    const wrapper = shallowMount(UserCreate, {
      localVue,
      store
    });

    wrapper.setData({
      user: {
        name: 'Matheus',
        email: 'test@teravoz.com.br'
      },
    });

    expect(wrapper.vm.userValid).toBe(false);
  });

  it('User must have name', () => {
    const wrapper = shallowMount(UserCreate, {
      localVue,
      store
    });

    wrapper.setData({
      user: {
        callNumber: '0001',
        email: 'test@teravoz.com.br'
      },
    });

    expect(wrapper.vm.userValid).toBe(false);
  });

  it('Listen open popup event', () => {
    const wrapper = shallowMount(UserCreate, {
      localVue,
      store
    });

    store.dispatch('openUserPopup');

    expect(wrapper.vm.showPopup).toBe(true);
  });

  it('Listen close popup event', () => {
    const wrapper = shallowMount(UserCreate, {
      localVue,
      store
    });

    store.dispatch('closeUserPopup');

    expect(wrapper.vm.showPopup).toBe(false);
  });
});
