import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$axios = axios.create({
baseURL: "https://port-0-closers-b-nx562olf7hxiil.sel3.cloudtype.app/"
})

app.mount('#app')
