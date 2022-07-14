import displayController from "./displayControl";

const roboGame = (() => {
  const boardOneDOM = document.getElementById("board-one");
  const boardTwoDOM = document.getElementById("board-two");
  const playerOneName = document.getElementById("player-one-name-input");
  const playerTwoName = document.getElementById("player-two-name-input");
  const turnSignal = document.getElementById("turn-signal-text");

  const runGame = (game) => {
    const playerOne = game.humanBoard.data.player;
    const playerTwo = game.roboBoard.data.player;
    const boardOne = game.humanBoard.data.board;
    const boardTwo = game.roboBoard.data.board;
    displayController.removeBoard(boardTwoDOM);
    game.roboBoard.removeAllShips();
    game.roboBoard.randomlyPlace(game.roboBoard.data.ships);
    displayController.renderBoard(boardTwo, boardTwoDOM);

    const playerFire = (e) => {
      turnSignal.removeAttribute("class");
      const index = e.target.getAttribute("data-index");
      game.roboBoard.receiveAttack(index);
      if (game.roboBoard.data.board[index].hasShip === true) {
        game.roboBoard.data.board[index].isHit = true;
        e.target.classList.add("hit");
        turnSignal.innerText = "HIT!";
        turnSignal.classList.add("hit");
        displayController.updateShipsLeft();
      } else {
        e.target.classList.add("miss");
        turnSignal.innerText = "Miss, try again...";
        turnSignal.classList.add("miss");
      }
      roboTurn();
    };

    const playerTurn = () => {
      playerTwoName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerOneName.style.outline = "2px solid #e2c08c";
      turnSignal.innerText = `${playerOne.playerInfo.name}'s turn: fire away!`;
      //   displayController.displayTurn();
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.addEventListener("mousedown", playerFire)
      );
    };
    playerTurn();

    const roboFire = () => {
      playerOneName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerTwoName.style.outline = "2px solid #e2c08c";
      turnSignal.innerText = `${playerTwo.playerInfo.name}'s turn: fire away!`;
      setTimeout(roboAttack, 1000);
    };

    const roboAttack = () => {
      const roboMove = game.roboBoard.data.player.roboPlay(game.humanBoard);
      const boardPiece = document.querySelector(
        `[data-index='${roboMove.thisMove}']`
      );
      if (game.humanBoard.data.board[roboMove.thisMove].hasShip === true) {
        game.humanBoard.data.board[roboMove.thisMove].isHit = true;
        boardPiece.classList.add("hit");
        turnSignal.innerText = "HIT!";
        turnSignal.classList.add("hit");
        displayController.updateShipsLeft();
      } else {
        boardPiece.classList.add("miss");
        turnSignal.innerText = "Miss, try again...";
        turnSignal.classList.add("miss");
      }
      setTimeout(playerTurn, 1000);
    };

    const roboTurn = () => {
      console.log(turnSignal.innerText);

      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.removeEventListener("mousedown", playerFire)
      );
      setTimeout(roboFire, 1000);
    };
  };

  return {
    runGame,
  };
})();

export default roboGame;
