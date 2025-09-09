let hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    timer;

let running = false;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const msEl = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

function updateTime() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
  msEl.textContent = pad(Math.floor(milliseconds / 10));
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}

startBtn.addEventListener("click", () => {
  if (!running) {
    timer = setInterval(updateTime, 10);
    running = true;
  }
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timer);
  running = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  running = false;
  hours = minutes = seconds = milliseconds = 0;

  hoursEl.textContent = "00";
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
  msEl.textContent = "00";

  lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (running) {
    const lapTime = `
      ${pad(hours)} H : ${pad(minutes)} M : ${pad(seconds)} S : ${pad(Math.floor(milliseconds / 10))} MS
    `;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapsList.childElementCount + 1} : ${lapTime}`;
    lapsList.appendChild(li);
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
