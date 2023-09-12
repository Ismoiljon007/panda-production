<template>
  <div class="overlay" v-if="store.overlay" @click="store.overlay = false, store.search_open = false"></div>
  <NuxtLayout/>
</template>
<script setup>
import { useStore } from '~~/store/store';
const store = useStore()

</script>