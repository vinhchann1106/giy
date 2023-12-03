const statusClockColor = {
  transparent: "transparent",
  rest: "#008170",
  do: "#952323",
};

const btn = document.querySelector(".btn-action-time");
const iconPlay = btn.querySelector(".icon-play");
const iconPause = btn.querySelector(".icon-pause");
const resetBtn = document.querySelector(".btn-action-reset");
const timeText = document.querySelector(".podomoro__clock-time");
const audioA = document.querySelector("#activate");
const audioD = document.querySelector("#deactivate");
const audioS = document.querySelector("#stop");
var tbs = 0;
var tbm = 0;
var tbmr = 0;
var tbmv = 0;
var tbmrv = 0;
var tbms = 0;
var times = 0;
var maxTimes = 0;
var isStart = false;
var isPause = false;
var isRest = false;
btn.addEventListener("click", starts);
resetBtn.addEventListener("click", reset);
function reset() {
  isStart = false;
  isRest = false;
  timeText.style.backgroundColor = statusClockColor.transparent;
  times = 1;
  isPause = false;
  tbs = 0;
  tbms = 0;
  btn.innerHTML = `Bắt đầu<i class="fa-solid fa-circle-play"></i>`;
  btn.classList.remove("timing");
  timeText.innerText = "00:00";
  clearInterval(timeHd);
}
function timeHandle() {
  if (tbms <= 0) {
    tbs -= 1;
    tbms = 10;
    if (tbs < 0) {
      tbs = 59;
      tbm -= 1;
      if (tbm < 0) {
        if (!isRest) {
          isRest = true;
          timeText.style.backgroundColor = statusClockColor.rest;
          tbm = tbmrv;
          tbs = 0;
          tbms = 0;
          audioD.play();
        } else {
          isRest = false;
          timeText.style.backgroundColor = statusClockColor.do;

          tbm = tbmv;
          tbs = 0;
          tbms = 0;
          times += 1;
          if (times >= maxTimes) {
            clearInterval(timeHd);
            isStart = false;
            isPause = false;
            btn.innerHTML = `Bắt đầu<i class="fa-solid fa-circle-play"></i>`;
            timeText.style.backgroundColor = statusClockColor.transparent;
            timeText.innerText = "00:00";
            audioS.play();
            return;
          }
          audioA.play();
        }
      }
    }
  }
  tbms -= 1;
  var second = "";
  if (tbs < 10) {
    second = "0";
  } else {
    second = "";
  }
  timeText.innerText = tbm + ":" + second + tbs;
  //console.log(tbm, " ",tbs, " ",tbms);
}
let timeHd = setInterval(timeHandle, 100);
clearInterval(timeHd);
function starts() {
  if (!isStart) {
    times = 1;
    maxTimes = document.querySelector(".times").value;

    tbmv = document.querySelector(".minute-do").value;
    tbm = tbmv;
    tbmrv = document.querySelector(".minute-rest").value;
    tbmr = tbmrv;
    tbs = 0;
    tbms = 0;
    if (tbmv <= 0 || tbmrv <= 0 || maxTimes <= 0) {
      alert("Số không hợp lệ, hãy thử lại!");
      return;
    }
    audioA.play();
    btn.innerHTML = `Dừng lại<i class="fa-solid fa-pause"></i>`;
    btn.classList.toggle("timing");
    isStart = true;
    isRest = false;
    isPause = false;
    timeText.style.backgroundColor = statusClockColor.do;
    timeHd = setInterval(timeHandle, 100);
  } else if (isStart) {
    if (!isPause) {
      isPause = true;
      btn.innerHTML = `Tiếp tục<i class="fa-solid fa-circle-play"></i>`;
      btn.classList.toggle("timing");
      clearInterval(timeHd);
    } else if (isStart) {
      isPause = false;
      btn.innerHTML = `Dừng lại<i class="fa-solid fa-pause"></i>`;
      btn.classList.toggle("timing");
      timeHd = setInterval(timeHandle, 100);
    }
  }
}
