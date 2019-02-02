import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeContainer from './components/HomeContainer.vue';
import WeatherContainer from './components/WeatherContainer.vue';
import NotFoundContainer from './components/NotFoundContainer.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeContainer  
    },
    {
      path: '/weather/:id',
      component: WeatherContainer,
      props: true,
      beforeEnter: (to, from, next) => {
        const id = to.params.id;
        if (
          ![
            2459115,
            468739,
            2122265,
            1118370,
            1105779,
            1398823
          ].includes(Number(id))
        ) {
          next("/not-found");
        } else {
          next();
        }
      }
    },
    {
      path: '*',
      component: NotFoundContainer  
    }
  ]
});

export default router;
