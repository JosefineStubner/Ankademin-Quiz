//Namnger dark/light-mode knappen i JS.
let switchModeButton = document.getElementById("switchMode");

//När användaren klickar på Dark/Light-mode knappen, ändra utseende på sidan.
switchModeButton.addEventListener("click", darkLight);

//Funktion för Dark/Light-mode.
function darkLight(){
  let body = document.body;
  body.classList.toggle("dark-light");
}

//Namnger reset-knappen i JS.
let resetButton = document.getElementById("reset");

//Funktion för att ladda om sidan.
resetButton.addEventListener("click", () => {
  window.location.reload();
})

//För att lägga in quizet i DOM:en.
let quizContainer = document.getElementById("quiz");
let resultsContainer = document.getElementById("results");
let checkAnswers = document.getElementById("checkAnswers");

//Quiz-frågor (array of objects), variabel för att lagra innehållet i quizen.
let quizQuestions = [
  {
    question: "1. Vad av följande är inte en gångart?",
    answers: {
      a: "Tölt",
      b: "Paso fino",
      c: "Flemning"
    },
  correctAnswer: "c"
  },
  {
    question: "2. Ett kandar har:",
    answers: {
      a: "2 bett",
      b: "Inget bett",
      c: "1 bett"
    },
  correctAnswer: "a"
  },
  {
    question: "3. Världsrekordet i hoppning med häst ligger på:",
    answers: {
      a: "2.47m",
      b: "1.87m",
      c: "2.23m"
    },
  correctAnswer: "a"
  },
  {
    question: "4. Hästar är:",
    answers: {
      a: "Ett tåg som inte finnns",
      b: "En frukt som inte finns",
      c: "En fågel som inte finns"
    },
  correctAnswer: "b"
  },
  {
    question: "5. Gångarten trav är:",
    answers: {
      a: "2-taktig",
      b: "3-taktig",
      c: "4-taktig"
    },
  correctAnswer: "a"
  },
  {
    question: "6. Vad heter den korv innehållandes hästkött som produceras i Dalarna?",
    answers: {
      a: "Onsalakorv",
      b: "Timmermanskorv",
      c: "Gustafskorv"
    },
  correctAnswer: "c"
  },
  {
    question: "7. Vad kallas sjukdomen som gör att hästar får ont i hovarna?",
    answers: {
      a: "Klubbhov",
      b: "Fång",
      c: "Ringröta"
    },
  correctAnswer: "b"
  },
  {
    question: "8. Vanligast inom kapplöpning är:",
    answers: {
      a: "Halvblod",
      b: "Fullblod",
      c: "Kallblod"
    },
  correctAnswer: "b"
  },
  {
    question: "9. Hastighetsrekordet inom hästkapplöpning är:",
    answers: {
      a: "68km/h",
      b: "76,4km/h",
      c: "70,7km/h"
    },
  correctAnswer: "c"
  },
]

//Funktion för att generera och strukturera quizet.

function generateQuiz(questions, quizContainer, resultsContainer, checkAnswers){

  //Funktion för att skriva ut frågor och svar på sidan:
  function showQuestions(questions, quizContainer) {

    //För att förvara text och valda svar:
    let display = [];
    let answers;

    //För varje fråga i quizet:
    for(let i=0; i<questions.length; i++){

      //Nollställ listan med svar.
      answers = [];

      //Lägg till en radio-knapp i html'en för varje möjligt svar på frågan.
      for(letter in questions[i].answers){

      answers.push(
        `<label>
        <input type="radio" name="question${[i]}" value="${letter}">
        ${letter}: ${questions[i].answers[letter]}<br/>
        </label>`);
    }

      //Skapa div'ar och lägg till frågan och svaren på sidan.
    display.push(
      `<div class="question">${questions[i].question}</div>
      <div class="answers">${answers.join("")}</div><br/>`
    );
  }

    //Kombinera innehållet till en sträng i HTML och visa den i webbläsaren.
    quizContainer.innerHTML = display.join("");
  }

  function showResults(questions, quizContainer, resultsContainer){
    //Hämta svars-containers från quizet.
    let answerContainers = quizContainer.getElementsByClassName("answers");

    //Spåra vilket svar användaren har valt.
    let userAnswer = "";
    let numCorrect = 0;

    //Hitta valt svar för varje fråga.
    for (let i=0; i<questions.length; i++){
      //Tomma svar räknas för att inte krascha något.
      userAnswer = (answerContainers[i].querySelector("input[name=question"+i+"]:checked")||{}).value;

      //Om svaret är rätt.
      if (userAnswer === questions[i].correctAnswer){
        numCorrect++;
      }
    }

    //Checkbox-fråga, kollar så att rätt alternativ är ifyllda för att ge rätt på frågan.

    if (document.getElementById("answer1").checked === true && document.getElementById("answer2").checked === true
      && document.getElementById("answer3").checked !== true && document.getElementById("answer4").checked === true
      && document.getElementById("answer5").checked !== true) {
        numCorrect++;
        console.log("rätt!")
      } else {
        console.log("fel!")
      }

    if(numCorrect <= 4){ //Vid 4 rätta svar eller mindre färgas texten röd.
      resultsContainer.style.color = "red";
    } else if(numCorrect <= 7){ //Vid mellan 5-7 rätta svar färgas texten orange.
      resultsContainer.style.color = "orange";
    } else { //Vid 8 eller fler rätta svar färgas texten grön.
      resultsContainer.style.color = "green";
    }
    
    //Styling av resultat.
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.fontWeight = "bold";
    resultsContainer.style.borderStyle = "solid";
    resultsContainer.innerHTML = `Du fick ${numCorrect} av 10 rätt.`;
  }

  showQuestions(questions, quizContainer);

  checkAnswers.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }


}

generateQuiz(quizQuestions, quizContainer, resultsContainer, checkAnswers);