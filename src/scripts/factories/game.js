import Gameboard from "./gameboard.js";
import Player from "./player.js";

const Game = (player1, player2) => {
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
  return { humanBoard, roboBoard };
};

export default Game;
