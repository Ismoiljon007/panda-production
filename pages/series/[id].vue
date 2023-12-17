<template>
    <main>
        <div class="movie">
            <div class="container">
                <div class="movie-top">
                    <div class="movie-video" v-if="vidType == 'online'">
                        <video-player-vue :item="{
                            url: video_url,
                            img: img_url,
                            controls: true,
                            autoplay: false,
                            loop: false,
                            muted: false,
                        }" />
                        <div class="movie-payment" v-if="paymentTrue" @click="router.push('/subscriptions')">
                            <button>
                                obuna sotib olish
                            </button>
                        </div>
                    </div>
                    <div class="movie-video" v-if="vidType == 'trailer'">
                        <video-player-vue :item="{
                            url: details?.data?.trailer_url,
                            img: details?.data?.thumbnail_image,
                            controls: true,
                            autoplay: false,
                            loop: false,
                            muted: false,
                        }" />
                    </div>
                    <div class="movie__info">
                        <h2 class="movie__title">{{ title }}</h2>
                        <div class="movie__info-list">
                            <li>Sanasi: <span>{{ details?.data?.release_date }}</span></li>
                            <li>Janr: <span v-for="genre in details?.data?.genre" :key="genre">{{ genre.name }}</span></li>
                            <li>Davomiyligi: <span>{{ details?.data?.duration_minute }}</span></li>
                        </div>

                        <p class="movie__info-desc"><span class="subtitle">Malumot:</span> {{ details?.data?.description }}
                        </p>
                        <div class="movie__btns">
                            <button @click="vidType = 'online'"
                                :style="vidType == 'online' ? 'background-color: #fff; color: rgba(28, 28, 28, 1)' : ''">ONLAYN
                                KO'RISH</button>
                            <button @click="vidType = 'trailer'"
                                :style="vidType == 'trailer' ? 'background-color: #fff; color: rgba(28, 28, 28, 1)' : ''">TREYLERINI
                                KO'RISH</button>
                        </div>
                    </div>
                </div>
                <div class="movie-episods" v-if="!details?.data?.is_movie">
                    <div class="movie-episods__seasons">
                        <h4 class="movie-episods__seasons-title">Fasillar:</h4>
                        <div class="movie-episods__seasons-item" :class="item.id == details?.data?.id ? 'active-btn' : ''"
                            @click="getEpisods(item.id), checkEpisod($event)" v-for="(item) in details?.data?.seasons"
                            :key="item">{{
                                item?.season_number }}</div>
                    </div>
                    <div class="movie-episods__wrapper">
                        <div class="movie-episods__item"
                            :class="item?.id == episods?.data?.episodes[0]?.id ? 'active-item' : ''"
                            @click="getSeries(item?.id), checkSeries($event)" v-for="item in  episods?.data?.episodes"
                            :key="item">
                            <div class="movie-episods__item-img" style="pointer-events: none;">
                                <img :src="item?.thumbnail_image_url" alt="">
                            </div>
                            <h4 class="movie-episods__item-name" style="pointer-events: none;">{{ item.episode_number
                            }}-qism</h4>
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
                                <h4 class="movie__comments-item-name">{{ item?.username }} <span>{{
                                    commentDate(item?.created_at) }} oldin</span></h4>
                                <p class="movie__comments-item-desc">{{ item?.content }}</p>
                                <div class="movie__comments-item-btns">
                                    <!-- <button>
                                        <img src="@/assets/images/svg/heart.svg" alt="">
                                        <span>Yoqdi(30)</span>
                                    </button> -->
                                    <button @click="openReply(item?.id)">
                                        <img src="@/assets/images/svg/send.svg" alt="">
                                        <span>Javob qaytarish</span>
                                    </button>
                                </div>
                            </div>
                        </div>


                        <ul class="movie__comments-item__inner">
                            <div class="movie__comments-reply" style="display: none;" :class="`reply-${item.id}`">
                                <div class="movie__comments-item-img">{{ userInfo?.data?.username.charAt().toUpperCase() }}
                                </div>
                                <div class="movie__comments-text-wrapper">
                                    <h4 class="movie__comments-title">{{ userInfo?.data?.username }}</h4>
                                    <textarea v-model="repliesCom" class="movie__comments-write"></textarea>
                                    <button @click="replie(item?.id)"><img src="@/assets/images/svg/navigation.svg" alt="">
                                        Jo‘natish</button>
                                </div>
                            </div>
                            <div v-if="item?.replies.length" class="wr-comments">
                                <li class="movie__comments-item" v-for="el in item?.replies" :key="el">
                                    <div class="movie__comments-item-wrapper">
                                        <div class="movie__comments-item-img">
                                            {{ el?.username.charAt().toUpperCase() }}
                                        </div>
                                        <div class="movie__comments-item-text-wr">
                                            <h4 class="movie__comments-item-name">{{ el?.username }} <span>{{
                                                commentDate(el?.created_at) }} oldin</span></h4>
                                            <p class="movie__comments-item-desc">{{ el?.content }}</p>
                                            <div class="movie__comments-item-btns">
                                                <!-- <button>
                                                    <img src="@/assets/images/svg/heart.svg" alt="">
                                                    <span>Yoqdi(30)</span>
                                                </button>
                                                <button @click="com = !com">
                                                    <img src="@/assets/images/svg/send.svg" alt="">
                                                    <span>Javob qaytarish</span>
                                                </button> -->

                                            </div>
                                        </div>
                                    </div>

                                </li>
                            </div>
                        </ul>
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
import { useStore } from '~/store/store';
import videojs from 'video.js';
import 'videojs-hotkeys';

const store = useStore();
store.loader = true
const { id } = useRoute().params;
const player = ref()
const comment = ref()
const details = ref(null);
const movies = ref([]);
const vidType = ref('online')

const paymentTrue = ref(true)

const title = ref(null)
const video_url = ref("")
const img_url = ref("")

const router = useRouter()


function commentDate(d) {

    const inputDate = new Date(d);
    const currentDate = new Date();

    const timeDifference = currentDate - inputDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    let output;

    if (seconds < 60) {
        output = `${seconds} soniya`;
    } else if (minutes < 60) {
        output = `${minutes} daqiqa`;
    } else if (hours < 24) {
        output = `${hours} soat`;
    } else if (days < 30) {
        output = `${days} kun`;
    } else if (months < 12) {
        output = `${months} oy`;
    } else {
        output = `${years} yil`;
    }
    if (d) {
        return output

    }
}

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
async function getSeries(id, e) {
    const data = await $fetch(`${store.baseUrl}/management/episodes/${id}/`)
    title.value = data?.title
    video_url.value = data?.episode_content_url
    img_url.value = data?.thumbnail_image_url
    var originalHTML = document.querySelector('.vd-serie').innerHTML;
    document.querySelector('.vd-serie').innerHTML = originalHTML;
}
function checkSeries(e) {
    document.querySelectorAll('.movie-episods__item').forEach(el => {
        if (el == e.target) {
            el.classList.add('active-item')
        } else {
            el.classList.remove('active-item')
        }
    })
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

function openReply(id) {
    if (document.querySelector(`.reply-${id}`).style.display == 'none') {
        document.querySelector(`.reply-${id}`).style.display = 'flex'
    } else {
        document.querySelector(`.reply-${id}`).style.display = 'none'
    }
    // document.querySelector(`reply-${id}`).style.display == 'none' ? 'flex' : 'none'
}
const repliesCom = ref(null)
async function replie(parent) {
    console.log(parent);
    const res = await $fetch(`${store.baseUrl}/management/comments/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + store.token
        },
        body: {
            username: userInfo.value?.data?.username,
            content: repliesCom.value,
            object_id: id,
            content_type: 15,
            parent: parent
        }
    })
    if (res) {
        getDetilsComment()
        repliesCom.value = ""
    }
}


async function sendComment() {
    const res = await $fetch(`${store.baseUrl}/management/comments/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + store.token
        },
        body: {
            username: userInfo.value?.data?.username,
            content: comment.value,
            object_id: id,
            parent: null,
            content_type: 13
        }
    })
    if (res) {
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
        movies.value[index] = data.data.content;
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
    getSeries(data?.data?.episodes[0]?.id)
}
function checkEpisod(e) {
    document.querySelectorAll('.movie-episods__seasons-item').forEach(el => {
        if (el == e.target) {
            el.classList.add('active-btn')
        } else {
            el.classList.remove('active-btn')
        }
    })
}
async function fetchData() {
    store.loader = true;
    try {
        const res = await $fetch(store.baseUrl + '/series/' + id + '/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        });
        if (res?.data?.series_summary_url == null) {
            paymentTrue.value = true
        } else {
            paymentTrue.value = false
            video_url.value = res?.data?.series_summary_url
        }
        title.value = res?.data?.title
        img_url.value = res?.data?.thumbnail_image
        details.value = res;
        getEpisods(res?.data?.seasons[0]?.id)
        await getCategoriesMovie()
    } catch (error) {
        console.log(error);
    } finally {
        store.loader = false;
    }
}
async function getDetilsComment() {
    const res = await $fetch(store.baseUrl + '/series/' + id + '/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + store.token
        }
    });
    getEpisods(res?.data?.seasons[0]?.id)
    details.value = res;
}
const movieOverlay = ref(true)

const com = ref(false)
onMounted(() => {
    document.getElementById('video')?.childNodes[0]?.addEventListener('click', (e) => {
        if (e.target.paused == true) {
            movieOverlay.value = true
        } else {
            movieOverlay.value = false
        }
    })

});
watchEffect(() => {
    title.value
    video_url.value
    img_url.value
})

await getUserInfo()
await fetchData();



</script>

<style lang="scss">
.active-btn {
    background: rgba(28, 28, 28, 0.5);
    color: #fff;
}

.active-item {
    .movie-episods__item-img {
        border-color: #fff !important;
    }
}

.for {
    position: absolute;
    top: 50%;
}
</style>