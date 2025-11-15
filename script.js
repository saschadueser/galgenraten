// Controls - Dürfen bearbeitet werden
let wordToGuess = ""; // Optional festlegbar, falls ein individuelles Wort erraten werden soll
const losingCounterTarget = 6; // Festlegen der maximalen Fehlversuche
 
// Counter
let winningCounter = 0; // Counter zum Zählen der gefundenen Buchstaben
let losingCounter = 0; // Counter zum Zählen der Fehlversuche
let winningCounterTarget; // Automatisch ermittelt bei Festsetzung des gesuchten Wortes
 
// HTML elements
const keyboard = document.querySelector(".keyboard");
const wantedWord = document.querySelector(".wanted-word");
const hintBoxFailureCounter = document.querySelector(".hintbox .failure-counter");
const hintBoxFailureContainer = document.querySelector(".hintbox .failure");
let letterGuess = document.querySelectorAll(".letter-guess")
 
// data
const alphabet = [];
 
// One time run for creating the alphabet in letters array
for (let i = 65; i <= 90; i++) {
  alphabet.push(String.fromCharCode(i));
}
 
// One time function for picking a random word from the list
async function gameStart() {
    if (wordToGuess === "") {
        let fetchedWordList = await fetch("./words.json");
        let fetchedWordListJson = await fetchedWordList.json();
        wordToGuess = fetchedWordListJson[Math.floor(Math.random() * fetchedWordListJson.length)]
    }
    setTimeout(() => {
        createWordToGuess()
        gameLoad = true;
        winningCounterTarget = wordToGuess.length;
        hintBoxFailureCounter.textContent = `${losingCounter} / ${losingCounterTarget}`
    }, 1);
}
 
gameStart();
 
// Function for check the chosen letter
function checkLetter(e, letter) {
    let tempArr = [];
 
    for (let x in wordToGuess) {
        if(wordToGuess[x].toLowerCase() === letter.toLowerCase() ) {
            tempArr.push(x);
        }
    }
 
    if(tempArr.length === 0) {
        // Letter not found
        hintBoxFailureContainer.classList.add("animate-wrong-answer")
        setTimeout(() => {
            hintBoxFailureContainer.classList.remove("animate-wrong-answer")
        }, 500);
        hintBoxFailureCounter.textContent = `${++losingCounter} / ${losingCounterTarget}`
        drawPerson();
 
        // Game Over - Losing State
        if(losingCounterTarget === losingCounter) {
            alert("Game is over. You lose")
            document.querySelectorAll(".letter").forEach( letterEl => {
                letterEl.classList.add("inactive")
            })
            wantedWord.innerHTML = wordToGuess.toUpperCase();
            wantedWord.style.color = "red"
    }
    } else {
        // Letter found
        wantedWord.classList.add("animate-correct-answer")
        setTimeout(() => {
            wantedWord.classList.remove("animate-correct-answer")
        }, 500);
        tempArr.forEach( el => {
            letterGuess[el].textContent = letter
            winningCounter++;
        })
 
        // Game Over - Winning State
        if(winningCounterTarget === winningCounter) {
            alert("Game is over. You won")
            document.querySelectorAll(".letter").forEach( letterEl => {
                letterEl.classList.add("inactive")
            })
            wantedWord.style.color = "green"
        }
    }
    // deactivate the letter key of the keyboard
    e.target.classList.add("inactive")
    console.log(winningCounter)
}
 
//**
// One time perform */
 
// Create letter keys for the keyboard and attach an EventHandler to it
function createWordToGuess() {
    alphabet.forEach( letter => {
        const newElement = document.createElement("div");
        newElement.classList.add("letter");
        newElement.textContent = letter;
 
        newElement.addEventListener("click", (e) => {
            checkLetter(e, letter)
        })
 
        keyboard.appendChild(newElement)
    })
 
    // Create the missing word fields (runtime once)
    for(let x of wordToGuess) {
        const letterPlaceholder = document.createElement("div");
        letterPlaceholder.classList.add("letter-guess")
        letterPlaceholder.textContent = "_"
 
        wantedWord.appendChild(letterPlaceholder)
        letterGuess = document.querySelectorAll(".letter-guess")
    }
 
}
 
const graphicParts = document.querySelectorAll(".person");
 
function drawPerson() {
    for (let x = 0; x < losingCounter ; x++) {
        graphicParts[x].style.display = "block";
    }
   
}
 
    graphicParts.forEach( el => {
        el.style.display = "none"
    })