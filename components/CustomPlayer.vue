<template>
    <div class="video-container" @mousemove="showControls" @mouseleave="hideControls">
        <video @click="togglePlayPause(), hideOptions()" ref="video" class="video-js  vjs-big-play-centered"
            :poster="item?.poster"></video>
        <div class="video-overlay">
            <transition v-show="!isPlaying" @click.stop="togglePlayPause(), hideOptions()">
                <button class="play-pause-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
                    </svg>
                </button>
            </transition>
        </div>
        <transition v-show="controlsVisible">
            <div class="video-controls">
                <div class="wrapper">
                    <div class="dur">
                        <div class="time">
                            <span>{{ currentTimeFormatted }}</span><span>{{ durationFormatted }}</span>
                        </div>
                        <input type="range" min="0" :max="duration" v-model="currentTime" @input="seekVideo"
                            class="seek-slider">
                    </div>
                    <button @click.stop="togglePlayPause(), hideOptions()" class="btn">
                        <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                            width="24">
                            <path
                                d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
                        </svg>
                    </button>
                    <div class="volume-control" @click="hideOptions">
                        <button class="btn" @click="toggleVolume">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path
                                    d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
                            </svg>
                        </button>
                        <transition name="slide" v-show="volumeMenuVisible">
                            <input type="range" min="0" max="1" step="0.1" v-model="volume" @input="updateVolume"
                                class="volume-slider">
                        </transition>
                    </div>
                    <div class="settings-icon">
                        <button @click="showSettingsMenu" class="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path
                                    d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                            </svg>
                        </button>
                        <div v-show="settingsMenuVisible" class="settings-menu" @click.stop>
                            <div class="setting-option">
                                <span>Speed</span>
                                <select v-model="playbackRate" @change="changePlaybackRate">
                                    <option value="0.5">0.5x</option>
                                    <option value="1">1x</option>
                                    <option value="1.5">1.5x</option>
                                    <option value="2">2x</option>
                                </select>
                            </div>
                            <div class="setting-option">
                                <span>Quality</span>
                                <select v-model="selectedQuality" @change="changeResolutionVideo">
                                    <option value="master.m3u8" selected>Auto</option>
                                    <option value="stream_0/final.m3u8">720</option>
                                    <option value="stream_1/final.m3u8">360</option>
                                    <option value="stream_2/final.m3u8">240</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button @click="toggleFullscreen(), hideOptions()" class="btn fullscreen">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path
                                d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';

const { item } = defineProps(['item'])

const video = ref(null);
let player = null;
const availableQualities = reactive([]);
const currentTime = ref(0);
const duration = ref(0);
const isPlaying = ref(false);
const volume = ref(1);
const controlsVisible = ref(false);
const settingsMenuVisible = ref(false);
const volumeMenuVisible = ref(false);
const playbackRate = ref(1);
const selectedQuality = ref('master.m3u8');

const currentTimeFormatted = computed(() => formatTime(currentTime.value));
const durationFormatted = computed(() => formatTime(duration.value));

const indexLetter = item?.link.lastIndexOf('/');
const slicedLink = item?.link.slice(0, indexLetter);

onMounted(() => {
    if (process.client) {
        const options = {
            autoplay: false,
            controls: false, // Keep using custom controls
            userActions: { doubleClick: false, hotkeys: true }, // Disable double click to fullscreen
            sources: [{
                src: item?.link,
                type: 'application/x-mpegURL'
            }],
            playbackRates: [0.5, 1, 1.5, 2]
        };

        player = videojs(video.value, options);

        player.on('loadedmetadata', () => {
            updateAvailableQualities();
            duration.value = player.duration();
        });

        player.on('timeupdate', () => {
            currentTime.value = player.currentTime();
        });

        player.on('play', () => {
            isPlaying.value = true;
        });

        player.on('pause', () => {
            isPlaying.value = false;
        });
        player.on('volumechange', () => {
            volume.value = player.volume();
        });
        window.addEventListener('keydown', handleKeyPress);
    }
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        video.value.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}
function showControls() {
    controlsVisible.value = true;
}
function hideControls() {
    controlsVisible.value = false;
}

function changePlaybackRate() {
    console.log("changing the rate");
    if (player) {
        player.playbackRate(parseFloat(playbackRate.value));
    }
}

onBeforeUnmount(() => {
    if (process.client) {
        window.removeEventListener('keydown', handleKeyPress);
        if (player) {
            player.dispose();
        }
    }
});
function updateVolume() {
    player.volume(volume.value);
}

function updateAvailableQualities() {
    const qualityLevels = player.qualityLevels();
    availableQualities.splice(0, availableQualities.length);

    for (let i = 0; i < qualityLevels.length; i++) {
        const level = qualityLevels[i];
        availableQualities.push({
            label: `${level.width}x${level.height}`,
            index: i
        });
    }
}

function changeResolution(quality) {
    const currentTime = player.currentTime();
    player.qualityLevels().selectedIndex_ = quality.index;
    player.one('loadedmetadata', () => {
        player.currentTime(currentTime);
    });
}

function togglePlayPause() {
    if (player.paused()) {
        player.play();
    } else {
        player.pause();
    }
}

function increaseVolume() {
    player.volume(Math.min(1, player.volume() + 0.1));
}

function decreaseVolume() {
    player.volume(Math.max(0, player.volume() - 0.1));
}

function seekVideo() {
    player.currentTime(currentTime.value);
}

function formatTime(seconds) {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
}

function handleKeyPress(event) {
    if (!player) return;

    switch (event.code) {
        case 'Space':
            togglePlayPause();
            break;
        case 'ArrowRight':
            player.currentTime(player.currentTime() + 10);
            break;
        case 'ArrowLeft':
            player.currentTime(player.currentTime() - 10);
            break;
        case 'ArrowUp':
            increaseVolume();
            break;
        case 'ArrowDown':
            decreaseVolume();
            break;
        case 'KeyF':
            player.requestFullscreen();
            break;
    }
}

function showSettingsMenu() {
    settingsMenuVisible.value = !settingsMenuVisible.value;
}

function toggleVolume() {
    volumeMenuVisible.value = !volumeMenuVisible.value;
}

function hideOptions() {
    settingsMenuVisible.value = false;
}

function changeResolutionVideo() {
    // Remember the current playback position
    const currentTime = player.currentTime();


    // Change the video source
    const newSource = {
        src: `${slicedLink}/${selectedQuality.value}`,
        type: 'application/x-mpegURL'
    };
    player.src(newSource);

    // Seek to the remembered position after the video has loaded
    player.one('loadedmetadata', () => {
        player.currentTime(currentTime);
    });

    player.play()

    console.log(newSource);
}
</script>
<style scoped>
* {
    --bg: #333;
    font-family: Arial, Helvetica, sans-serif;
}

button {
    border: none;
    outline: none;
    background: none;
}

.video-container {
    position: relative;
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

.video-js {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Ensure video fills the container */
}

.video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.play-pause-btn {
    pointer-events: auto;
    background: none;
    border: none;
    cursor: pointer;
    transition: 0.2s ease;
    position: relative;
    z-index: 2;
}

.play-pause-btn::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: rgba(28, 28, 28, .5);
    z-index: -1;
}

.play-pause-btn svg {
    width: 50px;
    height: 50px;
}

.play-pause-btn svg path {
    fill: #fff;
}

.video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.video-controls .wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    padding: 10px 0;
}

.video-controls::before {
    content: "";
    display: block;
    width: 100%;
    height: 150px;
    background: linear-gradient(to top, #00000050 10%, transparent);
    position: absolute;
    bottom: 0;
    left: 0;
}

.video-controls svg path {
    fill: #fff;
}

.btn {
    width: 40px;
    height: 40px;
}

.btn svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
}


.video-container:-webkit-full-screen {
    width: 100%;
    height: 100%;
}

.video-container:-moz-full-screen {
    width: 100%;
    height: 100%;
}

.video-container:fullscreen {
    width: 100%;
    height: 100%;
}

.video-controls span {
    color: white;
    font-size: 0.8rem;
}

.volume-control,
.quality-control {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
}

.volume-control .btn {
    flex-grow: 0;
    flex-shrink: 0;
}

.volume-control svg path {
    fill: #fff;
}

.video-controls .dur {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    width: 97%;
    display: flex;
    flex-direction: column;
}

.video-controls .dur .time {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.video-controls .dur .time span {
    font-size: 1.2rem;
}

.volume-slider,
.seek-slider {
    width: 100%;
    /* Adjust as needed */
    height: 5px;
    border-radius: 5px;
    background: #fff;
    -webkit-appearance: none;
    transform-origin: left;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}

input[type="range"]:focus {
    outline: none;
}

input[type="range"]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

.settings-icon {
    position: relative;
    margin-left: auto;
    cursor: pointer;
    z-index: 2;
}

.fullscreen {
    margin-left: 20px;
}

.settings-menu {
    position: absolute;
    min-width: 150px;
    bottom: 100%;
    right: 0;
    background-color: rgba(28, 28, 28, .9);
    border-radius: 5px;
    padding: 15px;
    display: block;
}

.setting-option {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.setting-option span {
    color: white;
    margin-right: 5px;
}

.setting-option select {
    background-color: #333;
    color: white;
    border: 1px solid #444;
    border-radius: 3px;
    padding: 5px;
}

.slide-enter-active,
.slide-leave-active {
    transition: 0.15s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: scaleX(0);
}

.v-enter-active,
.v-leave-active {
    transition: 0.15s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
