<template>
    <main>
        <div class="hero">
            <Swiper :slides-per-view="'1'" :autoplay="{ delay: 10000, disableOnInteraction: false, }" :speed="800"
                :modules="[SwiperAutoplay]" class="hero__swiper" @slide-change="onSlideChange">
                <SwiperSlide v-for="item in banners?.data" :key="item" class="hero__slide">
                    <video-player loop :poster="item?.thumbnail_image_url" muted :autoplay="true" class="hero__video"
                        :src="item?.trailer_url" :plugins="{
                            aspectRatio: '19:8'
                        }" />
                    <div class="container">
                        <div class="hero__slide-text-wrapper">
                            <h4 class="hero__slide-subtitle">{{ item?.release_year }} / {{ item?.genre?.name }}</h4>
                            <h2 class="hero__slide-title">{{ item?.content_title }}</h2>
                            <p class="hero__slide-desc">Lorem Ipsum has been the industry's standard dummy text ever since
                                the
                                1500s, when an unknown printer took a galley of type and scrambled it to
                                make a type specimen book.</p>
                            <NuxtLink class="hero__slide-btn" :to="`/watch/${item.object_id}`"><img
                                    src="@/assets/images/svg/play.svg" alt=""> Ko’rish
                            </NuxtLink>
                        </div>
                    </div>
                </SwiperSlide>
                <button class="hero__slide-sound-btn" @click="soundFunc()">
                    <svg v-if="muted" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                        <title />
                        <line style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
                            x1="416" x2="64" y1="432" y2="80" />
                        <path fill="#fff"
                            d="M243.33,98.86a23.89,23.89,0,0,0-25.55,1.82l-.66.51L188.6,124.54a8,8,0,0,0-.59,11.85l54.33,54.33A8,8,0,0,0,256,185.06V120.57A24.51,24.51,0,0,0,243.33,98.86Z" />
                        <path fill="#fff"
                            d="M251.33,335.29,96.69,180.69A16,16,0,0,0,85.38,176H56a24,24,0,0,0-24,24V312a24,24,0,0,0,24,24h69.76l92,75.31A23.9,23.9,0,0,0,243.63,413,24.51,24.51,0,0,0,256,391.45V346.59A16,16,0,0,0,251.33,335.29Z" />
                        <path fill="#fff"
                            d="M352,256c0-24.56-5.81-47.87-17.75-71.27a16,16,0,1,0-28.5,14.55C315.34,218.06,320,236.62,320,256q0,4-.31,8.13a8,8,0,0,0,2.32,6.25l14.36,14.36a8,8,0,0,0,13.55-4.31A146,146,0,0,0,352,256Z" />
                        <path fill="#fff"
                            d="M416,256c0-51.18-13.08-83.89-34.18-120.06a16,16,0,0,0-27.64,16.12C373.07,184.44,384,211.83,384,256c0,23.83-3.29,42.88-9.37,60.65a8,8,0,0,0,1.9,8.26L389,337.4a8,8,0,0,0,13.13-2.79C411,311.76,416,287.26,416,256Z" />
                        <path fill="#fff"
                            d="M480,256c0-74.25-20.19-121.11-50.51-168.61a16,16,0,1,0-27,17.22C429.82,147.38,448,189.5,448,256c0,46.19-8.43,80.27-22.43,110.53a8,8,0,0,0,1.59,9l11.92,11.92A8,8,0,0,0,452,385.29C471.6,344.9,480,305,480,256Z" />
                    </svg>

                    <svg v-else height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                        <title />
                        <path fill="#fff"
                            d="M264,416.19a23.92,23.92,0,0,1-14.21-4.69l-.66-.51-91.46-75H88a24,24,0,0,1-24-24V200a24,24,0,0,1,24-24h69.65l91.46-75,.66-.51A24,24,0,0,1,288,119.83V392.17a24,24,0,0,1-24,24Z" />
                        <path fill="#fff"
                            d="M352,336a16,16,0,0,1-14.29-23.18c9.49-18.9,14.3-38,14.3-56.82,0-19.36-4.66-37.92-14.25-56.73a16,16,0,0,1,28.5-14.54C378.2,208.16,384,231.47,384,256c0,23.83-6,47.78-17.7,71.18A16,16,0,0,1,352,336Z" />
                        <path fill="#fff"
                            d="M400,384a16,16,0,0,1-13.87-24C405,327.05,416,299.45,416,256c0-44.12-10.94-71.52-29.83-103.95A16,16,0,0,1,413.83,136C434.92,172.16,448,204.88,448,256c0,50.36-13.06,83.24-34.12,120A16,16,0,0,1,400,384Z" />
                    </svg>
                </button>
            </Swiper>
        </div>
        <div class="add">
            <img src="@/assets/images/png/reklama.png" alt="">
        </div>
        <div class="movies" v-for="(elem, i) in store.categories.data.categories" :key="elem.id">
            <div class="container">
                <div class="movies__header">
                    <h2 class="movies__title">{{ elem?.name }}</h2>
                    <div class="movies__navigations">
                        <button :class="`movies__left movies__left-${i}`"><img src="@/assets/images/svg/left.svg"
                                alt=""></button>
                        <button :class="`movies__rigth movies__rigth-${i}`"><img src="@/assets/images/svg/right.svg"
                                alt=""></button>
                    </div>
                </div>
                <Swiper :modules="[SwiperNavigation]"
                    :navigation="{ nextEl: `.movies__rigth-${i}`, prevEl: `.movies__left-${i}` }" :slides-per-view="'auto'"
                    :space-between="30" :breakpoints="{
                        '650': {
                            spaceBetween: 30
                        },
                        '0': {
                            spaceBetween: 10,
                        },
                    }" class="movies__swiper">
                    <SwiperSlide v-for="item in movies[elem.id]" :key="item" class="movies__slide">
                        <movie-card :movie="item" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </main>
</template>

<script setup>
import videojs from 'video.js';
import { useStore } from '~~/store/store';
const store = useStore()
store.loader = true
const banners = await $fetch(store.baseUrl + "/banners/")
const muted = ref(true)
const movies = ref({})
const curentId = ref(0)
function soundFunc() {
    muted.value = !muted.value
    if (videoPlayers[curentId.value]) {
        videoPlayers[curentId.value].muted(muted.value);
    }
}
const runtimeConfig = useRuntimeConfig();



const videoPlayers = [];
function onSlideChange(swiper) {
    videoPlayers.forEach((videoPlayer) => {
        videoPlayer.muted(true);
    });
    curentId.value = swiper.activeIndex
    if (videoPlayers[swiper.activeIndex]) {
        videoPlayers[swiper.activeIndex].muted(muted.value);
    }
}
onMounted(() => {
    document.querySelectorAll('.hero__video').forEach((videoElement) => {
        const videoPlayer = videojs(videoElement);
        videoPlayer.muted(true);
        videoPlayers.push(videoPlayer);
    });
});


async function getCategoriesMovie() {
    try {
        const fetchPromises = store.categories.data.categories.map(async (el) => {
            const data = await $fetch(runtimeConfig.public.apiBase + `/category/${el.id}/content/`);
            movies.value[el.id] = data.data.movies;
        });
        await Promise.all(fetchPromises);
    } catch (error) {
        console.error("Failed to fetch category movies", error);
    }
}
getCategoriesMovie()
store.loader = false

</script>

<style lang="scss">
.vjs-big-play-button {
    display: none !important;
}

.video-js .vjs-big-play-button {
    display: none !important;
}

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