// DEPENDENCIES

var startButton = document.querySelector(".start");
var timeLeftEl = document.querySelector(".timer");
var h1El = document.querySelector(".heading");
var pEl = document.querySelector(".sub-heading")

// DATA / STATE

var userScore = 10;
var currentQuestionIndex = 0;
var questions = [
    {
        question: "What is JavaScript?",
        options: ["A font-style developed in coffee shops during the 1600s", "A legal document governing modern coffee supply-chain laws",  "An object-oriented programming language first released in 1995", "A technique barista's use to make latte art"],
        key: 2
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

function displayQuestion(index) {

    // h1 -> title
    h1El.innerText = questions[index].question;

    // hide <p> tag
    pEl.classList.add("hide")
    startButton.classList.add("hide")
    var promptElm =  document.createElement("p");
    // show the options as buttons
    for (i=0; i < questions[index].options.length; i++) {
        // creating a new HTML tag "button"
        var optionButton = document.createElement("button");
        // Grabbing text from options array
        optionButton.innerText = questions[index].options[i];
        // Populating each button with text

        //add event listner
        optionButton.addEventListener("click", function(){
           
            var selectedBtnTxt = this.innerText;
            var optionsIndex = questions[index].key
            var correctAnswer  = questions[index].options[optionsIndex];
           
            if (selectedBtnTxt === correctAnswer) {
                console.log("Correct")
                promptElm.innerText = "Correct!";
            } else {
                console.log("Incorrect")
                promptElm.innerText = "Incorrect!";
            }
           
        })

        document.querySelector('.option-button-container').append(optionButton);
        document.querySelector('.option-button-container').append(promptElm);
    }
    
}

function startGame() {
    console.log("The game has started.");
    // start the timer
    startTimer();
    // display first question and options
    displayQuestion(currentQuestionIndex);
};

// USER INTERACTIONS

startButton.addEventListener("click", startGame);

// INTIALIZATION

