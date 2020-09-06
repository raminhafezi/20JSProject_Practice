import { Component, h, Prop, State } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'raha-custom-player',
  styleUrls: ['raha-custom-player.css', 'progress.css', 'fontawesome.css'],
  assetsDirs: ['assets'],

  shadow: true,
})
export class rahaCustomPlayer {
  constructor() {}
  @Prop({ mutable: true, reflect: true }) videoSrc: string = './assets/media/videos/sample.mp4';
  @State() videoDuration: string = '0';
  @State() totalVideoTime: number = 12;
  displayTotalVideo: HTMLElement;
  VideoTime: HTMLElement;
  videoObj: HTMLMediaElement;

  private testMe() {
    console.log('test passed');
  }

  componentDidLoad() {
    console.log(` Video Duration: ${this.videoObj.duration}`);
    this.totalVideoTime = this.videoObj.duration;
    this.displayTotalVideo.innerHTML = '12:45';
  }

  updateVideoPassedTime() {
    let s = Math.floor(this.videoObj.duration % 60);
    let seconds = s < 10 ? '0' + s : '' + s;
    let m = Math.floor((this.videoObj.duration / 60) % 60);
    let minutes = m < 10 ? '0' + m : m;
    console.log(`minutes: ${minutes} seconds: ${seconds}`);
  }

  render() {
    return [
      <h1>Custom Video Player</h1>,
      <video src={this.videoSrc} id="video" class="screen" poster="media/imgs/poster.png" autoPlay loop ref={el => (this.videoObj = el)}></video>,
      <div class="controls">
        <button class="btn" id="play">
          <i id="videoPlayPause" class="play">
            &#x25b6;
          </i>
        </button>
        <button class="btn" id="stop">
          <i id="videoReset" class="stop"></i>
          <i class="stop">&#x025FC;</i>
        </button>
        <input type="range" class="progress" id="progress" min="0" max="100" step="0.1" value="0" onChange={this.testMe.bind(this)} />
        <span class="timeStamp" id="timeStamp">
          {this.videoDuration}
        </span>
        <span>/</span>
        <span class="timeStamp" id="totalTime" ref={el => (this.VideoTime = el)}>
          {this.displayTotalVideo}
        </span>
      </div>,
    ];
  }
}
