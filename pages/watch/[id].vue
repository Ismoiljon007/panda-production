<template>
    <main>
        <div class="movie">
            <div class="container">
                <div class="movie-video">
                    <video-player :poster="details?.data.thumbnail_image" ref="player" controls class="video" aspectRatio="16:9" 
                        :src="details?.data?.main_content_url"  :volume="0.6" :plugins="{
                            hotkeys: {
                                volumeStep: 0.1,
                                seekStep: 10,
                                enableModifiersForNumbers: false,
                            },

                        }
                            " />
                </div>
                <h2 class="movie__title">{{ details?.data?.title }}</h2>
                <div class="movie__info">
                    <div class="movie__info-list">
                        <li>Sanasi: <span>{{ details?.data?.release_date }}</span></li>
                        <li>Janr: <span v-for="genre in details?.data?.genre" :key="genre">{{ genre.name }}</span></li>
                        <li>Davomiyligi: <span>{{ details?.data?.duration_minute }}</span></li>
                    </div>
                    <p class="movie__info-desc">{{ details?.data?.description }}</p>
                </div>
                <div class="movie__adds">
                    <img src="@/assets/images/png/reklama.png" alt="">
                </div>
                <form class="movie__comment-write" action="#">
                    <textarea placeholder="Fikr bildirish..."></textarea>
                    <button><img src="@/assets/images/svg/navigation.svg" alt=""> Jo‘natish</button>
                </form>
                <ul class="movie__comments">
                    <li class="movie__comments-item" v-for="item in 5" :key="item">
                        <div class="movie__comments-item-img">
                            A
                        </div>
                        <div class="movie__comments-item-text-wr">
                            <h4 class="movie__comments-item-name">Alisher Valisherov</h4>
                            <p class="movie__comments-item-desc">Kinga gap yo mazza qilib ko’radigan kino ekan, ketgazgan
                                vaqitimga achinmadim</p>
                            <div class="movie__comments-item-btns">
                                <button>
                                    <img src="@/assets/images/svg/heart.svg" alt="">
                                    <span>Yoqdi(30)</span>
                                </button>
                                <button>
                                    <img src="@/assets/images/svg/send.svg" alt="">
                                    <span>Javob qaytarish</span>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="movie__navigations">
                    <button class="movie__left"><img src="@/assets/images/svg/left.svg" alt=""></button>
                    <button class="movie__rigth"><img src="@/assets/images/svg/right.svg" alt=""></button>
                </div>
                <Swiper :modules="[SwiperNavigation]" :navigation="{ nextEl: '.movie__rigth', prevEl: '.movie__left' }"
                    :slides-per-view="'auto'" :space-between="30" class="movie__swiper">
                    <SwiperSlide v-for="item in movies[0]" :key="item" class="movie__slide">
                        <movie-card :movie="item"/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useStore } from '~/store/store';
import videojs from 'video.js';
import "videojs-hotkeys";
import 'videojs-seek-buttons'
import "videojs-contrib-quality-levels"
import "videojs-hls-quality-selector";
const store = useStore()
store.loader = true
const { id } = useRoute().params
const { data: details } = await useAsyncData('movie', async () => await $fetch(store.baseUrl + '/movies/' + id))
console.log(details.value);
onMounted(() => {
    const player = document.querySelector('.video')
    player.hlsQualitySelector
})
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
.video-js .vjs-big-play-button {
    background: none !important;
    border: none !important;
    width: 107px !important;
    height: 107px !important;
}

.movie-video {
    position: relative;
}
.vjs-poster img {
    width: 100% !important;
    object-fit: cover;
}
.prev-video {
    position: absolute;
    top: 50%;
    z-index: 5;
}

.video {
    width: 100%;
    height: 730px !important;
}

.for {
    position: absolute;
    top: 50%;
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