<template>
    <main>
        <div class="profile">
            <div class="container">
                <div class="profile__top">
                </div>
                <div class="profile__bottom">
                    <Nav />
                    <div class="profile__bottom-wrapper">
                        <div class="profile__payment">
                            <div class="profile__payment-item">
                                <img src="@/assets/images/png/click.png" alt="payme logo" class="profile__payment-item-img">
                                <h2 class="profile__payment-item-title">{{ store.plan_name == '' ? 'obuna tanlang' :
                                    'tarif: ' + store.plan_name }}</h2>
                                <p class="profile__payment-item-info">Click tizimi orqali hisobingizni to‘ldirish uchun
                                    summani kiriting</p>
                                <button @click="payment()">To’lash</button>
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
import { useStore } from '~~/store/store';
const store = useStore()
const userInfo = ref(null)
const router = useRouter()
async function payment() {
    if (store.planId !== null) {
        console.log(userInfo.value?.data?.id);
        const data = await $fetch(store.paymentUrl + '/payment-url/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${store.token}`
            },
            body: {
                user_id: userInfo.value?.data?.id,
                plan_id: store.planId
            }
        })
        if (data?.click_url) {
            window.location = data?.click_url
        }
    } else {
        router.push('/subscriptions')
    }
}


async function getUserInfo() {
    store.loader = true;
    try {
        const data = await $fetch(store.userInfoBase + "/users", {
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
</script>

<style lang="scss" scoped></style>