<template>
    <div class="login">
        <div class="login-filter"></div>
        <img src="@/assets/images/png/login.png" class="login-img" alt="">
        <div class="login-text-wrapper">
            <NuxtLink to="/login" class="login-logo">
                <img src="@/assets/images/svg/logo.svg" alt="site logo">
            </NuxtLink>
            <h2 class="login-title">Ro‘yhatdan o‘tish</h2>
            <form action="#" @submit.prevent="login()" class="login-form">
                <input v-model="username" placeholder="Login" type="text" class="login-input">
                <input v-model="phonenum" placeholder="+998" id="phone" type="text" class="login-input-tel">
                <div class="password-input">
                    <input placeholder="Parol" v-model="pass" type="password">
                    <button type="button" @click="view()" v-if="!password_view"><img src="@/assets/images/svg/eye.svg"
                            alt=""></button>
                    <button type="button" @click="view()" v-if="password_view"><img
                            src="@/assets/images/svg/eye-crossed.svg" alt=""></button>
                </div>
                <div class="login-btns">
                    <button class="login-btn" type="submit">Ro’yhatdan o’tish</button>
                    <NuxtLink style="text-decoration: none;" class="register-btn" to="/login">Kirish
                    </NuxtLink>
                </div>
            </form>

            <div class="login-apps"></div>
        </div>
    </div>
</template>

<script setup>
import IMask from 'imask';
import { useToast } from 'vue-toastification';
// import { googleTokenLogin } from 'vue3-google-login'
import { useStore } from '~~/store/store';
definePageMeta({
    layout: "without",
});
const router = useRouter()
const store = useStore()
store.loader = true
const password_view = ref(false)

const phonenum = ref()
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
    const tel = document.getElementById('phone')
    let phone = tel.value.split(" ").join("")
    let num = phone.split("-").join("")
    let pNum = num.split('(').join("")
    let p = pNum.split(')').join("")
    $fetch(store.authBase + '/auth/register', {
        method: 'POST',
        body: {
            username: username.value,
            password: pass.value,
            phone_number: p.split('_').join('')
        }
    }).then(data => {
        if (data) {
            localStorage.setItem('access__token', data?.data?.access_token)
        }
        if (data.status == "success") {
            router.push('/login')
        } else {
            useToast().warning("Bunday login oldin ishlatilgan!")
        }
    }).catch(error => {
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
    var element = document.getElementById('phone');
    var maskOptions = {
        mask: '+{998} (00) 000-00-00',
        lazy: false
    }
    var mask = new IMask(element, maskOptions);
})
store.loader = false
</script>

<style lang="scss" scoped></style>