alert("Welcome to the Simon Game. Remember the colours to score points. Do u have a sharp memory to ace this game?. Find it out");

colours = ["red", "blue", "green", "yellow"];
correctSequence = [];
userSequence = [];

started = false;
level = 0;
highScore = 0;

$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  userChosenColour = $(this).attr("id");
  userSequence.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userSequence.length - 1);
});

function checkAnswer(currentLevel) {
  if (correctSequence[currentLevel] === userSequence[currentLevel]) {
    if (userSequence.length === correctSequence.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    if (currentLevel > highScore) {
      highScore = currentLevel;
      $(".highscore1").text("HIGH SCORE: " + highScore);
    }

    restart();
  }
}

function nextSequence() {
  userSequence = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = colours[randomNumber];
  correctSequence.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  if (level - 1 > highScore) {
    highScore = level - 1;
    $(".highscore1").text("HIGH SCORE: " + highScore);
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function restart() {
  level = 0;
  correctSequence = [];
  started = false;
}
