const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
function setDate() {
  const now = new Date();
  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours();
  const secondDegree = ( (second / 60) * 360 ) + 90;
  const minuteDegree = ( (minute / 60) * 360 ) + 90;
  const hourDegree = ( (hour / 12) * 360 ) + 90 + (minuteDegree * (1 / 12));
  secondHand.style.transform = `rotate(${secondDegree}deg)`;
  minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
  hourHand.style.transform = `rotate(${hourDegree}deg)`;
}
setInterval(setDate, 1000);
const borderColor = document.querySelector('.watch');
borderColor.style.background = `#${secondHand}`;
