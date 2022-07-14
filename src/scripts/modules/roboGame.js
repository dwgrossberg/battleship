import displayController from "./displayControl";

const roboGame = (() => {
  const boardOneDOM = document.getElementById("board-one");
  const boardTwoDOM = document.getElementById("board-two");
  const playerOneName = document.getElementById("player-one-name-input");
  const playerTwoName = document.getElementById("player-two-name-input");

  const runGame = (game) => {
    const boardOne = game.humanBoard.data.board;
    const boardTwo = game.roboBoard.data.board;
    displayController.removeBoard(boardTwoDOM);
    game.roboBoard.removeAllShips();
    game.roboBoard.randomlyPlace(game.roboBoard.data.ships);
    displayController.renderBoard(boardTwo, boardTwoDOM);
    let turn = true;
    if (turn) {
      playerOneName.style.outline = "2px solid #e2c08c";
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.addEventListener("mousedown", () => {
          const index = div.getAttribute("data-index");
          game.roboBoard.receiveAttack(index);
          console.log(game.roboBoard.data.board[index]);
        })
      );
    } else {
      playerOneName.style.outline = "";
      playerTwoName.style.outline = "2px solid #e2c08c";
    }
  };

  return {
    runGame,
  };
})();

export default roboGame;
