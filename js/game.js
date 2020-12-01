'use strict'
const WALL = '🚧'
const FOOD = '⚽'
const EMPTY = ' ';
const CHERRY = '🏈';
const POWER_FOOD = '🔮'


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('Game Started')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    var elModal = document.querySelector('.modal')
    elModal.style.display = "none";
    gGame.score = 0;
    gGame.isOn = true
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 4 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = CHERRY;
    board[1][8] = CHERRY;
    board[8][1] = CHERRY;
    board[8][8] = CHERRY;
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}


function gameOver() {
    // console.log('Game Over');
    var elModal = document.querySelector('.modal')
    elModal.style.display = "block";
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
}



function gameWon() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === FOOD) return false
        }
    }
    if (gGame.score > 0) {
        // var elVicoryModal = document.querySelector('.vitory-modal');
        // elVicoryModal.hidden = false;
        console.log('You won!');
        gGame.isOn = false;
        clearInterval(gIntervalGhosts);
    }
}