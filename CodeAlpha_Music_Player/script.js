const songs = [
  { title: "Golden", artist: "EJAE", src: "songs/Golden.mp3" },
  { title: "Birds of a Feather", artist: "Billie Eilish", src: "songs/Birds of a feather.mp3" },
  { title: "Let It Go", artist: "Idina Menzel", src: "songs/Let it go.mp3" },
  { title: "About You", artist: "The 1975", src: "songs/The 1975-About you.mp3" },
  { title: "A Thousand Years", artist: "Christina Perri", src: "songs/A thousand years.mp3" }
];

let songIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const themeToggle = document.getElementById("themeToggle");
const player = document.querySelector(".player");

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
  updatePlaylist();
}

function playSong() {
  audio.play();
  playBtn.innerText = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶";
}

playBtn.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;

  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  audio.currentTime = (e.offsetX / width) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  nextBtn.click(); 
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updatePlaylist() {
  document.querySelectorAll(".playlist li").forEach((li, index) => {
    li.classList.toggle("active", index === songIndex);
  });
}

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.innerText = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(song);
    playSong();
  });
  playlist.appendChild(li);
});

themeToggle.addEventListener("click", () => {
  player.classList.toggle("dark");
  themeToggle.innerText = player.classList.contains("dark") ? "☀️" : "🌙";
});

loadSong(songs[songIndex]);
