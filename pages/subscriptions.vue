<template>
    <main>
        <div class="subscriptions">
            <div class="container">
                <div class="subscriptions__top">
                </div>
                <div class="subscriptions__bottom">
                    <Nav />
                    <div class="subscriptions__bottom-wrapper">
                        <ul class="subscriptions__nav">
                            <li class="subscriptions-nav-item-active">Obuna sotib olish</li>
                            <li>Aktiv obunalar</li>
                            <li>Sotib olish tarixi</li>
                            <li>Promo kod</li>
                        </ul>
                        <div class="subscriptions__tarrifs">
                            <div class="subscriptions__tarrif" v-for="item in 12" :key="item">
                                <div class="subscriptions__tarrif-top">
                                    <h4 class="subscriptions__tarrif-title">Premium tarif rejasi</h4>
                                </div>
                                <div class="subscriptions__tarrif-bottom">
                                    <p class="subscriptions__tarrif-desc">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante quam. Integer in ante leo. Donec felis nisl, semper at fermentum at, tristique quis nisi. In malesuada convallis metus, ac maximus orci molestie ut.
                                    </p>
                                    <h4 class="subscriptions__tarrif-price">30 kunga  350  000 so’m</h4>
                                    <button class="subscriptions__tarrif-btn">Obuna bo‘lish</button>
                                </div>
                            </div>
                        </div>
                        <div class="profile__footer">
                            <h4 class="profile__id">ID: <span>255 274</span></h4>
                            <h4 class="profile__balance">Balans: <span>150 000</span> so’m</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>