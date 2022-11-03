const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const toggleScreen = player.querySelector("[data-fullscreen]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

function toggleFullscreen() {
  fullscreen ? (fullscreen = false) : (fullscreen = true);
  if (fullscreen) {
    player.style.width = "100%";
    player.style.maxWidth = "100vw";
  } else {
    player.style.width = "100%";
    player.style.maxWidth = "750px";
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggleScreen.addEventListener("click", toggleFullscreen);
toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
let mousedown = false;
let fullscreen = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
