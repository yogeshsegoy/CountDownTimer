let interval;

function startCountdown() {
  const startInput = document.getElementById("startDate").value;
  const endInput = document.getElementById("countdownDate").value;

  if (!startInput || !endInput) {
    alert("Please select both start and end dates.");
    return;
  }

  const startDate = new Date(startInput).getTime();
  const endDate = new Date(endInput).getTime();

  if (startDate >= endDate) {
    alert("Start date must be before end date.");
    return;
  }

  if (interval) clearInterval(interval);

  interval = setInterval(() => updateTimer(startDate, endDate), 1000);
  updateTimer(startDate, endDate); 
}

function updateTimer(startDate, endDate) {
  const now = new Date().getTime();

  const totalDuration = endDate - startDate;
  const distancePending = endDate - now;
  const distanceCovered = now - startDate;

  if (distancePending <= 0) {
    clearInterval(interval);
    document.getElementById("countdown").innerHTML = "<h2>Countdown Expired!</h2>";
    document.getElementById("progressbar").style.width = "100%";
    return;
  }

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  const oneSec = 1000;

  const days = Math.floor(distancePending / oneDay);
  const hours = Math.floor((distancePending % oneDay) / oneHour);
  const minutes = Math.floor((distancePending % oneHour) / oneMin);
  const seconds = Math.floor((distancePending % oneMin) / oneSec);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("min").innerText = minutes;
  document.getElementById("sec").innerText = seconds;

  const progressPercent = Math.min(100, Math.floor((distanceCovered / totalDuration) * 100));
  document.getElementById("progressbar").style.width = progressPercent + "%";
}
