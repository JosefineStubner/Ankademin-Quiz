//Namnger dark/light-mode knappen i JS.
let switchModeButton = document.querySelector("#switchMode");

//När användaren klickar på Dark/Light-mode knappen, ändra utseende på sidan.
switchModeButton.addEventListener("click", darkLight);

//Funktion för Dark/Light-mode.
function darkLight(){
  let body = document.body;
  body.classList.toggle("dark-light");
}

//Namnger reset-knappen i JS.
let resetButton = document.querySelector("#reset");

//Funktion för att ladda om sidan.
resetButton.addEventListener("click", () => {
  window.location.reload();
})

//För att visa quizet.
let quizContainer = document.querySelector("#quiz");
let resultsContainer = document.querySelector("#results");
let checkAnswers = document.querySelector("#checkAnswers");

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

    //För att förvara output och valda svar:
    let output = [];
    let answers;

    //För varje fråga i quizet:
    for(let i=0; i<questions.length; i++){

      //Nollställ listan med svar.
      answers = [];

      //Lägg till en radio-knapp i html'en för varje möjligt svar på frågan.
      for(letter in questions[i].answers){

        answers.push(
          "<label>"
          + "<input type='radio' name='question"+i+"' value='"+letter+"'>"
          + letter + ": "
          + questions[i].answers[letter]
          + "<br/>"
          + "</label>");
      }

      //Skapa div'ar och lägg till frågan och svaren i outputen på sidan.
      output.push(
        "<div class='question'>" + questions[i].question + "</div>"
        + "<div class='answers'>" + answers.join("") + "</div>"
      );
    }

    //Kombinera output innehållet till en sträng i HTML och visa den i webbläsaren.
    quizContainer.innerHTML = output.join("");
  }

  function showResults(questions, quizContainer, resultsContainer){
    //Hämta svars-containers från quizet.
    let answerContainers = quizContainer.querySelectorAll(".answers");

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

    resultsContainer.innerHTML = numCorrect + " av " + questions.length + " rätta svar.";
  }

  showQuestions(questions, quizContainer);

  checkAnswers.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }


}

generateQuiz(quizQuestions, quizContainer, resultsContainer, checkAnswers);