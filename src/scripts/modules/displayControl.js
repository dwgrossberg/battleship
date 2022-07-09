import gameController from "./gameControl.js";

const displayController = (() => {
  const game = gameController.startGame("player 1");
  const boardOne = game.humanBoard.data.board;
  const boardTwo = game.roboBoard.data.board;

  const renderBoard = () => {
    const boardOneDOM = document.getElementById("board-one");
    const boardTwoDOM = document.getElementById("board-two");
    boardOne.forEach((cell) => {
      const div = document.createElement("div");
      boardOneDOM.appendChild(div);
    });
    boardTwo.forEach((cell) => {
      const div = document.createElement("div");
      boardTwoDOM.appendChild(div);
    });
  };
  renderBoard();

  return {};
})();

export default displayController;
