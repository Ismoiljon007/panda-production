import { defineStore } from 'pinia'

export const useStore = defineStore('store', ()=> {
    const baseUrl = 'http://95.47.127.26:50008'
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