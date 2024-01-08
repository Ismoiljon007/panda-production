<template>
  <Head>
    <Title>Panda Production - kino va seriallar eng yaxshi sifatda.</Title>
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

const store = useStore()
const add = ref(false)
const router = useRouter()
store.loader = true
onMounted(() => {
  setTimeout(() => {

  }, 120000)
})
</script>