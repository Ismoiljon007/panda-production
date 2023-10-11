<template>
    <div class="movie-card">
        <div class="movie-card__img">
            <button class="movie-card__save">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="Bookmark">
                        <path fill="transparent" stroke="#fff" stroke-width="2px"
                            d="M17,3H7A3.07,3.07,0,0,0,4,6.12V18.94a2,2,0,0,0,1.4,2,1.93,1.93,0,0,0,2.12-.62l4.48-4,4.48,4A1.94,1.94,0,0,0,18,21a1.86,1.86,0,0,0,.61-.1,2,2,0,0,0,1.4-2V6.12A3.07,3.07,0,0,0,17,3Z" />
                    </g>
                </svg>
            </button>
            <NuxtLink :to="`/watch/${movie?.id}`">
                <img class="img" :src="movie?.thumbnail_image" alt="">
                <button class="movie-card__play">
                    <img src="@/assets/images/svg/play.svg" alt="">
                </button>
            </NuxtLink>
        </div>

        <div class="movie-card__badge-wrapper">
            <span class="movie-card__badge-quality">Full HD</span>
            <span class="movie-card__badge-new">NEW</span>
        </div>

        <div class="movie-card__text-wrapper">
            <NuxtLink class="movie-card__title" :to="`/watch/${1}`">{{ movie?.title }}</NuxtLink>
            <div class="movie-card__cat">
                <NuxtLink to="/">2023</NuxtLink>
                <span>/</span>
                <NuxtLink to="/">Jangari</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const { movie } = defineProps(['movie'])
</script>

<style lang="scss" scoped></style>