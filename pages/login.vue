<template>
    <div class="login">
        <div class="login-filter"></div>
        <img src="@/assets/images/png/login.png" class="login-img" alt="">
        <div class="login-text-wrapper">
            <NuxtLink to="/login" class="login-logo">
                <img src="@/assets/images/svg/logo.svg" alt="site logo">
            </NuxtLink>
            <h2 class="login-title">Kirish</h2>
            <form action="#" @submit.prevent="login()" class="login-form">
                <input v-model="username" placeholder="Login" type="text" class="login-input">
                <div class="password-input">
                    <input placeholder="Parol" v-model="pass" ref="password" type="password">
                    <button type="button" @click="view()" v-if="!password_view"><img src="@/assets/images/svg/eye.svg"
                            alt=""></button>
                    <button type="button" @click="view()" v-if="password_view"><img
                            src="@/assets/images/svg/eye-crossed.svg" alt=""></button>
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
import { useToast } from "vue-toastification";
// import { googleTokenLogin } from 'vue3-google-login'
import { useStore } from '~~/store/store';
definePageMeta({
    layout: "without",
});
const toast = useToast()
const router = useRouter()
const store = useStore()
store.loader = true
const password_view = ref(false)





const password = ref()
const username = ref()
const pass = ref()
// const googleLogin = () => {
//     googleTokenLogin().then(async (response) => {
//         const res = await $fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
//             headers: {
//                 Authorization: `Bearer ${response?.access_token}`,
//             },
//         })
//         console.log(res.email);
//     })
// }
const login = async () => {
    $fetch(store?.authBase + '/auth/login', {
        method: 'POST',
        body: {
            username: username.value,
            password: pass.value
        }
    }).then(data => {
        if (data) {
            localStorage.setItem('access__token', data?.data?.access_token)
        }
        if (data.status == "success") {
            toast.success("profilingizga muvafaqiyatli kirdingiz")
            window.location = '/'
        }
    }).catch(error => {
        toast.error('login yoki parol xatolik bor!')
        console.log(error.data);
    })
}
function view() {
    if (password.value.type == 'password') {
        password.value.type = "text"
        password_view.value = true
    } else {
        password.value.type = "password"
        password_view.value = false
    }
}

onMounted(() => {
    if (typeof window !== "undefined") {
        store.loader = false

    }
})
</script>

<style lang="scss" scoped></style>