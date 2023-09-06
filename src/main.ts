import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from'../src/stores/index'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'


const app=createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.use(Toast, {
    position: POSITION.TOP_CENTER
  })

app.mount('#app')
