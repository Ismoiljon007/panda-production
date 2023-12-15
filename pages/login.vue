<template>
    <div class="login">
        <div class="login-filter"></div>
        <img src="@/assets/images/png/login.png" class="login-img" alt="">
        <div class="login-text-wrapper">
            <NuxtLink to="/login" class="login-logo">
                <img src="@/assets/images/svg/logo.svg" alt="site logo">
            </NuxtLink>
            <h2 class="login-title">Kirish</h2>
            <form @submit.prevent="login" class="login-form">
                <input v-model="username" placeholder="Login" type="text" class="login-input">
                <div class="password-input">
                    <input :type="passwordInputType" placeholder="Parol" v-model="password" ref="passwordField">
                    <button type="button" @click="togglePasswordView">
                        <img :src="passwordViewIcon" alt="Toggle password view">
                    </button>
                </div>
                <div class="login-btns">
                    <button class="login-btn" type="submit">Kirish</button>
                    <NuxtLink style="text-decoration: none;" class="register-btn" to="/register">Ro’yhatdan o’tish
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
const password = ref('');
const username = ref('');
const { sessionData } = useSessionData();

const passwordInputType = computed(() => passwordView.value ? 'text' : 'password');
const passwordViewIcon = computed(() => passwordView.value ? '/_nuxt/assets/images/svg/eye-crossed.svg' : '/_nuxt/assets/images/svg/eye.svg');

const togglePasswordView = () => {
    passwordView.value = !passwordView.value;
};

const login = async () => {
    try {
        const data = await $fetch(store?.authBase + '/auth/login', {
            method: 'POST',
            body: {
                username: username.value,
                password: password.value,
                device_info: `${sessionData.value?.browserName}, ${sessionData.value?.browserVersion}, ${sessionData.value?.operatingSystem}, ${sessionData.value?.screenHeight}, ${sessionData.value?.screenWidth}, ${sessionData.value?.timezone}`
            }
        });

        if (data && data.status === "success") {
            localStorage.setItem('access__token', data?.data?.access_token);
            useToast().success("profilingizga muvafaqiyatli kirdingiz", {
                timeout: 2000,
            });
            store.token = typeof window !== "undefined"
                ? localStorage.getItem("access__token")
                : null;
            router.push('/');
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        useToast().error('login yoki parolingizni qaytadan tekshiring!');
        console.error(error);
    }
};

onMounted(() => {
    store.loader = false;
});
</script>

<style lang="scss" scoped></style>