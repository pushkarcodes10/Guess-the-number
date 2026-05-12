let number = parseInt(Math.random() *100 + 1)

const userInput = document.getElementById('guessField')
const submit = document.getElementById('subt')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')
const resetGameButton = document.getElementById('resetGame')
// const getHintBtn = document.getElementById('getHint')


const p = document.createElement('p')

let prevGuess = []

let numGuess = 1

let playGame = true;

if(playGame)    {
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess)   {
    if(isNaN(guess))    {
        alert('Please Enter a valid number')
    }   else if(guess < 1) {
        alert('Please Enter a number more than 1')
    }   else if(guess > 100) {
        alert('Please Enter a number less than 100')
    }   else if(prevGuess.includes(guess))  {
        alert('You have already entered that number.')
    }   else    {
        prevGuess.push(guess);
        if(numGuess === 10) {
            displayGuess(guess);
            displayMessage(`Game Over. The Number Was ${number}`);
            endGame();
        }   else    {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess)  {
    if (guess === number) {
        displayMessage(`Congratulations You Guessed it right. The Number Was ${number}`)
        endGame();

    }   else if(guess < number) {
        displayMessage(`Number is too low`)
    }   else if(guess > number) {
        displayMessage(`Number is too high`)
    }
}

function displayGuess(guess)    {
    userInput.value = ''
    guessSlot.innerHTML += `${guess}, `
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message)  {
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame()  {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button')
    resetGameButton.style.display = "none"
    // getHintBtn.style.display = "none"
    p.innerHTML = `<button id="newGame">Start New Game</button>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame()  {
    const newGameButton = document.getElementById('newGame')
    newGameButton.addEventListener('click', function(e) {
        number = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = ''
        lowOrHi.innerHTML = ''
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        remaining.innerHTML = `${11 - numGuess}`;
        resetGameButton.style.display = "inline-block"
        // getHintBtn.style.display = "inline-block"

        playGame = true;
    });
}

    resetGameButton.addEventListener('click', function () {
    number = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess}`;
    lowOrHi.innerHTML = ''
    userInput.value = ''
});