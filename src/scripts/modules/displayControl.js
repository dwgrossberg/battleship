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
      div.dataset.index = boardOne.indexOf(cell);
      if (cell.hasShip === true) {
        div.classList.add("hasShip");
        div.classList.add(`${cell.shipType.name}`);
      } else {
        div.classList.add("noShip");
      }
      boardOneDOM.appendChild(div);
    });
    boardTwo.forEach((cell) => {
      const div = document.createElement("div");
      div.dataset.index = boardTwo.indexOf(cell);
      if (cell.hasShip === true) {
        div.classList.add("hasShip");
        div.classList.add(`${cell.shipType.name}`);
      } else {
        div.classList.add("noShip");
      }
      boardTwoDOM.appendChild(div);
    });
  };
  renderBoard();

  const newGame = () => {
    const newGameDOM = document.getElementById("new-game");
    newGameDOM.addEventListener("mousedown", gameType);
    const gameType = () => {};
  };

  return {};
})();

export default displayController;
