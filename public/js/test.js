function startTimer(duration, daysCount, hoursCount, minutesCount, secondsCount) {
  var start = Date.now(),
  diff,
  minutes,
  seconds,
  hours,
  days;

  function timer() {
    // get the number of seconds that have elapsed since
    // startTimer() was called
    diff = (duration - Date.now()) / 1000;
    // console.log(diff);

    // does the same job as parseInt truncates the float
    days = (diff / 60 / 60 / 24) | 0;
    hours = ((diff / 60 / 60) % 24) | 0;
    minutes = ((diff / 60) % 60) | 0;
    seconds = (diff % 60) | 0;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (diff < 0) {
      hours = 0;
      minutes = 0;
      seconds = 0;
    }


    // display.text(days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds");
    daysCount.text(days);
    hoursCount.text(hours);
    minutesCount.text(minutes);
    secondsCount.text(seconds);

    //
    // if (diff <= 0) {
    //   // add one second so that the count down starts at the full duration
    //   // example 05:00 not 04:59
    //   start = Date.now() + 1000;
    // }
  };
  // we don't want to wait a full second before the timer starts
  timer();
  let interval = setInterval(timer, 1000);
}

window.onload = function () {
  let alertTime = $("#alert_time").text();
  let alertTimeObj = new Date(alertTime);
  let days = $('#days');
  let hours = $('#hours');
  let minutes = $('#minutes');
  let seconds = $('#seconds');
  startTimer(alertTimeObj, days, hours, minutes, seconds);
};
