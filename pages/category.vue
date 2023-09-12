<template>
    <main>
        <div class="category">
            <div class="category__top">
                <div class="container">
                    <div class="category__selects">
                        <div class="select">
                            <h4 class="select__subtitle">Janr</h4>
                            <div class="select__wrapper">
                                <div class="select__btn" @click="genre = !genre"
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
                                <div class="select__btn" @click="country = !country"
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
                                <div class="select__btn" @click="quality = !quality"
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
                                <div class="select__btn" @click="yearFrom = !yearFrom"
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
                                <div class="select__btn" @click="yearTo = !yearTo"
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
                            <ul></ul>
                        </div>
                    </div>
                    <div class="category__items">
                        <movie-card v-for="item in 50" :key="item"/>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>

const genre = ref(false)
const country = ref(false)
const quality = ref(false)
const yearFrom = ref(false)
const yearTo = ref(false)

let page = ref(10);
let totalPages = 20;

onMounted(() => {
    const element = document.querySelector(".pagination ul");

    //calling function with passing parameters and adding inside element which is ul tag
    element.innerHTML = createPagination(totalPages, page.value);
    function createPagination(totalPages, page) {
        let liTag = '';
        let active;
        let beforePage = page - 1;
        let afterPage = page + 1;
        if (page > 1) { //show the next button if the page value is greater than 1
            liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i></span></li>`;
        } else {
            liTag += `<li class="btn prev"><span><i class="fas fa-angle-left"></i></span></li>`;
        }

        if (page > 2) { //if page value is less than 2 then add 1 after the previous button
            liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
            if (page > 3) { //if page value is greater than 3 then add this (...) after the first li or page
                liTag += `<li class="dots"><span>...</span></li>`;
            }
        }

        // how many pages or li show before the current li
        if (page == totalPages) {
            beforePage = beforePage - 2;
        } else if (page == totalPages - 1) {
            beforePage = beforePage - 1;
        }
        // how many pages or li show after the current li
        if (page == 1) {
            afterPage = afterPage + 2;
        } else if (page == 2) {
            afterPage = afterPage + 1;
        }

        for (var plength = beforePage; plength <= afterPage; plength++) {
            if (plength > totalPages) { //if plength is greater than totalPage length then continue
                continue;
            }
            if (plength == 0) { //if plength is 0 than add +1 in plength value
                plength = plength + 1;
            }
            if (page == plength) { //if page is equal to plength than assign active string in the active variable
                active = "active";
            } else { //else leave empty to the active variable
                active = "";
            }
            liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
        }

        if (page < totalPages - 1) { //if page value is less than totalPage value by -1 then show the last li or page
            if (page < totalPages - 2) { //if page value is less than totalPage value by -2 then add this (...) before the last li or page
                liTag += `<li class="dots"><span>...</span></li>`;
            }
            liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
        }

        if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
            liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1})"><span><i class="fas fa-angle-right"></i></span></li>`;
        } else {
            liTag += `<li class="btn next"><span><i class="fas fa-angle-right"></i></span></li>`;
        }
        element.innerHTML = liTag; //add li tag inside ul tag
        return liTag; //reurn the li tag
    }
    // selecting required element
})
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




.pagination ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.pagination ul li {
    color: #adadad;
    list-style: none;
    line-height: 45px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
}

.pagination ul li.numb {
    list-style: none;
    height: 45px;
    width: 45px;
    margin: 0 3px;
    line-height: 45px;
    border-radius: 50%;
}

.pagination ul li.numb.first {
    margin: 0px 3px 0 -5px;
}

.pagination ul li.numb.last {
    margin: 0px -5px 0 3px;
}

.pagination ul li.dots {
    font-size: 22px;
    cursor: default;
}

.pagination ul li.btn {
    padding: 0 20px;
    border-radius: 50px;
}

.pagination li.active,
.pagination ul li.numb:hover,
.pagination ul li:first-child:hover,
.pagination ul li:last-child:hover {
    background: #2B2B2B;
}
</style>