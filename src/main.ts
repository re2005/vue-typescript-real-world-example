import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import '@/assets/scss/styles.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import authService from '@/services/authentication.service';
import '@/helpers/validators';

Vue.config.productionTip = false;
Vue.prototype.$authService = authService;

library.add(fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);
Vue.use(Buefy, {
    defaultIconPack: 'fas',
    defaultIconComponent: 'vue-fontawesome'
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
