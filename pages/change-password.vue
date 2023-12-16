<template>
    <div class="login">
        <div class="login-filter"></div>
        <img src="@/assets/images/png/login.png" class="login-img" alt="">
        <div class="login-text-wrapper">
            <NuxtLink to="/login" class="login-logo">
                <img src="@/assets/images/svg/logo.svg" alt="site logo">
            </NuxtLink>
            <h2 class="login-title">Parolni yangilash</h2>
            <form @submit.prevent="changePass" class="login-form">
                <input v-model="username" placeholder="Login" type="text" class="login-input">
                <div class="password-input">
                    <input :type="passwordInputType" placeholder="Hozirgi parol" v-model="password" ref="passwordField">
                    <button type="button" @click="togglePasswordView">
                        <img v-if="passwordViewIcon" src="@/assets/images/svg/eye-crossed.svg" alt="Toggle password view">
                        <img v-if="!passwordViewIcon" src="@/assets/images/svg/eye.svg" alt="Toggle password view">
                    </button>
                </div>
                <div class="password-input">
                    <input :type="passwordInputTypeChange" placeholder="Yangi parol" v-model="passwordChange"
                        ref="passwordField">
                    <button type="button" @click="togglePasswordViewChange">
                        <img v-if="passwordViewIconChange" src="@/assets/images/svg/eye-crossed.svg"
                            alt="Toggle password view">
                        <img v-if="!passwordViewIconChange" src="@/assets/images/svg/eye.svg" alt="Toggle password view">
                    </button>
                </div>
                <div class="login-btns">
                    <button class="login-btn" type="submit">Yangilash</button>
                    <NuxtLink style="text-decoration: none;" class="register-btn" to="/profile">Orta qaytish
                    </NuxtLink>
                </div>
            </form>
            <!-- <button class="login-google-sign" @click="googleLogin()">
                <img src="@/assets/images/svg/google.svg" alt="">
                <span>Google bilan kirish</span>
            </button> -->
            <div class="login-apps"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '~~/store/store';
import { useSessionData } from '~/composables/useSessionData';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

definePageMeta({ layout: "without" });

const router = useRouter();
const store = useStore();
store.loader = true;

const passwordView = ref(false);
const passwordViewChange = ref(false);
const password = ref('');
const passwordChange = ref('');
const username = ref('');
const { sessionData } = useSessionData();

const passwordInputType = computed(() => passwordView.value ? 'text' : 'password');
const passwordInputTypeChange = computed(() => passwordViewChange.value ? 'text' : 'password');
const passwordViewIcon = computed(() => passwordView.value ? true : false);
const passwordViewIconChange = computed(() => passwordViewChange.value ? true : false);

const togglePasswordView = () => {
    passwordView.value = !passwordView.value;
};
const togglePasswordViewChange = () => {
    passwordViewChange.value = !passwordViewChange.value;
};

async function changePass() {
    try{
        const data = await $fetch(store.authBase + '/auth/change-password', {
            method: 'POST',
            body: {
                username: username.value,
                current_password: password.value,
                new_password: passwordChange.value
            }
        })
        if(data?.status == "success") {
            useToast().success("Parolingiz muvaffaqiyatli yangilandi", {
                timeout: 2000,
            });
            router.push('/profile')
        }
    } catch(error) {
        useToast().error("Noto'g'ri ma'lumot kiritildi!");
    }
}

onMounted(() => {
    store.loader = false;
});
</script>

<style lang="scss" scoped></style>