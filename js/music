// assets/js/music.js

let player;
const VIDEO_ID = "yjuImlE3-LQ"; // your song

function loadYouTubeAPI() {
  if (window.YT) {
    onYouTubeIframeAPIReady();
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

function onYouTubeIframeAPIReady() {
  if (player) return;

  player = new YT.Player("yt-player", {
    height: "0",
    width: "0",
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: VIDEO_ID,
      controls: 0,
      mute: 0
    },
    events: {
      onReady: (e) => {
        const allowed = localStorage.getItem("musicAllowed");
        if (allowed === "true") {
          e.target.playVideo();
        }
      }
    }
  });
}

function enableMusic() {
  localStorage.setItem("musicAllowed", "true");
  if (player) player.playVideo();
}

document.addEventListener("DOMContentLoaded", () => {
  loadYouTubeAPI();
});
