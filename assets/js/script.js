const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X'; // Start with player X
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const checkPlayerNames = () => {
    const p1 = document.getElementById("p1").value;
    const p2 = document.getElementById("p2").value;

    if (!p1) {
        alert('Enter Player 1 name');
        return false;
    }
    if (!p2) {
        alert('Enter Player 2 name');
        return false;
    }
    return true;
};

let boardState = Array(9).fill(null);

const handleClick = (e) => {
    if (!checkPlayerNames()) return;

    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] || !gameActive) return;

    // Create an img element
    const img = document.createElement('img');
    img.classList.add('player-image');
    
    // Set the image source based on the current player
    if (currentPlayer === 'X') {
        img.src = 'assets/img/cross.png' // Path to cross image
    } else {
        img.src = 'assets/img/circle.png'; // Path to circle image
    }

    cell.appendChild(img); // Append the image to the cell
    boardState[cellIndex] = currentPlayer;


    if (checkWin(currentPlayer)) {
        let p1=document.getElementById("p1").value;
        let p2=document.getElementById("p2").value;
        // alert(currentPlayer)
        const winnerName = currentPlayer === 'X' ? p1 : p2;
        statusDisplay.style.display='flex';
        statusDisplay.textContent = `${winnerName} Wins!`;
        gameActive = false;


    } else if (boardState.every(cell => cell)) {
        statusDisplay.style.display = 'flex';
        statusDisplay.textContent = `It's a Tie!`;
        gameActive = false;

    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
};

const checkWin = (player) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === player;
        });
    });
};

const restartGame = () => {
    boardState = Array(9).fill(null);
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear cell content
    });
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player X's Turn`;
    statusDisplay.style.display='none';
    document.getElementById("p1").value='';
    document.getElementById("p2").value='';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

