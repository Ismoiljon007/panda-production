<template>
    <div>
        <video ref="videoRef" class="video-plyr" :poster="item.poster" controls playsinline crossorigin></video>
    </div>
</template>

<script setup>
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'vue-plyr/dist/vue-plyr.css'
import { useStore } from '~/store/store';
const store = useStore()

const videoRef = ref(null);
let player = null;
let hls = null;
const { item } = defineProps(['item'])
onMounted(() => {
    store.loader = true
    if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(item?.link);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            const availableQualities = hls.levels.map((l) => l.height);
            player = new Plyr(videoRef.value, {
                quality: {
                    default: availableQualities[0],
                    options: availableQualities,
                    forced: true,
                    onChange: (e) => updateQuality(e),
                },
            });
        });
        hls.attachMedia(videoRef.value);
        store.loader = false
    }
});

onBeforeUnmount(() => {
    if (player) {
        player.destroy();
    }
});

const updateQuality = (newQuality) => {
    hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
            hls.currentLevel = levelIndex;
        }
    });
};
</script>

<style>
.video-plyr {
    width: 100%;
    height: 730px !important;

    @media (max-width: 1425px) {
        height: 600px !important;
    }

    @media (max-width: 1060px) {
        height: 460px !important;
    }

    @media (max-width: 1060px) {
        height: 460px !important;
    }

    @media (max-width: 760px) {
        height: 370px !important;
    }
}

.plyr__poster {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>