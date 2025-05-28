//TODO finish error handling on existing positon

//Store gameboard as an array inside gameboard object

const gameBoard = (() => {
  let gameBoardArr = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => {
    console.log(gameBoardArr);
    return gameBoardArr;
  };

  return { getBoard };
})();

//players are going to also be objects

const playerModule = (() => {
  let playerNumber = 0;

  const playerFactory = () => {
    playerNumber++;
    if (playerNumber === 3) {
      return console.log('Max players reached');
    }

    const playerName = `Player ${playerNumber}`;
    let playerToken = '';

    if (playerNumber === 1) {
      playerToken = 'X';
    } else {
      playerToken = 'O';
    }

    const getPlayerName = () => console.log(playerName);
    const getPlayerToken = () => {
      return playerToken;
    };
    return { getPlayerName, getPlayerToken };
  };

  return { playerFactory };
})();

//gameflow obj
const gameController = (() => {
  let board = gameBoard.getBoard();
  let player1 = {};
  let player2 = {};
  let round = 0;

  const startGame = () => {
    player1 = playerModule.playerFactory();
    player2 = playerModule.playerFactory();
    player1.getPlayerName();
    player2.getPlayerName();
  };

  const makeMove = (position) => {
    console.log(`Round: ${round}`);
    let playerOneToken = player1.getPlayerToken();
    let playerTwoToken = player2.getPlayerToken();

    round % 2 === 1
      ? playerMove(playerOneToken, position)
      : playerMove(playerTwoToken, position);

    round++;
    gameBoard.getBoard();
  };

  const playerMove = (token, position) => {
    if (board[position].length > 0) {
      console.log(board[position].length > 0);
      console.log('Position is occupied! Select again');
      // makeMove();
    } else {
      board[position] = token;
    }

    checkWinner(token, round);
  };

  const checkWinner = (token, round) => {
    const board = gameBoard.getBoard();

    if (board[0] === token && board[1] === token && board[2] === token) {
      console.log(`${token} is the winner!`);
    } else if (board[3] === token && board[4] === token && board[5] === token) {
      console.log(`${token} is the winner!`);
    } else if (board[6] === token && board[7] === token && board[8] === token) {
      console.log(`${token} is the winner!`);
    } else if (board[0] === token && board[4] === token && board[8] === token) {
      console.log(`${token} is the winner!`);
    } else if (board[2] === token && board[4] === token && board[6] === token) {
      console.log(`${token} is the winner!`);
    } else if (board[0] === token && board[3] === token && board[6] === token) {
      console.log(`${token} is the winner!`);
    } else if (board[1] === token && board[4] === token && board[7] === token) {
      console.log(`${token} is the winner!`);
    } else if (board[2] === token && board[5] === token && board[8] === token) {
      console.log(`${token} is the winner!`);
    } else if (round === 8) {
      console.log('Tie! Start new game');
    } else {
      console.log('No winner, please continue playing');
    }
  };

  return { startGame, makeMove };
})();

//DOM Logic
const domLogic = () => {
  const board = gameBoard.getBoard();
  const boardContainer = document.querySelector('.game-board');
  let boardPosition = 0;

  console.log('BOARD CONTAINER', boardContainer);
  for (let i = 0; i < board.length; i++) {
    const boardGridCell = document.createElement('div');

    console.log('BOARD DRAWING...');
    boardGridCell.classList.add(
      'board-grid-cell',
      `board-grid-pos-${boardPosition}`
    );
    console.log('CLASS LIST ADDED');
    boardContainer.appendChild(boardGridCell);
    console.log('GRID CELL ADDED');

    boardPosition++;
  }

  const boardCell = document.querySelectorAll('.board-grid-cell');

  boardCell.map(
    addEventListener('click', (e) => {
      return console.log('click', e.target);
    })
  );
};

domLogic();

// gameController.startGame();
// gameController.makeMove(0); //x
// gameController.makeMove(8); //o
// gameController.makeMove(7); //x
// gameController.makeMove(1); //o
// gameController.makeMove(2); //x
// gameController.makeMove(3); //o
// gameController.makeMove(5); //x
// gameController.makeMove(4); //o
// gameController.makeMove(6); //x
