import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuesax from 'vuesax';
import MetricActive from '@/components/MetricActive.vue';
import MetricFinished from '@/components/MetricFinished.vue';
import actions from '../../src/store/actions';
import mutations from '../../src/store/mutations';
import state from '../../src/store/state';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuesax);

describe('MetricActive.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: state(),
      actions,
      mutations
    });
  });

  it('Show count of active calls only', () => {
    const wrapper = shallowMount(MetricActive, {
      localVue,
      store
    });

    store.dispatch('addCall', { status: 'call.new' });
    store.dispatch('addCall', { status: 'call.finished' });
    store.dispatch('addCall', { status: 'call.new' });

    expect(wrapper.find('.metric-active__value').text()).toBe('2');
  });
});

describe('MetricFinished.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: state(),
      actions,
      mutations
    });
  });

  it('Show count of ended calls only', () => {
    const wrapper = shallowMount(MetricFinished, {
      localVue,
      store
    });

    store.dispatch('addCall', { status: 'call.new' });
    store.dispatch('addCall', { status: 'call.finished' });
    store.dispatch('addCall', { status: 'call.new' });

    expect(wrapper.find('.metric-active__value').text()).toBe('1');
  });
});
