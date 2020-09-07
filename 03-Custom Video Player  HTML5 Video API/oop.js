class UI {
  constructor() {
    const videoPlayPause = document.getElementById("videoPlayPause");
    const timeStamp = document.getElementById("timeStamp");
    const totalTime = document.getElementById("totalTime");
  }

  playPauseIconToggle() {
    if (videoPlayPause.classList.contains("fa-play")) {
      videoPlayPause.classList.remove("fa-play");
      videoPlayPause.classList.add("fa-pause");
    } else {
      videoPlayPause.classList.remove("fa-pause");
      videoPlayPause.classList.add("fa-play");
    }
  }

  updateTotalTime(video) {
    let videoDuration = (video.duration / 60).toFixed(2);
    videoDuration = videoDuration < 10 ? "0" + videoDuration : videoDuration;
    console.log(videoDuration);
    totalTime.innerHTML = `${videoDuration}`;
  }

  updateTimeStamp(text) {
    timeStamp.innerHTML = `${text.minute}:${text.second}`;
  }
}

class App extends UI {
  constructor() {
    super();
    const video = document.getElementById("video");
    const videoPlayPause = document.getElementById("videoPlayPause");
    const progress = document.getElementById("progress");
    this.addEventListener();
    this.updateTotalTime(video);
  }

  addEventListener = () => {
    video.addEventListener("click", this.playPauseToggle.bind(this));
    videoPlayPause.addEventListener("click", this.playPauseToggle.bind(this));
    const stopBtn = document.getElementById("stop");
    stopBtn.addEventListener("click", this.stopVideo.bind(this));
    progress.addEventListener("change", this.setVideoProgress.bind(this));
    video.addEventListener("timeupdate", this.updateProgress.bind(this));
    document.addEventListener("keydown", this.keyPress.bind(event));
  };

  playPauseToggle() {
    video.paused ? video.play() : video.pause();
    this.playPauseIconToggle();
  }

  stopVideo() {
    video.pause();
    video.currentTime = 0;
  }

  setVideoProgress = () => {
    video.currentTime = (progress.value * video.duration) / 100;
    console.log(video.currentTime);
    return video.currentTime;
  };

  updateProgress = () => {
    progress.value = (video.currentTime / video.duration) * 100;

    let s = Math.floor(video.currentTime % 60);
    s = s < 10 ? "0" + s : s;
    let m = Math.floor((video.currentTime / 60) % 60);
    m = m < 10 ? "0" + m : m;

    this.updateTimeStamp({ minute: m, second: s });
  };

  keyPress = (event) => {
    // console.log(event.key);
    event.preventDefault();
    switch (event.key) {
      case "ArrowRight":
        video.currentTime += 5;
        break;
      case "ArrowLeft":
        video.currentTime -= 5;
        break;
      case " ":
        video.paused ? video.play() : video.pause();
      case "ArrowUp":
        +video.volume > 0.98 ? null : (video.volume += 0.02);
        break;
      case "ArrowDown":
        +video.volume < 0.02 ? null : (video.volume -= 0.02);
        break;
      case ">":
        video.playbackRate > 8 ? null : (video.playbackRate += 0.2);
        break;
      case "<":
        video.playbackRate <= -0.8 ? null : (video.playbackRate -= 0.2);
        break;

      default:
        return;
    }
  };
}

new App();
