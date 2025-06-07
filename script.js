//Gameboard IIFE
const gameBoard = (() => {
  let gameBoardArr = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => {
    return gameBoardArr;
  };

  return { getBoard };
})();

//Player IIFE & Factory
const playerModule = (token, name) => {
  let playerToken = token;
  let playerName = name;
  let score = 0;

  const getPlayerToken = () => playerToken;
  const getPlayerName = () => playerName;
  const incrementScore = () => score++;

  return { getPlayerToken, getPlayerName, incrementScore };
};

//DOM Logic
const domLogic = (() => {
  const board = gameBoard.getBoard();
  const boardContainer = document.querySelector('.game-board');
  const startGame = document.querySelector('.start-game');
  const helperText = document.querySelector('.helper-text');
  const themeToggleBtn = document.querySelector('.theme-toggle');
  const playerOneName = document.querySelector('.player-one');
  const playerTwoName = document.querySelector('.player-two');
  const playerOneScore = document.querySelector('player-one-score');
  const playerTwoScore = document.querySelector('.player-two-score');

  const instantiateDomBoard = () => {
    let boardPosition = 0;

    for (let i = 0; i < board.length; i++) {
      const boardGridCell = document.createElement('div');
      boardGridCell.classList.add(
        'board-grid-cell',
        `board-grid-pos-${boardPosition}`
      );

      boardGridCell.dataset.indexNumber = boardPosition;
      boardContainer.appendChild(boardGridCell);
      boardPosition++;
    }

    const boardCell = [...document.querySelectorAll('.board-grid-cell')];

    boardCell.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        gameController.makeMove(e.target.dataset.indexNumber, e.target);
      });
    });
  };

  const getHelperText = () => {
    return helperText;
  };

  const getStartBtn = () => {
    return startGame;
  };

  const getBoardCells = () => {
    const boardCells = document.querySelectorAll('.board-grid-cell');
    return boardCells;
  };

  const setTheme = () => {
    const root = document.documentElement;
    let newTheme = root.className === 'dark' ? 'light' : 'dark';

    root.className = newTheme;

    newTheme.toUpperCase();
    console.log(newTheme);

    newTheme === 'dark'
      ? (themeToggleBtn.textContent = `Light Mode`)
      : (themeToggleBtn.textContent = `Dark Mode`);
  };

  //Event Listeners
  startGame.addEventListener('click', () => {
    gameController.startGame();
  });

  themeToggleBtn.addEventListener('click', setTheme);

  return { getHelperText, instantiateDomBoard, getStartBtn, getBoardCells };
})();

//Gameflow
const gameController = (() => {
  const board = gameBoard.getBoard();
  let player1;
  let player2;
  let round = 0;
  const helperText = domLogic.getHelperText();
  const startBtn = domLogic.getStartBtn();
  let gameStarted = false;

  const startGame = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
    let boardCells = domLogic.getBoardCells();
    boardCells.forEach((cell) => (cell.textContent = '')); // clear board visually

    player1 = playerModule('X');
    player2 = playerModule('O');

    gameStarted = true;
    round = 0;

    helperText.textContent = `X's Turn`;
    startBtn.textContent = 'Restart Game';
  };

  const makeMove = (position, gridDomElement) => {
    if (!gameStarted) return;
    if (board[position].length > 0) return; // prevent double moves

    const playerOneToken = player1.getPlayerToken();
    const playerTwoToken = player2.getPlayerToken();
    const token = round % 2 === 0 ? playerOneToken : playerTwoToken;

    board[position] = token;
    gridDomElement.textContent = token;

    if (checkWinner(token, round)) {
      gameStarted = false;
      startBtn.textContent = 'Restart Game';
      return;
    }

    round++;
    helperText.textContent = token === 'X' ? "O's Turn" : "X's Turn";
  };

  const checkWinner = (token, round) => {
    const board = gameBoard.getBoard();

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningConditions) {
      if (board[a] === token && board[b] === token && board[c] === token) {
        helperText.textContent = `${token} is the winner!`;
        return true; // Winner found
      }
    }

    if (round === 8) {
      helperText.textContent = 'Tie! Start new game';
      return true; // Game ended in tie
    }

    return false; // Game is still going
  };

  return { startGame, makeMove, checkWinner };
})();

domLogic.instantiateDomBoard();
