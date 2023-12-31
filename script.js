const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartBTN = document.getElementById('restartButton');
let circleTurn;


// restart button click event
restartBTN.addEventListener('click', startGame );


// function to create the first hover class
startGame();
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true} )
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
};

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // Place the Mark
    placeMark(cell, currentClass);

    // Check for win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true)
    } else {
    // Switch Turns
    swapTurns();
    };
    function checkWin(currentClass) {
        return WINNING_COMBINATION.some(comination => {
            return comination.every(index => {
                return cellElements[index].classList.contains(currentClass)
            } )
        })
    };
    // Check for Draw
    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = "Draw! "
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's" } Wins!`
        }
        winningMessageElement.classList.add('show');
    }
    function isDraw() {
        return [...cellElements].every(cell => {
            return  cell.classList.contains(X_CLASS) || 
                    cell.classList.contains(CIRCLE_CLASS)
        })
    }

    // add hover States
    setBoardHoverClass();
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}