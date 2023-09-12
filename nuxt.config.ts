// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-swiper'],
  css: ['~/assets/scss/main.scss'],
  devtools: { enabled: false }
})
