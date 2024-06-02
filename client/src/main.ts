import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { clerkPlugin } from 'vue-clerk/plugin'

const pinia = createPinia()

createApp(App)
  .use(clerkPlugin, {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  })
  .use(pinia)
  .mount('#app')
