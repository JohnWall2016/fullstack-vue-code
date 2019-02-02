import Vuex from 'vuex';
import App from '@/App';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';

describe('App.vue', () => {
  let wrapper;
  let store;
  let getters;

  const setUpWrapper = loading => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    getters = {
      loading: () => {
        return loading;
      }
    };
    store = new Vuex.Store({
      getters
    });

    wrapper = shallowMount(App, {
      localVue,
      store,
      stubs: ['router-link', 'router-view']
    });
  };

  it("should display the current day's date", () => {
    setUpWrapper(false);

    const formattedDate = new Date().toDateString();
    expect(wrapper.html()).to.contain(formattedDate);
  });

  it('should display the footer links when application is not loading', () => {
    setUpWrapper(false);
    const footerLinks = wrapper.find('.app__cities');

    expect(footerLinks.html()).to.contain(
      '<router-link-stub to="/weather/2459115">New York City, New York</router-link-stub>'
    );
    expect(footerLinks.html()).to.contain(
      '<router-link-stub to="/weather/468739">Buenos Aires, Argentina</router-link-stub>'
    );
    expect(footerLinks.html()).to.contain(
      '<router-link-stub to="/weather/2122265">Moscow, Russia</router-link-stub>'
    );
    expect(footerLinks.html()).to.contain(
      '<router-link-stub to="/weather/1118370">Tokyo, Japan</router-link-stub>'
    );
    expect(footerLinks.html()).to.contain(
      '<router-link-stub to="/weather/1105779">Sydney, Australia</router-link-stub>'
    );
    expect(footerLinks.html()).to.contain(
      '<router-link-stub to="/weather/1398823">Lagos, Nigeria</router-link-stub>'
    );
  });

  it('should not display footer links when application is loading', () => {
    setUpWrapper(true);
    const footerLinks = wrapper.find('.app__cities');

    expect(footerLinks.html()).to.not.contain(
      '<router-link-stub to="/weather/2459115">New York City, New York</router-link-stub>'
    );
    expect(footerLinks.html()).to.not.contain(
      '<router-link-stub to="/weather/468739">Buenos Aires, Argentina</router-link-stub>'
    );
    expect(footerLinks.html()).to.not.contain(
      '<router-link-stub to="/weather/2122265">Moscow, Russia</router-link-stub>'
    );
    expect(footerLinks.html()).to.not.contain(
      '<router-link-stub to="/weather/1118370">Tokyo, Japan</router-link-stub>'
    );
    expect(footerLinks.html()).to.not.contain(
      '<router-link-stub to="/weather/1105779">Sydney, Australia</router-link-stub>'
    );
    expect(footerLinks.html()).to.not.contain(
      '<router-link-stub to="/weather/1398823">Lagos, Nigeria</router-link-stub>'
    );
  });
});
