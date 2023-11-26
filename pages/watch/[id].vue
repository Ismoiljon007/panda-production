<template>
    <main>
        <div class="movie">
            <div class="container">
                <div class="movie-video">
                    <div class="movie-video-overlay" v-if="movieOverlay" @click="playPause()"></div>
                    <div class="movie-video-btns" v-if="movieOverlay">
                        <button @click="skip(-10)"><img src="@/assets/images/svg/prev-btn.svg" alt=""></button>
                        <button @click="playPause()"><img src="@/assets/images/svg/play-btn.svg" alt=""></button>
                        <button @click="skip(10)"><img src="@/assets/images/svg/next-btn.svg" alt=""></button>
                    </div>
                    <video-player :poster="details?.data.thumbnail_image" ref="player" controls id="video" class="video"
                        :src="details?.data?.main_content_url" :volume="0.6" :plugins="{
                            hotkeys: {
                                volumeStep: 0.1,
                                seekStep: 10,
                                enableModifiersForNumbers: false,
                            },
                            hlsQualitySelector: {}
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
                <div class="movie-episods" v-if="!details?.data?.is_movie">
                    <div class="movie-episods__seasons">
                        <h4 class="movie-episods__seasons-title">Fasillar:</h4>
                        <div class="movie-episods__seasons-item" v-for="(item, i) in details?.data?.seasons" :key="item">{{
                            i
                            + 1 }}</div>
                    </div>
                    <div class="movie-episods__wrapper">
                        <div class="movie-episods__item" @click="getMovie(item?.series)" v-for="item in  episods?.data"
                            :key="item">
                            <div class="movie-episods__item-img">
                                <img :src="item?.thumbnail_image_url" alt="">
                            </div>
                            <h4 class="movie-episods__item-name">{{ item?.series }}-qism</h4>
                        </div>
                    </div>
                </div>
                <div class="movie__adds">
                    <img src="@/assets/images/png/reklama.png" alt="">
                </div>
                <form class="movie__comment-write" action="#" @submit.prevent="sendComment()">
                    <textarea placeholder="Fikr bildirish..." v-model="comment"></textarea>
                    <button><img src="@/assets/images/svg/navigation.svg" alt=""> Jo‘natish</button>
                </form>
                <ul class="movie__comments">
                    <li class="movie__comments-item comment-item" v-for="(item) in details?.data?.comments" :key="item">

                        <div class="movie__comments-item-wrapper">
                            <div class="movie__comments-item-img">
                                {{ item.username.charAt().toUpperCase() }}
                            </div>
                            <div class="movie__comments-item-text-wr">
                                <h4 class="movie__comments-item-name">{{ item?.username }}</h4>
                                <p class="movie__comments-item-desc">{{ item?.content }}</p>
                                <!-- <div class="movie__comments-item-btns">
                                    <button>
                                        <img src="@/assets/images/svg/heart.svg" alt="">
                                        <span>Yoqdi(30)</span>
                                    </button>
                                    <button @click="com = !com">
                                        <img src="@/assets/images/svg/send.svg" alt="">
                                        <span>Javob qaytarish</span>
                                    </button>
                                </div> -->
                            </div>
                        </div>


                        <!-- <ul class="movie__comments-item__inner">
                            <li class="movie__comments-item">
                                <div class="movie__comments-item-wrapper">
                                    <div class="movie__comments-item-img">
                                        A
                                    </div>
                                    <div class="movie__comments-item-text-wr">
                                        <h4 class="movie__comments-item-name">Alisher Valisherov</h4>
                                        <p class="movie__comments-item-desc">Kinga gap yo mazza qilib ko’radigan kino ekan,
                                            ketgazgan
                                            vaqitimga achinmadim</p>
                                        <div class="movie__comments-item-btns">
                                            <button>
                                                <img src="@/assets/images/svg/heart.svg" alt="">
                                                <span>Yoqdi(30)</span>
                                            </button>
                                            <button @click="com = !com">
                                                <img src="@/assets/images/svg/send.svg" alt="">
                                                <span>Javob qaytarish</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </li>
                            <div class="movie__comments-reply" v-if="com">
                                <div class="movie__comments-item-img">IB</div>
                                <div class="movie__comments-text-wrapper">
                                    <h4 class="movie__comments-title">Jenifer Lopilloq</h4>
                                    <textarea class="movie__comments-write"></textarea>
                                    <button><img src="@/assets/images/svg/navigation.svg" alt=""> Jo‘natish</button>
                                </div>
                            </div>
                        </ul> -->
                    </li>
                </ul>
                <div class="movie__navigations">
                    <button class="movie__left"><img src="@/assets/images/svg/left.svg" alt=""></button>
                    <button class="movie__rigth"><img src="@/assets/images/svg/right.svg" alt=""></button>
                </div>
                <Swiper :modules="[SwiperNavigation]" :navigation="{ nextEl: '.movie__rigth', prevEl: '.movie__left' }"
                    :slides-per-view="'auto'" :space-between="30" class="movie__swiper" :breakpoints="{
                        '650': {
                            spaceBetween: 30
                        },
                        '0': {
                            spaceBetween: 10
                        },
                    }">
                    <SwiperSlide v-for="item in movies[0]" :key="item" class="movie__slide">
                        <movie-card :movie="item" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '~/store/store';
import videojs from 'video.js';
import 'videojs-hotkeys';
import qualitySelector from 'videojs-hls-quality-selector';
import qualityLevels from 'videojs-contrib-quality-levels';
videojs.registerPlugin('qualityLevels', qualityLevels);
videojs.registerPlugin('hlsQualitySelector', qualitySelector);
const store = useStore();
const { id } = useRoute().params;
const player = ref()
const comment = ref()
// console.log(qualitySelector());
const details = ref(null);
const movies = ref([]);

async function getMovie(series) {
    const res = await $fetch(store.baseUrl + '/series/' + series + '/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + store.token
        }
    });
    details.value = res
    window.scrollTo(0, 0);
}
const userInfo = ref()
async function getUserInfo() {
    store.loader = true;
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
        store.loader = false;
    }
}
await getUserInfo()
async function sendComment() {
    const res = await $fetch(`${store.baseUrl}/comments/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + store.token
        },
        body: {
            username: userInfo.value?.data?.username,
            content: comment.value,
            object_id: id,
            parent: null,
            content_type: details.value?.data?.is_movie ? 'movie' : 'series'
        }
    })
    if (res.status == 'success') {
        getDetilsComment()
        comment.value = ""
    }
}
async function getCategoriesMovie() {
    const fetchPromises = store.categories.data.categories.map(el =>
        $fetch(`https://catalogservice.inminternational.uz/category/${el.id}/content/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        })
    );
    const results = await Promise.all(fetchPromises);
    results.forEach((data, index) => {
        movies.value[index] = data.data.movies;
    });
}
const episods = ref(null)
async function getEpisods(ep) {
    const data = await $fetch(store.baseUrl + '/series/' + id + `/seasons/${ep}/episodes/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + store.token
        }
    });
    episods.value = data
}
async function fetchData() {
    store.loader = true;
    try {
        const detailData = await $fetch(store.baseUrl + '/movies/' + id + '/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        })
        await getCategoriesMovie();
        details.value = detailData;
    } catch (error) {
        const res = await $fetch(store.baseUrl + '/series/' + id + '/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        });
        getEpisods(res?.data?.seasons[0]?.id)
        details.value = res;
    } finally {
        store.loader = false;
    }
}
async function getDetilsComment() {
    try {
        const detailData = await $fetch(store.baseUrl + '/movies/' + id + '/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        })
        await getCategoriesMovie();
        details.value = detailData;
    } catch (error) {
        const res = await $fetch(store.baseUrl + '/series/' + id + '/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        });
        getEpisods(res?.data?.seasons[0]?.id)
        details.value = res;
    }
}
const movieOverlay = ref(true)
function playPause() {
    if (document.getElementById('video').childNodes[0].paused) {
        document.getElementById('video').childNodes[0].play()
        movieOverlay.value = false
    } else {
        document.getElementById('video').childNodes[0].pause()
        movieOverlay.value = true
    }
}
function skip(value) {
    var video = document.getElementById('video')?.childNodes[0]
    video.currentTime += value;
}

const com = ref(false)
onMounted(() => {
    fetchData();
    document.getElementById('video')?.childNodes[0]?.addEventListener('click', (e) => {
        if (e.target.paused == true) {
            movieOverlay.value = true
        } else {
            movieOverlay.value = false
        }
    })



    let playerVideo = videojs('video');
    // playerVideo.hlsQualitySelector({
    //     displayCurrentQuality: true,
    // });
    // let qualityLevels = playerVideo.qualityLevels();

    // // disable quality levels with less than 720 horizontal lines of resolution when added
    // // to the list.
    // qualityLevels.on('addqualitylevel', function (event) {
    //     let qualityLevel = event.qualityLevel;

    //     if (qualityLevel.height >= 720) {
    //         qualityLevel.enabled = true;
    //     } else {
    //         qualityLevel.enabled = false;
    //     }
    // });

    // // example function that will toggle quality levels between SD and HD, defining and HD
    // // quality as having 720 horizontal lines of resolution or more
    // let toggleQuality = (function () {
    //     let enable720 = true;

    //     return function () {
    //         for (let qualityLevel of qualityLevels) {
    //             if (qualityLevel.height >= 720) {
    //                 qualityLevel.enabled = enable720;
    //             } else {
    //                 qualityLevel.enabled = !enable720;
    //             }
    //         }
    //         enable720 = !enable720;
    //     };
    // })();

    // let currentSelectedQualityLevelIndex = qualityLevels.selectedIndex; // -1 if no level selected

    // // Listen to change events for when the player selects a new quality level
    // qualityLevels.on('change', function () {
    //     console.log('Quality Level changed!');
    //     console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
    // });
});
watchEffect((e) => {
})





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

.vjs-poster {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #060606;
}

.vjs-poster img {}

.prev-video {
    position: absolute;
    top: 50%;
    z-index: 5;
}

.video {
    width: 100%;
    height: 730px !important;

    @media (max-width: 1425px) {
        height: 600px !important;
    }

    @media (max-width: 1060px) {
        height: 460px !important;
    }

    @media (max-width: 1060px) {
        height: 460px !important;
    }

    @media (max-width: 760px) {
        height: 370px !important;
    }

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