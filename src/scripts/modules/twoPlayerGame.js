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

    const playerOneFire = (e) => {
      console.log(e);
      turnSignal.removeAttribute("class");
      const index = e.target.getAttribute("data-index");
      if (boardTwo.data.board[index].isHit === true) {
        e.preventDefault();
      } else {
        boardTwo.receiveAttack(index);
        if (boardTwo.data.board[index].hasShip === true) {
          boardTwo.data.board[index].isHit = true;
          e.target.classList.add("hit");
          turnSignal.innerText = "HIT!";
          turnSignal.classList.add("hit");
          displayController.updateShipsLeft();
        } else {
          boardTwo.data.board[index].isHit = true;
          e.target.classList.add("miss");
          turnSignal.innerText = "Miss, try again...";
          turnSignal.classList.add("miss");
        }
        endGame();
        if (boardTwo.allSunk() === false) {
          playerTwoTurn();
        }
      }
    };

    const playerOneTurn = () => {
      Array.from(boardOneDOM.childNodes).forEach((div) =>
        div.removeEventListener("mousedown", playerTwoFire)
      );
      playerTwoName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerOneName.style.outline = "2px solid #e2c08c";
      turnSignal.innerText = `${playerOne.playerInfo.name}'s turn: fire away!`;
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.addEventListener("mousedown", playerOneFire)
      );
    };
    playerOneTurn();

    const playerTwoFire = (e) => {
      console.log(e);
      turnSignal.removeAttribute("class");
      const index = e.target.getAttribute("data-index");
      if (boardOne.data.board[index].isHit === true) {
        e.preventDefault();
      } else {
        boardOne.receiveAttack(index);
        if (boardOne.data.board[index].hasShip === true) {
          boardOne.data.board[index].isHit = true;
          e.target.classList.add("hit");
          turnSignal.innerText = "HIT!";
          turnSignal.classList.add("hit");
          displayController.updateShipsLeft();
        } else {
          boardOne.data.board[index].isHit = true;
          e.target.classList.add("miss");
          turnSignal.innerText = "Miss, try again...";
          turnSignal.classList.add("miss");
        }
        endGame();
        if (boardOne.allSunk() === false) {
          playerOneTurn();
        }
      }
    };

    const playerTwoTurn = () => {
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.removeEventListener("mousedown", playerOneFire)
      );
      playerOneName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerTwoName.style.outline = "2px solid #e2c08c";
      turnSignal.innerText = `${playerTwo.playerInfo.name}'s turn: fire away!`;
      Array.from(boardOneDOM.childNodes).forEach((div) =>
        div.addEventListener("mousedown", playerTwoFire)
      );
    };

    const endGame = () => {
      if (boardTwo.allSunk()) {
        Array.from(boardTwoDOM.childNodes).forEach((div) =>
          div.removeEventListener("mousedown", playerOneFire)
        );
        playerOneName.style.outline = "2px solid #e2c08c";
        playerTwoName.style.outline = "";
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = `${playerOne.playerInfo.name} wins!!!!!`;
      } else if (boardOne.allSunk()) {
        Array.from(boardOneDOM.childNodes).forEach((div) =>
          div.removeEventListener("mousedown", playerTwoFire)
        );
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

export default twoPlayerGame;
