<template>
    <div class="movie-card">
        <div class="movie-card__img">
            <button class="movie-card__save" @click="addFvrt()">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="Bookmark">
                        <path :fill="activeSave ? '#fff' : 'transparent'" stroke="#fff" stroke-width="2px"
                            d="M17,3H7A3.07,3.07,0,0,0,4,6.12V18.94a2,2,0,0,0,1.4,2,1.93,1.93,0,0,0,2.12-.62l4.48-4,4.48,4A1.94,1.94,0,0,0,18,21a1.86,1.86,0,0,0,.61-.1,2,2,0,0,0,1.4-2V6.12A3.07,3.07,0,0,0,17,3Z" />
                    </g>
                </svg>
            </button>
            <NuxtLink :to="`/watch/${movie?.id}`" :isMovie="false">
                <img class="img" :src="movie?.thumbnail_image" alt="">
                <button class="movie-card__play">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
                        <path
                            d="M14.5 6.90192C16.5 8.05663 16.5 10.9434 14.5 12.0981L4.75 17.7272C2.75 18.8819 0.250001 17.4386 0.250001 15.1292L0.250002 3.87084C0.250002 1.56143 2.75 0.118058 4.75 1.27276L14.5 6.90192Z"
                            fill="black" />
                    </svg>
                </button>
            </NuxtLink>
        </div>

        <div class="movie-card__badge-wrapper">
            <span class="movie-card__badge-quality" v-if="movie?.is_premiere">Full HD</span>
            <span class="movie-card__badge-new" v-if="movie?.is_premiere">NEW</span>
        </div>

        <div class="movie-card__text-wrapper">
            <NuxtLink class="movie-card__title" :to="`/watch/${movie?.id}`">{{ movie?.title }}</NuxtLink>
            <div class="movie-card__cat">
                <NuxtLink to="/">2023</NuxtLink>
                <span>/</span>
                <NuxtLink to="/">{{ movie?.genre[0].name }}</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '~/store/store';
const store = useStore()
const router = useRouter()
const { movie } = defineProps(['movie'])
async function addFvrt() {
    if (store.token) {
        if (movie?.is_movie) {
            if (movie?.is_favorited) {
                const data = await $fetch(store.baseUrl + `/movies/${movie?.id}/remove-favorite/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + store.token
                    },
                    body: {
                        "content_type": "MOVIE"
                    }
                })
                await store.getSavedMovies()
            } else {
                const data = await $fetch(store.baseUrl + `/movies/${movie?.id}/add-favorite/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + store.token
                    },
                    body: {
                        "content_type": "MOVIE"
                    }
                })
                await store.getSavedMovies()
            }
        } else {
            if (movie?.is_favorited) {
                const data = await $fetch(store.baseUrl + `/series/${movie?.id}/remove-favorite/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + store.token
                    },
                    body: {
                        "content_type": "SERIES"
                    }
                })
                await store.getSavedMovies()
            } else {
                const data = await $fetch(store.baseUrl + `/series/${movie?.id}/add-favorite/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + store.token
                    },
                    body: {
                        "content_type": "SERIES"
                    }
                })
                await store.getSavedMovies()
            }
        }
    } else {
        router.push('/login')
    }
}



const activeSave = computed(() => {
    if (!store.token) {
        return false
    } else {
        if (store.savedMovies) {
            const itemSave = toRaw(store.savedMovies?.data?.content)?.find(elem => elem.id === movie.id)
            if (itemSave) {
                return true
            }
        }
    }
})
</script>

<style lang="scss" scoped></style>