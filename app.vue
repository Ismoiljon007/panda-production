<template>
  <Head>
        <Link rel="icon" href="/panda-icon-2.png" type="image/x-icon" sizes="16x16" />
    </Head>
  <div class="overlay" v-if="store.overlay" @click="store.overlay = false, store.search_open = false"></div>
  <NuxtLayout />
  <loading />
  <div class="add" v-if="add">
    <img src="@/assets/images/png/reklama.png" alt="">
    <button @click="add = false">
      <img src="@/assets/images/svg/close-ad.svg" alt="">
    </button>
  </div>
</template>
<script setup>
import { useStore } from '~/store/store';
useHead({
  title: 'PandaTV.uz - kino va seriallar eng yaxshi sifatda.',
  meta: [
    { hid: 'description', name: 'description', content: "PandaTV.uz - har qanday didga mos keluvchi keng kontent tanloviga ega bo'lgan ko'ngilochar platforma." },
    { hid: 'og:title', property: 'og:title', content: 'PandaTV.uz - kino va seriallar eng yaxshi sifatda.' },
    { hid: 'og:description', property: 'og:description', content: "PandaTV.uz - har qanday didga mos keluvchi keng kontent tanloviga ega bo'lgan ko'ngilochar platforma." },
    { hid: 'og:image', property: 'og:image', content:  '/panda-icon-2.png'},
    { hid: 'og:url', property: 'og:url', content: 'pandatv.uz' },
    { hid: 'telegram:channel', property: 'telegram:channel', content: 'https://t.me/azamataxrorov1' },
    // Add other meta tags as needed
  ],
})
const store = useStore()
const add = ref(false)
const router = useRouter()
store.loader = true
onMounted(() => {
  setTimeout(() => {

  }, 120000)
})
</script>