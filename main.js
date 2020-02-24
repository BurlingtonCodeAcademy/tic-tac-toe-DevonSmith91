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
let gameTimer = document.getElementById('timer')
let timerDiv = document.getElementById('timerDiv')
let seconds = 0
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

function declareWinner(){
    for (let combo of Object.values(winCondition)) {
        if (combo[0].textContent === '') {

        } else if (combo[0].textContent === combo[1].textContent && combo[0].textContent === combo[2].textContent) {

            winnerTitle.textContent = 'The Winner is: ' + whoseTurnIsIt.textContent + '!'
            playerTurnDiv.hidden = true;
            clearInterval(secondCounter)
            markWinner(combo)
            stopPlay(cellArray)
        } else {
            return
        }
    }
}

function drawCondition(drawArray) {

}

function startPlay(cellArray) {
    cellArray.forEach(function (eachCell) {
        eachCell.addEventListener('click', fillSquare)
    })
    playerTurnDiv.hidden = false
    playerInputDiv.hidden = true
    timerDiv.hidden = false
    secondCounter = setInterval(incrementSeconds, 1000)
    whoseTurnIsIt.textContent = playerOne
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
        if (whoseTurnIsIt.textContent === playerOne && playerTwo === 'Computer') {
            computer()
            whoseTurnIsIt.textContent = switchPlayer()
        }
    } else if (whoseTurnIsIt.textContent === playerTwo) {
        event.target.textContent = 'O'
    }
    declareWinner()
    whoseTurnIsIt.textContent = switchPlayer()
    removeFillSquare(event)
}

function incrementSeconds() {
    seconds += 1
    if (seconds < 10) {
        gameTimer.textContent = '0' + seconds
    } else {
        gameTimer.textContent = seconds
    }
}

function computer() {
    if (playerTwo === 'Computer') {
        let compPick = cellArray[Math.floor(Math.random() * cellArray.length)]
        while (compPick.textContent !== '') {
            compPick = cellArray[Math.floor(Math.random() * cellArray.length)]
            console.log(compPick)
        }
        compPick.textContent = 'O'
        switchPlayer()
        console.log(compPick)
    }
}


/*--------------Event Listener Functions--------------*/

onePlayerStart.addEventListener('click',
    function () {
        playerInputDiv.hidden = false;
        acceptPlayerNameOne.hidden = false;
        acceptPlayerNameTwo.hidden = true
        onePlayerStart.disabled = true;
        twoPlayerStart.disabled = true;
        acceptPlayerNameOne.addEventListener('click',
            function () {
                playerInputOption.textContent = 'Two'
                acceptPlayerNameTwo.hidden = true;
                acceptPlayerNameOne.hidden = true;
                startPlay(cellArray)
                playerTwo = 'Computer'
            })
        
    })

twoPlayerStart.addEventListener('click',
    function () {
        playerInputDiv.hidden = false
        acceptPlayerNameTwo.hidden = true
        acceptPlayerNameOne.hidden = false
        onePlayerStart.disabled = true;
        twoPlayerStart.disabled = true;
        acceptPlayerNameOne.addEventListener('click',
            function () {
                playerInputOption.textContent = 'Two'
                acceptPlayerNameTwo.hidden = false
                acceptPlayerNameOne.hidden = true
            })
        acceptPlayerNameTwo.addEventListener('click',
            function () {
                playerTwo = playerName.value
                startPlay(cellArray)
            })
    })

acceptPlayerNameOne.addEventListener('click',
    function () {
        playerInputOption.textContent = 'Two'
        playerOne = playerName.value
        playerName.value = ''
        acceptPlayerNameTwo.hidden = false
        acceptPlayerNameOne.hidden = true
        acceptPlayerNameOne.addEventListener('click',
            function () {
                console.log(playerOne + 'acceptPlayerNameOne')
                playerInputOption.textContent = 'Two'
                acceptPlayerNameTwo.hidden = false
                acceptPlayerNameOne.hidden = true
                console.log(playerOne + 'bottom of accept player one')
            })

    })




restartGame.addEventListener('click',
    function () {
        playerInputOption.textContent = ''
        if (onePlayerStart.disabled === true) {
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
            clearInterval(secondCounter)
            whoseTurnIsIt.textContent = ''
            winnerTitle.textContent = ''
            playerName.value = ''
        } else { }
    })




/*---------------------------????-----------------------------*/
playerTurnDiv.hidden = true
playerInputDiv.hidden = true
timerDiv.hidden = true
