/*----------------Variables----------------*/
let onePlayerStart = document.getElementById('onePlayer')
let twoPlayerStart = document.getElementById('twoPlayer')
let restartGame = document.getElementById('restart')
let playerTurnDiv = document.getElementById('playerTurn')
let playerInputDiv = document.getElementById('playerInput')
let whoseTurnIsIt = document.getElementById('turnStatus')
let winnerTitle = document.getElementById('winner')
let playerName = document.getElementById('playerName')
let acceptPlayerNameOne = document.getElementById('acceptOne')
let acceptPlayerNameTwo = document.getElementById('acceptTwo')
let playerInputOption = document.getElementById('whichPlayer')

let seconds = 0
let gameTimer = document.getElementById('timer')
let timerDiv = document.getElementById('timerDiv')

let playerOne = 'X'
let playerTwo = 'O'
let cellOne = document.getElementById('cell-1')
let cellTwo = document.getElementById('cell-2')
let cellThree = document.getElementById('cell-3')
let cellFour = document.getElementById('cell-4')
let cellFive = document.getElementById('cell-5')
let cellSix = document.getElementById('cell-6')
let cellSeven = document.getElementById('cell-7')
let cellEight = document.getElementById('cell-8')
let cellNine = document.getElementById('cell-9')
let cellArray = [cellOne, cellTwo, cellThree, cellFour, cellFive, cellSix, cellSeven, cellEight, cellNine]

/*------------Win Condition Object-------------------*/

let winCondition = {
    rowOne: [cellOne, cellTwo, cellThree],
    rowTwo: [cellFour, cellFive, cellSix],
    rowThree: [cellSeven, cellEight, cellNine],
    columnOne: [cellOne, cellFour, cellSeven],
    columnTwo: [cellTwo, cellFive, cellEight],
    columnThree: [cellThree, cellSix, cellNine],
    forwardSlash: [cellOne, cellFive, cellNine],
    backSlash: [cellSeven, cellFive, cellThree]
}

/*-----------------Functions-------------------------*/

function switchPlayer() {
    if (whoseTurnIsIt.textContent === playerOne) {
        return playerTwo
    } else if (whoseTurnIsIt.textContent === playerTwo) {
        return playerOne
    }
}

function markWinner(winningArray) {
    winningArray.forEach(function (winningCell) {
        winningCell.className = 'winning'
    })
}

function stopPlay(cellArray) {
    cellArray.forEach(function (cell) {
        cell.removeEventListener('click', fillSquare)
    })
}

function removeFillSquare(event) {
    event.target.removeEventListener('click', fillSquare)
}

function fillSquare(event) {
    if (whoseTurnIsIt.textContent === playerOne) {
        event.target.textContent = 'X'
    } else {
        event.target.textContent = 'O'
    }
    for (let combo of Object.values(winCondition)) {
        if (combo[0].textContent === '') {

        } else if (combo[0].textContent === combo[1].textContent && combo[0].textContent === combo[2].textContent) {

            winnerTitle.textContent = 'The Winner is: ' + whoseTurnIsIt.textContent + '!'
            clearInterval(secondCounter)
            markWinner(combo)
            stopPlay(cellArray)
        }
    }
    whoseTurnIsIt.textContent = switchPlayer()
    removeFillSquare(event)
}

function incrementSeconds(){
    if(twoPlayerStart.disabled === true) {
        seconds += 1
        gameTimer.textContent = seconds
    } else {
        seconds = 0
        gameTimer.textContent = seconds
    }

}




/*--------------Event Listener Functions--------------*/


twoPlayerStart.addEventListener('click',
    function () {
        playerInputDiv.hidden = false
        acceptPlayerNameTwo.hidden = true
        acceptPlayerNameOne.hidden = false
        onePlayerStart.disabled = true;
        twoPlayerStart.disabled = true;
    })

acceptPlayerNameOne.addEventListener('click',
    function () {
        playerInputOption.textContent = 'Two'
        playerOne = playerName.value
        console.log(playerOne)
        playerName.value = ''
        acceptPlayerNameTwo.hidden = false
        acceptPlayerNameOne.hidden = true

    })

acceptPlayerNameTwo.addEventListener('click',
    function () {
        playerTwo = playerName.value
        cellArray.forEach(function (eachCell) {
            eachCell.addEventListener('click', fillSquare)
        })
        console.log(playerTwo)
        playerTurnDiv.hidden = false
        playerInputDiv.hidden = true
        timerDiv.hidden = false
        secondCounter = setInterval(incrementSeconds, 1000)
        whoseTurnIsIt.textContent = playerOne
    })


restartGame.addEventListener('click',
    function () {
        onePlayerStart.disabled = false;
        twoPlayerStart.disabled = false;
        playerTurnDiv.hidden = true;
        playerInputDiv.hidden = true;
        timerDiv.hidden = true
        cellArray.forEach(function (cellText) {
            cellText.textContent = ''
        })
        cellArray.forEach(function (cellClass) {
            cellClass.className = ''
        })
        removeFillSquare(event)
        seconds = 0
        gameTimer.textContent = seconds
        whoseTurnIsIt.textContent = ''
        winnerTitle.textContent = ''
        playerName.value = ''
    })




/*---------------------------????-----------------------------*/
playerTurnDiv.hidden = true
playerInputDiv.hidden = true
timerDiv.hidden = true






// function sayMagicWord(event) {
//         if (event.target === prestoButton) { //event.target will focus on what is being clicked on!
//                 alert('Change-o!');
//             } else if (event.target === abraButton) {
//                 alert('Cadabra!');
//             } else {
//                 alert('Shazam!');
//             }
//             console.log({ event }); // for debugging
//         }

//         prestoButton.addEventListener('click', function(event){
//             alert(event.target.textContent)
//         })
//         abraButton.addEventListener('click', sayMagicWord)
//         genieButton.addEventListener('click', sayMagicWord)



//set interval is a call back function to keep in mind when starting to create my timer for the game.