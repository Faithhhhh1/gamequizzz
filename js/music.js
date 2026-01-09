// js/music.js

let player;
let musicStarted = false;

// CHANGE ONLY THIS if you want another song
const VIDEO_ID = "yjuImlE3-LQ"; // your song

// Load YouTube API
(function loadYT() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
})();

// Called automatically by YouTube API
function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "0",
    width: "0",
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      start: 10 // ⏱ start from 0:10
    },
    events: {
      onReady: () => {
        console.log("YouTube player ready");
      }
    }
  });
}

// THIS is what Start button will call
window.enableMusic = function () {
  if (!player || musicStarted) return;

  musicStarted = true;
  player.unMute();
  player.setVolume(40);
  player.playVideo();
};
