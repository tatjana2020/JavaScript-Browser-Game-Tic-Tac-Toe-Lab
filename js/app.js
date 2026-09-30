/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],/*horizontal row*/
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],/*vertical column*/
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], /*diagonal \ win*/
  [2, 4, 6], /*diagonal / win*/
];


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'O';
  winner = false;
  tie = false;
  messageEl.textContent = '';
  updateBoard();
}
 
function updateBoard() {
  board.forEach((IksOks , index) => {
    squareEls[index].textContent = IksOks;
  });
}

function updateMessage() {
  if (winner === false && tie === false) {
    messageEl.textContent = `Played ${turn}`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = 'TIE(Cat’s game)';
  } else {
    messageEl.textContent = `Congratulations, the player ${turn} won!`;
  }
}
 
function handleClick(event) {
  const squareIndex = Number(event.target.id);
  if (board[squareIndex] === 'X' || board[squareIndex] === 'O') return;
  if (winner) return;
  turn = (turn === 'X') ? 'O' : 'X';
  board[squareIndex] = turn;
  checkForWinner();
  checkForTie();
  updateBoard();
  updateMessage();
}
 
function checkForWinner() {
   winningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
    }
  });
}
 
function checkForTie() {
  if (winner) return;
  if (board.includes('')) {
    tie = false;
  } else {
    tie = true;
  }
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
  square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);
 
init();


