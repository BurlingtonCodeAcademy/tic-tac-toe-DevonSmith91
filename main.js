/*----------------Variables----------------*/
let startGame = document.getElementById('start')
let restartGame = document.getElementById('restart')
let playerTurn = document.getElementById('turnStatus')
let winnerTitle = document.getElementById('winner')
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
    if (playerTurn.textContent === 'X') {
        return 'O'
    } else if (playerTurn.textContent === 'O') {
        return 'X'
    }
}
function markWinner(winningArray) {
    winningArray.forEach(function(winningCell){
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
    event.target.textContent = playerTurn.textContent
    for (let combo of Object.values(winCondition)) {
        if (combo[0].textContent === '') {
            
        } else if (combo[0].textContent === combo[1].textContent && combo[0].textContent === combo[2].textContent) {

            winnerTitle.textContent = 'The Winner is: ' + playerTurn.textContent + '!'

            markWinner(combo)
            stopPlay(cellArray)
        }
    }
    playerTurn.textContent = switchPlayer()
    removeFillSquare(event)
}

/*--------------Event Listener Functions--------------*/

startGame.addEventListener('click',
    function () {
        startGame.disabled = true;
        cellArray.forEach(function (eachCell) {
            eachCell.addEventListener('click', fillSquare)
        })
        playerTurn.textContent = 'X'

    })

restartGame.addEventListener('click',
    function () {
        startGame.disabled = false;
        cellArray.forEach(function (cellText) {
            cellText.textContent = ''
        })
        cellArray.forEach(function(cellClass){
            cellClass.className = ''
        })
        removeFillSquare(event)
        playerTurn.textContent = ''
        winnerTitle.textContent = ''
    })




/*---------------------Win Condition?---------*/

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