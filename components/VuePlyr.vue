<template>
    <div>
        <video ref="videoRef" controls @click="startPlayback" playsinline crossorigin :src="videoUrl"
            type="application/x-mpegURL"></video>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'vue-plyr/dist/vue-plyr.css';

const { item } = defineProps(['item'])

const videoRef = ref(null);
let player = null;
let hls = null;


onMounted(() => {
    if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(item?.link);
        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
            const availableQualities = hls.levels.map((level) => level.height);
            player = new Plyr(videoRef.value, {
                controls: [
                    'play-large',
                    'play',
                    'progress',
                    'current-time',
                    'mute',
                    'volume',
                    'captions',
                    'settings',
                    'pip',
                    'airplay',
                    'fullscreen',
                    'rewind',
                    'fast-forward',
                ],
                quality: {
                    default: availableQualities[0],
                    options: availableQualities,
                    forced: true,
                    onChange: (newQuality) => updateQuality(newQuality),
                },
                keyboard: {
                    focused: true,
                    global: true,
                },
            });
        });
        hls.attachMedia(videoRef.value);

        // For iOS, add event listener to start playback on user interaction
        videoRef.value.addEventListener('click', startPlayback);
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
            hls.startLevel = hls.currentLevel = levelIndex;
        }
    });
};

const startPlayback = () => {
    if (videoRef.value.paused) {
        videoRef.value.play();
    }
};
</script>
  