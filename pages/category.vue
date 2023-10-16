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
                                    Barchasi <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="genre">
                                        <li class="select__item">Jangari</li>
                                        <li class="select__item">Fantastik</li>
                                        <li class="select__item">Dramma</li>
                                        <li class="select__item">Komediya</li>
                                        <li class="select__item">Ujas kino</li>
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
                                    Barchasi <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="country">
                                        <li class="select__item">Jangari</li>
                                        <li class="select__item">Fantastik</li>
                                        <li class="select__item">Dramma</li>
                                        <li class="select__item">Komediya</li>
                                        <li class="select__item">Ujas kino</li>
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
                                    Barchasi <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="quality">
                                        <li class="select__item">Jangari</li>
                                        <li class="select__item">Fantastik</li>
                                        <li class="select__item">Dramma</li>
                                        <li class="select__item">Komediya</li>
                                        <li class="select__item">Ujas kino</li>
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
                                    Barchasi <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="yearFrom">
                                        <li class="select__item">Jangari</li>
                                        <li class="select__item">Fantastik</li>
                                        <li class="select__item">Dramma</li>
                                        <li class="select__item">Komediya</li>
                                        <li class="select__item">Ujas kino</li>
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
                                    Barchasi <img src="@/assets/images/svg/select.svg" alt=""></div>
                                <Transition name="select">
                                    <ul class="select__list" v-if="yearTo">
                                        <li class="select__item">Jangari</li>
                                        <li class="select__item">Fantastik</li>
                                        <li class="select__item">Dramma</li>
                                        <li class="select__item">Komediya</li>
                                        <li class="select__item">Ujas kino</li>
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
                        <h2 class="category__title">O’zbek kinolar</h2>
                        <div class="pagination">
                            <vue-awesome-paginate :total-items="20" :items-per-page="1" :max-pages-shown="3"
                                v-model="currentPage" :on-click="onClickHandler" />
                        </div>
                    </div>
                    <div class="category__items">
                        <movie-card v-for="item in 50" :key="item" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useStore } from '~~/store/store';
const store = useStore()
store.loader = false
const genre = ref(false)
const country = ref(false)
const quality = ref(false)
const yearFrom = ref(false)
const yearTo = ref(false)

const onClickHandler = (page) => {
    console.log(page);
};

const currentPage = ref(1);

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


.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}
</style>