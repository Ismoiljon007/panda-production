<template>
    <main>
        <div class="movie">
            <div class="container">
                <div class="movie-top">
                    <div class="movie-video" v-if="vidType == 'online'">
                        <serie-video-player :item="{
                            url: video_url,
                            img: img_url,
                            controls: true,
                            autoplay: false,
                            loop: false,
                            muted: false,
                            id: episodeId,
                            content_type: 'episode',
                            allEpisodes: episods?.data?.episodes
                        }" @nextepisode="nextEpisode"/>
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
        sanlarniChiqarish(details?.data?.duration_minute) }}</span></li>
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
                                :style="vidType == 'online' ? 'background-color: #fff; color: rgba(28, 28, 28, 1)' : ''">SERIALNI
                                KO'RISH</button>
                            <button @click="vidType = 'trailer'"
                                :style="vidType == 'trailer' ? 'background-color: #fff; color: rgba(28, 28, 28, 1)' : ''">TREYLERNI
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
                                    <!-- <button>
                                        <img src="@/assets/images/svg/heart.svg" alt="">
                                        <span>Yoqdi(30)</span>
                                    </button> -->
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
                        <span @click="viewAllComments()">Barcha sharhlarni ko'rish</span>
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
const videoPlayerCustom = ref()
const comment = ref()
const details = ref(null);
const movies = ref([]);
const vidType = ref('online')

const paymentTrue = ref(true)

const title = ref(null)
const video_url = ref("")
const img_url = ref("")

const router = useRouter()

function nextEpisode(i) {
    console.log(i);
    // getSeries(id)
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
function sanlarniChiqarish(daqiqa) {
    const hours = Math.floor(daqiqa / 60);
    const remainingMinutes = daqiqa % 60;
    return `${hours}:${remainingMinutes}`
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
const episodeId = ref(null)
async function getSeries(episode, e) {
    const data = await $fetch(`${store.baseUrl}/series/${id}/seasons/${episodeNumber.value}/episodes/${episode}/`, {
        headers: {
            Authorization: 'Bearer ' + store.token
        }
    })
    episodeId.value = data?.data?.id

    video_url.value = data?.data?.episode_content_url
    img_url.value = data?.data?.thumbnail_image_url
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
const repliesCom = ref(null)
async function replie(parent) {
    console.log(parent);
    const res = await $fetch(`${store.baseUrl}/comments/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + store.token
        },
        body: {
            username: store.userInfo?.username,
            content: repliesCom.value,
            object_id: id,
            content_type: 'SERIES',
            parent: parent
        }
    })
    if (res) {
        getDetilsComment()
        repliesCom.value = ""
    }
}


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
            content_type: 'SERIES'
        }
    })
    if (res) {
        getDetilsComment()
        comment.value = ""
    }
}
async function getCategoriesMovie() {
    const fetchPromises = store.categories.data.categories.map(el =>
        $fetch(`${store.baseUrl}/category/${el.id}/content/`, {
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
const episodeNumber = ref(0)
async function getEpisods(ep) {
    const data = await $fetch(store.baseUrl + '/series/' + id + `/seasons/${ep}/episodes/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + store.token
        }
    });
    episodeNumber.value = ep
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
            // video_url.value = res?.data?.series_summary_url
        }
        title.value = res?.data?.title
        // img_url.value = res?.data?.widescreen_thumbnail_image
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
    document.querySelectorAll('.movie-episods__seasons-item')[0].classList.add('active-btn')
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



</script>

<style lang="scss">
.active-btn {
    background: rgba($color: #fff, $alpha: 1) !important;
    color: #000 !important;
    border-color: transparent !important;

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