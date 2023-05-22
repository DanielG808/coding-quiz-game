// DEPENDENCIES

var startButton = document.querySelector(".start");
var timeLeftEl = document.querySelector(".timer");
var h1El = document.querySelector(".heading");
var pEl = document.querySelector(".sub-heading")

// DATA / STATE

var userScore = 10;
var questions = [
    {
        question: "What is JavaScript?"
        option1: "A font-style developed in coffee shops during the 1600s"
        option2: "A legal document governing modern coffee supply-chain laws"
        option3: "An object-oriented programming language first released in 1995"
        option4: "A technique barista's use to make latte art"
        key: 4
    }
]

// FUNCTIONS

function getUserScore() {
}

function gameOver() {
    // end the game
    console.log("Game over");
    // display message for out of time
    h1El.textContent = "You're out of time!";
    // store the score locally
    currentScore = localStorage.setItem("score", userScore);
    // display score for this round (could add if statement that tells user they did good, ok, bad based on score)
    pEl.textContent = "You got " + userScore + " out of " + questions.length + " correct!"

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

function displayQuestion(

)

function startGame() {
    console.log("The game has started.");
    // start the timer
    startTimer();
    // display first question and options
    displayQuestion();
};

// USER INTERACTIONS

startButton.addEventListener("click", startGame);

// INTIALIZATION

