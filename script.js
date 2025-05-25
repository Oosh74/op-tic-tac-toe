//Store gameboard as an array inside gameboard object

const gameBoard = (() => {
  let gameBoardArr = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => console.log(gameBoardArr);
  const playerMove = (token, position) => {
    gameBoardArr[position] = token;
    return console.log(gameBoardArr);
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
  const startGame = () => {
    const player1 = playerModule.playerFactory();
    const player2 = playerModule.playerFactory();
    gameBoard.getBoard();
    player1.getPlayerName();
    player2.getPlayerName();
    let playerOneToken = player1.getPlayerToken();
    let playerTwoToken = player2.getPlayerToken();

    gameBoard.playerMove(playerOneToken, 6);
    gameBoard.playerMove(playerTwoToken, 5);
  };
  //game starts on load
  //board is generated/cleared
  //assign players
  //playerOne turn
  //player makes selection on tic tac toe board
  //board is updated
  //playerTwo turn
  //makes selection
  //board is updated

  return { startGame };
})();

gameController.startGame();
