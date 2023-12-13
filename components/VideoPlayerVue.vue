<template>
    <div>
        <video ref="videoPlayer" playsinline crossorigin :autoplay="item?.autoplay" :loop="item?.loop" :muted="item?.muted"
            class="video-js video-player vjs-default-skin"></video>
    </div>
</template>

<script setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'
import 'videojs-contrib-quality-levels';
import 'videojs-hotkeys';
import 'videojs-seek-buttons';
import videojsqualityselector from 'videojs-hls-quality-selector';
const videoPlayer = ref()
const { item } = defineProps(['item'])
onMounted(() => {
    const el = document.querySelector('.video-js');
    var player = videojs(el, {
        fluid: true,
        controls: item?.controls,
        aspectRatio: '16:9',
        html5: {
            nativeAudioTracks: false,
            nativeVideoTracks: false,
            hls: {
                overrideNative: true,
            },
        },
        playbackRates: [0.5, 1, 1.5, 2],

        poster: item.img,
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
            type: 'application/x-mpegURL',
            withCredentials: false,
        }]
    });
    player.hlsQualitySelector = videojsqualityselector;
    // console.log(player.qualityLevels());
    player.hlsQualitySelector();
    player.on("play", (e) => {
        player.bigPlayButton.hide();
    });

    player.on("pause", (e) => {
        player.bigPlayButton.show();
    });
})
</script>
  
<style lang="scss">
.video-js .vjs-big-play-button {
    background: none !important;
    border: none !important;
    width: 107px !important;
    height: 107px !important;
}

.video-player {
    border-radius: 16px;
    border: 1px solid rgba($color: #fff, $alpha: 0.7);
}

.movie-video {
    position: relative;
}

.vjs-poster {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;

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
    width: 95%;
    left: 50% !important;
    bottom: 15px !important;
    transform: translateX(-50%);
}

.vjs-has-started .vjs-control-bar,
.vjs-audio-only-mode .vjs-control-bar {
    flex-wrap: wrap !important;
    height: auto !important;
}

.video-js .vjs-progress-control {
    order: 1 !important;
    width: 100%;
    margin-bottom: 10px;
}

.vjs-paused,
.vjs-playing {
    order: 3 !important;

    .vjs-icon-placeholder {
        &::before {
            font-size: 24px;
        }
    }
}

.vjs-volume-panel {
    order: 7 !important;
}

.vjs-remaining-time {
    order: 5 !important;
    margin-right: 20px !important;
    margin-right: auto !important;
    font-size: 30px;
    transform: translateY(20%);
}

.vjs-picture-in-picture-control {
    order: 11;
}

.skip-forward {
    width: 30px !important;
    height: 20px !important;

    .vjs-icon-placeholder {
        height: 100% !important;
        width: 100% !important;

        &::before {
            display: inline-block !important;
            height: 100% !important;
            width: 100% !important;
            font-size: 30px;
            content: url("@/assets/images/svg/skip-right.svg");
        }
    }

    margin-right: 20px !important;

    order: 4;
}

.skip-back {
    width: 30px !important;
    height: 20px !important;

    .vjs-icon-placeholder {
        height: 100% !important;
        width: 100% !important;

        &::before {
            display: inline-block !important;
            height: 100% !important;
            width: 100% !important;
            font-size: 30px;

            content: url("@/assets/images/svg/skip-left.svg");
        }
    }

    order: 2;
}

.vjs-playback-rate {
    order: 8;
    cursor: pointer;
    width: 30px !important;
    height: 30px !important;
    transform: translateY(20%);
}

.vjs-big-play-button {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;

    .vjs-icon-placeholder {
        &::before {

            font-size: 88px !important;

            // content: url("@/assets/images/svg/play-btn.svg") !important;
            @media (max-width: 790px) {
                font-size: 48px !important;
            }
        }
    }
}

.vjs-fullscreen-control {
    order: 10 !important;
}

.vjs-quality-selector {
    order: 9 !important;
}
</style>
  