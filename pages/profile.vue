<template>
    <main>
        <div class="profile">
            <div class="container">
                <div class="profile__top">
                </div>
                <div class="profile__bottom">
                    <Nav />
                    <div class="profile__bottom-wrapper">
                        <h3 class="profile__bottom-title">Foydalanuvchi haqida ma’lumot</h3>
                        <div class="profile__info">
                            <div class="profile__img" style="text-transform: uppercase;">
                                {{ userInfo?.data?.username.split("")[0] }}
                            </div>
                            <form @submit.prevent="" class="profile__info-list">
                                <div class="profile__info-list-item">
                                    <label for="name">Ism:</label> <input :disabled="update" id="name" type="text"
                                        v-model="name">
                                </div>
                                <div class="profile__info-list-item">
                                    <label for="login">Login:</label> <input :disabled="update" id="login" type="text"
                                        v-model="login">
                                </div>
                                <div class="profile__info-list-item">
                                    <label for="tel">tel:</label> <input :disabled="update" id="tel" type="text"
                                        v-model="tel">
                                </div>
                            </form>
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

const update = ref(true)

const name = ref()
const login = ref()
const tel = ref()


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
        name.value = data?.data?.name ? data?.data?.name : ''
        login.value = data?.data?.username ? data?.data?.username : ''
        tel.value = data?.data?.phone_number ? data?.data?.phone_number : ''
    } catch (error) {
        console.error("Failed to fetch data", error);
    } finally {
        store.loader = false;
    }
}
await getUserInfo()
</script>

<style lang="scss" scoped></style>