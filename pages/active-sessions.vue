<template>
    <main>
        <div class="active-sessions">
            <div class="container">
                <div class="active-sessions__top">
                </div>
                <div class="active-sessions__bottom">
                    <Nav />
                    <div class="active-sessions__bottom-wrapper">
                        <div class="active-sessions__items">
                            <div class="active-sessions__item" v-for="item in sessions?.data" :key="item">
                                <div class="active-sessions__item-img">
                                    <img src="@/assets/images/svg/computer.svg" alt="">
                                </div>
                                <div class="active-sessions__item-text-wrapper">
                                    <h3 class="active-sessions__item-title">{{ item?.device_info }}</h3>
                                    <h4 class="active-sessions__item-date">
                                        <span>{{ deviveTime(item?.created_at) }}</span>
                                    </h4>
                                </div>
                                <button class="active-sessions__item-finish">Yakunlash</button>
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
store.loader = false
const userInfo = ref()
async function getUserInfo() {
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
    }
}
function deviveTime(time) {

    const inputDate = new Date(time);

    const formattedTime = inputDate.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const formattedDate = inputDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const result = `${formattedTime} ${formattedDate}`;
    return result
}
await getUserInfo()
const sessions = ref()
async function getSessions() {
    const data = await $fetch(store.authBase + '/auth/sessions?username=' + userInfo.value?.data?.username)
    sessions.value = data
}
await getSessions()
</script>

<style lang="scss" scoped></style>