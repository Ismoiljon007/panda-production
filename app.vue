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
</script>