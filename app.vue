<template>
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
onMounted(() => {
  setTimeout(() => {
    add.value = true
  }, 120000)
})
async function chechToken() {
  if(store.token) {
    try {
      const data = await $fetch(store.authBase + '/auth/verify-token', {
        headers: {
          'Authorization': 'Bearer ' + store.token
        }
      })
      if (data?.status != 'success') {
        router.push('/')
        localStorage.clear()
        token.value = false
        store.token = typeof window !== "undefined"
          ? localStorage.getItem("access__token")
          : null;
      }
    } catch (error) {
      router.push('/')
      localStorage.clear()
      token.value = false
      store.token = typeof window !== "undefined"
        ? localStorage.getItem("access__token")
        : null;
    } finally {
  
    }
  }
}
onMounted(() => {
  chechToken()
})
</script>