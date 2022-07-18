import Gameboard from "./gameboard.js";
import Player from "./player.js";

const Game = (player1) => {
  // Create Player Objects
  const humanPlayer = Player(player1);
  const roboPlayer = Player("roboPlayer");
  // Create Gameboards for each Player
  const humanBoard = Gameboard(humanPlayer);
  const roboBoard = Gameboard(roboPlayer);
  const reset = () => {
    humanBoard.removeAllShips();
    roboBoard.removeAllShips();
  };
  // Reset Game
  return { humanBoard, roboBoard, reset };
};

export default Game;
