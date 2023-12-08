<template>
    <video ref="videoRef" class="video-plyr" :poster="item.poster" controls playsinline crossorigin></video>
</template>

<script setup>
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'vue-plyr/dist/vue-plyr.css'
import { useStore } from '~/store/store';
const store = useStore()
const { item } = defineProps(['item'])

const videoRef = ref(null);
let player = null;
let hls = null;

onMounted(() => {
    if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(item?.link);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            const availableQualities = hls.levels.map((l) => l.height);
            player = new Plyr(videoRef.value, {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen', 'rewind', 'fast-forward'],
                quality: {
                    default: availableQualities[0],
                    options: availableQualities,
                    forced: true,
                    onChange: (e) => updateQuality(e),
                },
                keyboard: {
                    focused: true,
                    global: true
                }
            });
        });
        hls.attachMedia(videoRef.value);
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

<style lang="scss">
.plyr {
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

.video-plyr[poster] {
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

    object-fit: cover;
}

.plyr__video-wrapper {
    display: flex;
    align-items: center;
}
</style>