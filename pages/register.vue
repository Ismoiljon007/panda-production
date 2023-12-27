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
                <input autocomplete="true" v-model="username" placeholder="Login" type="text" class="login-input">
                <input autocomplete="false" v-model="phoneNumber" placeholder="+998" @input="mask" @focus="mask" @blur="mask" @keydown="mask" class="phone login-input-tel">
                <div class="password-input">
                    <input placeholder="Parol" autocomplete="true" v-model="pass" ref="password" type="password">
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
const password = ref(false)

const username = ref()
const pass = ref()

const login = async () => {
    let phone = phoneNumber.value.split(" ").join("")
    let num = phone.split("-").join("")
    let pNum = num.split('(').join("")
    let p = pNum.split(')').join("")
    $fetch(store.authBase + '/auth/register', {
        method: 'POST',
        body: {
            username: username.value,
            password: pass.value,
            phone_number: p.split('_').join('').length == 14 ? p.split('_').join('').slice(0, -1) : p.split('_').join('')
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
const phoneNumber = ref('');

const mask = (event) => {
    let keyCode;
    event.keyCode && (keyCode = event.keyCode);
    let pos = event.target.selectionStart;
    if (pos < 3) event.preventDefault();
    let matrix = "+998 (__) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = phoneNumber.value.replace(/\D/g, ""),
        newValue = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
    i = newValue.indexOf("_");
    if (i != -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
    }
    let reg = matrix.substr(0, phoneNumber.value.length).replace(/_+/g,
        function (a) {
            return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(phoneNumber.value) || phoneNumber.value.length < 5 || keyCode > 47 && keyCode < 58) {
        phoneNumber.value = newValue;
    }
    if (event.type == "blur" && phoneNumber.value.length < 5) {
        phoneNumber.value = "";
    }
};
store.loader = false
</script>

<style lang="scss" scoped></style>