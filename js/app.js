/*
 * Create a list that holds all of your cards
 */

let cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const deck = document.querySelector('.deck');
const start= prompt("Ready to to start the game?", "Yes");
let twoOpenCards = [];
//let timer = document.querySelector('.timer');
const movesCounter = document.querySelector('.moves');
let moves = 1;
var timer = new Timer();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


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
//browser prompt and call the game start
for (const card of cards) {
    if (start === null) {
        alert("See Ya!");
        break;
    } else {
        startGame();
    }
}

timer.addEventListener('secondsUpdated', function (e) {
    $('#timer .minutes').html(timer.getTimeValues().minutes);
    $('#timer .seconds').html(timer.getTimeValues().seconds);
});

//produce html of each card
function produceCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

//shuffle and display cards, start the timer
function startGame() {
    let cardsHTML = shuffle(cards).map(function(card) {
        return produceCard(card);
    });
    deck.innerHTML = cardsHTML.join('');
    timer.start({precision: 'seconds'});
    playGame();
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function playGame() {
    let clickedCard = document.querySelectorAll('.card');
    for (const c of clickedCard) {
        c.addEventListener('click', function(e) {
            c.classList.add('open', 'show');
            twoOpenCards.push(c);
            if (twoOpenCards.length == 2) {
                setTimeout(function() {
                    twoOpenCards.forEach(function(c) {
                        c.classList.remove('open', 'show');
                        twoOpenCards = [];
                    });
                }, 950);
                movesCounter.innerText = moves;
                moves+=1;
            }
        });
    }
}
