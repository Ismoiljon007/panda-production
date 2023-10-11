<template>
    <main>
        <div class="hero">
            <Swiper :autoplay="{ delay: 10000, disableOnInteraction: false, }" :speed="800" :modules="[SwiperAutoplay]"
                class="hero__swiper">
                <SwiperSlide v-for="item in banners?.data" :key="item" class="hero__slide">
                    <video-player loop :poster="item?.thumbnail_image_url" ref="player" muted controls :autoplay="true" class="hero__video"
                        aspectRatio="16:9"
                        :src="item?.trailer_url"/>
                    <div class="container">
                        <div class="hero__slide-text-wrapper">
                            <h4 class="hero__slide-subtitle">{{ item?.release_year }} / {{ item?.genre?.name }}</h4>
                            <h2 class="hero__slide-title">{{ item?.content_title }}</h2>
                            <p class="hero__slide-desc">Lorem Ipsum has been the industry's standard dummy text ever since
                                the
                                1500s, when an unknown printer took a galley of type and scrambled it to
                                make a type specimen book.</p>
                            <NuxtLink class="hero__slide-btn" :to="`/watch/${item.id}`"><img src="@/assets/images/svg/play.svg" alt=""> Ko’rish
                            </NuxtLink>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="add">
            <img src="@/assets/images/jpg/add.jpg" alt="">
        </div>
        <!-- <pre>{{ home?.data }}</pre> -->
        <div class="uzbek-movies" v-for="(elem,index) in store.categories.data.categories" :key="elem.id">
            <div class="container">
                <div class="uzbek-movies__header">
                    <h2 class="uzbek-movies__title">{{ elem?.name }}</h2>
                    <div class="uzbek-movies__navigations">
                        <button class="uzbek-movies__left"><img src="@/assets/images/svg/left.svg" alt=""></button>
                        <button class="uzbek-movies__rigth"><img src="@/assets/images/svg/right.svg" alt=""></button>
                    </div>
                </div>
                <Swiper :modules="[SwiperNavigation]"
                    :navigation="{ nextEl: '.uzbek-movies__rigth', prevEl: '.uzbek-movies__left' }"
                    :slides-per-view="'auto'" :space-between="30" :breakpoints="{
                        '650': {
                            spaceBetween: 30
                        },
                        '0': {
                            spaceBetween: 15
                        },
                    }" class="uzbek-movies__swiper">
                    <SwiperSlide v-for="item in movies[index]" :key="item" class="uzbek-movies__slide">
                        <movie-card :movie="item"/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <!-- <div class="movies">
            <div class="container">
                <div class="movies__header">
                    <h2 class="movies__title">O’zbek kinolar</h2>
                    <div class="movies__navigations">
                        <button class="movies__left"><img src="@/assets/images/svg/left.svg" alt=""></button>
                        <button class="movies__rigth"><img src="@/assets/images/svg/right.svg" alt=""></button>
                    </div>
                </div>
                <Swiper :modules="[SwiperNavigation]" :navigation="{ nextEl: '.movies__rigth', prevEl: '.movies__left' }"
                    :slides-per-view="'auto'" :space-between="30" :breakpoints="{
                        '650': {
                            spaceBetween: 30
                        },
                        '0': {
                            spaceBetween: 15
                        },
                    }" class="movies__swiper">
                    <SwiperSlide v-for="item in 12" :key="item" class="movies__slide">
                        <movie-card />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div class="serials">
            <div class="container">
                <div class="serials__header">
                    <h2 class="serials__title">O’zbek kinolar</h2>
                    <div class="serials__navigations">
                        <button class="serials__left"><img src="@/assets/images/svg/left.svg" alt=""></button>
                        <button class="serials__rigth"><img src="@/assets/images/svg/right.svg" alt=""></button>
                    </div>
                </div>
                <Swiper :modules="[SwiperNavigation]" :navigation="{ nextEl: '.serials__rigth', prevEl: '.serials__left' }"
                    :slides-per-view="'auto'" :space-between="30" :breakpoints="{
                        '650': {
                            spaceBetween: 30
                        },
                        '0': {
                            spaceBetween: 15
                        },
                    }" class="serials__swiper">
                    <SwiperSlide v-for="item in 12" :key="item" class="serials__slide">
                        <movie-card />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div> -->
    </main>
</template>

<script setup>
import videojs from 'video.js';
import { useStore } from '~~/store/store';
const store = useStore()
store.loader = true
const banners = await $fetch(store.baseUrl + "/banners/")
console.log(banners);
const movies = ref([])
function getCategoriesMovie() {
    store.categories.data.categories.forEach(el => {
        $fetch(`https://catalogservice.inminternational.uz/category/${el.id}/content/`).then(data => {
            movies.value.push(data.data.movies)
        })
    })
    console.log(movies.value);
}
getCategoriesMovie()
store.loader = false
</script>

<style lang="scss">
.video-js .vjs-control-bar {
    background: transparent !important;
}

.vjs-has-started .vjs-control-bar,
.vjs-audio-only-mode .vjs-control-bar {
    flex-wrap: wrap !important;
}

.video-js .vjs-progress-control {
    order: 1 !important;
    width: 100%;
}

.vjs-paused,
.vjs-playing {
    order: 2 !important;
}

.vjs-volume-panel {
    order: 4 !important;
}

.vjs-remaining-time {
    order: 3 !important;
    margin-right: auto !important;
}

.vjs-picture-in-picture-control {
    display: none !important;
}

.vjs-fullscreen-control {
    order: 5 !important;
}
</style>