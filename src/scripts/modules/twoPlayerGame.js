import displayController from "./displayControl";

const twoPlayerGame = (() => {
  const boardOneDOM = document.getElementById("board-one");
  const boardTwoDOM = document.getElementById("board-two");
  const playerOneName = document.getElementById("player-one-name-input");
  const playerTwoName = document.getElementById("player-two-name-input");
  const turnSignal = document.getElementById("turn-signal-text");
  const playerOneReadyDOM = document.getElementById("player-one-ready-button");
  const playerTwoReadyDOM = document.getElementById("player-two-ready-button");

  const runGame = (game) => {
    const playerOne = game.humanBoard.data.player;
    const playerTwo = game.roboBoard.data.player;
    const boardOne = game.humanBoard;
    const boardTwo = game.roboBoard;

    const playerOneNotReady = () => {
      boardTwoDOM.classList.add("player-not-ready");
    };

    const playerOneTurn = () => {
      playerTwoName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerOneName.style.outline = "2px solid #e2c08c";
      // Display playerNext button
      document.getElementsByClassName("player-one-ready")[0].style.display =
        "flex";
      boardTwoDOM.addEventListener("mousedown", playerOneNotReady);
    };
    playerOneTurn();

    const playerOneReady = () => {
      boardTwoDOM.removeEventListener("mousedown", playerOneNotReady);
      boardTwoDOM.classList.remove("player-not-ready");
      Array.from(boardOneDOM.childNodes).forEach((div) => {
        if (Array.from(div.classList).includes("hideShip")) {
          div.classList.remove("hideShip");
        }
      });
      document.getElementsByClassName("player-one-ready")[0].style.display = "";
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.addEventListener("mousedown", playerOneFire)
      );
    };
    playerOneReadyDOM.addEventListener("mousedown", playerOneReady);

    const playerOneFire = (e) => {
      Array.from(document.getElementsByClassName("hasShip")).forEach((item) =>
        item.classList.add("hideShip")
      );
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
      Array.from(boardTwoDOM.childNodes).forEach((div) =>
        div.removeEventListener("mousedown", playerOneFire)
      );
    };

    const playerTwoNotReady = () => {
      boardOneDOM.classList.add("player-not-ready");
    };

    const playerTwoTurn = () => {
      playerOneName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerTwoName.style.outline = "2px solid #e2c08c";
      document.getElementsByClassName("player-two-ready")[0].style.display =
        "flex";
      boardOneDOM.addEventListener("mousedown", playerTwoNotReady);
    };

    const playerTwoReady = () => {
      boardOneDOM.removeEventListener("mousedown", playerTwoNotReady);
      boardOneDOM.classList.remove("player-not-ready");
      Array.from(boardTwoDOM.childNodes).forEach((div) => {
        if (Array.from(div.classList).includes("hideShip")) {
          div.classList.remove("hideShip");
        }
      });
      document.getElementsByClassName("player-two-ready")[0].style.display = "";
      Array.from(boardOneDOM.childNodes).forEach((div) =>
        div.addEventListener("mousedown", playerTwoFire)
      );
    };
    playerTwoReadyDOM.addEventListener("mousedown", playerTwoReady);

    const playerTwoFire = (e) => {
      Array.from(document.getElementsByClassName("hasShip")).forEach((item) =>
        item.classList.add("hideShip")
      );
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
      Array.from(boardOneDOM.childNodes).forEach((div) =>
        div.removeEventListener("mousedown", playerTwoFire)
      );
    };

    const endGame = () => {
      if (boardTwo.allSunk()) {
        document.getElementsByClassName("player-ready")[0].style.display = "";
        Array.from(boardTwoDOM.childNodes).forEach((div) =>
          div.removeEventListener("mousedown", playerOneFire)
        );
        playerOneName.style.outline = "2px solid #e2c08c";
        playerTwoName.style.outline = "";
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = `${playerOne.playerInfo.name} wins!!!!!`;
      } else if (boardOne.allSunk()) {
        document.getElementsByClassName("player-ready")[0].style.display = "";
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
