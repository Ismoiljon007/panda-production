<template>
    <main>
        <div class="subscriptions">
            <div class="container">
                <div class="subscriptions__top">
                </div>
                <div class="subscriptions__bottom">
                    <Nav />
                    <div class="subscriptions__bottom-wrapper">
                        <ul class="subscriptions__nav">
                            <li class="subscriptions-nav-item-active">Obuna sotib olish</li>
                            <li>Aktiv obunalar</li>
                            <li>Sotib olish tarixi</li>
                            <li>Promo kod</li>
                        </ul>
                        <div class="subscriptions__tarrifs">
                            <div class="subscriptions__tarrif" v-for="item in plans" :key="item">
                                <div class="subscriptions__tarrif-top">
                                    <h4 class="subscriptions__tarrif-title">{{ item?.name }}</h4>
                                </div>
                                <div class="subscriptions__tarrif-bottom">
                                    <p class="subscriptions__tarrif-desc">
                                        {{ item?.description }}
                                    </p>
                                    <h4 class="subscriptions__tarrif-price">{{ item?.duration_days }} kunga {{ item?.price }} so’m</h4>
                                    <button class="subscriptions__tarrif-btn">Obuna bo‘lish</button>
                                </div>
                            </div>
                        </div>
                        <div class="profile__footer">
                            <h4 class="profile__id">ID: <span>255 274</span></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useStore } from '~~/store/store'
const store = useStore()
const plans = ref([])
async function getPlans() {
    store.loader = true

    const data = await $fetch(`${store.baseUrl}/plans`)
    plans.value = data.data

    store.loader = false
}

getPlans()
</script>

<style lang="scss" scoped></style>