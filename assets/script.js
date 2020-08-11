var startquizEl = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var testContainerEl = document.getElementById("testcontainer");
var displayAnswerEl = document.getElementById("wrong-right");


var allQuestions = ["Commonly used data types DO NOT include:",
                    "The condition in an if / else statement is enclosed within ________.",
                    "A very useful tool used during developmment and debugging for printing content to the debugger is:",
                     "String values must be enclosed within _______ when being assigned to variables."] 
var firstQuestion = [  "1. Booleans", "2. Strings", "3. Numbers", " 4. Alerts" ];
var secondQuestion = [ "1. Square Brackets", "2. Curly Brackets", "3. Parentheses", "4. Quotes"];
var thirdQuestion = [ "1. JavaScript", "2. console.log", "3. Terminal/Bash", "4. for loops"];
var fourthQuestion = [ "1. Quotes", "2. Commas", "3. Curly Brackets", "4. Parentheses"];


let counter = 75; 
let nextQuestion = firstQuestion;
let questionCounter = 0;
let interval;
var oldRecords = JSON.parse(localStorage.getItem("oldRecords")) || [];


// clearing oldScores content from local storge
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

/// this function deletes the last elements and create new ones we also will display the list stored in local storage
function displayScores () {
    let allDoneEl = document.getElementById("form");
    allDoneEl.parentElement.removeChild(allDoneEl);

    let scoresEl = document.createElement("div");
    scoresEl.innerHTML = "<h3> Highscores </h3>";
    scoresEl.id = "scoresID"
    testContainerEl.appendChild(scoresEl);

    let organizedList = document.createElement("ol");
    organizedList.id = "organized";
   
    // create a list with the data pulled from local storage
    for ( i = 0; i < oldRecords.length; i++) {
        let listItem = document.createElement("li");
        listItem.setAttribute("class", "list-group-item-info my-2");
        listItem.appendChild(document.createTextNode(`${oldRecords[i].initials}---------------${oldRecords[i].scores}`));
        organizedList.appendChild(listItem);
    }

    scoresEl.appendChild(organizedList);
    let twoNewButtons = document.createElement("div");
    // created both buttons inside this div and one has an onClick reload function in it
    twoNewButtons.innerHTML = `<button type="button" class="btn btn-info float-left
      m-3" onClick="window.location.reload();">
     GO Back </button>
     <button type="button" class="btn btn-info float-right m-3" 
     id ="clear-scores">
     Clear Highscores </button>`;
     scoresEl.appendChild(twoNewButtons);
     // calling the clear scores function
     clearScores();
};

// because we called local storage and store its value in the object oldRecords, we can push the newValue object content 
// to oldRecords  object we are also sorting it based on scores variable so it will store the values decreasing
function storeScores () {
    oldRecords.push(newRecords);
    oldRecords.sort(function (a, b) {
        return b.scores - a.scores; 
    });
    // send them back to local storage and run displayScores function
    localStorage.setItem("oldRecords", JSON.stringify(oldRecords)); 
    displayScores();
 };

// this function clears the last content and displays new content your score and a form to store you intitials 
function stopTest() {
    //stops the timer
    clearInterval(interval)
    //clear past content
    var everyEl = document.getElementById("everyNew");
    everyEl.parentElement.removeChild(everyEl);
    // create new elements  
    let formEl = document.createElement("form");
    let allDoneEl = document.createElement("div");
    let initialsInputEl = document.createElement("div");   
    let submitEL = document.createElement("div");
    //  bootstrap attributes
    initialsInputEl.id = "intitials";
    submitEL.setAttribute("class", "text-center");
    allDoneEl.id = "form";
    submitEL.id = "submit";
    // create elements within elements
    initialsInputEl.innerHTML = `<input type="text" class="form-control"
     placeholder="Initials" value = "" aria-label="Username" 
     aria-describedby="basic-addon1" id ="initials"> <br>`;
    allDoneEl.innerHTML = `<h3>ALL DONE! </h3> <i>Your Final Score is ${counter}! </i>
   <br> Enter your initials: `;
    submitEL.innerHTML= '<button class="start btn btn-outline-info "> Submit </button>'; 
    // append to their respective parents
    allDoneEl.appendChild(formEl);  
    testContainerEl.appendChild(allDoneEl);
    formEl.appendChild(initialsInputEl);
    formEl.appendChild(submitEL);
    initialsInputEl = document.getElementById("initials");
    // this event listener is inside the function because the elment inst created until this point
    formEl.addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        // this will pass the value of the input element to the variable initials and store counter in the score variable
        // both of this variables are in the object newRecords 
        if (event.target.matches("button")) {
            newRecords = {
                "initials" : initialsInputEl.value.trim(),
                "scores" : counter
            };
            // we run storeScores
            storeScores();    
        };
   });
};
//// this function evaluates if the button clicked was the correct answer 
/// it will create an element that will display for 3 seconds if the answer was right or wrong
/// it will call back function start quiz that will creat the next question template. 
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
        }, 1500); 
        
    } else {
        
        answerEl.innerHTML = `<p class="font-weight-light font-italic">
        Wrong Answer!</p>`;
        displayAnswerEl.appendChild(answerEl); 
        questionCounter++;
        startQuiz(); 
        //if the answer is wrong the timer will decrease by 10
        counter = counter - 10;
        setTimeout (function () {
            answerEl.parentElement.removeChild(answerEl);
        }, 1500);
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
        //this function is called to stop the text and call the results
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
    // Deleting everyEL just to construct it again with the new content
    var everyEl = document.getElementById("everyNew");
    everyEl.parentElement.removeChild(everyEl);
    // Creating new content with the questions and its respective posible answers 
    // Also setting bootstraps atributes to modify the elements style and possition
    let test = document.createElement("section");
    let questionEL = document.createElement("h3");
    questionEL.setAttribute("class", "row-12  mb-4");
    test.setAttribute("class", "text-center")
    test.id = "everyNew";
    questionEL.innerHTML = allQuestions[questionCounter];
    testContainerEl.appendChild(test)
    test.appendChild(questionEL)
    // this for loop will create buttons with different content in each of them.
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
    timerEl.innerHTML = `<h2 class="float-right">Time: ${counter} </h2>`; 
    // interval by the second that will display the counter until the test is done or if it
    // gets to cero it will clear the interval and execute the stopTest function
    interval = setInterval(function () {
         counter--;
         timerEl.innerHTML = `<h2 class="float-right">Time: ${counter} </h2>`;
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
/// this event listener will evaluate any click inside testContainerEl and if the click was in a button
// it will execute theAnswer 
testContainerEl.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.matches("button")) {
        theAnswer();
    };
});
