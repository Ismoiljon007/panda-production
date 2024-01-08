<template>
    <main>
        <div class="movie">
            <div class="container">
                <div class="movie-top">
                    <div class="movie-video" v-if="vidType == 'online'">
                        <ClientOnly>
                            <video-player-vue :item="{
                                url: video_url,
                                img: img_url,
                                controls: true,
                                autoplay: false,
                                loop: false,
                                muted: false,
                                id: details?.data?.id,
                                content_type: 'movie'
                            }" />
                        </ClientOnly>
                        <div class="movie-payment" v-if="paymentTrue" @click="router.push('/subscriptions')">
                            <button>
                                Obuna bo'lish
                            </button>
                        </div>
                    </div>
                    <div class="movie-video" v-if="vidType == 'trailer'">
                        <ClientOnly>
                            <video-player-vue :item="{
                                url: details?.data?.trailer_url,
                                img: details?.data?.widescreen_thumbnail_image,
                                controls: true,
                                autoplay: false,
                                loop: false,
                                muted: false,
                                id: null,
                                content_type: null
                            }" />
                        </ClientOnly>
                    </div>
                    <div class="movie__info">
                        <h2 class="movie__title">{{ title }}</h2>
                        <div class="movie__info-list">
                            <li style="display: flex;">Sanasi: <span style="margin-right: auto;">{{
                                details?.data?.release_date }}</span> Davomiyligi: <span style="margin-right: auto;">{{
        convertMinutesToHHMM(details?.data?.duration_minute) }}</span></li>
                            <li>Janr: <span v-for="genre in details?.data?.genre" :key="genre">{{ genre.name }} <span
                                        :style="details?.data?.genre[details?.data?.genre?.length - 1].name == genre.name ? 'display: none;' : ''">/
                                    </span></span>
                            </li>
                            <li>Bosh Rollarda: <span>{{ details?.data?.cast_list }}</span></li>
                        </div>

                        <p class="movie__info-desc"><span class="subtitle">Malumot:</span> {{ details?.data?.description }}
                        </p>
                        <div class="movie__btns">
                            <button @click="vidType = 'online'"
                                :style="vidType == 'online' ? 'background-color: #fff; color: rgba(28, 28, 28, 1)' : ''">
                                KO'RISH</button>
                            <button @click="vidType = 'trailer'"
                                :style="vidType == 'trailer' ? 'background-color: #fff; color: rgba(28, 28, 28, 1)' : ''">TREYLERNI
                                KO'RISH</button>
                        </div>
                    </div>
                </div>

                <!-- <div class="movie__adds">
                    <img src="@/assets/images/png/reklama.png" alt="">
                </div> -->
                <form class="movie__comment-write" action="#" @submit.prevent="sendComment()">
                    <textarea placeholder="Fikr bildirish..." v-model="comment"></textarea>
                    <button><img src="@/assets/images/svg/navigation.svg" alt=""> Jo‘natish</button>
                </form>
                <ul class="movie__comments">
                    <li class="movie__comments-item comment-item"
                        v-for="(item) in details?.data?.comments.slice(...countComment)" :key="item">
                        <div class="movie__comments-item-wrapper">
                            <div class="movie__comments-item-img">
                                {{ item.username.charAt().toUpperCase() }}
                            </div>
                            <div class="movie__comments-item-text-wr">
                                <h4 class="movie__comments-item-name">{{ item?.username }} <span>{{
                                    commentDate(item?.created_at) }} oldin</span></h4>
                                <p class="movie__comments-item-desc">{{ item?.content }}</p>
                                <div class="movie__comments-item-btns">
                                    <button>
                                        <img src="@/assets/images/svg/heart.svg" alt="">
                                        <span>(30)</span>
                                    </button>
                                    <button @click="openReply(item?.id, item?.replies.length)">
                                        <img src="@/assets/images/svg/send.svg" alt="">
                                        <span>Javob qaytarish</span>
                                    </button>
                                </div>
                                <button v-if="item?.replies.length" class="all-comments"
                                    @click="openAllCommnets(item?.id, item?.replies.length, $event)">
                                    <img width="20" height="20" src="@/assets/images/svg/comment-arr.svg" alt="">
                                    <span>({{ item?.replies.length }}) Barcha javoblar</span>
                                </button>
                            </div>
                        </div>
                        <ul class="movie__comments-item__inner">
                            <div class="movie__comments-reply" style="display: none;"
                                :class="`reply-${item.id} ${item?.replies.length == 0 ? 'mt-com' : ''}`">
                                <div class="movie__comments-item-img">{{
                                    store.userInfo?.username.charAt().toUpperCase() }}
                                </div>
                                <div class="movie__comments-text-wrapper">
                                    <h4 class="movie__comments-title">{{ store.userInfo?.username }}</h4>
                                    <textarea v-model="repliesCom" class="movie__comments-write"></textarea>
                                    <button @click="replie(item?.id)"><img src="@/assets/images/svg/navigation.svg" alt="">
                                        Jo‘natish</button>
                                </div>
                            </div>
                            <div v-if="item?.replies.length" :data-comments="item?.id" style="display: none"
                                :class="`cms-${item?.id}`" class="wr-comments">
                                <li class="movie__comments-item" v-for="el in item?.replies" :key="el">
                                    <div class="movie__comments-item-wrapper">
                                        <div class="movie__comments-item-img">
                                            {{ el?.username.charAt().toUpperCase() }}
                                        </div>
                                        <div class="movie__comments-item-text-wr">
                                            <h4 class="movie__comments-item-name">{{ el?.username }} <span>{{
                                                commentDate(el?.created_at) }} oldin</span></h4>
                                            <p class="movie__comments-item-desc" style="margin-bottom: 0px;">{{ el?.content
                                            }}</p>
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
                    <div class="comment-overlay" v-if="countComment.length != 1"
                        :style="`display: ${details?.data?.comments.length > 5 ? 'flex' : 'none'}`">
                        <span @click="viewAllComments()">Barcha sharhlar...</span>
                    </div>
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
                    <SwiperSlide v-for="item in movies" :key="item" :style="item?.id == id ? 'display: none;' : ''"
                        class="movie__slide">
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
function openReply(id, rep) {
    if (document.querySelector(`.reply-${id}`).style.display == 'none') {
        document.querySelector(`.reply-${id}`).style.display = 'flex'
    } else {
        document.querySelector(`.reply-${id}`).style.display = 'none'
    }
    document.querySelectorAll('.wr-comments').forEach(el => {
        if (el.getAttribute('data-comments') == id) {
            if (el.style.display == 'none') {
                document.querySelector(`.reply-${id}`).classList.add('mt-com')
            } else {
                document.querySelector(`.reply-${id}`).classList.remove('mt-com')
            }
        }
    })
}


function openAllCommnets(id, rep, e) {
    document.querySelectorAll('.wr-comments').forEach(el => {
        if (el.getAttribute('data-comments') == id) {
            if (el.style.display == 'none') {
                el.style.display = 'flex'
                el.parentElement.classList.add('mt-com')
                document.querySelector(`.reply-${id}`).classList.remove('mt-com')
                e.target.childNodes[0].style.rotate = '180deg'
            } else {
                el.style.display = 'none'
                el.parentElement.classList.remove('mt-com')
                e.target.childNodes[0].style.rotate = '0deg'
                document.querySelector(`.reply-${id}`).classList.add('mt-com')
            }
        }
    })
}
const countComment = ref([0, 5])
function viewAllComments() {
    countComment.value = [0]
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
    const res = await $fetch(`${store.baseUrl}/comments/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + store.token
        },
        body: {
            username: store.userInfo?.username,
            content: repliesCom.value,
            object_id: id,
            content_type: 'MOVIE',
            parent: parent
        }
    })
    if (res) {
        getDetilsComment()
        repliesCom.value = ""
    }
}
const paymentTrue = ref(true)


function convertMinutesToHHMM(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    // Ensure that the hours and minutes are formatted with leading zeros if needed
    var formattedHours = hours < 10 ? '0' + hours : hours;
    var formattedMinutes = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;

    return formattedHours + ':' + formattedMinutes;
}



const title = ref(null)
const video_url = ref("")
const img_url = ref("")

const router = useRouter()


async function sendComment() {
    const res = await $fetch(`${store.baseUrl}/comments/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + store.token
        },
        body: {
            username: store.userInfo?.username,
            content: comment.value,
            object_id: id,
            parent: null,
            content_type: 'MOVIE'
        }
    })
    if (res) {
        getDetilsComment()
        comment.value = ""
    }
}
async function getCategoriesMovie(category) {
    const data = await $fetch(`${store.baseUrl}/category/${category}/content/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + store.token
        }
    })
    movies.value = data?.data?.content
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
        details.value = detailData;
        title.value = detailData?.data?.title
        img_url.value = detailData?.data?.widescreen_thumbnail_image
        await getCategoriesMovie(detailData?.data?.category);
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

const userColors = ['#814814', '#143F81', '#811462', '#148139', '#811414', '#817C14']

onMounted(() => {
    document.getElementById('video')?.childNodes[0]?.addEventListener('click', (e) => {
        if (e.target.paused == true) {
            movieOverlay.value = true
        } else {
            movieOverlay.value = false
        }
    })
    
});
await fetchData();

watchEffect(() => {

})
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