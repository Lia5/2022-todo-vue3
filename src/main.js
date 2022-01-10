// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './sass/styles.scss'
import i18n from './i18n'

const app = createApp(App).use(i18n).use(store).use(router)
app.mount('#app')