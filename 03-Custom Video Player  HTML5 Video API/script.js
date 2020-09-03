const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const videoPlayPause = document.getElementById("videoPlayPause");
const progress = document.getElementById("progress");
const stopBtn = document.getElementById("stop");
const timeStamp = document.getElementById("timeStamp");
const totalTime = document.getElementById("totalTime");

// Play and Pasue Video

const toggleVideStatus = () => {
  // play pause video
  video.paused ? video.play() : video.pause();
  // ipdate Play Pasue icon
  // console.log("hi");
};

const playVideo = () => {
  if (videoPlayPause.classList.contains("fa-play")) {
    videoPlayPause.classList.remove("fa-play");
    videoPlayPause.classList.add("fa-pause");
  } else {
    videoPlayPause.classList.remove("fa-pause");
    videoPlayPause.classList.add("fa-play");
  }
};

const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;

  let s = Math.floor(video.currentTime % 60);
  s = s < 10 ? "0" + s : s;
  let m = Math.floor((video.currentTime / 60) % 60);
  m = m < 10 ? "0" + m : m;

  timeStamp.innerHTML = `${m}:${s}`;
  let videoDuration = (video.duration / 60).toFixed(2);
  videoDuration = videoDuration < 10 ? "0" + videoDuration : videoDuration;
  totalTime.innerHTML = videoDuration;
};

const stopVideo = () => {
  video.currentTime = 0;
};

const setVideoProgress = () => {
  video.currentTime = (progress.value * video.duration) / 100;
};

const progressDrag = () => {
  console.log(this);
};

// Event Listeners

video.addEventListener("click", toggleVideStatus);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("play", playVideo);
video.addEventListener("pause", playVideo);
playBtn.addEventListener("click", toggleVideStatus);
stopBtn.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
