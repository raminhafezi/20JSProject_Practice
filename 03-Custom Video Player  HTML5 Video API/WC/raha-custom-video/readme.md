#### Video Player Web Component.

I tried to make a custom video player and make a web component with stencil JS.

### What I have learn

1- I tried to make a custom player web componenet. It seems working with font-awesome or any other text-ish icon library is pretty hard and in consistent with the shadow-dom. So I used an icon swap for play-pause instead of using "fa fa-play" from font-awesome. The other way to implement is to use HTML unicode for play-pause icon, the problem with using code is they interpreat differently among various browser.

2- catch the onKeyPress, onKeyDown, or other key events is very different with in different browser. I can catch keypress on firefox flawlessly but chrome just ignore it all. So I just ignore implementing forward, backward, volume change, as well as play rate speed implementation.

3- Also the progress-bar <input type="progress"> is another issue that I faced, so when user select different spot of the video, we update the video.currentTime. It works without any issue in Firefox but Chrome just reset the video.
