//TODO finish error handling on existing positon

//Store gameboard as an array inside gameboard object

const gameBoard = (() => {
  let gameBoardArr = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => console.log(gameBoardArr);
  const playerMove = (token, position) => {
    if (gameBoardarr[position].length === 0) {
      console.log('Position is not empty! Select again');
      playerMove(token, position);
    } else {
      gameBoardArr[position] = token;
    }
  };

  return { getBoard, playerMove };
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
  //   gameBoard.getBoard();
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
      ? gameBoard.playerMove(playerOneToken, position)
      : gameBoard.playerMove(playerTwoToken, position);

    round++;
    gameBoard.getBoard();
  };

  return { startGame, makeMove };
})();

gameController.startGame();
gameController.makeMove(3);
gameController.makeMove(4);
