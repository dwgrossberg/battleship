import Gameboard from "../factories/gameboard.js";
import Player from "../factories/player.js";

const gameController = (() => {
  const startGame = (player1, player2) => {
    // Create Player Objects
    const humanPlayer = Player(player1);
    let roboHuman;
    if (player2) {
      roboHuman = Player(player2);
    } else {
      roboHuman = Player("roboPlayer");
    }
    // Create Gameboards for each Player
    const humanBoard = Gameboard(humanPlayer);
    const roboBoard = Gameboard(roboHuman);
    // Randomly place all Ships on each Gameboard
    humanBoard.randomlyPlace(humanBoard.data.ships);
    roboBoard.randomlyPlace(roboBoard.data.ships);

    console.log(humanBoard, roboBoard);
  };

  return {
    startGame,
  };
})();

export default gameController;
