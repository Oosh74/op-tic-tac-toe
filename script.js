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

    checkWinner(token);
  };

  const checkWinner = (token) => {
    let board = gameBoard.getBoard();

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
    } else {
      console.log('No winner, please continue playing');
    }
  };

  return { startGame, makeMove };
})();

gameController.startGame();
gameController.makeMove(0);
gameController.makeMove(3);
gameController.makeMove(1);
gameController.makeMove(4);
gameController.makeMove(2);
