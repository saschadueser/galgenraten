// controls
const wordToGuess = "Weihnachtsmann";
let winningCounter = 0;
let losingCounter = 0
const winningCounterTarget = wordToGuess.length;
const losingCounterTarget = 6;

// elements
const keyboard = document.querySelector(".keyboard");
const wantedWord = document.querySelector(".wanted-word");
const hintBoxSuccess = document.querySelector(".hintbox .success-counter");
const hintBoxFailure = document.querySelector(".hintbox .failure-counter");
let letterGuess = document.querySelectorAll(".letter-guess")

// data
const alpthabet = [];

// One time run for creating the alphabet in letters array
for (let i = 65; i <= 90; i++) {
  alpthabet.push(String.fromCharCode(i));
}

hintBoxFailure.textContent = `${losingCounter} / ${losingCounterTarget}`
hintBoxSuccess.textContent = `${winningCounter} / ${winningCounterTarget}`



// Function for check the chosen letter
function checkLetter(e, letter) {
    let tempArr = [];

    for (let x in wordToGuess) {
        if(wordToGuess[x].toLowerCase() === letter.toLowerCase() ) {
            tempArr.push(x);
        }
    }

    if(tempArr.length === 0) {
        alert("Letter not found")
        hintBoxFailure.textContent = `${++losingCounter} / ${losingCounterTarget}`
    if(losingCounterTarget === losingCounter) {
        alert("Game is over. You lose")
        document.querySelectorAll(".letter").forEach( letterEl => {
            letterEl.classList.add("inactive")
        })
    }
    } else {
        alert("Letter found")
        tempArr.forEach( el => {
            letterGuess[el].textContent = letter
            hintBoxSuccess.textContent = `${++winningCounter} / ${winningCounterTarget}`
        })
        if(winningCounterTarget === winningCounter) {
            alert("Game is over. You won")
            document.querySelectorAll(".letter").forEach( letterEl => {
                letterEl.classList.add("inactive")
            })
        }
    }
    // deactivate the letter key of the keyboard
    e.target.classList.add("inactive")
}





// Create letter keys for the keyboard and attach an EventHandler to it
alpthabet.forEach( letter => {
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
