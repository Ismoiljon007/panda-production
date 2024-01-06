// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "nuxt-swiper", "@nuxt/ui"],
  css: ["@/assets/scss/main.scss"],
  devtools: { enabled: false },
  routeRules: {
    "/categorie/**": { ssr: false },
  },
  ssr: false,
});
