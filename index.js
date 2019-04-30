var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];                                                  //stores sequenece of the game to match 

var userClickedPattern = [];

var level = 0;

var started = false;


$(".start").click(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".start").addClass("hidden");
        $(".container").removeClass("hidden");
        $("p").addClass("hidden");
    }

})


function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor((Math.random() * 4));


    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);            //animation

    playSound(randomChosenColor);


}

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {                                                       //sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () { nextSequence(); }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $(".start").removeClass("hidden");
        $(".start").text("Restart");
        $(".container").addClass("hidden");

        $("#level-title").text("Press Restart, to Play Again");
        setTimeout($(document).click(startOver()),2000);
    }
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}