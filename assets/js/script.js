// Make a game where a player has 10 seconds to enter text and figure out a word. If the word is complete, they win. If it isn't complete by the time the timer hits 0, they fail.

// I need a list of words that can be used for the game
const words = ["kobolds", "goblins", "orcs", "chimeras", "dragons", "leviathans", "golems", "beholders", "bulettes", "mimics", "owlbears", "gnolls", "gazers"];

// define DOM objects
var wordBlanksEl = document.querySelector(".word-blanks");
var startButtonEl = document.querySelector(".start-button");
var resetButtonEl = document.querySelector(".reset-button");
var timerCountEl = document.querySelector(".timer-count");
var winCountEl = document.querySelector(".win");
var loseCountEl = document.querySelector(".lose");
console.log(winCountEl.textContent)

// Add event listeners

startButtonEl.addEventListener("click", startGame) // NOTE: You can't use parentheses with the function call!


// Create a function for everything that happens when you hit the Start button
function startGame(event) {
    // Turn off the startGame button
    startButtonEl.disabled = true;

    // Randomly select a word.
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let blankWord = [];

// Transform those words to blank spaces
    // Find word length
    var wordLength = randomWord.length;
    // Create an array with a new "_"entry
    for (i = 0; i < wordLength; i++) {
        blankWord.push("_");
    }
    // Make the array into a string
    var blankWordString = blankWord.join(" ");
    var solvedWord = blankWord.join("")

    // Show the blank spaces on the screen
    wordBlanksEl.textContent = blankWordString;

    console.log(blankWord)
    console.log(blankWordString)
    console.log(randomWord)

    // Create a timer
    // Set the base value, and reset base value on button click (otherwise it starts at 9)
    var secondsLeft = 10;
    timerCountEl.textContent = secondsLeft;

    var timerInterval = setInterval (function() {
        secondsLeft--;
        // Set win/lose conditions within timer
        if ((secondsLeft >= 0) && (randomWord == solvedWord)) {
            clearInterval(timerInterval);
            winGame = true;
            document.removeEventListener("keydown", keydownAction)
            gameOver();
            return; // return so you don't move the timer down further
        } else if (secondsLeft === 0) {
            console.log(randomWord, solvedWord)
            clearInterval(timerInterval);
            document.removeEventListener("keydown", keydownAction)
            gameOver();
        }
        timerCountEl.textContent = secondsLeft;
    }, 1000)
    // }

    // Event listeners for the game
    document.addEventListener("keydown", keydownAction)

    // Create a keydown action event
    function keydownAction(event) {
        var keyPress = event.key;
        var keyIndex = "";
        var indices = [0]

        // Check if the keypress matches any items in the word string.
        if (randomWord.includes(keyPress)) {

            // Set function variables
            // A blank index to store the multiple index values of a letter in the word
            // The first index value of the letter in the word
            indices = []
            keyIndex = randomWord.indexOf(keyPress);
            console.log("keyIndex:",keyIndex)
            
            // Find index of the event key and swap the blank space with the key
            // Note that the keyIndex is -1 if the key isn't present in the search area
            // The 'while' loop works better than a 'for' loop in this instance
            while (keyIndex !== -1) {
                indices.push(keyIndex);  
                console.log("keyIndex in loop:",keyIndex)
                blankWord[keyIndex] = keyPress;
                keyIndex = randomWord.indexOf(keyPress, keyIndex + 1)
                solvedWord = blankWord.join("")
            }
            // Join the index into a spaced-out word value for display
            blankWordString = blankWord.join(" ");
            wordBlanksEl.textContent = blankWordString.toUpperCase();

            console.log("key press:", keyPress);
            console.log(randomWord);
            console.log(blankWordString);

        }
    }
}
// win/lose condition variables
var winGame = false;
var winCount = 0;
var loseCount = 0;

// stored data variables
var winHistory = localStorage.getItem("wins");
console.log(winHistory)
var loseHistory = localStorage.getItem("losses");

function init() {
    if (winHistory == null) {
        winCountEl.textContent = 0
    } else {
        winCountEl.textContent = winHistory
    }
    
    if (loseHistory == null) {
        loseCountEl.textContent = 0
    } else {
        loseCountEl.textContent = loseHistory
    }
}

function gameOver() {

    if (winGame == true) {
        winCount++
        winCountEl.textContent = winCount;
        winHistory = localStorage.setItem("wins", winCount)
        wordBlanksEl.textContent = "YOU WIN!";
        winGame = false;
    } else {
        loseCount++;
        loseCountEl.textContent = loseCount;
        wordBlanksEl.textContent = "YOU LOSE!";
        loseHistory = localStorage.setItem("losses", loseCount)
    }
    startButtonEl.disabled = false;
}

resetButtonEl.addEventListener("click", resetScore)

function resetScore() {
    localStorage.removeItem("wins")
    winCount = 0
    winCountEl.textContent = winCount

    localStorage.removeItem("losses")
    loseCount = 0
    loseCountEl.textContent = loseCount

    timerCountEl.textContent = 10
    wordBlanksEl.textContent = "DR_G_NS"
}

init();

// List the different concepts necessary for this game

    // I need to display the blank spaces on the page
    // I need a button to start the time on click
    // I need the keyboard inputs to check against the root word
    // I need the win and lose conditions to be presented on-screen
    // I need the win and lose conditions to save locally.