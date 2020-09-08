import { Component, h, Prop } from '@stencil/core';

// import { format } from '../../utils/utils';

@Component({
  tag: 'raha-custom-player',
  styleUrl: 'raha-custom-player.css',
  assetsDirs: ['assets'],

  shadow: true,
})
export class rahaCustomPlayer {
  constructor() {}
  @Prop({ mutable: true, reflect: true }) src: string = './assets/media/videos/sample.mp4';
  videoObj: HTMLMediaElement;
  playPauseIcons: HTMLElement;
  stopBtn: HTMLImageElement;
  VideoTime: HTMLSpanElement;
  timeStamp: HTMLSpanElement;
  progressBar: HTMLElement;

  // change video playing posiiton based on the position of the progress bar
  setVideoProgress() {
    this.videoObj.currentTime = (+(this.progressBar as HTMLProgressElement).value * this.videoObj.duration) / 100;
    console.log(`this.videoObj.currentTime : ${this.videoObj.currentTime}`);
    console.log('progress bar value', +(this.progressBar as HTMLProgressElement).value);
    console.log('this.videoObj.duration', this.videoObj.duration);

    // console.log('test passed');
  }

  videoTotalTime() {
    let s = Math.floor(this.videoObj.duration % 60);
    let seconds = s < 10 ? '0' + s : '' + s;
    let m = Math.floor((this.videoObj.duration / 60) % 60);
    let minutes = m < 10 ? '0' + m : m;
    this.VideoTime.innerHTML = `${minutes}:${seconds}`;
  }
  // update total video time and display on the screen by setting innerHTML
  componentDidLoad() {
    // put video play icon

    // [[[  FIX IT, Total Video time, videoObj.duration, returns NAN   ]]]
    this.videoTotalTime();

    this.playPauseIcons.setAttribute('src', '../assets/media/images/icon_images/play-button.png');
  }

  // implement video play and pasue click and update icon
  videoPlayPause() {
    this.videoTotalTime();
    if (this.videoObj.paused) {
      this.playPauseIcons.setAttribute('src', '../assets/media/images/icon_images/pause-button.png');
      this.playPauseIcons.setAttribute('pause', '');
      this.videoObj.play();
    } else {
      this.playPauseIcons.setAttribute('src', '../assets/media/images/icon_images/play-button.png');
      this.playPauseIcons.setAttribute('play', '');
      this.videoObj.pause();
    }
    this.stopBtn.setAttribute('src', '../assets/media/images/icon_images/stop-button-active.png');
  }

  // implement video stop button and reset the progress bar, change Stop icon from active to in-active
  videoReset() {
    this.videoObj.pause();
    this.videoObj.currentTime = 0;
    this.stopBtn.setAttribute('src', '../assets/media/images/icon_images/stop-button-in-active.png');
    this.videoObj.paused ? this.playPauseIcons.setAttribute('src', '../assets/media/images/icon_images/play-button.png') : null;
  }

  // implement volume up and down with arrow-up/down

  // implement video playrate change with shift+> and shift+<

  // Implement video current time forward and backward 2 sec with left and right arrow

  // update video progress bar and update passed time on the screen
  updateProgressBar() {
    (this.progressBar as HTMLProgressElement).value = (this.videoObj.currentTime / this.videoObj.duration) * 100;
    let s = Math.floor(this.videoObj.currentTime % 60);
    let seconds = s < 10 ? '0' + s : '' + s;
    let m = Math.floor((this.videoObj.currentTime / 60) % 60);
    let minutes = m < 10 ? '0' + m : m;
    this.timeStamp.innerHTML = `${minutes}:${seconds}`;
  }
  keyHandler(event) {
    event.preventDefault();
    console.log('hi');
    console.log(event.key);
    console.log(event.char);
    console.log(event.location);
  }

  render() {
    return [
      <h1>Custom Video Player</h1>,
      <video
        src={this.src}
        id="video"
        class="screen"
        poster="media/imgs/poster.png"
        autoPlay
        loop
        ref={el => (this.videoObj = el)}
        onClick={this.videoPlayPause.bind(this)}
        onKeyPress={this.keyHandler.bind(event)}
        onTimeUpdate={this.updateProgressBar.bind(this)}
      ></video>,
      <div class="controls" onKeyPress={this.keyHandler.bind(event)}>
        <button class="btn" id="play">
          <img
            id="videoPlayPause"
            class="play"
            src="../assets/media/images/icon_images/play-button.png"
            onClick={this.videoPlayPause.bind(this)}
            ref={el => (this.playPauseIcons = el)}
          ></img>
        </button>
        <button class="btn" id="stop">
          <img
            id="videoReset"
            class="stop"
            src="../assets/media/images/icon_images/stop-button-active.png"
            ref={el => (this.stopBtn = el)}
            onClick={this.videoReset.bind(this)}
          ></img>
        </button>
        <input
          type="range"
          class="progress"
          id="progress"
          min="0"
          max="100"
          step="0.1"
          value="0"
          onChange={this.setVideoProgress.bind(this)}
          ref={el => {
            this.progressBar = el;
          }}
        />
        <span
          class="timeStamp"
          id="timeStamp"
          ref={el => {
            this.timeStamp = el;
          }}
        ></span>
        <span>/</span>
        <span class="timeStamp" id="totalTime" ref={el => (this.VideoTime = el)}></span>
      </div>,
    ];
  }
}
