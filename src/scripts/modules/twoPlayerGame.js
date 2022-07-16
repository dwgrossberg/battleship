import displayController from "./displayControl";

const twoPlayerGame = (() => {
  const boardOneDOM = document.getElementById("board-one");
  const boardTwoDOM = document.getElementById("board-two");
  const playerOneName = document.getElementById("player-one-name-input");
  const playerTwoName = document.getElementById("player-two-name-input");
  const turnSignal = document.getElementById("turn-signal-text");

  const runGame = (game) => {
    const playerOne = game.humanBoard.data.player;
    const playerTwo = game.roboBoard.data.player;
    const boardOne = game.humanBoard;
    const boardTwo = game.roboBoard;

    const playerFire = (e, player) => {
      console.log(e);
      turnSignal.removeAttribute("class");
      const index = e.target.getAttribute("data-index");
      let board;
      player === playerOne ? (board = boardOne) : (board = boardTwo);
      if (board.data.board[index].isHit === true) {
        e.preventDefault();
      } else {
        board.receiveAttack(index);
        if (board.data.board[index].hasShip === true) {
          board.data.board[index].isHit = true;
          e.target.classList.add("hit");
          turnSignal.innerText = "HIT!";
          turnSignal.classList.add("hit");
          displayController.updateShipsLeft();
        } else {
          board.data.board[index].isHit = true;
          e.target.classList.add("miss");
          turnSignal.innerText = "Miss, try again...";
          turnSignal.classList.add("miss");
        }
        endGame();
        if (board.allSunk() === false) {
          //   roboTurn();
        }
      }
    };

    const playerOneTurn = () => {
      playerTwoName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerOneName.style.outline = "2px solid #e2c08c";
      turnSignal.innerText = `${playerOne.playerInfo.name}'s turn: fire away!`;
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.addEventListener("mousedown", playerFire(playerOne))
      );
      playerTwoTurn();
    };
    playerOneTurn();

    const playerTwoTurn = () => {
      playerOneName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerTwoName.style.outline = "2px solid #e2c08c";
      turnSignal.innerText = `${playerTwo.playerInfo.name}'s turn: fire away!`;
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.addEventListener("mousedown", playerFire(playerTwo))
      );
      playerOneTurn();
    };

    const endGame = () => {
      if (game.roboBoard.allSunk()) {
        Array.from(boardTwoDOM.childNodes).forEach((div) =>
          div.removeEventListener("mousedown", playerFire)
        );
        playerOneName.style.outline = "";
        playerTwoName.style.outline = "";
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = `${playerOne.playerInfo.name} wins!!!!!`;
      } else if (game.humanBoard.allSunk()) {
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = `${playerTwo.playerInfo.name} wins!!!!!`;
        playerOneName.style.outline = "";
        playerTwoName.style.outline = "";
      }
    };
  };

  return {
    runGame,
  };
})();

export default twoPlayerGame;
