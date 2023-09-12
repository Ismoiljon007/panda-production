<template>
    <div class="login">
        <div class="login-filter"></div>
        <img src="@/assets/images/png/login.png" class="login-img" alt="">
        <div class="login-text-wrapper">
            <NuxtLink to="/login" class="login-logo">
                <img src="@/assets/images/svg/logo.svg" alt="site logo">
            </NuxtLink>
            <h2 class="login-title">Kirish</h2>
            <form action="#" class="login-form">
                <input placeholder="Login" class="login-input" type="text">
                <div class="password">
                    <input placeholder="Parol" type="password" ref="password">
                    <button type="button" v-if="password_view" @click="view">
                        <img src="@/assets/images/svg/eye-crossed.svg" alt="">
                    </button>
                    <button type="button" v-if="!password_view" @click="view">
                        <img src="@/assets/images/svg/eye.svg" alt="">
                    </button>
                </div>
                <div class="login-btns">
                    <button class="login-btn" type="submit">Kirish</button>
                    <button class="register-btn" type="button">Ro’yhatdan o’tish</button>
                </div>
            </form>
            <button class="login-google-sign" @click="googleLogin()">
                <img src="@/assets/images/svg/google.svg" alt="">
                <span>Google bilan kirish</span>
            </button>
            <div class="login-apps"></div>
        </div>
    </div>
</template>

<script setup>
import { googleTokenLogin } from 'vue3-google-login'
definePageMeta({
    layout: "without",
});
const password_view = ref(false)
const googleLogin = () => {
  googleTokenLogin().then(async (response) => {
    const res = await $fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${response?.access_token}`,
      },
    })
    console.log(res.email);
  })
}
const password = ref()
function view() {
    if(password.value.type == 'password') {
        password.value.type = "text"
        password_view.value = true
    } else {
        password.value.type = "password"
        password_view.value = false
    }
}
</script>

<style lang="scss" scoped></style>