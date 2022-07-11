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

  const numOfPlayers = () => {
    const checkbox = document.getElementById("players");
    const slider = document.getElementsByClassName("slider")[0];
    checkbox.addEventListener("input", () => {
      if (checkbox.checked === true) {
        slider.innerHTML = `<div class="one-player-logo"></div>
                One Two Player
                <div class="two-player-logo"></div>`;
      } else {
        slider.innerHTML = ` <div class="one-player-logo"></div>
                One Player Two
                <div class="two-player-logo"></div>`;
      }
    });
  };
  numOfPlayers();

  const updatePlayerNames = () => {
    const playerOneName = document.getElementById("player-one-name-input");
    const playerTwoName = document.getElementById("player-two-name-input");
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    };
    const callback = function (mutationList) {
      for (const mutation of mutationList) {
        //   try - catch - guard against html as well
        console.log(mutation.target);
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(playerOneName, config);
    observer.observe(playerTwoName, config);
  };
  updatePlayerNames();

  const newGame = () => {
    const newGameDOM = document.getElementById("new-game");
    newGameDOM.addEventListener("mousedown", gamePlayers);
    const gamePlayers = () => {};
  };

  return {};
})();

export default displayController;
