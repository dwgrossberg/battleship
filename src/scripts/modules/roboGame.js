import displayController from "./displayControl";

const roboGame = (() => {
  const boardOneDOM = document.getElementById("board-one");
  const boardTwoDOM = document.getElementById("board-two");
  const playerOneName = document.getElementById("player-one-name-input");
  const playerTwoName = document.getElementById("player-two-name-input");
  const turnSignal = document.getElementById("turn-signal-text");

  const runGame = (game) => {
    const boardOne = game.humanBoard.data.board;
    const boardTwo = game.roboBoard.data.board;
    displayController.removeBoard(boardTwoDOM);
    game.roboBoard.removeAllShips();
    game.roboBoard.randomlyPlace(game.roboBoard.data.ships);
    displayController.renderBoard(boardTwo, boardTwoDOM);
    // Array.from(boardTwoDOM.childNodes).forEach((div) =>
    //   div.classList.add("hideShip")
    // );

    const playerTurn = () => {
      playerOneName.style.outline = "2px solid #e2c08c";
      displayController.displayTurn();
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.addEventListener("mousedown", () => {
          turnSignal.removeAttribute("class");
          const index = div.getAttribute("data-index");
          console.log(
            index,
            game.roboBoard.data.board,
            game.roboBoard.data.board[index]
          );
          game.roboBoard.receiveAttack(index);
          if (game.roboBoard.data.board[index].hasShip === true) {
            game.roboBoard.data.board[index].isHit = true;
            div.classList.add("hit");
            turnSignal.innerText = "HIT!";
            turnSignal.classList.add("hit");
            displayController.updateShipsLeft();
          } else {
            div.classList.add("miss");
            turnSignal.innerText = "Miss, try again...";
            turnSignal.classList.add("miss");
          }
        })
      );
    };
    playerTurn();

    const roboTurn = () => {};
  };

  return {
    runGame,
  };
})();

export default roboGame;
