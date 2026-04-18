let cardsEl = document.getElementById("cards-el")
let sumEl = document.getElementById("sum-el")
let messageEl = document.getElementById("message-el") // Fixed variable name
let timerEl = document.getElementById("timer-display") // New for the clock

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false

// Clock variables
let timeLeft = 60
let timerInterval

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber === 1) {
        return 11
    } else if (randomNumber > 10) {
        return 10
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false // Reset state for new games
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    
    // Timer Logic: Reset and Start
    resetTimer()
    renderGame()
}

function resetTimer() {
    timeLeft = 60
    clearInterval(timerInterval) // Stop any old timers
    timerEl.textContent = "01:00"
    
    timerInterval = setInterval(function() {
        timeLeft--
        
        // Formatting the display (adding the leading zero)
        let displaySeconds = timeLeft < 10 ? "0" + timeLeft : timeLeft
        timerEl.textContent = "00:" + displaySeconds

        if (timeLeft <= 0) {
            clearInterval(timerInterval)
            isAlive = false
            messageEl.textContent = "Times up! You lose!"
        }
    }, 1000)
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    
    if (sum <= 20) {
        messageEl.textContent = "Do you want to draw a new card?"
    } else if (sum === 21) {
        messageEl.textContent = "Wohoo! You've got Blackjack!"
        hasBlackJack = true
        clearInterval(timerInterval) // Stop the clock on win!
    } else {
        messageEl.textContent = "You're out of the game!"
        isAlive = false
        clearInterval(timerInterval) // Stop the clock on loss!
    }
}

function newCard() {
    // Only allow a new card if the player is still in and hasn't won yet
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}