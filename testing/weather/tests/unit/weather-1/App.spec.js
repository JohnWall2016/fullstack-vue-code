import Vuex from 'vuex';
import App from '@/App';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';

describe('App.vue', () => {
  let wrapper;
  let store;
  let getters;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    getters = {
      loading: () => { return false }
    }

    store = new Vuex.Store({
      getters
    });

    wrapper = shallowMount(App, {
      localVue,
      store,
      stubs: ['router-link', 'router-view']
    });
  });

  it("should display the current day's date", () => {
    const formattedDate = new Date().toDateString();
    expect(wrapper.html()).to.contain(formattedDate);
  });
});
