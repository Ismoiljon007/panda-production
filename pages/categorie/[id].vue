<template>
    <main>
        <div class="category">
            <div class="category__top">
                <div class="container">
                    <div class="category__selects">
                        <div class="select">
                            <h4 class="select__subtitle">Janr</h4>
                            <div class="select__wrapper">
                                <div class="select__btn"
                                    @click="genre = !genre, country = false, quality = false, yearFrom = false, yearTo = false"
                                    :style="genre !== false ? 'border-radius: 15px 15px 0 0' : 'border-radius: 15px'">
                                    {{ genreName }} <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="genre">
                                        <li class="select__item" @click="selectGenre(item.name)"
                                            v-for="item in genreApi.data" :key="item">{{ item?.name }}</li>
                                    </ul>
                                </Transition>
                            </div>
                        </div>
                        <div class="select">
                            <h4 class="select__subtitle">Mamlakat</h4>
                            <div class="select__wrapper">
                                <div class="select__btn"
                                    @click="country = !country, genre = false, quality = false, yearFrom = false, yearTo = false"
                                    :style="country !== false ? 'border-radius: 15px 15px 0 0' : 'border-radius: 15px'">
                                    {{ countryName }} <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="country">
                                        <li class="select__item" @click="selectCountry($event)">Uzbekistan</li>
                                    </ul>
                                </Transition>
                            </div>
                        </div>
                        <div class="select">
                            <h4 class="select__subtitle">Yil( dan )</h4>
                            <div class="select__wrapper">
                                <div class="select__btn"
                                    @click="yearFrom = !yearFrom, genre = false, country = false, quality = false, yearTo = false"
                                    :style="yearFrom !== false ? 'border-radius: 15px 15px 0 0' : 'border-radius: 15px'">
                                    {{ yearFromName }} <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="yearFrom">
                                        <li class="select__item" @click="selectYearFrom(item)"
                                            v-for="item in apiYear?.data?.available_years" :key="item">{{ item }}</li>
                                    </ul>
                                </Transition>
                            </div>
                        </div>
                        <div class="select">
                            <h4 class="select__subtitle">Yil( gacha )</h4>
                            <div class="select__wrapper">
                                <div class="select__btn"
                                    @click="yearTo = !yearTo, genre = false, country = false, quality = false, yearFrom = false"
                                    :style="yearTo !== false ? 'border-radius: 15px 15px 0 0' : 'border-radius: 15px'">
                                    {{ yearToName }} <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="yearTo">
                                        <li class="select__item" @click="selectYearTo(item)"
                                            v-for="item in apiYear?.data?.available_years" :key="item">{{ item }}</li>
                                    </ul>
                                </Transition>
                            </div>
                        </div>
                    </div>
                    <div class="category__btns">
                        <button class="category__reset-btn" @click="resetFilter()">Tozalash</button>
                        <!-- <button class="category__select-btn" @click="filterCategory()">Tanlash</button> -->
                    </div>
                </div>
            </div>
            <div class="category__main">
                <div class="container">
                    <div class="category__main-top">
                        <h2 class="category__title">{{ categorieName }}</h2>
                        <div class="pagination">
                            <vue-awesome-paginate :total-items="categorieMovies?.pagination?.current_page"
                                :items-per-page="1" :max-pages-shown="3" v-model="currentPage" :on-click="onClickHandler" />
                        </div>
                    </div>
                    <div class="category__items" v-if="categorieMovies?.content.length">
                        <movie-card v-for="item in categorieMovies?.content" :movie="item" :key="item" />
                    </div>
                    <div class="category__not-found" v-if="!categorieMovies?.content.length">
                        <span class="saved__not-found-icon">:(</span>
                        <h2 class="saved__not-fount-title">Xech qanday ma'lumot topilmadi</h2>
                    </div>
                    <div class="main-pagination">
                        <vue-awesome-paginate :total-items="categorieMovies?.pagination?.current_page" :items-per-page="1"
                            :max-pages-shown="3" v-model="currentPage" @click="onClickHandler" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import {VueAwesomePaginate} from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import { useStore } from '~~/store/store'

const store = useStore()
store.loader = true
const { id } = useRoute().params
const genre = ref(false)
const country = ref(false)
const quality = ref(false)
const yearFrom = ref(false)
const yearTo = ref(false)

let page = ref(10);
let totalPages = 20;
await store.getSavedMovies()

const apiYear = await $fetch(`${store.baseUrl}/available-years/`)


const categorieMovies = ref(null)
const categorieName = ref(null)
async function getCategorieMovie() {
    if (store.token) {
        const data = await $fetch(`${store.baseUrl}/category/${id}/content/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        })
        categorieMovies.value = data.data
        store.categories?.data?.categories.forEach(el => {
            if (el.id == id) {
                categorieName.value = el.name
            }
        })
    } else {
        const data = await $fetch(`${store.baseUrl}/category/${id}/content/`)
        categorieMovies.value = data.data
        store.categories?.data?.categories.forEach(el => {
            if (el.id == id) {
                categorieName.value = el.name
            }
        })

    }
}
getCategorieMovie()

const genreName = ref("Barchasi")
async function selectGenre(n) {
    genreName.value = n
    genre.value = false
    const data = await $fetch(`${store.baseUrl}/search`, {
        method: 'GET',
        params: {
            genre: genreName.value?.toLowerCase(),
            start_year: yearFromName.value,
            end_year: yearToName.value,
            category: id

        }
    })
    categorieMovies.value = data.data
}
async function resetFilter() {
    genreName.value = "Barchasi"
    yearFromName.value = "Barchasi"
    yearToName.value = "Barchasi"
    const data = await $fetch(`${store.baseUrl}/search`, {
        method: 'GET',
        params: {
            category: id
        }
    })
    categorieMovies.value = data.data
}
const countryName = ref("Uzbekistan")
async function selectCountry(e) {
    countryName.value = e.target.textContent
    country.value = false
    const data = await $fetch(`${store.baseUrl}/search`, {
        method: 'GET',
        params: {
            genre: genreName.value?.toLowerCase(),
            start_year: yearFromName.value,
            end_year: yearToName.value,
            category: id


        }
    })
    categorieMovies.value = data.data
}

const qualityName = ref("Full HD")


const yearFromName = ref("Barchasi")
async function selectYearFrom(y) {
    yearFromName.value = y
    yearFrom.value = false
    const data = await $fetch(`${store.baseUrl}/search`, {
        method: 'GET',
        params: {
            genre: genreName.value == 'Barchasi' ? "" : genreName.value?.toLowerCase(),
            start_year: yearFromName.value,
            end_year: yearToName.value,
            category: id

        }
    })
    // console.log(yearFromName.value);
    categorieMovies.value = data.data
}

const yearToName = ref("Barchasi")
async function selectYearTo(y) {
    yearToName.value = y
    yearTo.value = false
    const data = await $fetch(`${store.baseUrl}/search`, {
        method: 'GET',
        params: {
            genre: genreName.value == 'Barchasi' ? "" : genreName.value?.toLowerCase(),
            start_year: yearFromName.value,
            end_year: yearToName.value,
            category: id


        }
    })
    categorieMovies.value = data.data

}
const genreApi = await $fetch(`${store.baseUrl}/genres/`)

const g = ref()


const onClickHandler = async (page) => {
    const data = await $fetch(`https://catalogservice.inminternational.uz/category/${id}/content/?page=${page}&size=10`)
    categorieMovies.value = data.data
    // console.log(data);
};

const currentPage = ref(1);
store.loader = false
</script>

<style lang="scss">
.category__not-found {
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.select-enter-from,
.select-leave-to {
    opacity: 0;
    transform: translateX(20%);
}

.select-enter-active,
.select-leave-active {
    transition: 0.3s;
    transform: translate(0%);
}



.active-page {
    background: #2B2B2B !important;
    color: #adadad !important;
    border: none;
}

.paginate-buttons {
    color: #adadad !important;
    line-height: 1.2 !important;
    font-size: 18px !important;
    font-weight: 500 !important;
    border: none !important;
    background: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background: #2B2B2B !important;
    }
}
</style>