import { defineNuxtPlugin } from "#app";
import vue3GoogleLogin from 'vue3-google-login'
export default defineNuxtPlugin((nuxtApp)=> {
    nuxtApp.vueApp.use(vue3GoogleLogin, {
        clientId: '894199410977-lthq3006nj39oe5rd8f5vgjsl8ntvad1.apps.googleusercontent.com',
        scope: 'email',
        prompt: 'consent',
      })
})