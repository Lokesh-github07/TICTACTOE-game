let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;
let xWins = 0;
let oWins = 0;

function makeMove(index) {
  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  const cell = document.getElementById(`cell-${index}`);
  cell.textContent = currentPlayer;

  // Add neon class
  cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

  if (checkWin()) {
    alert(`${currentPlayer} wins this round!`);
    gameActive = false;

    if (currentPlayer === 'X') {
      xWins++;
      document.getElementById('xWins').textContent = xWins;
    } else {
      oWins++;
      document.getElementById('oWins').textContent = oWins;
    }

    if (xWins === 2 || oWins === 2) {
      document.getElementById('matchWinner').textContent = `🏆 ${currentPlayer} wins the match!`;
    }

    return;
  }

  if (gameState.every(cell => cell !== null)) {
    alert("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => gameState[index] === currentPlayer)
  );
}

function resetBoard() {
  if (xWins === 2 || oWins === 2) {
    alert("Match over! Click 'Reset Match' to start again.");
    return;
  }

  gameState = Array(9).fill(null);
  gameActive = true;
  currentPlayer = 'X';

  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.textContent = '';
    cell.classList.remove('x', 'o'); // Remove neon classes
  }
}

function resetMatch() {
  xWins = 0;
  oWins = 0;
  document.getElementById('xWins').textContent = '0';
  document.getElementById('oWins').textContent = '0';
  document.getElementById('matchWinner').textContent = '–';
  resetBoard();
}
