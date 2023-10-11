<template>
    <div class="loader">
        <img src="@/assets/images/svg/logo.svg" alt="">
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #060606;
    z-index: 99;
    img {
        width: 135px;
    }
}
</style>