<template>
    <main>
        <div class="movie">
            <div class="container">
                <div class="movie-video">
                    <img src="@/assets/images/png/movie.png" alt="">
                </div>
                <h2 class="movie__title">Mening sevgilim ayg’oqchi</h2>
                <div class="movie__info">
                    <div class="movie__info-list">
                        <li>Sanasi: <span>2023</span></li>
                        <li>Janr: <span>Komediya, Romantika</span></li>
                        <li>Davomiyligi: <span>01:51:00</span></li>
                    </div>
                    <p class="movie__info-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante
                        quam. Integer in ante leo. Donec felis nisl, semper at fermentum at, tristique quis nisi. In
                        malesuada convallis metus, ac maximus orci molestie ut.Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Sed lacinia ante quam. Integer in ante leo. Donec felis nisl, semper at fermentum
                        at, tristique quis nisi. In malesuada convallis metus, ac maximus orci molestie ut.</p>
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
                <Swiper :modules="[SwiperNavigation]"
                    :navigation="{ nextEl: '.movie__rigth', prevEl: '.movie__left' }"
                    :slides-per-view="'auto'" :space-between="30" class="movie__swiper">
                    <SwiperSlide v-for="item in 12" :key="item" class="movie__slide">
                        <movie-card />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </main>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>