var userClickedPattern = [];

var gamePattern = [];

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btb").click(function temp(e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    setTimeout(function () {
      nextSequence();
    }, 200);
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $(".first-h1").text("Level " + level);
  var buttonColours = ["red", "blue", "green", "yellow"];
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $(".first-h1").text("Game-over, press any key to refresh");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  $(document).keypress(function refresh() {
      location.reload();
    }
  );
}

