import gameController from "./gameControl.js";

const displayController = (() => {
  const game = gameController.startGame("player 1");
  const boardOne = game.humanBoard.data.board;
  const boardTwo = game.roboBoard.data.board;
  const boardOneDOM = document.getElementById("board-one");
  const boardTwoDOM = document.getElementById("board-two");
  const playerTwoInfo = document.getElementsByClassName("player-two")[0];
  const playerOneName = document.getElementById("player-one-name-input");
  const playerTwoName = document.getElementById("player-two-name-input");
  const gameStartup = document.getElementsByClassName("game-startup")[0];
  const startNext = document.getElementById("start-next-button");

  const renderBoard = (board, DOMelem) => {
    console.log(board, typeof board);
    board.forEach((cell) => {
      const div = document.createElement("div");
      div.dataset.index = board.indexOf(cell);
      if (cell.hasShip === true) {
        div.classList.add("hasShip");
        div.classList.add(`${cell.shipType.name}`);
      } else {
        div.classList.add("noShip");
      }
      DOMelem.appendChild(div);
    });
  };
  renderBoard(boardOne, boardOneDOM);
  renderBoard(boardTwo, boardTwoDOM);

  const removeBoard = (DOMelem) => {
    while (DOMelem.firstChild) {
      DOMelem.removeChild(DOMelem.lastChild);
    }
  };

  // Toggle button for number of players
  const checkbox = document.getElementById("players");
  const slider = document.getElementsByClassName("slider")[0];
  const numOfPlayers = () => {
    checkbox.addEventListener("input", () => {
      if (checkbox.checked === true) {
        playerTwoName.classList.add("two-player-name");
        slider.innerHTML = `<div class="one-player-logo"></div>
                One Two Player
                <div class="two-player-logo"></div>`;
        boardTwoDOM.style.display = "";
        playerTwoInfo.style.display = "";
        boardTwoDOM.style.opacity = 0.5;
        playerTwoInfo.style.opacity = 0.5;
        startNext.innerText = "Next";
        playerTwoName.textContent = "Player2";
        playerTwoName.style.outline = "1px dotted $highligh-color";
      } else {
        playerTwoName.classList.remove("two-player-name");
        slider.innerHTML = ` <div class="one-player-logo"></div>
                One Player Two
                <div class="two-player-logo"></div>`;
        boardTwoDOM.style.display = "none";
        playerTwoInfo.style.display = "none";
        boardTwoDOM.style.opacity = "";
        playerTwoInfo.style.opacity = "";
        startNext.innerText = "Start!";
        playerTwoName.textContent = "";
        playerTwoName.style.cursor = "";
        playerTwoName.style.outline = "";
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
    gameStartup.style.display = "flex";
    boardTwoDOM.style.display = "none";
    playerTwoInfo.style.display = "none";
  };
  // Call setupGame to start a new game on page load
  setupGame();
  newGameDOM.addEventListener("mousedown", setupGame);

  const randomlyPlaceButton = document.getElementById("randomly-place-button");
  const randomlyPlaceShips = (e) => {
    const player1Info =
      e.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1];
    const player2Info =
      e.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[3];
    if (player2Info.style.display === "none") {
      console.log(player1Info, player2Info);
      removeBoard(boardOneDOM);
      game.humanBoard.removeAllShips();
      game.humanBoard.randomlyPlace(game.humanBoard.data.ships);
      renderBoard(boardOne, boardOneDOM);
    } else if (player1Info.style.display === "none") {
      removeBoard(boardTwoDOM);
      game.roboBoard.removeAllShips();
      game.roboBoard.randomlyPlace(game.roboBoard.data.ships);
      renderBoard(boardTwo, boardTwoDOM);
    }
  };
  randomlyPlaceButton.addEventListener("mousedown", randomlyPlaceShips);

  return {
    updateShipsLeft,
  };
})();

export default displayController;
