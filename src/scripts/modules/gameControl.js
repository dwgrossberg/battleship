import Gameboard from "../factories/gameboard";
import Player from "../factories/player";
import Ship from "../factories/ship";

const gameController = ((player1, player2) => {
  const humanPlayer = Player(player1);
  const roboPlayer = Player(player2);
  const humanBoard = Gameboard(humanPlayer);
  const roboBoard = Gameboard(roboPlayer);

  return {};
})();

export default gameController;
