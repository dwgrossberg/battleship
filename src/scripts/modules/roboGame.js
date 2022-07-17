import displayController from "./displayControl";

const roboGame = (() => {
  const boardTwoDOM = document.getElementById("board-two");
  const playerOneName = document.getElementById("player-one-name-input");
  const playerTwoName = document.getElementById("player-two-name-input");
  const turnSignal = document.getElementById("turn-signal-text");

  const runGame = (game) => {
    const playerOne = game.humanBoard.data.player;
    const playerTwo = game.roboBoard.data.player;
    const boardTwo = game.roboBoard.data.board;
    displayController.removeBoard(boardTwoDOM);
    game.roboBoard.removeAllShips();
    game.roboBoard.randomlyPlace(game.roboBoard.data.ships);
    displayController.renderBoard(boardTwo, boardTwoDOM);
    Array.from(document.getElementById("board-two").childNodes).forEach(
      (item) => item.classList.add("hideShip")
    );

    const playerFire = (e) => {
      turnSignal.removeAttribute("class");
      const index = e.target.getAttribute("data-index");
      if (game.roboBoard.data.board[index].isHit === true) {
        e.preventDefault();
      } else {
        game.roboBoard.receiveAttack(index);
        if (game.roboBoard.data.board[index].hasShip === true) {
          game.roboBoard.data.board[index].isHit = true;
          e.target.classList.add("hit");
          turnSignal.innerText = "HIT!";
          turnSignal.classList.add("hit");
          displayController.updateShipsLeft();
        } else {
          game.roboBoard.data.board[index].isHit = true;
          e.target.classList.add("miss");
          turnSignal.innerText = "Miss, try again...";
          turnSignal.classList.add("miss");
        }
        endGame();
        if (game.roboBoard.allSunk() === false) {
          roboTurn();
        }
      }
    };

    const playerTurn = () => {
      playerTwoName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerOneName.style.outline = "2px solid #e2c08c";
      turnSignal.innerText = `${playerOne.playerInfo.name}'s turn: fire away!`;
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
      setTimeout(roboAttack, 500);
    };

    let nextRoboMove;

    const roboAttack = () => {
      const roboMove = game.roboBoard.data.player.roboPlay(
        game.humanBoard,
        nextRoboMove
      );
      if (roboMove.nextMove) {
        nextRoboMove = roboMove.nextMove;
      }
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
      endGame();
      if (game.humanBoard.allSunk() === false) {
        setTimeout(playerTurn, 500);
      }
    };

    const roboTurn = () => {
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.removeEventListener("mousedown", playerFire)
      );
      setTimeout(roboFire, 500);
    };

    const endGame = () => {
      if (game.roboBoard.allSunk()) {
        Array.from(boardTwoDOM.childNodes).forEach((div) =>
          div.removeEventListener("mousedown", playerFire)
        );
        playerOneName.style.outline = "2px solid #e2c08c";
        playerTwoName.style.outline = "";
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = `${playerOne.playerInfo.name} wins!!!!!`;
      } else if (game.humanBoard.allSunk()) {
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = `${playerTwo.playerInfo.name} wins!!!!!`;
        playerOneName.style.outline = "";
        playerTwoName.style.outline = "2px solid #e2c08c";
      }
    };
  };

  return {
    runGame,
  };
})();

export default roboGame;
