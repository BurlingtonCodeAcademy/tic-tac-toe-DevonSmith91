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
let usedCellArray = []

/*------------Win Condition Object-------------------*/
//object of all winning conditions
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
// function to switch from player one to player two
function switchPlayer() {
    if (whoseTurnIsIt.textContent === playerOne) {
        return playerTwo
    } else if (whoseTurnIsIt.textContent === playerTwo) {
        return playerOne
    }
}
// change the css of the winning array
function markWinner(winningArray) {
    winningArray.forEach(function (winningCell) {
        winningCell.className = 'winning'
    })
}
// testing to see who is the winner!
function declareWinner() {
    // for loop running through all winning combinations
    for (let combo of Object.values(winCondition)) {
        if (combo[0].textContent === '') {
            
        } 
        // if winning combination is hit, announce winner, stop clock, change colors of winner and removes the ability to click more.
        else if (combo[0].textContent === combo[1].textContent && combo[0].textContent === combo[2].textContent) {
            winnerTitle.textContent = 'The Winner is: ' + whoseTurnIsIt.textContent + '!'
            playerTurnDiv.hidden = true;
            clearInterval(secondCounter)
            markWinner(combo)
            stopPlay(cellArray)
            
        }
    }   drawCondition()
}
// function to find draw condition
function drawCondition(){
    if (usedCellArray.length === 9 && !winnerTitle.textContent.includes('The Winner is: ')) {
        winnerTitle.textContent = 'It looks like a Draw!!'
        playerTurnDiv.hidden = true;
        clearInterval(secondCounter)
        stopPlay(cellArray)
        markWinner(usedCellArray)
    } else{

    }
}

// Giving the ability to click on any square and fill it, starting timer
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
// removing the ability to click on any squares
function stopPlay(cellArray) {
    cellArray.forEach(function (cell) {
        cell.removeEventListener('click', fillSquare)
    })
}
// removing the ability to click on already filled squares
function removeFillSquare(event) {
    event.target.removeEventListener('click', fillSquare)
}

// function for filling a square in 1 and 2 player games.
function fillSquare(event) {
    if (whoseTurnIsIt.textContent === playerOne) {
        // Loop that will stop the human player from overwriting a Computer guess
        while (whoseTurnIsIt.textContent === playerOne) {
            if (event.target.textContent === '') {
                usedCellArray.push(event.target)
                console.log(usedCellArray)
                event.target.textContent = 'X'
                break;
            } else {
                return whoseTurnIsIt.textContent === playerOne
            }
        }
        // when the game knows it's a computers turn and to run the computer function
        if (whoseTurnIsIt.textContent === playerOne && playerTwo === 'Computer') {
            declareWinner()
            computer()
            whoseTurnIsIt.textContent = switchPlayer()
            return
        }
    // for the Two player game, player two places 'Os'
    } else if (whoseTurnIsIt.textContent === playerTwo) {
        usedCellArray.push(event.target)
        event.target.textContent = 'O'
    }
    // declaring winner, switting player turn, removing the ability to click on already filled squares (two player game)
    declareWinner()
    whoseTurnIsIt.textContent = switchPlayer()
    removeFillSquare(event)
}

// seconds timer
function incrementSeconds() {
    seconds += 1
    if (seconds < 10) {
        gameTimer.textContent = '0' + seconds
    } else {
        gameTimer.textContent = seconds
    }
}

// Computer guess function
function computer() {
    if (winnerTitle.textContent !== '') {
    }
    if (usedCellArray.length === 9 && !winnerTitle.textContent.includes('The Winner is: ')) {
        winnerTitle.textContent = 'It looks like a Draw!!'
        playerTurnDiv.hidden = true;
        clearInterval(secondCounter)
        stopPlay(cellArray)
        markWinner(usedCellArray)
        return
    }
    else if (playerTwo === 'Computer') {
        // having the computer guess randomly from all options, if it's guess is already filled it will guess again.
        let compPick = cellArray[Math.floor(Math.random() * cellArray.length)]
        while (compPick.textContent !== '') {
            compPick = cellArray[Math.floor(Math.random() * cellArray.length)]
            console.log(compPick)
            
        }
        
        usedCellArray.push(compPick)
        compPick.textContent = 'O'
        declareWinner()
        whoseTurnIsIt.textContent = switchPlayer()
        console.log(compPick)
    }
}


/*--------------Event Listener Functions--------------*/
// One player start button functionality
onePlayerStart.addEventListener('click',
    function () {
        playerInputDiv.hidden = false;
        acceptPlayerNameOne.hidden = false;
        acceptPlayerNameTwo.hidden = true
        onePlayerStart.disabled = true;
        twoPlayerStart.disabled = true;
        // Event listener for accepting player name.
        acceptPlayerNameOne.addEventListener('click',
            function () {
                if (playerName.value === '') {
                    playerOne = 'X'
                    acceptPlayerNameTwo.hidden = true;
                    acceptPlayerNameOne.hidden = true;
                    startPlay(cellArray)
                    playerTwo = 'Computer'
                } else {
                    playerOne = playerName.value
                    acceptPlayerNameTwo.hidden = true;
                    acceptPlayerNameOne.hidden = true;
                    startPlay(cellArray)
                    playerTwo = 'Computer'
                }
            })

    })

// Two player start button functionality
twoPlayerStart.addEventListener('click',
    function () {
        playerInputDiv.hidden = false
        acceptPlayerNameTwo.hidden = true
        acceptPlayerNameOne.hidden = false
        onePlayerStart.disabled = true;
        twoPlayerStart.disabled = true;
        //event listener for plugging in first player name and giving prompt for second player input
        acceptPlayerNameOne.addEventListener('click',
            function () {
                if (playerName.value === '') {
                    playerOne = 'X'
                    playerName.value = ''
                    playerInputOption.textContent = 'Two'
                    acceptPlayerNameTwo.hidden = false
                    acceptPlayerNameOne.hidden = true
                } else {
                    playerOne = playerName.value
                    playerName.value = ''
                    playerInputOption.textContent = 'Two'
                    acceptPlayerNameTwo.hidden = false
                    acceptPlayerNameOne.hidden = true
                }

            })
        //Event Listener for plugging in second player name
        acceptPlayerNameTwo.addEventListener('click',
            function () {
                if (playerName.value === '') {
                    playerTwo = 'O'
                    startPlay(cellArray)
                } else {
                    playerTwo = playerName.value
                    startPlay(cellArray)
                }
            })
    })

// restart button functionality
restartGame.addEventListener('click',
    function () {
        playerInputOption.textContent = ''
        if (onePlayerStart.disabled === true) {
            onePlayerStart.disabled = false;
            twoPlayerStart.disabled = false;
            playerTurnDiv.hidden = true;
            playerInputDiv.hidden = true;
            timerDiv.hidden = true
            // set cells to empty strings
            cellArray.forEach(function (cellText) {
                cellText.textContent = ''
            })
            // set css decorations to blank
            cellArray.forEach(function (cellClass) {
                cellClass.className = ''
            })
            // remove ability to click on cells
            removeFillSquare(event)
            // restart timer
            clearInterval(secondCounter)
            seconds = 00
            gameTimer.textContent = seconds
            whoseTurnIsIt.textContent = ''
            winnerTitle.textContent = ''
            playerName.value = ''
            usedCellArray = []
        }
        // if game isnt started, clicking this will do nothing
        else { }
    })




/*------------------Things That Start Hidden-----------------------*/
playerTurnDiv.hidden = true
playerInputDiv.hidden = true
timerDiv.hidden = true
