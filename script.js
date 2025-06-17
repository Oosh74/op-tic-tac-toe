// Gameboard IIFE
const gameBoard = (() => {
  let gameBoardArr = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => {
    return gameBoardArr;
  };

  return { getBoard };
})();

// Player Module
const playerModule = (token) => {
  let playerToken = token;
  let playerName = token;
  let score = 0;

  const getPlayerToken = () => playerToken;
  const incrementScore = () => score++;
  const getScore = () => score;
  const getPlayerName = () => playerName;

  return {
    getPlayerToken,
    getPlayerName,
    incrementScore,
    getScore,
  };
};

// DOM Logic
const domLogic = (() => {
  const board = gameBoard.getBoard();
  const boardContainer = document.querySelector('.game-board');
  const startGame = document.querySelector('.start-game');
  const helperText = document.querySelector('.helper-text');
  const themeToggleBtn = document.querySelector('.theme-toggle');
  const playerOneScore = document.querySelector('.player-one-score');
  const playerTwoScore = document.querySelector('.player-two-score');
  const editPlayerNames = document.querySelector('.edit-player-names');
  const formModal = document.querySelector('.form-modal');
  const closeForm = document.querySelector('.close-form');
  // const playerOneName = document.querySelector(`.`);
  // const playerTwoName = document.querySelector(`.`);

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

  const resetBoardUI = () => {
    boardContainer.innerHTML = ''; // clear previous cells
    instantiateDomBoard(); // rebuild grid and add listeners
  };

  const getHelperText = () => helperText;
  const getStartBtn = () => startGame;

  const getBoardCells = () => {
    const boardCells = document.querySelectorAll('.board-grid-cell');
    return boardCells;
  };

  const setTheme = () => {
    const root = document.documentElement;
    let newTheme = root.className === 'dark' ? 'light' : 'dark';
    root.className = newTheme;

    newTheme === 'dark'
      ? (themeToggleBtn.textContent = `Light Mode`)
      : (themeToggleBtn.textContent = `Dark Mode`);
  };

  const updateScoreDisplay = (scoreOne, scoreTwo) => {
    playerOneScore.textContent = `${scoreOne}`;
    playerTwoScore.textContent = `${scoreTwo}`;
  };

  const highlightWinner = (a, b, c) => {
    const boardCells = domLogic.getBoardCells();
    [a, b, c].forEach((i) => {
      boardCells[i].classList.add('winner-outline');
    });
  };

  // Event Listeners
  startGame.addEventListener('click', () => {
    gameController.startGame();
  });

  editPlayerNames.addEventListener('click', () => {
    formModal.showModal();
  });

  closeForm.addEventListener('click', () => {
    formModal.close();
  });

  formModal.addEventListener('click', (event) => {
    if (event.target === formModal) {
      formModal.close();
    }
  });

  themeToggleBtn.addEventListener('click', setTheme);

  return {
    getHelperText,
    instantiateDomBoard,
    getStartBtn,
    getBoardCells,
    updateScoreDisplay,
    resetBoardUI,
    highlightWinner,
  };
})();

// Game Controller
const gameController = (() => {
  const board = gameBoard.getBoard();
  const player1 = playerModule('X');
  const player2 = playerModule('O');
  let round = 0;
  const helperText = domLogic.getHelperText();
  const startBtn = domLogic.getStartBtn();
  let gameStarted = false;

  const startGame = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }

    domLogic.resetBoardUI();

    gameStarted = true;
    round = 0;

    helperText.textContent = `X's Turn`;
    startBtn.textContent = 'Restart Game';
  };

  const makeMove = (position, gridDomElement) => {
    if (!gameStarted) return;
    if (board[position].length > 0) return;

    const playerOneToken = player1.getPlayerToken();
    const playerTwoToken = player2.getPlayerToken();
    const token = round % 2 === 0 ? playerOneToken : playerTwoToken;

    board[position] = token;
    gridDomElement.textContent = token;

    if (checkWinner(token, round)) {
      gameStarted = false;
      startBtn.textContent = 'Restart Game';
      domLogic.updateScoreDisplay(player1.getScore(), player2.getScore());
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
        domLogic.highlightWinner(a, b, c);

        if (token === player1.getPlayerToken()) {
          player1.incrementScore();
        } else {
          player2.incrementScore();
        }

        return true;
      }
    }

    if (round === 8) {
      helperText.textContent = 'Tie! Start new game';
      return true;
    }

    return false;
  };

  return { startGame, makeMove, checkWinner };
})();

domLogic.instantiateDomBoard();
