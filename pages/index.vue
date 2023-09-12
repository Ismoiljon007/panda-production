<template>
    <main>
        <div class="hero">
            <Swiper :autoplay="{ delay: 4000, disableOnInteraction: false, }" :speed="800" :modules="[SwiperAutoplay]"
                class="hero__swiper">
                <SwiperSlide v-for="item in 3" :key="item" class="hero__slide">
                    <img src="@/assets/images/jpg/hero-img.jpg" alt="hero img" class="hero__img">
                    <div class="container">
                        <div class="hero__slide-text-wrapper">
                            <h4 class="hero__slide-subtitle">2023 / Komediya</h4>
                            <h2 class="hero__slide-title">Mening sevgilim ayg’oqchi</h2>
                            <p class="hero__slide-desc">Lorem Ipsum has been the industry's standard dummy text ever since
                                the
                                1500s, when an unknown printer took a galley of type and scrambled it to
                                make a type specimen book.</p>
                            <NuxtLink class="hero__slide-btn" to="/"><img src="@/assets/images/svg/play.svg" alt=""> Ko’rish
                            </NuxtLink>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="add">
            <img src="@/assets/images/jpg/add.jpg" alt="">
        </div>
        <div class="uzbek-movies">
            <div class="container">
                <div class="uzbek-movies__header">
                    <h2 class="uzbek-movies__title">O’zbek kinolar</h2>
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
                    <SwiperSlide v-for="item in 12" :key="item" class="uzbek-movies__slide">
                        <movie-card />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div class="movies">
            <div class="container">
                <div class="movies__header">
                    <h2 class="movies__title">O’zbek kinolar</h2>
                    <div class="movies__navigations">
                        <button class="movies__left"><img src="@/assets/images/svg/left.svg" alt=""></button>
                        <button class="movies__rigth"><img src="@/assets/images/svg/right.svg" alt=""></button>
                    </div>
                </div>
                <Swiper :modules="[SwiperNavigation]"
                    :navigation="{ nextEl: '.movies__rigth', prevEl: '.movies__left' }"
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
                <Swiper :modules="[SwiperNavigation]"
                    :navigation="{ nextEl: '.serials__rigth', prevEl: '.serials__left' }"
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
        </div>
    </main>
</template>

<script setup>
onMounted(() => {
})
</script>

<style lang="scss" scoped></style>