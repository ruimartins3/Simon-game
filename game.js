
let availableColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0; 
 
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = availableColors[randomIndex];
  gamePattern.push(randomColor);
  

  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  let audio = new Audio("sounds/" + randomColor + ".mp3");
  audio.play();
};

function lastColor(currentLevel) {
 
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
 
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
 
  } else {
    playSound("wrong");
    $(document.body).addClass('game-over');
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $('#level-title').text('Game Over, Press Start to Restart');
    startOver()
  }
}

$(".btn").click(function(){
  let userChosenColor = $(this). attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  lastColor(userClickedPattern.length-1); 
  });


function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
  }, 100);
}


$("#startGame").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

  function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  }
