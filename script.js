'use strict'

// Selecting elements
const mysteryBox = document.querySelector('.box');

const btnHit = document.querySelector('.btn--hit');
const btnCollect = document.querySelector('.btn--collect');
const btnReset = document.querySelector('.btn--reset');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

const init = function(){
    // Starting condition
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();



// Hit mystery box functionality
btnHit.addEventListener('click', function () {
    if (playing) {
        // Generating a random item
        const boxItem = Math.floor(Math.random() * 8) + 1;
        // Display mystery box item
        console.log(`item_${boxItem}.png`);
        mysteryBox.src = `/images/item_${boxItem}.png`;

        // Check box item:
        //      If coin: add 1 coin
        //      If Mushroom: double current coins
        //          If current is 0: add 2 coins
        //      If piranha plant: switch player
        if (boxItem == 5 || boxItem == 2) {
            console.log("switch player")
            // Switch to next player
            switchPlayer();

        } else if (boxItem == 8) {
            console.log("double coin")
            if(currentScore == 0){
                currentScore += 2;
            }else{
                currentScore *= 2;
            }
            console.log(currentScore)
            // current0El.textContent = currentScore;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            console.log("add coin")
            currentScore += 1;
            console.log(currentScore)
            // current0El.textContent = currentScore;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
    }

})

btnCollect.addEventListener('click', function () {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        // Check if playeer's score is >= 20
        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
})

btnReset.addEventListener('click', init)

const switchPlayer = function () {
    // Switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}