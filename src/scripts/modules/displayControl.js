import Game from "../factories/game.js";
import roboGame from "./roboGame.js";
import twoPlayerGame from "./twoPlayerGame.js";

const displayController = (() => {
  const game = Game("Jerry");
  const boardOne = game.humanBoard.data.board;
  const boardTwo = game.roboBoard.data.board;
  const boardOneDOM = document.getElementById("board-one");
  const boardTwoDOM = document.getElementById("board-two");
  const playerOne = game.humanBoard.data.player;
  const playerTwo = game.roboBoard.data.player;
  const playerOneInfo = document.getElementsByClassName("player-one")[0];
  const playerTwoInfo = document.getElementsByClassName("player-two")[0];
  const playerOneName = document.getElementById("player-one-name-input");
  const playerTwoName = document.getElementById("player-two-name-input");
  const gameStartup = document.getElementsByClassName("game-startup")[0];
  const startNext = document.getElementById("start-next-button");
  const turnSignal = document.getElementById("turn-signal-text");

  // Display the gameboards
  const renderBoard = (board, DOMelem) => {
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
  checkbox.addEventListener("input", () => {
    if (checkbox.checked === true) {
      slider.innerHTML = `<div class="one-player-logo"></div>
                One Two Player
                <div class="two-player-logo"></div>`;
      boardTwoDOM.style.display = "";
      playerTwoInfo.style.display = "";
      boardTwoDOM.style.opacity = 0.5;
      playerTwoInfo.style.opacity = 0.5;
      startNext.innerText = "Next";
      playerTwoName.textContent = "Player2";
      playerTwoName.style.cursor = "default";
      playerTwoName.style.outline = "1px solid #6a7aac";
    } else {
      slider.innerHTML = ` <div class="one-player-logo"></div>
                One Player Two
                <div class="two-player-logo"></div>`;
      boardTwoDOM.style.display = "none";
      playerTwoInfo.style.display = "none";
      boardTwoDOM.style.opacity = "";
      playerTwoInfo.style.opacity = "";
      startNext.innerText = "Start!";
      playerTwoName.textContent = "roboPlayer";
      playerTwoName.style.cursor = "";
      playerTwoName.style.outline = "";
    }
  });

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
            displayTurn();
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

  // Update player-info number of ships left
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

  // Display whose turn it is
  const displayTurn = () => {
    if (gameStartup.style.display === "flex") {
      //if the game is still being setup
      playerOneInfo.style.opacity === ""
        ? (turnSignal.innerText = `${playerOne.playerInfo.name}'s turn: place your ships on the board to start`)
        : (turnSignal.innerText = `${playerTwo.playerInfo.name}'s turn: place your ships on the board to start`);
    } else {
      if (!game.humanBoard.allSunk() && !game.roboBoard.allSunk())
        playerOneName.style.outline === "2px solid #e2c08c"
          ? (turnSignal.innerText = `${playerOne.playerInfo.name}'s turn: fire away!`)
          : (turnSignal.innerText = `${playerTwo.playerInfo.name}'s turn: fire away!`);
    }
  };
  displayTurn();

  // Start a new game when users click on the button
  const newGameDOM = document.getElementById("new-game");
  const setupGame = () => {
    playerOneName.classList.add("edit");
    playerTwoName.classList.add("edit");
    playerOneName.setAttribute("contentEditable", true);
    playerTwoName.setAttribute("contentEditable", true);
    playerOneName.style.outline = "1px dotted #6a7aac";
    playerTwoName.style.outline = "1px dotted #6a7aac";
    removeBoard(boardOneDOM);
    game.humanBoard.removeAllShips();
    renderBoard(boardOne, boardOneDOM);
    removeBoard(boardTwoDOM);
    game.roboBoard.removeAllShips();
    renderBoard(boardTwo, boardTwoDOM);
    checkbox.checked = false;
    slider.style.display = "flex";
    slider.innerHTML = ` <div class="one-player-logo"></div>
                One Player Two
                <div class="two-player-logo"></div>`;
    gameStartup.style.display = "flex";
    boardTwoDOM.style.display = "none";
    playerTwoInfo.style.display = "none";
    turnSignal.removeAttribute("class");
    displayTurn();
  };
  // Call setupGame to start a new game on page load
  setupGame();
  newGameDOM.addEventListener("mousedown", setupGame);

  const randomlyPlaceButton = document.getElementById("randomly-place-button");
  const randomlyPlaceShips = (e) => {
    const player1Info =
      e.target.parentNode.parentNode.parentNode.childNodes[5].childNodes[1];
    const player2Info =
      e.target.parentNode.parentNode.parentNode.childNodes[5].childNodes[3];
    startNextButton.classList.remove("info-missing");
    if (
      player2Info.style.display === "none" ||
      player2Info.style.opacity === "0.5"
    ) {
      removeBoard(boardOneDOM);
      game.humanBoard.removeAllShips();
      game.humanBoard.randomlyPlace(game.humanBoard.data.ships);
      renderBoard(boardOne, boardOneDOM);
      updateShipsLeft();
    } else if (player1Info.style.opacity === "0.5") {
      removeBoard(boardTwoDOM);
      game.roboBoard.removeAllShips();
      game.roboBoard.randomlyPlace(game.roboBoard.data.ships);
      renderBoard(boardTwo, boardTwoDOM);
    }
  };
  randomlyPlaceButton.addEventListener("mousedown", randomlyPlaceShips);

  // Control the game setup for both one-player and two-player
  const startNextButton = document.getElementById("start-next-button");
  const gameStartNext = (e) => {
    if (
      (e.target.innerText === "Next" &&
        boardOne.every((item) => item.hasShip === false)) ||
      (e.target.innerText === "Start!" &&
        boardOne.every((item) => item.hasShip === false)) ||
      (e.target.innerText === "Start!" &&
        checkbox.checked === true &&
        boardTwo.every((item) => item.hasShip === false))
    ) {
      startNextButton.classList.add("info-missing");
      e.preventDefault(); // Prevent the game from starting when no Ships are on Board
    } else if (e.target.innerText === "Next") {
      startNextButton.classList.remove("info-missing");
      boardOneDOM.style.opacity = 0.5;
      playerOneInfo.style.opacity = 0.5;
      boardTwoDOM.style.opacity = "";
      playerTwoInfo.style.opacity = "";
      startNext.innerText = "Start!";
      playerOneName.setAttribute("contentEditable", false);
      //   playerOneName.style.cursor = "default";
      playerOneName.style.outline = "";
      playerTwoName.setAttribute("contentEditable", true);
      //   playerTwoName.style.cursor = "text";
      playerTwoName.style.outline = "";
      Array.from(document.getElementsByClassName("hasShip")).forEach((item) =>
        item.classList.add("hideShip")
      );
    } else if (e.target.innerText === "Start!") {
      playerOneName.removeAttribute("class");
      playerTwoName.removeAttribute("class");
      startNextButton.classList.remove("info-missing");
      gameStartup.style.display = "";
      slider.style.display = "";
      boardOneDOM.style.opacity = "";
      playerOneInfo.style.opacity = "";
      playerOneName.setAttribute("contentEditable", false);
      playerOneName.style.outline = "";
      //   playerOneName.style.cursor = "default";
      boardTwoDOM.style.opacity = "";
      playerTwoInfo.style.opacity = "";
      playerTwoName.setAttribute("contentEditable", false);
      playerTwoName.style.outline = "";
      //   playerTwoName.style.cursor = "default";
      boardTwoDOM.style.display = "";
      playerTwoInfo.style.display = "";
      if (checkbox.checked === false) {
        playerTwoName.textContent = "roboPlayer";
        // Call roboGame module
        roboGame.runGame(game);
      } else if (checkbox.checked === true) {
        Array.from(document.getElementsByClassName("hasShip")).forEach((item) =>
          item.classList.add("hideShip")
        );
        // Call twoPlayerGame module
        twoPlayerGame.runGame(game);
      }
    }
  };
  startNextButton.addEventListener("mousedown", gameStartNext);

  return {
    renderBoard,
    removeBoard,
    updateShipsLeft,
    displayTurn,
  };
})();

export default displayController;
