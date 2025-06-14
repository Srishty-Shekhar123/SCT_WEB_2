let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const laps = document.getElementById('laps');

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startStopBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    startStopBtn.textContent = 'Start';
  } else {
    startTime = Date.now();
    timer = setInterval(updateTime, 1000);
    startStopBtn.textContent = 'Pause';
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = '00:00:00';
  startStopBtn.textContent = 'Start';
  laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.textContent = display.textContent;
  laps.appendChild(li);
});
