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
                        
                        <p class="movie__info-desc"><span class="subtitle">Malumot:</span> {{ details?.data?.description }}</p>
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
import hlsQualitySelector from "videojs-hls-quality-selector";

videojs.registerPlugin("hlsQualitySelector", hlsQualitySelector);
const store = useStore();
store.loader = true

const { id } = useRoute().params;
const player = ref()
const comment = ref()
const details = ref(null);
const movies = ref([]);
const vidType = ref('online')
function openReply(id) {
    if (document.querySelector(`.reply-${id}`).style.display == 'none') {
        document.querySelector(`.reply-${id}`).style.display = 'flex'
    } else {
        document.querySelector(`.reply-${id}`).style.display = 'none'
    }
}
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
const paymentTrue = ref(true)

const title = ref(null)
const video_url = ref("")
const img_url = ref("")

const router = useRouter()

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
            content_type: 15
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
async function fetchData() {
    store.loader = true;
    try {
        const detailData = await $fetch(store.baseUrl + '/movies/' + id + '/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        })
        if (detailData?.data?.main_content_url == null) {
            paymentTrue.value = true
        } else {
            paymentTrue.value = false
            video_url.value = detailData?.data?.main_content_url
        }
        await getCategoriesMovie();
        details.value = detailData;
        title.value = detailData?.data?.title
        img_url.value = detailData?.data?.thumbnail_image
    } catch (error) {
        console.log(error);
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
await fetchData();
await getUserInfo()




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