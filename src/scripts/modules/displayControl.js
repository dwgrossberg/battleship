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

  // Toggle button for number of players
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

  // Find width of span textContent
  function textWidth(text, font) {
    font = font || "18px Original Surfer";
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    ctx.font = font;
    return ctx.measureText(text).width;
  }

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
            console.log(player, mutation.target.textContent);
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

  const newGame = () => {
    const newGameDOM = document.getElementById("new-game");
    newGameDOM.addEventListener("mousedown", gamePlayers);
    const gamePlayers = () => {};
  };

  return {};
})();

export default displayController;
