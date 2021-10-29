var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern=[];
var level=0 ;
var started=false;

$(document).keydown(function(){
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
var userChosenColour =  $(this).attr('id');
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);


});

function nextSequence() {
    userClickedPattern = [];
   level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);

}

//$("body").click(function(){nextSequence()});


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour){

  setTimeout(function() {
  $("#" + currentColour).toggleClass('pressed');
}, 100);
$("#" + currentColour).toggleClass('pressed');
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").toggleClass("game-over");
      setTimeout(function () {
        $("body").toggleClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      
      startOver();
    }

}

function startOver() {


  level = 0;
  gamePattern = [];
  started = false;
}
