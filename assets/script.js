// DEPENDENCIES

var startButton = document.querySelector(".start");
var timeLeftEl = document.querySelector(".timer");
var highScoreButton = document.querySelector(".high-scores")
var h1El = document.querySelector(".heading");
var pEl = document.querySelector(".sub-heading");
var buttonContainer = document.querySelector(".option-button-container")
var highScoreTable = document.querySelector(".high-score-table")

// DATA / STATE


var userScore = 0;
var currentQuestionIndex = 0;
var timeLeft = 31;
var questions = [
    {
        question: "What is JavaScript?",
        options: ["A font-style developed in coffee shops during the 1600s", "A legal document governing modern coffee supply-chain laws",  "An object-oriented programming language first released in 1995", "A technique barista's use to make latte art"],
        key: 2
    },
    {
        question: "What does CSS stand for?",
        options: ["Corn Starch Supplement", "Cascading Style Sheets", "Create Succint Styles", "Cyper Style Sheets"],
        key: 1
    },
    {
        question: "In HTML, ________ are used to store semantic information called tags.",
        options: ["boxes", "classes", "properties", "elements"],
        key: 3
    },
    {
        question: "Our JavaScript file links to our HTML file using what kind of semantic tag?",
        options: ["script", "link", "attach", "figure"],
        key: 0
    }
]

// FUNCTIONS

function createForm() {
    // Create a form 
var form = document.createElement("form");
form.id = 'form';
document.getElementById("form-container").appendChild(form);

var initialLabel = document.createElement("Label");
initialLabel.setAttribute("for", "initialBox");
initialLabel.id = 'intinputlabel';
document.getElementById("form").appendChild(initialLabel);

var initialInputBox = document.createElement("INPUT");
initialInputBox.setAttribute("type", "text");
initialInputBox.setAttribute("placeholder", "Input Initials Here");
initialInputBox.id = 'initialinput';
document.getElementById("intinputlabel").after(initialInputBox);

// create a submit button
var submit = document.createElement("input");
submit.setAttribute("type", "submit");
submit.setAttribute("value", "Save Score");
submit.id = 'submit';
document.getElementById("initialinput").after(submit);

//GET INITIALS and need to prevent page refresh when hitting submit. Also account for box being blank
var initialInput = document.querySelector("#initialinput");
var submissionResponseEl = document.createElement("p");
//var initials = initialInput.value;
document.querySelector("#form").appendChild(submissionResponseEl);
}

// function storeScore() {
//     //Retrieve the stuff
//   var initialsText = localStorage.getItem("initials");
//   var highscoreText = localStorage.getItem("score");

//   currentScore = localStorage.setItem("score", userScore);
//take both and add to resultsStorage
//   var highScoreEntry = {
//         initialz: initialsText,
//         scorelog: highscoreText
//   };

//   resultsStorage.push(highScoreEntry);
//   return ////console.log("STORESCORE HAS RUN");

// }

function displayScoreSubmitMessage(type, message) {
        // var submitfeedback = document.createElement("p");
        // submitfeedback.id = 'submitfeedback'; 
        // document.querySelector("#scorebox").appendChild(submitfeedback);
    
        // document.querySelector("#submitfeedback").textContent = message;
        // document.querySelector("#submitfeedback").setAttribute("class", type);
        }
    
function storeUserScore() {
    document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault();
    
        var initials = document.querySelector("#initialinput").value;
    
        if (initials === "") {
            displayScoreSubmitMessage("error", "Box cannot be blank");
        }
    
        else {
            displayScoreSubmitMessage("success", "Your score has been saved!");
        // Save initials and score to localStorage 
        localStorage.setItem("initials", initials);
        // localStorage.setItem("finalScore", score);
        localStorage.setItem("score", userScore)
        }
        })
}

function showUserScore() {
    console.log("showing the user score")
    var userInfo = document.createElement("user-info")
    userInfo.textContent = localStorage.getItem("initials");
}

function gameOver() {
    buttonContainer.textContent = "";
    // end the game
    console.log("Game over");
    // display end game message
    h1El.textContent = "Great job! You got " + userScore + " out of " + questions.length;
    createForm();
    // store the score locally
    // currentScore = localStorage.setItem("score", userScore);
    storeUserScore();
    // display user score
    showUserScore();
}

function startTimer() {
    console.log("Start Timer");
    var timerInterval = setInterval(function() {
        // subtract a second
        timeLeft--;
        // show new time on the page
        timeLeftEl.textContent = "Timer: " + timeLeft;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000)
    
};

function answerQuestion(index) {
    if (currentQuestionIndex > (questions.length -1)) {
        console.log("speed bump if has run")
        gameOver();
    } else {
        h1El.classList.remove("heading")
        // hide <p> tag
        pEl.classList.add("hide");
        // hide start button
        startButton.classList.add("hide");
        buttonContainer.textContent = "";

        // h1 -> title
        h1El.innerText = questions[index].question;

        var promptElm = document.createElement("p");
        // show the options as buttons
        for (i = 0; i < questions[index].options.length; i++) {
            // creating a new HTML tag "button"
            var optionButton = document.createElement("button");
            // Grabbing text from options array
            optionButton.innerText = questions[index].options[i];
            // Populating each button with text

            //add event listner
            optionButton.addEventListener("click", function() {
            
                var selectedBtnTxt = this.innerText;
                var optionsIndex = questions[index].key;
                var correctAnswer  = questions[index].options[optionsIndex];
            
                if (selectedBtnTxt === correctAnswer) {
                    console.log("Correct");
                    userScore++;
                    console.log(userScore);
                    promptElm.innerText = "You got it!";
                    // currentQuestionIndex = currentQuestionIndex++;
                } else {
                    console.log("Incorrect");
                    timeLeft = timeLeft - 5;
                    promptElm.innerText = "Wrong answer!";
                    // currentQuestionIndex = currentQuestionIndex++;
                }
                // add 1 to current question index
                currentQuestionIndex++;
                // reruns answer question function with updated question index
                answerQuestion(currentQuestionIndex);
            })
            document.querySelector('.option-button-container').append(optionButton);
            document.querySelector('.option-button-container').append(promptElm);
        }
    }    
}

function showHighScore() {
    console.log("show high scores");
    if (userScore === 0) {
        h1El.innerText = "No recorded scores yet!";
        pEl.innerText = "Hit the start button below to play and log your first high score";
    }
    else {
        h1El.innerText = "High Scores: ";
        pEl.classList.add("hide");
        buttonContainer.textContent
    }
}

function startGame() {
    console.log("The game has started.");
    // speedBump();
    // display first question and options
    answerQuestion(currentQuestionIndex)
    // start the timer
    startTimer();
};

// USER INTERACTIONS

startButton.addEventListener("click", startGame);
highScoreButton.addEventListener("click", showHighScore);


// INTIALIZATION

