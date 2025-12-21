const audio = document.getElementById('audioElement');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');

// Форматирование времени
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Обновление времени
audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Управление
playBtn.addEventListener('click', () => {
    audio.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
    playBtn.style.display = 'inline-flex';
    pauseBtn.style.display = 'none';
});

restartBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
});

// Громкость
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Клик по прогресс-бару
document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});