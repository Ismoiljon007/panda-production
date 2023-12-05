// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "nuxt-swiper"],
  css: ["~/assets/scss/main.scss"],
  devtools: { enabled: false },
  runtimeConfig: {
    apiSecret: "https://catalogservice.inminternational.uz",
    public: {
      apiBase: "https://catalogservice.inminternational.uz",
    },
  },
  routeRules: {
    "/categorie/**": { ssr: false },
  },
});
