import Gameboard from "../factories/gameboard.js";
import gameController from "./gameControl.js";

const displayController = (() => {
  const board1 = document.getElementById("board-one");
  const board2 = document.getElementById("board-two");
  const game = gameController.startGame("player 1");

  const renderBoard = () => {
    console.log(game);
  };
  renderBoard();

  return {};
})();

export default displayController;
