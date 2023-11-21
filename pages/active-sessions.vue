<template>
    <main>
        <div class="active-sessions">
            <div class="container">
                <div class="active-sessions__top">
                </div>
                <div class="active-sessions__bottom">
                    <Nav />
                    <div class="active-sessions__bottom-wrapper">
                        <div class="active-sessions__items">
                            <div class="active-sessions__item">
                                <div class="active-sessions__item-img">
                                    <img src="@/assets/images/svg/computer.svg" alt="">
                                </div>
                                <div class="active-sessions__item-text-wrapper">
                                    <h3 class="active-sessions__item-title">Windows 11, Chrome</h3>
                                    <h4 class="active-sessions__item-date"><span>06:04:47</span> <span>17-08-2023</span></h4>
                                </div>
                                <button class="active-sessions__item-finish">Yakunlash</button>
                            </div>
                        </div>
                        <div class="profile__footer">
                            <h4 class="profile__id">ID: <span>255 274</span></h4>
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