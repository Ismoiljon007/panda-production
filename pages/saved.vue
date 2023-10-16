<template>
    <main>
        <div class="saved">
            <div class="container">
                <div class="saved__top">
                </div>
                <div class="saved__bottom">
                    <Nav />
                    <div class="saved__bottom-wrapper">
                        <div class="saved__items" v-if="false">
                            <!-- <movie-card v-for="item in 2" :key="item"/> -->
                        </div>
                        <div class="saved__not-found">
                            <span class="saved__not-found-icon">:(</span>
                            <h2 class="saved__not-fount-title">Tanlanganlar yoq</h2>
                        </div>
                        <div class="profile__footer">
                            <h4 class="profile__id">ID: <span>255 274</span></h4>
                            <h4 class="profile__balance">Balans: <span>150 000</span> so’m</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import {useStore} from '~~/store/store'
const store = useStore()
store.loader = false
</script>

<style lang="scss" scoped></style>