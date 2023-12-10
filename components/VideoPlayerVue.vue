<template>
    <div>
        <video ref="videoPlayer" playsinline crossorigin :autoplay="item?.autoplay" :loop="item?.loop" :muted="item?.muted"
            :poster="item.img" class="video-js vjs-default-skin"></video>
    </div>
</template>

<script setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'
import 'videojs-contrib-quality-levels';
import 'videojs-hotkeys';
import 'videojs-seek-buttons';
import videojsqualityselector from 'videojs-hls-quality-selector';

const { item } = defineProps(['item'])
onMounted(() => {
    const el = document.querySelector('.video-js');
    var player = videojs(el, {
        fluid: true,
        controls: item?.controls,
        aspectRatio: '16:9',
        plugins: {
            hotkeys: {
                volumeStep: 0.1,
                seekStep: 5,
                enableModifiersForNumbers: true,
                enableVolumeScroll: false,
            },
            seekButtons: {
                forward: 30,
                back: 10
            },
        },
        sources: [{
            src: item.url,
            type: 'application/x-mpegURL'
        }]
    });
    player.hlsQualitySelector = videojsqualityselector;
    player.hlsQualitySelector();
})
</script>
  
<style lang="scss">
.video-js .vjs-big-play-button {
    background: none !important;
    border: none !important;
    width: 107px !important;
    height: 107px !important;
}

.movie-video {
    position: relative;
}

.vjs-poster {
    display: flex;
    align-items: center;
    justify-content: center;
}

.vjs-poster img {
    object-fit: cover;
}

.prev-video {
    position: absolute;
    top: 50%;
    z-index: 5;
}

.video-js .vjs-control-bar {
    background: transparent !important;
}

.vjs-has-started .vjs-control-bar,
.vjs-audio-only-mode .vjs-control-bar {
    flex-wrap: wrap !important;
    height: auto !important;
}

.video-js .vjs-progress-control {
    order: 1 !important;
    width: 100%;
}

.vjs-paused,
.vjs-playing {
    order: 2 !important;
}

.vjs-volume-panel {
    order: 7 !important;
}

.vjs-remaining-time {
    order: 3 !important;
    margin-right: 20px !important;
}

.vjs-picture-in-picture-control {
    display: none !important;
}

.skip-forward {
    width: 30px !important;
    height: 20px !important;

    .vjs-icon-placeholder {
        height: 100% !important;
        width: 100% !important;

        &::after {
            display: inline-block !important;
            height: 100% !important;
            width: 100% !important;
            content: url("@/assets/images/svg/skip-right.svg");
        }
    }

    order: 5;
    margin-right: auto !important;
}

.skip-back {
    width: 30px !important;
    height: 20px !important;

    .vjs-icon-placeholder {
        height: 100% !important;
        width: 100% !important;

        &::after {
            display: inline-block !important;
            height: 100% !important;
            width: 100% !important;
            content: url("@/assets/images/svg/skip-left.svg");
        }
    }

    order: 4;
}

.vjs-fullscreen-control {
    order: 9 !important;
}

.vjs-quality-selector {
    order: 8 !important;
}
</style>
  