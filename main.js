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

