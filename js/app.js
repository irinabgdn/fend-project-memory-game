/*
 * Define variables
 */
const iconList = ["fa fa-diamond", "fa fa-diamond", "fa fa-bolt","fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-anchor", "fa fa-anchor", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb", "fa fa-paper-plane-o", "fa fa-paper-plane-o"]

const cardsContainer = document.querySelector('.deck');

let openedCards = [];
let matchedCards = [];


function initGame() {
    // Shuffle iconList array
    shuffle(iconList);
    
    // Create cards and show them in HTML
    for (i = 0; i < iconList.length; i++) {
        const card = document.createElement('li');
        card.classList.add("card");
        card.innerHTML = `<i class=" ${iconList[i]} "></i>`;
        cardsContainer.appendChild(card);

        // Add click event to each card
        flip(card);
    }
}


// Cards click event
function flip(card) {
    
        card.addEventListener("click", function() {
            // Define local variables
            let currentCard = this;
            let previousCard = openedCards[0];
            
            
            // Check if there is an existing opened card
            if (openedCards.length === 1) {

                currentCard.classList.add("open", "show", "disable");
                openedCards.push(this);
                
                // Compare cards
                compareCards(currentCard, previousCard);
            
            } else {
                // If there is no opened card, add the current card to the opened cards array
                currentCard.classList.add("open", "show", "disable");
                openedCards.push(this);
            }
        });
}


// Compare the two opened cards
function compareCards(currentCard, previousCard) {

        if (currentCard.innerHTML === previousCard.innerHTML) {

            // If cards match, change style 
            currentCard.classList.add("match");
            previousCard.classList.add("match");

            // Add cards to the matchedCards array
            matchedCards.push(currentCard, previousCard);

            // Reset opened cards array
            openedCards = [];

            // Check if the game is over
            checkGameStatus();

        } else {
            // Wait 400ms until cards flip backward
            setTimeout(function() {

                // If cards don't match, hide current card
                currentCard.classList.remove("open", "show", "disable");
                previousCard.classList.remove("open", "show", "disable");

                // Reset opened cards array
                openedCards = []; 

            }, 400)                    
        }

        // Add new move
        addMove();
}


// Check if game is over or not
function checkGameStatus() {
    if (matchedCards.length === iconList.length) {
        alert("GAME OVER");
    } 
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Show number of moves done by the current moment
const movesContainer = document.querySelector(".moves");
movesContainer.innerHTML = 0;
let moves = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set rating
    rating();
}


// Add rating depending on the number of moves done my the current moment
const ratingContainer = document.querySelector(".stars");
const star = '<li><i class="fa fa-star"></i></li>';
let starsString = star + star + star;
ratingContainer.innerHTML = starsString;

function rating() {
    switch (moves) {
        case 11:
            starsString = star + star;
            ratingContainer.innerHTML = starsString;
            break;
        case 31:
            starsString = star;
            ratingContainer.innerHTML = starsString;
            break;
    }
}


// Restart button event
const restartButton = document.querySelector(".restart");

restartButton.addEventListener("click", function(){
    // Delete all cards
    cardsContainer.innerHTML = "";

    // Start new game
    initGame();

    // Reset related variables
    matchedCards = [];

    moves = 0;
    movesContainer.innerHTML = moves;
    
    starsString = star + star + star;
    ratingContainer.innerHTML = starsString;
});



// START GAME
initGame();
