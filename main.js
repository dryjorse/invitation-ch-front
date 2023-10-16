const btn = document.querySelector(".btn");
const yesInp = document.querySelector(".yes");
const noInp = document.querySelector(".no");
const input = document.querySelector(".form__inp");

const validate = () => {
  if ((yesInp.checked || noInp.checked) && input.value) {
    btn.removeAttribute("disabled");
  } else {
    btn.setAttribute("disabled", true);
  }
};

yesInp.addEventListener("change", validate);
noInp.addEventListener("change", validate);
input.addEventListener("input", validate);

const sendMessage = () => {
  btn.setAttribute("disabled", true);
  const data = {
    message:
      "Аты: " + input.value + "\nКелеби: " + (yesInp.checked ? "Ооба" : "Жок"),
  };

  fetch("https://invitation-ch.onrender.com/incoming-messages/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      alert("Жообунузга келди! Жооп бергенинизге рахмат!");
    })
    .catch(() => {
      alert("Тилеке каршы жооп жиберилген жок, бир жерден ката кетти.");
    })
    .finally(() => {
      btn.removeAttribute("disabled");
    });
};

btn.addEventListener("click", sendMessage);

let countdown;

function timer(seconds) {
  const currentTime = Date.now();
  const endTime = currentTime + seconds * 1000;

  displayTimer(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimer(secondsLeft);
  }, 1000);
}

function displayTimer(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds / 3600) % 12;
  const minutes = Math.floor(seconds / 60) % 60;
  const remainderSeconds = seconds % 60;

  document.querySelector(".days").innerHTML = days;
  document.querySelector(".hours").innerHTML = hours;
  document.querySelector(".minutes").innerHTML = minutes;
  document.querySelector(".seconds").innerHTML = remainderSeconds;
}

var targetDate = new Date("2023-11-26");
var currentDate = new Date();
var difference = targetDate - currentDate;
var seconds = Math.floor(difference / 1000);
timer(seconds);
