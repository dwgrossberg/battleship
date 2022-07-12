import gameController from "./gameControl.js";

const displayController = (() => {
  const game = gameController.startGame("player 1");
  const boardOne = game.humanBoard.data.board;
  const boardTwo = game.roboBoard.data.board;
  const boardOneDOM = document.getElementById("board-one");
  const boardTwoDOM = document.getElementById("board-two");
  const playerTwoInfo = document.getElementsByClassName("player-two")[0];

  const renderBoard = () => {
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

  // Toggle button for number of players
  const checkbox = document.getElementById("players");
  const slider = document.getElementsByClassName("slider")[0];
  const numOfPlayers = () => {
    checkbox.addEventListener("input", () => {
      if (checkbox.checked === true) {
        slider.innerHTML = `<div class="one-player-logo"></div>
                One Two Player
                <div class="two-player-logo"></div>`;
        boardTwoDOM.style.display = "";
        playerTwoInfo.style.display = "";
        boardTwoDOM.style.opacity = 0.5;
        playerTwoInfo.style.opacity = 0.5;
      } else {
        slider.innerHTML = ` <div class="one-player-logo"></div>
                One Player Two
                <div class="two-player-logo"></div>`;
        boardTwoDOM.style.display = "none";
        playerTwoInfo.style.display = "none";
        boardTwoDOM.style.opacity = "";
        playerTwoInfo.style.opacity = "";
      }
    });
  };
  numOfPlayers();

  // Find width of span textContent
  function textWidth(text, font) {
    font = font || "18px Original Surfer";
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    ctx.font = font;
    return ctx.measureText(text).width;
  }

  // Log playerName changes to each Player Object
  const updatePlayerNames = () => {
    const playerOneName = document.getElementById("player-one-name-input");
    const playerTwoName = document.getElementById("player-two-name-input");
    const playerNames = [playerOneName, playerTwoName];
    playerNames.forEach((name) =>
      name.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        } else if (textWidth(e.target.textContent) >= 140) {
          if (e.key !== "Backspace") {
            e.preventDefault();
          }
        }
      })
    );
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    };
    const callback = function (mutationList) {
      for (const mutation of mutationList) {
        try {
          if (mutation.target.textContent.length > 0) {
            let player;
            mutation.target.parentNode.id === "player-one-name-input"
              ? (player = game.humanBoard.data.player)
              : (player = game.roboBoard.data.player);
            player.playerInfo.name = mutation.target.textContent;
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(playerOneName, config);
    observer.observe(playerTwoName, config);
  };
  updatePlayerNames();

  const updateShipsLeft = () => {
    const playerOneShipsLeft = document.getElementById("player-one-ships-left");
    const playerTwoShipsLeft = document.getElementById("player-two-ships-left");
    playerOneShipsLeft.textContent = game.humanBoard.data.ships.filter((ship) =>
      ship.hits.includes(null)
    ).length;
    playerTwoShipsLeft.textContent = game.roboBoard.data.ships.filter((ship) =>
      ship.hits.includes(null)
    ).length;
  };
  updateShipsLeft();

  // Start a new game when users click on the button
  const newGameDOM = document.getElementById("new-game");
  const setupGame = () => {
    checkbox.checked = false;
    slider.style.display = "flex";
    boardTwoDOM.style.display = "none";
    playerTwoInfo.style.display = "none";
  };

  newGameDOM.addEventListener("mousedown", setupGame);

  return {
    updateShipsLeft,
  };
})();

export default displayController;
