/*
 * Create a list that holds all of your cards
 */

let cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const deck = document.querySelector('.deck');
//const start= prompt("Ready to start the game?", "Of course");
let twoOpenCards = [];
let matchedCards = [];
const movesCounter = document.querySelector('.moves');
let moves = 1;
var timer = new Timer();
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
const restart = document.getElementById('restart');
const modal1 = document.querySelector('.modal1');
const modal2 = document.querySelector('.modal2');
const modal3 = document.querySelector('.modal3');
const ready = document.getElementById('ready');
const win = document.getElementById('win');
//const yes = document.querySelectorAll('.yes');
const bye = document.getElementById('bye');
const byeimg = document.getElementById('byeimg');
let winText = document.getElementById('winText');
let starRatingText = '';
let stars = document.querySelectorAll('.stars');
let one = document.querySelector('.one');
let two = document.querySelector('.two');
let three = document.querySelector('.three');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Shuffle function from http://stackoverflow.com/a/2450976
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

//display initial modal once the window is open
$(window).on('load', function(e){
    modal1.style.display = "block";
});

//timer event listener from https://github.com/albert-gonzalez/easytimer.js
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
    modal1.style.display = "none";
    modal2.style.display = "none";
    let cardsHTML = shuffle(cards).map(function(card) {
        return produceCard(card);
    });
    matchedCards = [];
    movesCounter.innerText = 0;
    moves = 1;
    deck.innerHTML = cardsHTML.join('');
    timer.start({precision: 'seconds'});
    one.removeAttribute('style');
    two.removeAttribute('style');
    three.removeAttribute('style');
    $('.win').empty();
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

//star rating once all cards match

function rating() {
    for (const star of stars) {
        if (movesCounter.innerText <= 19 && minutes.innerText <= 1) {
            one.style.color = 'orange';
            two.style.color = 'orange';
            three.style.color = 'orange';
            starRatingText = '3 out of 3 stars';
        } else if (movesCounter.innerText <= 30 && minutes.innerText <= 2) {
            one.style.color = 'orange';
            two.style.color = 'orange';
            starRatingText = '2 out of 3 stars';
        } else {
            one.style.color = 'orange';
            starRatingText = '1 out of 3 stars';
        }
    }
}

//executing the game process
function playGame() {
    let clickedCard = document.querySelectorAll('.card');
    for (const c of clickedCard) {
        c.addEventListener('click', function(e) {
            e.stopImmediatePropagation();
            if (c.classList.contains('open', 'show')) {
                c.removeEventListener('click');
            }
            c.classList.add('open', 'show');
            twoOpenCards.push(c);
            if (twoOpenCards.length == 2) {
                //keep open if match
                if (twoOpenCards[0].dataset.card == twoOpenCards[1].dataset.card) {
                    twoOpenCards[0].classList.add('open', 'match', 'show');
                    twoOpenCards[1].classList.add('open', 'match', 'show');
                }
                //hide if no match
                setTimeout(function() {
                    twoOpenCards.forEach(function(c) {
                        c.classList.remove('open', 'show');
                        twoOpenCards = [];
                    });
                }, 500);
                movesCounter.innerText = moves;
                moves+=1;
                //all cards matched, call gameWon
                if (c.classList.contains('match')) {
                    matchedCards.push(c);
                }
                setTimeout(function() {
                    if (matchedCards.length == 8 && twoOpenCards.length == 2) {
                        return gameWon();
                    }
                }, 200);
            }
        });
    }
}

//gameWon stops the timer, displays a message and score, updates star rating

let minutesText = '';
const winClass = document.querySelector('.win');

function gameWon() {

    timer.stop();
    rating();
    $('.stars').clone().appendTo('.win');
    modal2.style.display = "block";
    if (minutes.innerText == 1) {
        minutesText = "minute";
    } else if (minutes.innerText == 0) {
        minutesText = '';
    } else {
        minutesText = "minutes";
    }
    //document.getElementById("starRating").innerHTML = starRating;
    if (minutes.innerText == 0) {
        winText.innerText = "You cleared the board in " + seconds.innerText + " seconds and " + movesCounter.innerText + " moves. Your star rating is " + starRatingText + ":";
    } else {
        winText.innerText = "You cleared the board in " + minutes.innerText + " " + minutesText + " "  + seconds.innerText + " seconds and " + movesCounter.innerText + " moves. Your star rating is " + starRatingText + ":";
    }

}


//if restart button is clicked, the window reloads to ask the game start question
restart.addEventListener('click', function(e) {
    window.location.reload();
});

//if button no is clicked, display Bye picture
function no() {
    modal3.style.display = "block";
}
//if picture or window is cliked while the Bye pic is up, take the user to the game board
window.onclick = function(event) {
    if (event.target == bye || event.target == modal3 || event.target == byeimg) {
        modal3.style.display = "none";
        modal1.style.display = "none";
    }
}
