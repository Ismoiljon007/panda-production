<template>
    <main>
        <div class="saved">
            <div class="container">
                <div class="saved__top">
                </div>
                <div class="saved__bottom">
                    <Nav />
                    <div class="saved__bottom-wrapper">
                        <div class="saved__items" v-if="store.savedMovies?.data?.content?.length">
                            <movie-card v-for="item in store.savedMovies?.data?.content" :key="item" :movie="item" />
                        </div>
                        <div class="saved__not-found" v-if="!store.savedMovies?.data?.content?.length">
                            <span class="saved__not-found-icon">:(</span>
                            <h2 class="saved__not-fount-title">Tanlanganlar yoq</h2>
                        </div>
                        <div class="profile__footer">
                            <h4 class="profile__id">ID: <span>{{ userInfo?.data?.id }}</span></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useStore } from '~~/store/store'
const store = useStore()
store.loader = false

await store.getSavedMovies()
const userInfo = ref()
async function getUserInfo() {
    try {
        const data = await $fetch("https://userservice.inminternational.uz/users", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        })
        userInfo.value = data
    } catch (error) {
        console.error("Failed to fetch data", error);
    } finally {
    }
}
await getUserInfo()
</script>

<style lang="scss" scoped></style>