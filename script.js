const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameInProgress = true;
let turn = new Audio('ting.mp3');
let gameOver = new Audio('over.mp3');
let turnText = document.getElementById('info');
const gf = document.querySelector('.gameover');
const line = document.querySelector('.win-line');
function makeMove(index) {
    
    if (gameInProgress && !gameBoard[index]) {
        
        gameBoard[index] = currentPlayer;
        turn.play();
        cells[index].textContent = currentPlayer;
        
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameOver.play();
            animateWinningLine();
            gf.style.display = 'block';
            gameInProgress = false;
        } else if (checkDraw()) {
            alert("It's a draw!");
            gameOver.play();
            gf.style.display = 'block';
            gameInProgress = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnText.innerText = currentPlayer;
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameInProgress = true;
    currentPlayer = 'X';
    turnText.innerText = currentPlayer;
    cells.forEach(cell => cell.textContent = '');
    gf.style.display = 'none';
    
    line.style.display = 'none';
}
function animateWinningLine() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const [a, b, c] = winPatterns.find(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });

    line.style.display = 'block';

    const cellA = cells[a].getBoundingClientRect();
    const cellC = cells[c].getBoundingClientRect();
    const board = document.getElementById('board').getBoundingClientRect();

    const centerX = (cellA.left + cellC.right) / 2;
    const centerY = (cellA.top + cellC.bottom) / 2;

    if (a === 0 && c === 8) {
        line.style.transform = 'rotate(45deg)';
    } else if (a === 2 && c === 6) {
        line.style.transform = 'rotate(-45deg)';
    } else if (a === 1 && c === 7) {
        line.style.transform = 'rotate(90deg)';
    } else if (a === 3 && c === 5) {
        line.style.transform = 'rotate(0deg)';
    
    } else if (a === 0 && c === 6) {
        line.style.transform = 'rotate(90deg)';
    
    } else if (a === 2 && c === 8) {
        line.style.transform = 'rotate(90deg)';
    } 
    else {
        // For other combinations, set a default horizontal line
        line.style.transform = 'rotate(0deg)';
    }

    line.style.width = `${Math.sqrt(Math.pow(cellA.left - cellC.left, 2) + Math.pow(cellA.top - cellC.top, 2))}px`;
    line.style.left = `${centerX - line.offsetWidth / 2}px`;
    line.style.top = `${centerY - line.offsetHeight / 2}px`;
    
}

