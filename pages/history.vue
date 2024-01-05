<template>
    <main>
        <div class="saved">
            <div class="container">
                <div class="saved__top">
                </div>
                <div class="saved__bottom">
                    <Nav />
                    <div class="saved__bottom-wrapper">
                        <ClientOnly>
                            <div class="saved__items" v-if="store.history?.data?.content.length">
                                <history-movie v-for="item in store.history?.data?.content" :key="item" :movie="item?.content_details"/>
                            </div>
                            <div class="saved__not-found" v-if="!store.history?.data?.content.length">
                                <span class="saved__not-found-icon">:(</span>
                                <h2 class="saved__not-fount-title">Tarixingizda hech qanday yozuv yo'q</h2>
                            </div>
                            <div class="profile__footer">
                                <h4 class="profile__id">ID: <span>{{ store.userInfo?.id }}</span></h4>
                            </div>
                        </ClientOnly>
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

store.getHistory()
</script>

<style lang="scss" scoped></style>