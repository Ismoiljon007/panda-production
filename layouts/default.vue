<template>
    <header class="header" :class="{ 'header-fixed': scrolledNav }">
        <div class="container">
            <button class="header-burger" @click="menu = true">
                <img src="@/assets/images/svg/burger.svg" alt="" style="pointer-events: none;">
            </button>
            <NuxtLink class="site-logo" to="/">
                <img src="@/assets/images/svg/logo.svg" alt="site logo">
            </NuxtLink>
            <nav class="navigation">
                <ul class="navigation__list">
                    <li class="navigation__item" v-for="item in store.categories?.data?.categories" :key="item">
                        <NuxtLink :to="`/categorie/${item.id}`">{{ item?.name }}</NuxtLink>
                    </li>
                </ul>
            </nav>
            <div class="header__second-nav">
                <div class="header__search" @click="store.search_open = true, store.overlay = true">
                    <input type="text">
                    <img src="@/assets/images/svg/search.svg" alt="">
                </div>
                <NuxtLink to="/login" v-if="!token" class="header__login-btn">Kirish</NuxtLink>
                <button class="header__profile" v-else @click="profile = !profile">
                    <span style="pointer-events: none;">{{ userInfo?.username.split("")[0] }}</span>
                    <Transition name="fade">
                        <div class="profile-modal" v-if="profile">
                            <div class="profile-modal__top">
                                <span>{{ userInfo?.phone_number }}</span>
                                <span>|</span>
                                <span>ID: {{ userInfo?.id }}</span>
                            </div>
                            <NuxtLink to="/profile" class="profile-modal__item"><img src="@/assets/images/svg/user.svg"
                                    alt=""> Akkaunt
                            </NuxtLink>
                            <NuxtLink to="/subscriptions" class="profile-modal__item"><img
                                    src="@/assets/images/svg/subs.svg" alt=""> Obunalar
                            </NuxtLink>
                            <NuxtLink to="/payment" class="profile-modal__item"><img src="@/assets/images/svg/pay.svg"
                                    alt="">
                                To’lovlar
                            </NuxtLink>
                            <NuxtLink to="/saved" class="profile-modal__item"><img src="@/assets/images/svg/bookmark.svg"
                                    alt="">
                                Tanlanganlar</NuxtLink>
                            <NuxtLink to="/history" class="profile-modal__item"><img src="@/assets/images/svg/history.svg"
                                    alt=""> Tarix
                            </NuxtLink>
                            <NuxtLink to="/active-sessions" class="profile-modal__item"><img
                                    src="@/assets/images/svg/active-seans.svg" alt=""> Faol
                                sessiyalar</NuxtLink>
                            <button @click="logout()" class="logout">
                                <img src="@/assets/images/svg/fi-rr-sign-out.svg" alt="">
                                chiqish
                            </button>
                        </div>
                    </Transition>
                </button>
            </div>
            <button class="mobil-search" @click="store.search_open = true, store.overlay = true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="" width="20" height="20">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M14.947 13.771l4.808 4.809a.833.833 0 01-1.18 1.175l-4.808-4.804a8.384 8.384 0 01-5.338 1.906A8.428 8.428 0 010 8.43a8.428 8.428 0 1114.947 5.342zM1.673 8.43c0 3.722 3.029 6.75 6.756 6.75 3.722 0 6.755-3.028 6.755-6.75 0-3.723-3.033-6.756-6.755-6.756A6.763 6.763 0 001.673 8.43z"
                        fill="#fff"></path>
                </svg>
            </button>
        </div>
    </header>
    <transition name="menu">
        <div class="menu" v-if="menu">
            <div class="menu-top">
                <button class="menu-close" @click="menu = false">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="" width="20" height="20">
                        <g fill="none" fill-rule="evenodd">
                            <path d="M0 0h20v20H0z"></path>
                            <path
                                d="M10 8.872l5.639-5.638a.797.797 0 011.127 1.127L11.128 10l5.638 5.639a.797.797 0 11-1.127 1.127L10 11.128l-5.639 5.638a.797.797 0 11-1.127-1.127L8.872 10 3.234 4.361A.797.797 0 014.36 3.234L10 8.872z"
                                fill="rgba(255, 255, 255, 0.70)" fill-rule="nonzero"></path>
                        </g>
                    </svg>
                </button>
            </div>
            <NuxtLink class="menu-user" to="/profile" v-if="store.token">
                <div class="menu-img" style="text-transform: uppercase;">
                    {{ userInfo?.username.split("")[0] }}
                </div>
                <div class="menu-text-wrapper">
                    <h3 class="menu-name">{{ userInfo?.username }}</h3>
                    <h4 class="menu-id">ID: {{ userInfo?.id }}</h4>
                </div>
            </NuxtLink>
            <ul class="menu-list">
                <li class="menu-item" v-for="item in store.categories?.data?.categories" :key="item">
                    <NuxtLink :to="`/categorie/${item.id}`">{{ item?.name }}</NuxtLink>
                </li>
            </ul>
            <button @click="logout()" class="logout" v-if="store.token">
                <img src="@/assets/images/svg/fi-rr-sign-out.svg" alt="">
                chiqish
            </button>
            <NuxtLink v-if="!store.token" to="/login" class="btn">Kirish</NuxtLink>
        </div>
    </transition>
    <Transition name="search">
        <div class="search" v-if="store.search_open">
            <form @submit.prevent="searchSubmit()">
                <input type="text" autofocus v-model="searchEvent" @input="search($event)">
                <button>Qidirish</button>
            </form>
            <ul class="search-list" v-if="searchData?.length">
                <li v-for="item in searchData" :key="item">
                    <NuxtLink @click="store.search_open = false, searchData = []" :to="`/watch/${item?.id}`">
                        <img :src="item?.thumbnail_image" alt="">
                        <div class="wrapper">
                            {{ item?.title }}
                            <div class="genres-wrapper">
                                <span>{{ item?.genre[0].name }}</span>
                                <span>/</span>
                                <span>{{ yearGet(item?.release_date) }}</span>
                            </div>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </Transition>
    <NuxtPage />
    <footer class="footer">
        <div class="footer__top">
            <div class="container">
                <div class="footer-apps">
                    <a href="#">
                        <img src="@/assets/images/png/play-market.png" alt="">
                    </a>
                    <a href="#">
                        <img src="@/assets/images/png/apple-market.png" alt="">
                    </a>
                </div>
                <div class="footer-connection">
                    <a href="#" class="footer-connection__item">
                        <div class="footer-connection__item-img">
                            <img src="@/assets/images/svg/phone-call.svg" alt="">
                        </div>
                        <span>+998 97 666 25 84</span>
                    </a>
                    <a href="#" class="footer-connection__item">
                        <div class="footer-connection__item-img">
                            <img src="@/assets/images/svg/envelope.svg" alt="">
                        </div>
                        <span>pandafilms@gmail.com</span>
                    </a>
                </div>
                <ul class="footer-social">
                    <li>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g clip-path="url(#clip0_921_748)">
                                    <path
                                        d="M7.49905 10.9588L7.21877 14.9339C7.61978 14.9339 7.79345 14.7603 8.00172 14.5517L9.88178 12.7399L13.7775 15.6166C14.4919 16.0181 14.9953 15.8067 15.188 14.9539L17.7451 2.87182L17.7458 2.87111C17.9725 1.80613 17.3639 1.38968 16.6678 1.65094L1.63719 7.45349C0.61138 7.85499 0.626912 8.43162 1.46281 8.69288L5.30553 9.8981L14.2314 4.2664C14.6515 3.98592 15.0334 4.14111 14.7192 4.42159L7.49905 10.9588Z"
                                        fill="rgba(143, 142, 148, 1)" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_921_748">
                                        <rect width="16.9438" height="17.0852" fill="rgba(143, 142, 148, 1)"
                                            transform="translate(0.850586 0.151611)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                                <g clip-path="url(#clip0_921_752)">
                                    <path
                                        d="M11.8447 0.151611H5.49075C2.56688 0.151611 0.195801 2.49679 0.195801 5.38872V11.6733C0.195801 14.5652 2.56688 16.9104 5.49075 16.9104H11.8447C14.7686 16.9104 17.1396 14.5652 17.1396 11.6733V5.38872C17.1396 2.49679 14.7686 0.151611 11.8447 0.151611ZM15.5512 11.6733C15.5512 13.6948 13.8885 15.3392 11.8447 15.3392H5.49075C3.4469 15.3392 1.78429 13.6948 1.78429 11.6733V5.38872C1.78429 3.3672 3.4469 1.72274 5.49075 1.72274H11.8447C13.8885 1.72274 15.5512 3.3672 15.5512 5.38872V11.6733Z"
                                        fill="#8F8E94" />
                                    <path
                                        d="M8.6676 4.34131C6.32829 4.34131 4.43164 6.21724 4.43164 8.531C4.43164 10.8448 6.32829 12.7207 8.6676 12.7207C11.0069 12.7207 12.9036 10.8448 12.9036 8.531C12.9036 6.21724 11.0069 4.34131 8.6676 4.34131ZM8.6676 11.1496C7.20831 11.1496 6.02013 9.97435 6.02013 8.531C6.02013 7.0866 7.20831 5.91244 8.6676 5.91244C10.1269 5.91244 11.3151 7.0866 11.3151 8.531C11.3151 9.97435 10.1269 11.1496 8.6676 11.1496Z"
                                        fill="#8F8E94" />
                                    <path
                                        d="M13.2212 4.5853C13.5329 4.5853 13.7856 4.33535 13.7856 4.02702C13.7856 3.7187 13.5329 3.46875 13.2212 3.46875C12.9094 3.46875 12.6567 3.7187 12.6567 4.02702C12.6567 4.33535 12.9094 4.5853 13.2212 4.5853Z"
                                        fill="#8F8E94" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_921_752">
                                        <rect width="16.9438" height="16.7588" fill="white"
                                            transform="translate(0.195801 0.151611)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g clip-path="url(#clip0_921_767)">
                                    <path
                                        d="M13.6887 0.155166L11.4915 0.151611C9.02299 0.151611 7.42774 1.80195 7.42774 4.35629V6.29493H5.21854C5.02764 6.29493 4.87305 6.45099 4.87305 6.64349V9.45235C4.87305 9.64485 5.02781 9.80073 5.21854 9.80073H7.42774V16.8884C7.42774 17.0809 7.58233 17.2368 7.77323 17.2368H10.6556C10.8465 17.2368 11.0011 17.0807 11.0011 16.8884V9.80073H13.5842C13.7751 9.80073 13.9297 9.64485 13.9297 9.45235L13.9307 6.64349C13.9307 6.55106 13.8942 6.46254 13.8295 6.39714C13.7648 6.33173 13.6767 6.29493 13.585 6.29493H11.0011V4.65152C11.0011 3.86163 11.1878 3.46065 12.2082 3.46065L13.6883 3.46011C13.8791 3.46011 14.0337 3.30406 14.0337 3.11174V0.503542C14.0337 0.311402 13.8792 0.155522 13.6887 0.155166Z"
                                        fill="#8F8E94" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_921_767">
                                        <rect width="16.9438" height="17.0852" fill="white"
                                            transform="translate(0.981445 0.151611)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                                <g clip-path="url(#clip0_921_763)">
                                    <path
                                        d="M16.8884 4.57127C16.7067 3.90301 16.174 3.37623 15.4985 3.19629C14.2643 2.8623 9.3277 2.8623 9.3277 2.8623C9.3277 2.8623 4.39127 2.8623 3.15713 3.18363C2.49459 3.36338 1.9489 3.90311 1.76716 4.57127C1.44238 5.79183 1.44238 8.3231 1.44238 8.3231C1.44238 8.3231 1.44238 10.8671 1.76716 12.0749C1.94909 12.7431 2.48159 13.2699 3.15723 13.4498C4.40426 13.7839 9.32789 13.7839 9.32789 13.7839C9.32789 13.7839 14.2643 13.7839 15.4985 13.4626C16.1741 13.2827 16.7067 12.7559 16.8886 12.0878C17.2133 10.8671 17.2133 8.33595 17.2133 8.33595C17.2133 8.33595 17.2263 5.79183 16.8884 4.57127ZM7.75599 10.6616V5.98462L11.861 8.3231L7.75599 10.6616Z"
                                        fill="#8F8E94" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_921_763">
                                        <rect width="16.8224" height="16.6387" fill="white"
                                            transform="translate(0.925293 0.150879)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer__bottom">
            <div class="container">
                <div class="footer__desc">© 2023 barcha huquqlar himoyalangan <a href="#">www.Pandafilms.com</a></div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { useStore } from '~~/store/store';
const store = useStore()
const search_open = ref(false)
const token = ref(false)
const menu = ref(false)
function searchSubmit() {
    if (searchEvent.value.length) {
        router.push('/search/' + searchEvent.value)
        searchEvent.value = ""
        store.overlay = false
        store.search_open = false
        searchData.value = []
    }
}
function yearGet(y) {
    const dateString = y;

    // Create a new Date object from the string
    const dateObject = new Date(dateString);

    // Get the year
    const year = dateObject.getFullYear();
    return year
}
const searchEvent = ref("")
const router = useRouter()
if (typeof window !== 'undefined') {
    if (localStorage.getItem('access__token')) {
        token.value = true
    } else {
        token.value = false
    }
}
function logout() {
    router.push('/')
    localStorage.clear()
    token.value = false
    store.token = typeof window !== "undefined"
        ? localStorage.getItem("access__token")
        : null;
}
const profile = ref(false)
const userInfo = ref(null)
async function getUserInfo() {
    // store.loader = true;
    try {
        const data = await $fetch("https://userservice.inminternational.uz/users", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        })
        userInfo.value = data.data
        localStorage.setItem('user_id', data?.data?.id)
    } catch (error) {
        console.error("Failed to fetch data", error);
    } finally {
    }

}
await getUserInfo()

const searchData = ref([])

const search = async (e) => {
    const data = await $fetch(`${store.baseUrl}/search/`, {
        method: 'GET',
        params: {
            q: e.target.value
        },
        headers: {
            'Authorization': 'Bearer ' + store.token
        }
    })
    if (e.target.value.length) {
        searchData.value = data.data.content
    } else {
        searchData.value = null
    }
}

const scrolledNav = ref(false)
const updateScroll = () => {
    const scrollposition = window.scrollY;
    if (scrollposition > 800) {
        scrolledNav.value = true;
        return;
    }
    scrolledNav.value = false;
};

onMounted(() => {
    window.addEventListener('click', (e) => {
        if (!e.target.classList.contains('header__profile')) {
            if (profile.value) {
                profile.value = false
            }
        }
        if (!e.target.classList.contains('header-burger')) {
            if (menu.value) {
                menu.value = false
            }
        }
    })
    window.addEventListener("scroll", updateScroll);

})
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
    transform: translateY(0);

}


.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.menu-enter-active,
.menu-leave-active {
    transition: all 0.2s ease;
    transform: translateX(0);

}

.menu-enter-from,
.menu-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}

.search-enter-active,
.search-leave-active {
    transition: all 0.5s ease;
    width: 80%;

    @media (max-width: 920px) {
        width: 100%;
    }
}

.search-enter-from,
.search-leave-to {
    opacity: 0;
    width: 20%;
}
</style>