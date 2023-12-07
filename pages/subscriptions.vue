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
                            <li @click="subs = 'subs'" :class="subs == 'subs' ? 'subscriptions-nav-item-active' : ''">Obuna
                                sotib olish</li>
                            <li @click="subs = 'active', activePlanGet()"
                                :class="subs == 'active' ? 'subscriptions-nav-item-active' : ''">
                                Aktiv obunalar</li>
                            <li>Sotib olish tarixi</li>
                            <li>Promo kod</li>
                        </ul>
                        <div class="subscriptions__tarrifs-wr" v-if="subs == 'subs'">
                            <div class="subscriptions__tarrifs">
                                <div class="subscriptions__tarrif" v-for="item in plans" :key="item">
                                    <div class="subscriptions__tarrif-top">
                                        <h4 class="subscriptions__tarrif-title">{{ item?.name }}</h4>
                                    </div>
                                    <div class="subscriptions__tarrif-bottom">
                                        <p class="subscriptions__tarrif-desc">
                                            {{ item?.description }}
                                        </p>
                                        <h4 class="subscriptions__tarrif-price">{{ item?.duration_days }} kunga {{
                                            item?.price
                                        }} so’m</h4>
                                        <button class="subscriptions__tarrif-btn"
                                            @click="pay(item.id, item?.name, item.price)">Obuna
                                            bo‘lish</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="subscriptions__tarrifs-wr" v-if="subs == 'active'">
                            <div class="subscriptions__tarrifs" v-if="activePlan?.length">
                                <div class="subscriptions__tarrif" v-for="item in activePlan" :key="item">
                                    <div class="subscriptions__tarrif-top">
                                        <h4 class="subscriptions__tarrif-title">{{ item?.subscription_plan?.name }}</h4>
                                    </div>
                                    <div class="subscriptions__tarrif-bottom">
                                        <p class="subscriptions__tarrif-desc">
                                            {{ item?.subscription_plan?.description }}
                                        </p>
                                        <h4 class="subscriptions__tarrif-price">{{ item?.subscription_plan?.duration_days }}
                                            kunga {{
                                                item?.subscription_plan?.price
                                            }} so’m</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="saved__not-found" v-if="!activePlan?.length">
                                <span class="saved__not-found-icon">:(</span>
                                <h2 class="saved__not-fount-title">Aktiv obunalar yoq</h2>
                            </div>
                        </div>
                        <div class="profile__footer">
                            <h4 class="profile__id">ID: <span>{{ userInfo?.data?.id }}</span></h4>
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
const router = useRouter()
const subs = ref('subs')
async function getPlans() {
    store.loader = true

    const data = await $fetch(`${store.baseUrl}/plans/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + store.token
        },
    })
    plans.value = data.data

    store.loader = false
}
function pay(id, name, price) {
    store.planId = id
    store.plan_name = name + ', ' + 'price: ' + price
    router.push('/payment')
}
getPlans()

const userInfo = ref(null)
async function getUserInfo() {
    store.loader = true;
    try {
        const data = await $fetch("https://userservice.inminternational.uz/users", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.token
            }
        })
        userInfo.value = data
    } catch (error) {
        console.error("Failed to fetch data", error);
    } finally {
        store.loader = false;
    }
}
await getUserInfo()

const activePlan = ref([])
async function activePlanGet() {
    const data = await $fetch(`https://billingservice.inminternational.uz/billing/${userInfo.value?.data?.id}/subscriptions/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + store.token,
            'Content-Type': 'application/json'
        },
    })
    activePlan.value = data.data
}

</script>

<style lang="scss" scoped></style>