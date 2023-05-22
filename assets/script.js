// DEPENDENCIES

var startButton = document.querySelector(".start");
var timeLeftEl = document.querySelector(".timer");
var h1El = document.querySelector(".heading");

// DATA / STATE

// FUNCTIONS

function gameOver() {
    // end the game
    console.log("Game over");
    // display message for out of time
    h1El.textContent = "You're out of time!";
    // store the score locally
    // display score for this round 
}

function startTimer() {
    console.log("Start Timer");
    // create a time interval
    var timeLeft = 5;
    var timerInterval = setInterval(function() {
        // subtract a second
        timeLeft--;
        // show new time on the page
        timeLeftEl.textContent = "Timer: " + timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000)
    
};

function startGame() {
    console.log("The game has started.");
    // start the timer
    startTimer();
    // display first question and options
};

// USER INTERACTIONS

startButton.addEventListener("click", startGame);

// INTIALIZATION

