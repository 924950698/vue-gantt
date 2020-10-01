import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import Gantt from './components/Gantt.vue';
import Board from './components/Board.vue';
import Router from 'vue-router';

Vue.prototype.axios = axios;

Vue.use(Router);
// Vue.use(VueAxios, axios);
Vue.use(ElementUI);


const router = new Router({
  routes: [
    {
      path: '/',
      component: Gantt
    },
    {
      path: '/board',
      component: Board
    }
  ]
});

import './styles/quasar.styl';
import iconSet from 'quasar/icon-set/mdi-v3.js';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/mdi-v3/mdi-v3.css';
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel
} from 'quasar';

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel
  },
  directives: {},
  plugins: {},
  iconSet: iconSet
});

Vue.config.productionTip = false;

// step2：把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
// Vue.prototype.$axios = axios;

// step3：使每次请求都会带一个 /api 前缀 
// axios.defaults.baseURL = '/rest';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
