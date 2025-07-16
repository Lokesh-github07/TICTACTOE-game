let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;
let xWins = 0;
let oWins = 0;
let gameMode = 'multiplayer'; // 'multiplayer' or 'computer'
let gameHistory = [];

// 🧠 Start Game
function startGame(mode) {
  gameMode = mode;
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  resetMatch();
}

// 🎮 Player Move
function makeMove(index) {
  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  const cell = document.getElementById(`cell-${index}`);
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

  if (checkWin()) {
    gameActive = false;
    if (currentPlayer === 'X') {
      xWins++;
      document.getElementById('xWins').textContent = xWins;
    } else {
      oWins++;
      document.getElementById('oWins').textContent = oWins;
    }

    // ✅ Add to game history
    gameHistory.push(`${currentPlayer} wins`);

    showPopup(`${currentPlayer} wins the game!`);
    return;
  }

  if (gameState.every(cell => cell !== null)) {
    gameActive = false;
    gameHistory.push("Draw"); // ✅ Add draw to history
    showPopup("Game Draw!");
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  // 👾 Computer Move (if enabled)
  if (gameMode === 'computer' && currentPlayer === 'O' && gameActive) {
    setTimeout(makeComputerMove, 500);
  }
}

// 🤖 Computer Move Logic
function makeComputerMove() {
  const emptyIndices = gameState
    .map((val, idx) => val === null ? idx : null)
    .filter(val => val !== null);

  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex);
}

// 🏆 Check Win
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

// 🔁 Reset Round
function resetBoard() {
  gameState = Array(9).fill(null);
  gameActive = true;
  currentPlayer = 'X';
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  }
}

// 🔄 Reset Match
function resetMatch() {
  xWins = 0;
  oWins = 0;
  document.getElementById('xWins').textContent = '0';
  document.getElementById('oWins').textContent = '0';
  resetBoard();
}

// 💬 Popup
function showPopup(message) {
  const popup = document.getElementById("winPopup");
  const winnerText = document.getElementById("winnerText");
  winnerText.textContent = message;
  popup.style.display = "flex";
}

// ✖ Close Popup
function closePopup() {
  document.getElementById("winPopup").style.display = "none";
}

// 🔁 Play Again
function restartGame() {
  closePopup();
  resetBoard();
}

// 🏠 Go to Home
function returnHome() {
  document.getElementById("game-container").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
  closePopup();
  resetMatch();
}

// ☰ Toggle Menu
function toggleMenu() {
  const menu = document.getElementById("menuDropdown");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// 📜 View Game History
function viewHistory() {
  const popup = document.getElementById("historyPopup");
  const list = document.getElementById("historyList");

  if (gameHistory.length === 0) {
    list.innerHTML = "<p>No games played yet.</p>";
  } else {
    list.innerHTML = gameHistory
      .map((result, index) => `<p>Game ${index + 1}: ${result}</p>`)
      .join('');
  }

  popup.style.display = "flex";
}

// ⬅ Close History Popup
function closeHistory() {
  document.getElementById("historyPopup").style.display = "none";
}
