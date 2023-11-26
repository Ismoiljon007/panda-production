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
                                        <li class="select__item" @click="selectGenre($event)">Jangari</li>
                                        <li class="select__item" @click="selectGenre($event)">Fantastik</li>
                                        <li class="select__item" @click="selectGenre($event)">Dramma</li>
                                        <li class="select__item" @click="selectGenre($event)">Komediya</li>
                                        <li class="select__item" @click="selectGenre($event)">Ujas kino</li>
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
                                        <li class="select__item" @click="selectCountry($event)">Jangari</li>
                                        <li class="select__item" @click="selectCountry($event)">Fantastik</li>
                                        <li class="select__item" @click="selectCountry($event)">Dramma</li>
                                        <li class="select__item" @click="selectCountry($event)">Komediya</li>
                                        <li class="select__item" @click="selectCountry($event)">Ujas kino</li>
                                    </ul>
                                </Transition>
                            </div>
                        </div>
                        <div class="select">
                            <h4 class="select__subtitle">Sifat</h4>
                            <div class="select__wrapper">
                                <div class="select__btn"
                                    @click="quality = !quality, genre = false, country = false, yearFrom = false, yearTo = false"
                                    :style="quality !== false ? 'border-radius: 15px 15px 0 0' : 'border-radius: 15px'">
                                    {{ qualityName }} <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="quality">
                                        <li class="select__item" @click="selectQuality($event)">Jangari</li>
                                        <li class="select__item" @click="selectQuality($event)">Fantastik</li>
                                        <li class="select__item" @click="selectQuality($event)">Dramma</li>
                                        <li class="select__item" @click="selectQuality($event)">Komediya</li>
                                        <li class="select__item" @click="selectQuality($event)">Ujas kino</li>
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
                                        <li class="select__item" @click="selectYearFrom($event)">Jangari</li>
                                        <li class="select__item" @click="selectYearFrom($event)">Fantastik</li>
                                        <li class="select__item" @click="selectYearFrom($event)">Dramma</li>
                                        <li class="select__item" @click="selectYearFrom($event)">Komediya</li>
                                        <li class="select__item" @click="selectYearFrom($event)">Ujas kino</li>
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
                                        <li class="select__item" @click="selectYearTo($event)">Jangari</li>
                                        <li class="select__item" @click="selectYearTo($event)">Fantastik</li>
                                        <li class="select__item" @click="selectYearTo($event)">Dramma</li>
                                        <li class="select__item" @click="selectYearTo($event)">Komediya</li>
                                        <li class="select__item" @click="selectYearTo($event)">Ujas kino</li>
                                    </ul>
                                </Transition>
                            </div>
                        </div>
                    </div>
                    <div class="category__btns">
                        <button class="category__reset-btn">Tozalash</button>
                        <button class="category__select-btn">Tanlash</button>
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
                    <div class="category__items">
                        <movie-card v-for="item in categorieMovies?.content" :movie="item" :key="item" />
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

const categorieMovies = ref(null)
const categorieName = ref(null)
async function getCategorieMovie() {
    const data = await $fetch(`https://catalogservice.inminternational.uz/category/${id}/content/`)
    categorieMovies.value = data.data
    store.categories?.data?.categories.forEach(el => {
        if (el.id == id) {
            categorieName.value = el.name
        }
    })
}
getCategorieMovie()

const genreName = ref("Barchasi")
function selectGenre(e) {
    genreName.value = e.target.textContent
    genre.value = false
}

const countryName = ref("Uzbekistan")
function selectCountry(e) {
    countryName.value = e.target.textContent
    country.value = false
}

const qualityName = ref("Full HD")
function selectQuality(e) {
    qualityName.value = e.target.textContent
    quality.value = false
}

const yearFromName = ref("Barchasi")
function selectYearFrom(e) {
    yearFromName.value = e.target.textContent
    yearFrom.value = false
}

const yearToName = ref("Barchasi")
function selectYearTo(e) {
    yearToName.value = e.target.textContent
    yearTo.value = false
}



const onClickHandler = async (page) => {
    const data = await $fetch(`https://catalogservice.inminternational.uz/category/${id}/content/?page=${page}&size=10`)
    categorieMovies.value = data.data
    // console.log(data);
};

const currentPage = ref(1);
store.loader = false
</script>

<style lang="scss">
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