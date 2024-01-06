<template>
  <div  v-if="store.overlay" @click="store.overlay = false, store.search_open = false"></div>
</template>
<script setup>
import { useStore } from '~/store/store';
const store = useStore()
const add = ref(false)
</script>