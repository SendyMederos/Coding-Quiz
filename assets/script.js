var startquizEl = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var testContainerEl = document.getElementById("testcontainer");
var displayAnswerEl = document.getElementById("wrong-right");


var allQuestions = ["THis is the first question", "THis is the second question",
                    "THis is the third question", "THis is the fourth question"] 
var firstQuestion = [  "this could be an answer",
                        "or this one", "thisone perhaphs", "is this ONE" ];
var secondQuestion = [ "this could be an answer",
                        "or this one", " the ONE", "maybe this one"];
var thirdQuestion = [ "this could be an answer",
                        "the ONE", "thisone perhaphs", "maybe this one"];
var fourthQuestion = [ "this is the ONE",
                         "or this one", "thisone perhaphs", "maybe this one"];


let counter = 75; 
let nextQuestion = firstQuestion;
let questionCounter = 0;
let interval;
var oldRecords = JSON.parse(localStorage.getItem("oldRecords")) || [];

function clearScores() {
    clearScoresEl = document.getElementById("clear-scores");
    clearScoresEl.addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        oldRecords = [];
        localStorage.setItem("oldRecords", JSON.stringify(oldRecords));
        organizedList = document.getElementById("organized");
        organizedList.parentElement.removeChild(organizedList);
    });
};

function storeScores () {
    oldRecords.push(newRecords);
    oldRecords.sort(function (a, b) {
        return b.scores - a.scores; 
    });
    localStorage.setItem("oldRecords", JSON.stringify(oldRecords));
    oldRecords = JSON.parse(localStorage.getItem("oldRecords"));  
    displayScores();
 };



function displayScores () {
    let allDoneEl = document.getElementById("form");
    allDoneEl.parentElement.removeChild(allDoneEl);

    let scoresEl = document.createElement("div");
    scoresEl.innerHTML = "<h3> Highscores </h3>";
    testContainerEl.appendChild(scoresEl);

    let organizedList = document.createElement("ol");
    //organizedList.setAttribute("class", "float-left");
    organizedList.id = "organized";
    oldRecords = JSON.parse(localStorage.getItem("oldRecords"));
    for ( i = 0; i < oldRecords.length; i++) {
        let listItem = document.createElement("li");
        listItem.setAttribute("class", "list-group-item-info my-2");
        listItem.appendChild(document.createTextNode(`${oldRecords[i].initials}---${oldRecords[i].scores}`));
        organizedList.appendChild(listItem);
    }

    scoresEl.appendChild(organizedList);
    let twoNewButtons = document.createElement("div");
    twoNewButtons.innerHTML = `<button type="button" class="btn btn-info float-left
     mt-3 mr-3" onClick="window.location.reload();">
     GO Back </button>
     <button type="button" class="btn btn-info float-right mt-3 ml-3" 
     id ="clear-scores">
     Clear Highscores </button>`;
     scoresEl.appendChild(twoNewButtons);
     clearScores();
};

function stopTest() {
    clearInterval(interval)
    var everyEl = document.getElementById("everyNew");
    everyEl.parentElement.removeChild(everyEl);
    let formEl = document.createElement("form");
    let allDoneEl = document.createElement("div");
    let initialsInputEl = document.createElement("div");   
    let submitEL = document.createElement("div");

    initialsInputEl.setAttribute("class", " mt-1");
    submitEL.setAttribute("class", "text-center");
    allDoneEl.id = "form";
    submitEL.id = "submit";

    initialsInputEl.innerHTML = `<input type="text" class="form-control"
     placeholder="Initials" value = "" aria-label="Username" 
     aria-describedby="basic-addon1" id ="initials"> <br>`;
    allDoneEl.innerHTML = `<h2>ALL DONE! </h2> <i>Your Final Score is ${counter}! </i>
   <br> Enter your initials: `;
    submitEL.innerHTML= '<button class="start btn btn-outline-info text-center"> Submit </button>'; 
  
    allDoneEl.appendChild(formEl);  
    testContainerEl.appendChild(allDoneEl);
    formEl.appendChild(initialsInputEl);
    formEl.appendChild(submitEL);
    initialsInputEl = document.getElementById("initials");
    
    
    formEl.addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        if (event.target.matches("button")) {
            newRecords = {
                "initials" : initialsInputEl.value.trim(),
                "scores" : counter
            };
            storeScores();    
        };
   });
};

function theAnswer() {

    answerEl = document.createElement("hr");
    if ((questionCounter == 0) &&  (event.target.id == 4) ||
    (questionCounter == 1) &&  (event.target.id == 3) ||
    (questionCounter == 2) &&  (event.target.id == 2) ||
    (questionCounter == 3) &&  (event.target.id == 1)) {
               
        answerEl.innerHTML = `<p class="font-weight-light font-italic">
        CORRECT!</p>`;
        displayAnswerEl.appendChild(answerEl);
        questionCounter++; 
        startQuiz();
        setTimeout (function () { 
            answerEl.parentElement.removeChild(answerEl);
        }, 3000); 
        
    } else {
        
        answerEl.innerHTML = `<p class="font-weight-light font-italic">
        Wrong Answer!</p>`;
        displayAnswerEl.appendChild(answerEl); 
        questionCounter++;
        startQuiz();    
        counter = counter - 10;
        setTimeout (function () {
            answerEl.parentElement.removeChild(answerEl);
        }, 3000);
    };
};
/// this function will evaluate what content will display on each question
//  and all its posible answers 
function whatQuestion() {
    if (questionCounter == 0){
        nextQuestion = firstQuestion;
    } else if (questionCounter == 1){
        nextQuestion = secondQuestion;
    } else if (questionCounter == 2){
        nextQuestion = thirdQuestion;
    } else if (questionCounter == 3){
        nextQuestion = fourthQuestion;
    } else {
        stopTest();
    }
};
/// The game starts here.
function startQuiz(){
    // I am calling this function to evaluate the content of the elements to come
    whatQuestion();
    /// I wonder if there is another way to stop runing this function from stopTest function
    /// if the value of the counter is 4 (there's no more questions) then exit this function.
    if (questionCounter == 4) {
         return;
    };
    // Deleting in everyEL just to construct it again with the new content
    var everyEl = document.getElementById("everyNew");
    everyEl.parentElement.removeChild(everyEl);
    // Creating new content with the questions and its respective posible answers 
    // Also setting bootstraps atributes to modify the elements style and possition
    let test = document.createElement("section");
    let questionEL = document.createElement("h3");
    questionEL.setAttribute("class", "row-12  mb-3");
    test.setAttribute("class", "text-center")
    test.id = "everyNew";
    // I could change all questions for a variable that changes when an answer is selected
    questionEL.innerHTML = allQuestions[questionCounter];
    testContainerEl.appendChild(test)
    test.appendChild(questionEL)
    for ( i = 0; i <  4; i++ ){
        let answersButtonEl = document.createElement("button");
        answersButtonEl.id = i + 1;
        answersButtonEl.setAttribute("type", "button");
        answersButtonEl.setAttribute("class", "btn btn-info my-1 d-block");
        test.appendChild(answersButtonEl);
        answersButtonEl.innerHTML = nextQuestion[i];
    };
};


// timer function count down 
function startTimer () {
   // for aesthetic we are quickly displaying the timer otherwise the start quiz will generate
   // its content faster as this timer will take a second to start. 
    timerEl.innerHTML = `<h3 class="float-right">Time: ${counter} </h3>`; 
    // interval by the second that will display the counter until the test is done or if it
    // gets to cero it will clear the interval and execute the stopTest function
    interval = setInterval(function () {
         counter--;
         timerEl.innerHTML = `<h3 class="float-right">Time: ${counter} </h3>`;
         if (counter < 1) {
             clearInterval(interval);
             stopTest();      
         }; 
     }, 1000);     
};

startquizEl.addEventListener("click", function(event) {     
   // I have to stop propagation or my testContainerEl addEventListener will activate 
    event.stopPropagation();
    startTimer();
    startQuiz();
    
});

testContainerEl.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.matches("button")) {
        theAnswer();
    };
    
    console.log(event.target.parentElement.id);
    console.log(questionCounter);
});
