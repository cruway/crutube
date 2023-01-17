const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = () => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
    const {
        target: { value },
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
};

const formatTime = (seconds) =>
    (seconds >= 3600) ?
        new Date(seconds * 1000).toISOString().substring(11, 19) :
        new Date(seconds * 1000).toISOString().substring(14, 19);

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (event) => {
    const {
        target: { value },
    } = event;
    video.currentTime = value;
};

const handleFullScreen = () => {
    const fullScreen = document.fullscreenElement;
    if(fullScreen) {
        document.exitFullscreen();
        fullScreenBtn.innerText = "Enter Full Screen";
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen";
    }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if(controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if (controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = setTimeout(hideControls, 3000);
    }
    videoControls.classList.add("showing");
};

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("click", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
