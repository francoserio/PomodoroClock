$(document).ready(function() {

  var session = false;
  var breakNum = parseInt($("#breakNumber").text());
  var sessionNum = parseInt($("#sessionNumber").text());
  document.getElementById('time').innerHTML = sessionNum;
  var time = false;

  $("#breakLengthPlus").click(function() {
    if (time === false) {
      var newBreak = parseInt($("#breakNumber").text()) + 1;
      $("#breakNumber").html(newBreak);
      breakNum = newBreak;
    }
  });
  $("#breakLengthLess").click(function() {
    if (time === false) {
      var newBreak = parseInt($("#breakNumber").text()) - 1;
      $("#breakNumber").html(newBreak);
      breakNum = newBreak;
    }
  });
  $("#sessionLengthPlus").click(function() {
    if (time === false) {
      var newSession = parseInt($("#sessionNumber").text()) + 1;
      $("#sessionNumber").html(newSession);
      $("#time").html(newSession);
      sessionNum = newSession;
    }
  });
  $("#sessionLengthLess").click(function() {
    if (time === false) {
      var newSession = parseInt($("#sessionNumber").text()) - 1;
      $("#sessionNumber").html(newSession);
      $("#time").html(newSession);
      sessionNum = newSession;
    }
  });

  var playClicked = false;
  var firstTime = true;

  var timerSession;
  var timerBreak;

  $("#playPauseButton").click(function() {
    if (firstTime === true) {
      session = true;
    }
    firstTime = false;
    time = true;
    if (playClicked === false) {
      $("#playPauseButton").html("&#10074;&#10074;");
      var minYSec = ($("#time").text()).split(":");
      if (minYSec.length === 1) {
        var dur = (parseInt($("#time").text()) * 60);
        var dis = $("#time");
        if (session === true) {
          startTimer(dur, dis);
        } else {
          startTimer2(dur, dis);
        }
      } else {
        var secFaltantes = parseInt(minYSec[1]);
        var dur = (parseInt($("#time").text()) * 60) + secFaltantes;
        var dis = $("#time");
        if (session === true) {
          startTimer(dur, dis);
        } else {
          startTimer2(dur, dis);
        }
      }
    } else {
      $("#playPauseButton").html("&#9658;");
      clearInterval(timerSession);
      clearInterval(timerBreak);
    }
    if (playClicked === false) {
      playClicked = true;
    } else {
      playClicked = false;
    }
  });

  $("#stopButton").click(function() {
    time = false;
    clearInterval(timerSession);
    clearInterval(timerBreak);
    $("#time").html($("#sessionNumber").text());
    if (playClicked === true) {
      $("#playPauseButton").html("&#9658;");
      playClicked = false;
    }
  });

  function startTimer(duration, display) {
    var timer = duration,
      minutes, seconds
    timerSession = setInterval(function() {
      session = true;
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(minutes + ":" + seconds);

      if (minutes == "00" && seconds == "00") {
        clearInterval(timerSession);
        startTimer2(parseInt($("#breakNumber").text()) * 60, $("#time"));
        session = false;
      }

      if (--timer < 0) {
        timer = duration;
      }

    }, 1000);

  }

  function startTimer2(duration, display) {
    var timer = duration,
      minutes, seconds
    timerBreak = setInterval(function() {
      session = false;
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(minutes + ":" + seconds);

      if (minutes == "00" && seconds == "00") {
        clearInterval(timerBreak);
        startTimer(parseInt($("#sessionNumber").text()) * 60, $("#time"));
        session = true;
      }

      if (--timer < 0) {
        timer = duration;
      }

    }, 1000);

  }
});