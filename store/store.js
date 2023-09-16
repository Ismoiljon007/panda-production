import { defineStore } from 'pinia'

export const useStore = defineStore('store', ()=> {
    const baseUrl = 'https://catalogservice.inminternational.uz'
    const loader = ref(false)
    const overlay = ref(false)
    const search_open = ref(false)
    return {
        baseUrl,
        loader,
        overlay,
        search_open
    }
})