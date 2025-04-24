import { createApp } from 'vue'
import App from './App.vue'
import { createLanguageProvider } from './composables/useLanguage'
import './styles/main.css'

const app = createApp(App)

// Create and provide the language context
const languageProvider = createLanguageProvider()
app.provide('language', languageProvider)

app.mount('#app')