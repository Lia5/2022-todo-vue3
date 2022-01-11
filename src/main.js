// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './sass/styles.scss'
import i18n from './i18n'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App).use(i18n).use(store).use(router).use(VueSweetalert2);
app.mount('#app')