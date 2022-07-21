/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/factories/game.js":
/*!***************************************!*\
  !*** ./src/scripts/factories/game.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/scripts/factories/gameboard.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ "./src/scripts/factories/player.js");



var Game = function Game(player1) {
  // Create Player Objects
  var humanPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__["default"])(player1);
  var roboPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__["default"])("roboPlayer"); // Create Gameboards for each Player

  var humanBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])(humanPlayer);
  var roboBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])(roboPlayer);

  var reset = function reset() {
    humanBoard.removeAllShips();
    roboBoard.removeAllShips();
  }; // Reset Game


  return {
    humanBoard: humanBoard,
    roboBoard: roboBoard,
    reset: reset
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/scripts/factories/gameboard.js":
/*!********************************************!*\
  !*** ./src/scripts/factories/gameboard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_ship_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/ship-data */ "./src/scripts/helpers/ship-data.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/scripts/factories/ship.js");



var Gameboard = function Gameboard(player) {
  var data = {
    board: [],
    player: player,
    shipsLeft: true,
    ships: [],
    missedShots: []
  };

  var initBoard = function initBoard() {
    for (var i = 0; i < 100; i++) {
      data.board.push({
        index: i,
        hasShip: false,
        isHit: false
      });
    }
  };

  initBoard();

  var newFleet = function newFleet() {
    _helpers_ship_data__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(function (item) {
      return data.ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(item.name, item.length));
    });
  };

  newFleet();
  var rightEdges = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
  var bottomEdges = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

  var checkShips = function checkShips(ship, num) {
    if (ship.vertical === false) {
      for (var i = 0; i < ship.length; i++) {
        if (data.board[num + i] && data.board[num + i].hasShip === true) {
          return false;
        }
      }

      return true;
    } else if (ship.vertical === true) {
      for (var _i = 0; _i < ship.length; _i++) {
        if (data.board[num + _i * 10] && data.board[num + _i * 10].hasShip === true) {
          return false;
        }
      }

      return true;
    }
  };

  var checkEdges = function checkEdges(ship, num) {
    if (ship.vertical === false) {
      var edgeList = rightEdges.slice();
      edgeList.push(num);
      edgeList.sort(function (a, b) {
        return a - b;
      });
      var index = edgeList.indexOf(num);
      return edgeList[index + 1] - edgeList[index] >= ship.length ? true : false;
    } else if (ship.vertical === true) {
      var edge = bottomEdges.find(function (edge) {
        return edge % 10 === num % 10;
      });
      return (edge - num) / 10 + 1 >= ship.length ? true : false;
    }
  };

  var placeShip = function placeShip(ship, startingPoint) {
    if (ship.vertical === false) {
      if (checkShips(ship, startingPoint) && checkEdges(ship, startingPoint)) {
        for (var i = 0; i < ship.length; i++) {
          data.board[startingPoint + i].hasShip = true;
          data.board[startingPoint + i]["shipType"] = ship;
          ship.position.push(startingPoint + i);
        }
      } else {
        return false;
      }
    } else if (ship.vertical === true) {
      if (checkShips(ship, startingPoint) && checkEdges(ship, startingPoint)) {
        for (var _i2 = 0; _i2 < ship.length; _i2++) {
          data.board[startingPoint + _i2 * 10].hasShip = true;
          data.board[startingPoint + _i2 * 10]["shipType"] = ship;
          ship.position.push(startingPoint + _i2 * 10);
        }
      } else {
        return false;
      }
    }
  };

  var randomlyPlace = function randomlyPlace() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args[0].forEach(function (arg) {
      var isVertical = Math.round(Math.random());
      isVertical === 1 ? arg.vertical = true : arg.vertical = false;
      var randomSpot = Math.floor(Math.random() * 100);

      while (arg.position.length === 0) {
        if (checkShips(arg, randomSpot) && checkEdges(arg, randomSpot)) {
          placeShip(arg, randomSpot);
        } else {
          randomSpot = Math.floor(Math.random() * 100);
        }
      }
    });
  };

  var removeShip = function removeShip(ship) {
    ship.position.forEach(function (index) {
      data.board[index] = {
        hasShip: false,
        isHit: false
      };
    });
    ship.resetPosition();
    ship.resetHits();
    data.shipsLeft = false;
    data.missedShots = [];
  };

  var removeAllShips = function removeAllShips() {
    data.ships.forEach(function (ship) {
      return removeShip(ship);
    });
  };

  var receiveAttack = function receiveAttack(num) {
    if (data.board[num].hasShip === true) {
      data.board[num].shipType.hit(num);
      data.board[num].isHit = true;
      return true;
    } else {
      data.board[num].isHit = true;
      data.missedShots.push(num);
      return false;
    }
  };

  var allSunk = function allSunk() {
    return data.ships.every(function (ship) {
      return ship.isSunk() === true;
    }) ? true : false;
  };

  return {
    data: data,
    checkEdges: checkEdges,
    checkShips: checkShips,
    placeShip: placeShip,
    randomlyPlace: randomlyPlace,
    receiveAttack: receiveAttack,
    allSunk: allSunk,
    removeAllShips: removeAllShips
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/scripts/factories/player.js":
/*!*****************************************!*\
  !*** ./src/scripts/factories/player.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Player = function Player(name) {
  var playerInfo = {
    name: name,
    shots: []
  };

  var fireAway = function fireAway(gameboard, num) {
    return gameboard.receiveAttack(num) ? playerInfo.shots.push({
      index: num,
      shot: "hit"
    }) : playerInfo.shots.push({
      index: num,
      shot: "miss"
    });
  }; // Determine the next best move based on some logical assumptions about the game


  var nextMoves = [];

  var findNextMove = function findNextMove(board, num) {
    // Remove num from nextMoves array to avoid duplication
    nextMoves.splice(nextMoves.indexOf(num), 1);

    if (board.data.board[num].hasShip === true) {
      nextMoves = []; // Protect roboPlayer from making out-of-bound moves

      if (board.data.board[num - 1]) {
        if (board.data.board[num - 1].isHit === false) {
          nextMoves.push(num - 1);
        }
      }

      if (board.data.board[num + 1]) {
        if (board.data.board[num + 1].isHit === false) {
          nextMoves.push(num + 1);
        }
      }

      if (board.data.board[num - 10]) {
        if (board.data.board[num - 10].isHit === false) {
          nextMoves.push(num - 10);
        }
      }

      if (board.data.board[num + 10]) {
        if (board.data.board[num + 10].isHit === false) {
          nextMoves.push(num + 10);
        }
      }

      return nextMoves;
    } else {
      return nextMoves;
    }
  };

  var roboPlay = function roboPlay(board, nextMove) {
    var randomSpot = Math.floor(Math.random() * 100);

    if (nextMove && nextMove.length > 0) {
      var nextBestMove = nextMove[Math.floor(Math.random() * nextMove.length)];
      fireAway(board, nextBestMove);
      console.log(nextMove, nextBestMove);
      return {
        thisMove: nextBestMove,
        nextMove: findNextMove(board, nextBestMove)
      };
    } else {
      var pass = true;

      while (pass) {
        if (board.data.board[randomSpot] && board.data.board[randomSpot].isHit === false && !playerInfo.shots.includes(function (item) {
          return item.index === randomSpot;
        })) {
          fireAway(board, randomSpot);
          pass = false;
          return {
            thisMove: randomSpot,
            nextMove: findNextMove(board, randomSpot)
          };
        } else {
          randomSpot = Math.floor(Math.random() * 100);
        }
      }
    }
  };

  return {
    playerInfo: playerInfo,
    fireAway: fireAway,
    findNextMove: findNextMove,
    roboPlay: roboPlay
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/scripts/factories/ship.js":
/*!***************************************!*\
  !*** ./src/scripts/factories/ship.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(name, length) {
  return {
    name: name,
    length: length,
    vertical: false,
    hits: Array(length).fill(null),
    position: [],
    changeAxis: function changeAxis(direction) {
      if (direction === "vertical") {
        this.vertical = true;
      } else if (direction === "horizontal") {
        this.vertical = false;
      }
    },
    hit: function hit(num) {
      var index = this.position.indexOf(Number(num));
      this.hits[index] = "hit";
    },
    isSunk: function isSunk() {
      return this.hits.every(function (position) {
        return position === "hit" ? true : false;
      });
    },
    resetPosition: function resetPosition() {
      return this.position = [];
    },
    resetHits: function resetHits() {
      this.hits = Array(this.length).fill(null);
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/scripts/helpers/ship-data.js":
/*!******************************************!*\
  !*** ./src/scripts/helpers/ship-data.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var shipData = [{
  name: "carrier",
  length: 5
}, {
  name: "battleship",
  length: 4
}, {
  name: "destroyer",
  length: 3
}, {
  name: "submarine",
  length: 2
}, {
  name: "patrol-boat",
  length: 1
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipData);

/***/ }),

/***/ "./src/scripts/modules/displayControl.js":
/*!***********************************************!*\
  !*** ./src/scripts/modules/displayControl.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/game.js */ "./src/scripts/factories/game.js");
/* harmony import */ var _roboGame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roboGame.js */ "./src/scripts/modules/roboGame.js");
/* harmony import */ var _twoPlayerGame_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./twoPlayerGame.js */ "./src/scripts/modules/twoPlayerGame.js");
/* harmony import */ var _dragAndDrop_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dragAndDrop.js */ "./src/scripts/modules/dragAndDrop.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






var displayController = function () {
  var game = (0,_factories_game_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Jerry");
  var boardOne = game.humanBoard.data.board;
  var boardTwo = game.roboBoard.data.board;
  var playerOne = game.humanBoard.data.player;
  var playerTwo = game.roboBoard.data.player;
  var boardOneDOM = document.getElementById("board-one");
  var boardTwoDOM = document.getElementById("board-two");
  var shipsDOM = document.getElementById("ships");
  var playerOneInfo = document.getElementsByClassName("player-one")[0];
  var playerTwoInfo = document.getElementsByClassName("player-two")[0];
  var playerOneName = document.getElementById("player-one-name-input");
  var playerTwoName = document.getElementById("player-two-name-input");
  var playerOneShipsLeft = document.getElementById("player-one-ships-left");
  var playerTwoShipsLeft = document.getElementById("player-two-ships-left");
  var gameStartup = document.getElementsByClassName("game-startup")[0];
  var startNext = document.getElementById("start-next-button");
  var turnSignal = document.getElementById("turn-signal-text");
  var startNextButton = document.getElementById("start-next-button"); // Display the Gameboards

  var renderBoard = function renderBoard(board, DOMelem) {
    board.forEach(function (cell) {
      var div = document.createElement("div");
      div.dataset.index = board.indexOf(cell);

      if (cell.hasShip === true) {
        div.classList.add("hasShip");
        div.classList.add("".concat(cell.shipType.name));
      } else {
        div.classList.add("noShip");
      }

      board === boardOne ? div.classList.add("board-one") : div.classList.add("board-two");
      DOMelem.appendChild(div);
    });
  };

  renderBoard(boardOne, boardOneDOM);
  renderBoard(boardTwo, boardTwoDOM);

  var removeBoard = function removeBoard(DOMelem) {
    while (DOMelem.firstChild) {
      DOMelem.removeChild(DOMelem.lastChild);
    }
  }; // Toggle button for number of players


  var checkbox = document.getElementById("players");
  var slider = document.getElementsByClassName("slider")[0];
  checkbox.addEventListener("input", function () {
    if (checkbox.checked === true) {
      slider.innerHTML = "<div class=\"one-player-logo\"></div>\n                One Two Player\n                <div class=\"two-player-logo\"></div>";
      playerTwoShipsLeft.innerText = 0;
      startNext.innerText = "Next";
      playerTwoName.textContent = "Player2";
      game.roboBoard.data.player.playerInfo.name = "Player2";
      playerTwoName.style.cursor = "default";
      playerTwoName.style.outline = "1px solid #6a7aac";
      playerTwoShipsLeft.innerText = 0;
    } else {
      slider.innerHTML = " <div class=\"one-player-logo\"></div>\n                One Player Two\n                <div class=\"two-player-logo\"></div>";
      boardOneDOM.style.display = "";
      playerOneInfo.style.display = "";
      boardTwoDOM.style.display = "none";
      playerTwoInfo.style.display = "none";
      startNext.innerText = "Start!";
      playerTwoName.textContent = "roboPlayer";
      playerTwoName.style.cursor = "";
      playerTwoName.style.outline = "";
    }
  }); // Find width of span textContent

  function textWidth(text, font) {
    font = font || "18px Original Surfer";
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    ctx.font = font;
    return ctx.measureText(text).width;
  } // Log playerName changes to each Player Object


  var updatePlayerNames = function updatePlayerNames() {
    var playerNames = [playerOneName, playerTwoName];
    playerNames.forEach(function (name) {
      return name.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
        } else if (textWidth(e.target.textContent) >= 140) {
          if (e.key !== "Backspace") {
            e.preventDefault();
          }
        }
      });
    });
    var config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    };

    var callback = function callback(mutationList) {
      var _iterator = _createForOfIteratorHelper(mutationList),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mutation = _step.value;

          try {
            if (mutation.target.textContent.length > 0) {
              var player = void 0;
              mutation.target.parentNode.id === "player-one-name-input" ? player = game.humanBoard.data.player : player = game.roboBoard.data.player;
              player.playerInfo.name = mutation.target.textContent;
              displayTurn();
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };

    var observer = new MutationObserver(callback);
    observer.observe(playerOneName, config);
    observer.observe(playerTwoName, config);
  };

  updatePlayerNames(); // Update player-info number of ships left

  var updateShipsLeft = function updateShipsLeft() {
    playerOneShipsLeft.textContent = game.humanBoard.data.ships.filter(function (ship) {
      return ship.hits.includes(null);
    }).length;
    playerTwoShipsLeft.textContent = game.roboBoard.data.ships.filter(function (ship) {
      return ship.hits.includes(null);
    }).length;
  }; // Display whose turn it is


  var displayTurn = function displayTurn() {
    if (gameStartup.style.display === "flex") {
      //if the game is still being setup
      playerOneInfo.style.display === "" ? turnSignal.innerText = "".concat(playerOne.playerInfo.name, "'s turn: place your ships on the board to start") : turnSignal.innerText = "".concat(playerTwo.playerInfo.name, "'s turn: place your ships on the board to start");
    } else {
      if (!game.humanBoard.allSunk() && !game.roboBoard.allSunk()) playerOneName.style.outline === "2px solid #e2c08c" ? turnSignal.innerText = "".concat(playerOne.playerInfo.name, "'s turn: fire away!") : turnSignal.innerText = "".concat(playerTwo.playerInfo.name, "'s turn: fire away!");
    }
  };

  displayTurn(); // Start a new game when users click on the button

  var newGameDOM = document.getElementById("new-game");

  var setupGame = function setupGame() {
    // Reset Game Objects
    game.reset();
    shipsDOM.style.display = "";
    playerOneShipsLeft.innerText = "0";
    playerTwoShipsLeft.innerText = "0";
    document.getElementsByClassName("player-one-ready")[0].style.display = "";
    document.getElementsByClassName("player-two-ready")[0].style.display = "";
    startNextButton.classList.remove("info-missing");
    playerOneName.classList.add("edit");
    playerTwoName.classList.add("edit");
    playerOneName.setAttribute("contentEditable", true);
    playerTwoName.setAttribute("contentEditable", true);
    playerOneName.style.outline = "1px dotted #6a7aac";
    playerTwoName.style.outline = "1px dotted #6a7aac";
    boardOneDOM.style.display = "";
    playerOneInfo.style.display = "";
    removeBoard(boardOneDOM);
    game.humanBoard.removeAllShips();
    renderBoard(boardOne, boardOneDOM);
    removeBoard(boardTwoDOM);
    game.roboBoard.removeAllShips();
    renderBoard(boardTwo, boardTwoDOM);
    checkbox.checked = false;
    slider.style.display = "flex";
    slider.innerHTML = " <div class=\"one-player-logo\"></div>\n                One Player Two\n                <div class=\"two-player-logo\"></div>";
    gameStartup.style.display = "flex";
    boardTwoDOM.style.display = "none";
    playerTwoInfo.style.display = "none";
    turnSignal.removeAttribute("class");
    displayTurn();
  }; // Call setupGame to start a new game on page load


  setupGame();
  newGameDOM.addEventListener("mousedown", setupGame);
  var randomlyPlaceButton = document.getElementById("randomly-place-button");

  var randomlyPlaceShips = function randomlyPlaceShips() {
    shipsDOM.style.display = "";
    startNextButton.classList.remove("info-missing");

    if (boardTwoDOM.style.display === "none") {
      removeBoard(boardOneDOM);
      game.humanBoard.removeAllShips();
      game.humanBoard.randomlyPlace(game.humanBoard.data.ships);
      renderBoard(boardOne, boardOneDOM);
      updateShipsLeft();
    } else if (boardOneDOM.style.display === "none") {
      removeBoard(boardTwoDOM);
      game.roboBoard.removeAllShips();
      game.roboBoard.randomlyPlace(game.roboBoard.data.ships);
      renderBoard(boardTwo, boardTwoDOM);
      updateShipsLeft();
    }
  };

  randomlyPlaceButton.addEventListener("mousedown", randomlyPlaceShips);
  var dragAndDropButton = document.getElementById("drag-and-drop-button");
  dragAndDropButton.addEventListener("mousedown", function () {
    _dragAndDrop_js__WEBPACK_IMPORTED_MODULE_3__["default"].run(game);
  }); // Control the game setup for both one-player and two-player

  var gameStartNext = function gameStartNext(e) {
    if (e.target.innerText === "Next" && playerOneShipsLeft.innerText !== "5" || e.target.innerText === "Start!" && playerOneShipsLeft.innerText !== "5" || e.target.innerText === "Start!" && checkbox.checked === true && playerTwoShipsLeft.innerText !== "5") {
      startNextButton.classList.add("info-missing");
      e.preventDefault(); // Prevent the game from starting when no Ships are on Board
    } else if (e.target.innerText === "Next") {
      // Two-player mode
      startNextButton.classList.remove("info-missing");
      boardOneDOM.style.display = "none";
      playerOneInfo.style.display = "none";
      boardTwoDOM.style.display = "";
      playerTwoInfo.style.display = "";
      shipsDOM.style.display = "";
      startNext.innerText = "Start!";
      playerTwoShipsLeft.innerText = 0;
      playerOneName.setAttribute("contentEditable", false);
      playerOneName.style.outline = "";
      playerTwoName.setAttribute("contentEditable", true);
      playerTwoName.style.outline = "";
      Array.from(document.getElementsByClassName("hasShip")).forEach(function (item) {
        return item.classList.add("hideShip");
      });
    } else if (e.target.innerText === "Start!") {
      shipsDOM.style.display = "";
      playerOneName.removeAttribute("class");
      playerTwoName.removeAttribute("class");
      startNextButton.classList.remove("info-missing");
      gameStartup.style.display = "";
      slider.style.display = "";
      boardOneDOM.style.display = "";
      playerOneInfo.style.display = "";
      playerTwoInfo.style.display = "";
      playerOneName.setAttribute("contentEditable", false);
      playerOneName.style.outline = "";
      playerTwoName.setAttribute("contentEditable", false);
      playerTwoName.style.outline = "";

      if (checkbox.checked === false) {
        playerTwoName.textContent = "roboPlayer"; // Call roboGame module

        _roboGame_js__WEBPACK_IMPORTED_MODULE_1__["default"].runGame(game);
      } else if (checkbox.checked === true) {
        Array.from(document.getElementsByClassName("hasShip")).forEach(function (item) {
          return item.classList.add("hideShip");
        }); // Call twoPlayerGame module

        _twoPlayerGame_js__WEBPACK_IMPORTED_MODULE_2__["default"].runGame(game);
      }
    }
  };

  startNextButton.addEventListener("mousedown", gameStartNext);
  return {
    renderBoard: renderBoard,
    removeBoard: removeBoard,
    updateShipsLeft: updateShipsLeft,
    displayTurn: displayTurn
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayController);

/***/ }),

/***/ "./src/scripts/modules/dragAndDrop.js":
/*!********************************************!*\
  !*** ./src/scripts/modules/dragAndDrop.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _displayControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayControl */ "./src/scripts/modules/displayControl.js");


var dragAndDrop = function () {
  var checkbox = document.getElementById("players");
  var playerOneShipsLeft = document.getElementById("player-one-ships-left");
  var playerTwoShipsLeft = document.getElementById("player-two-ships-left");
  var boardOneDOM = document.getElementById("board-one");
  var boardTwoDOM = document.getElementById("board-two");
  var shipsDOM = document.getElementById("ships");
  var carrier = document.getElementById("carrier");
  var battleship = document.getElementById("battleship");
  var destroyer = document.getElementById("destroyer");
  var submarine = document.getElementById("submarine");
  var patrolBoat = document.getElementById("patrol-boat");
  var changeDirections = document.getElementById("change-directions");
  var startNextButton = document.getElementById("start-next-button");
  var targets = [boardOneDOM, boardTwoDOM];
  var shipsArray = [carrier, battleship, destroyer, submarine, patrolBoat];

  var run = function run(game) {
    var verticalShips = function verticalShips() {
      shipsDOM.style.flexDirection = "row";
      shipsArray.forEach(function (ship) {
        ship.style.flexDirection = "column";
        ship.dataset.vertical = "true";
      });
      vertical = true;
    };

    var horizontalShips = function horizontalShips() {
      shipsDOM.style.flexDirection = "";
      shipsArray.forEach(function (ship) {
        ship.style.flexDirection = "";
        ship.dataset.vertical = "false";
      });
      vertical = false;
    };

    var vertical = false;
    var boardOne = game.humanBoard.data.board;
    var boardTwo = game.roboBoard.data.board;
    horizontalShips();
    shipsDOM.style.display = "flex";
    shipsArray.forEach(function (ship) {
      return ship.style.display = "";
    }); // Remove any ships already on the board

    if (checkbox.checked === false) {
      _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].removeBoard(boardOneDOM);
      game.humanBoard.removeAllShips();
      _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].renderBoard(boardOne, boardOneDOM);
      playerOneShipsLeft.innerText = 0;
    } else if (checkbox.checked === true) {
      if (boardOneDOM.style.display === "") {
        _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].removeBoard(boardOneDOM);
        game.humanBoard.removeAllShips();
        _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].renderBoard(boardOne, boardOneDOM);
        playerOneShipsLeft.innerText = 0;
      } else if (boardTwoDOM.style.display === "") {
        _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].removeBoard(boardTwoDOM);
        game.roboBoard.removeAllShips();
        _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].renderBoard(boardTwo, boardTwoDOM);
        playerTwoShipsLeft.innerText = 0;
      }
    }

    changeDirections.addEventListener("mousedown", function () {
      vertical === false ? verticalShips() : horizontalShips();
    });
    var dragged = null;
    shipsArray.forEach(function (ship) {
      return ship.addEventListener("dragstart", function (e) {
        startNextButton.classList.remove("info-missing");
        dragged = e.target;
      });
    });
    targets.forEach(function (target) {
      return target.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
    });
    targets.forEach(function (target) {
      return target.addEventListener("drop", function (e) {
        var index = e.target.dataset.index;
        var board;
        var ship;

        if (e.target.classList[1] === "board-one") {
          board = game.humanBoard;
          board.data.ships.forEach(function (boat) {
            if (boat.name === dragged.id) {
              ship = boat;
            }
          });

          if (dragged.dataset.vertical === "true") {
            ship.vertical = true;
          } else {
            ship.vertical = false;
          }

          if (board.checkShips(ship, index) && board.checkEdges(ship, index)) {
            board.placeShip(ship, Number(index));
            _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].removeBoard(boardOneDOM);
            _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].renderBoard(boardOne, boardOneDOM);
            playerOneShipsLeft.innerText = board.data.ships.filter(function (ship) {
              return ship.position.length > 0;
            }).length;
            dragged.style.display = "none";
          }
        } else {
          board = game.roboBoard;
          board.data.ships.forEach(function (boat) {
            if (boat.name === dragged.id) {
              ship = boat;
            }
          });

          if (dragged.dataset.vertical === "true") {
            ship.vertical = true;
          } else {
            ship.vertical = false;
          }

          if (board.checkShips(ship, index) && board.checkEdges(ship, index)) {
            board.placeShip(ship, Number(index));
            _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].removeBoard(boardTwoDOM);
            _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].renderBoard(boardTwo, boardTwoDOM);
            playerTwoShipsLeft.innerText = board.data.ships.filter(function (ship) {
              return ship.position.length > 0;
            }).length;
            dragged.style.display = "none";
          }
        }
      });
    });
  };

  return {
    run: run
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dragAndDrop);

/***/ }),

/***/ "./src/scripts/modules/roboGame.js":
/*!*****************************************!*\
  !*** ./src/scripts/modules/roboGame.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _displayControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayControl */ "./src/scripts/modules/displayControl.js");


var roboGame = function () {
  var boardTwoDOM = document.getElementById("board-two");
  var playerOneName = document.getElementById("player-one-name-input");
  var playerTwoName = document.getElementById("player-two-name-input");
  var turnSignal = document.getElementById("turn-signal-text");

  var runGame = function runGame(game) {
    var playerOne = game.humanBoard.data.player;
    var playerTwo = game.roboBoard.data.player;
    var boardTwo = game.roboBoard.data.board;
    boardTwoDOM.style.display = "";
    _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].removeBoard(boardTwoDOM);
    game.roboBoard.removeAllShips();
    game.roboBoard.randomlyPlace(game.roboBoard.data.ships);
    _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].renderBoard(boardTwo, boardTwoDOM);
    Array.from(document.getElementById("board-two").childNodes).forEach(function (item) {
      return item.classList.add("hideShip");
    });

    var playerFire = function playerFire(e) {
      turnSignal.removeAttribute("class");
      var index = e.target.getAttribute("data-index");

      if (game.roboBoard.data.board[index].isHit === true) {
        e.preventDefault();
      } else {
        game.roboBoard.receiveAttack(index);

        if (game.roboBoard.data.board[index].hasShip === true) {
          game.roboBoard.data.board[index].isHit = true;
          e.target.classList.add("hit");
          turnSignal.innerText = "HIT!";
          turnSignal.classList.add("hit");
          _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].updateShipsLeft();
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

    var playerTurn = function playerTurn() {
      playerTwoName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerOneName.style.outline = "2px solid #e2c08c";
      turnSignal.innerText = "".concat(playerOne.playerInfo.name, "'s turn: fire away!");
      Array.from(boardTwoDOM.childNodes).forEach(function (div) {
        return div.addEventListener("mousedown", playerFire);
      });
    };

    playerTurn();

    var roboFire = function roboFire() {
      playerOneName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerTwoName.style.outline = "2px solid #e2c08c";
      turnSignal.innerText = "".concat(playerTwo.playerInfo.name, "'s turn: fire away!");
      setTimeout(roboAttack, 500);
    };

    var nextRoboMove;

    var roboAttack = function roboAttack() {
      var roboMove = game.roboBoard.data.player.roboPlay(game.humanBoard, nextRoboMove);

      if (roboMove.nextMove) {
        nextRoboMove = roboMove.nextMove;
      }

      var boardPiece = document.querySelector("[data-index='".concat(roboMove.thisMove, "']"));

      if (game.humanBoard.data.board[roboMove.thisMove].hasShip === true) {
        game.humanBoard.data.board[roboMove.thisMove].isHit = true;
        boardPiece.classList.add("hit");
        turnSignal.innerText = "HIT!";
        turnSignal.classList.add("hit");
        _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].updateShipsLeft();
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

    var roboTurn = function roboTurn() {
      Array.from(boardTwoDOM.childNodes).forEach(function (div) {
        return div.removeEventListener("mousedown", playerFire);
      });
      setTimeout(roboFire, 500);
    };

    var endGame = function endGame() {
      if (game.roboBoard.allSunk()) {
        Array.from(boardTwoDOM.childNodes).forEach(function (div) {
          return div.removeEventListener("mousedown", playerFire);
        });
        playerOneName.style.outline = "2px solid #e2c08c";
        playerTwoName.style.outline = "";
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = "".concat(playerOne.playerInfo.name, " wins!!!!!");
      } else if (game.humanBoard.allSunk()) {
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = "".concat(playerTwo.playerInfo.name, " wins!!!!!");
        playerOneName.style.outline = "";
        playerTwoName.style.outline = "2px solid #e2c08c";
      }
    };
  };

  return {
    runGame: runGame
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (roboGame);

/***/ }),

/***/ "./src/scripts/modules/twoPlayerGame.js":
/*!**********************************************!*\
  !*** ./src/scripts/modules/twoPlayerGame.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _displayControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayControl */ "./src/scripts/modules/displayControl.js");


var twoPlayerGame = function () {
  var boardOneDOM = document.getElementById("board-one");
  var boardTwoDOM = document.getElementById("board-two");
  var playerOneName = document.getElementById("player-one-name-input");
  var playerTwoName = document.getElementById("player-two-name-input");
  var turnSignal = document.getElementById("turn-signal-text");
  var playerOneReadyDOM = document.getElementById("player-one-ready-button");
  var playerTwoReadyDOM = document.getElementById("player-two-ready-button");
  var newGameDOM = document.getElementById("new-game");

  var runGame = function runGame(game) {
    var playerOne = game.humanBoard.data.player;
    var playerTwo = game.roboBoard.data.player;
    var boardOne = game.humanBoard;
    var boardTwo = game.roboBoard;

    var playerOneNotReady = function playerOneNotReady() {
      boardTwoDOM.classList.add("player-not-ready");
    };

    newGameDOM.addEventListener("mousedown", function () {
      boardOneDOM.removeEventListener("mousedown", playerTwoNotReady);
      boardTwoDOM.removeEventListener("mousedown", playerOneNotReady);
      boardOneDOM.classList.remove("player-not-ready");
      boardTwoDOM.classList.remove("player-not-ready");
    });

    var playerOneTurn = function playerOneTurn() {
      playerTwoName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerOneName.style.outline = "2px solid #e2c08c"; // Display playerNext button

      document.getElementsByClassName("player-one-ready")[0].style.display = "flex";
      boardTwoDOM.addEventListener("mousedown", playerOneNotReady);
    };

    playerOneTurn();

    var playerOneReady = function playerOneReady() {
      boardTwoDOM.removeEventListener("mousedown", playerOneNotReady);
      boardTwoDOM.classList.remove("player-not-ready");
      Array.from(boardOneDOM.childNodes).forEach(function (div) {
        if (Array.from(div.classList).includes("hideShip")) {
          div.classList.remove("hideShip");
        }
      });
      document.getElementsByClassName("player-one-ready")[0].style.display = "";
      Array.from(boardTwoDOM.childNodes).forEach(function (div) {
        return div.addEventListener("mousedown", playerOneFire);
      });
    };

    playerOneReadyDOM.addEventListener("mousedown", playerOneReady);

    var playerOneFire = function playerOneFire(e) {
      Array.from(document.getElementsByClassName("hasShip")).forEach(function (item) {
        return item.classList.add("hideShip");
      });
      turnSignal.removeAttribute("class");
      var index = e.target.getAttribute("data-index");

      if (boardTwo.data.board[index].isHit === true) {
        e.preventDefault();
      } else {
        boardTwo.receiveAttack(index);

        if (boardTwo.data.board[index].hasShip === true) {
          boardTwo.data.board[index].isHit = true;
          e.target.classList.add("hit");
          turnSignal.innerText = "HIT!";
          turnSignal.classList.add("hit");
          _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].updateShipsLeft();
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

      Array.from(boardTwoDOM.childNodes).forEach(function (div) {
        return div.removeEventListener("mousedown", playerOneFire);
      });
    };

    var playerTwoNotReady = function playerTwoNotReady() {
      boardOneDOM.classList.add("player-not-ready");
    };

    var playerTwoTurn = function playerTwoTurn() {
      playerOneName.style.outline = "";
      turnSignal.removeAttribute("class");
      playerTwoName.style.outline = "2px solid #e2c08c";
      document.getElementsByClassName("player-two-ready")[0].style.display = "flex";
      boardOneDOM.addEventListener("mousedown", playerTwoNotReady);
    };

    var playerTwoReady = function playerTwoReady() {
      boardOneDOM.removeEventListener("mousedown", playerTwoNotReady);
      boardOneDOM.classList.remove("player-not-ready");
      Array.from(boardTwoDOM.childNodes).forEach(function (div) {
        if (Array.from(div.classList).includes("hideShip")) {
          div.classList.remove("hideShip");
        }
      });
      document.getElementsByClassName("player-two-ready")[0].style.display = "";
      Array.from(boardOneDOM.childNodes).forEach(function (div) {
        return div.addEventListener("mousedown", playerTwoFire);
      });
    };

    playerTwoReadyDOM.addEventListener("mousedown", playerTwoReady);

    var playerTwoFire = function playerTwoFire(e) {
      Array.from(document.getElementsByClassName("hasShip")).forEach(function (item) {
        return item.classList.add("hideShip");
      });
      turnSignal.removeAttribute("class");
      var index = e.target.getAttribute("data-index");

      if (boardOne.data.board[index].isHit === true) {
        e.preventDefault();
      } else {
        boardOne.receiveAttack(index);

        if (boardOne.data.board[index].hasShip === true) {
          boardOne.data.board[index].isHit = true;
          e.target.classList.add("hit");
          turnSignal.innerText = "HIT!";
          turnSignal.classList.add("hit");
          _displayControl__WEBPACK_IMPORTED_MODULE_0__["default"].updateShipsLeft();
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

      Array.from(boardOneDOM.childNodes).forEach(function (div) {
        return div.removeEventListener("mousedown", playerTwoFire);
      });
    };

    var endGame = function endGame() {
      if (boardTwo.allSunk()) {
        document.getElementsByClassName("player-ready")[0].style.display = "";
        Array.from(boardTwoDOM.childNodes).forEach(function (div) {
          return div.removeEventListener("mousedown", playerOneFire);
        });
        playerOneName.style.outline = "2px solid #e2c08c";
        playerTwoName.style.outline = "";
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = "".concat(playerOne.playerInfo.name, " wins!!!!!");
      } else if (boardOne.allSunk()) {
        document.getElementsByClassName("player-ready")[0].style.display = "";
        Array.from(boardOneDOM.childNodes).forEach(function (div) {
          return div.removeEventListener("mousedown", playerTwoFire);
        });
        turnSignal.removeAttribute("class");
        turnSignal.classList.add("winner");
        turnSignal.innerText = "".concat(playerTwo.playerInfo.name, " wins!!!!!");
        playerOneName.style.outline = "";
        playerTwoName.style.outline = "2px solid #e2c08c";
      }
    };
  };

  return {
    runGame: runGame
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (twoPlayerGame);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/japanese-waves.png */ "./src/assets/japanese-waves.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/one-player.png */ "./src/assets/one-player.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/two-player.png */ "./src/assets/two-player.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Original+Surfer&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Original+Surfer&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  overflow: auto;\n  font-family: \"Lato\", sans-serif;\n  min-width: 400px;\n}\n\n.container {\n  min-height: 100vh;\n  min-width: 100vw;\n  background-color: rgb(248, 248, 255);\n  background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  font-family: \"Lato\", sans-serif;\n  display: grid;\n  grid-template: 140px 75px 75px 1fr 75px 75px/1fr;\n}\n\n.header {\n  font-family: \"Original Surfer\", \"cursive\";\n  display: flex;\n  align-items: center;\n  margin: 30px 50px;\n  grid-area: 1/1/2/2;\n}\n.header .header-left {\n  font-size: 40px;\n}\n.header .header-right {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-left: auto;\n  margin-top: 50px;\n  font-size: 20px;\n  z-index: 10;\n}\n.header .header-right #new-game:hover,\n.header .header-right #one-player:hover,\n.header .header-right #two-player:hover {\n  color: #6a7aac;\n  cursor: pointer;\n}\n.header .header-right .game-players {\n  font-family: \"Lato\", sans-serif;\n  font-size: 13px;\n  margin-top: 10px;\n}\n.header .header-right .game-players div {\n  margin-bottom: 3px;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\n.turn-signal {\n  grid-area: 2/1/3/2;\n  width: 100%;\n  height: 100%;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 150px;\n  height: 34px;\n  margin-top: 5px;\n}\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.switch .slider {\n  display: none;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  width: 150px;\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgb(248, 248, 255);\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n  border-radius: 7px;\n}\n.switch .slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 50px;\n  left: 97px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: 0.5s;\n  transition: 0.5s;\n  border-radius: 7px;\n}\n.switch .slider .one-player-logo,\n.switch .slider .two-player-logo {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-size: 100%;\n  background-repeat: no-repeat;\n  background-position: center center;\n  width: 18px;\n  height: 18px;\n}\n.switch .slider .two-player-logo {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n}\n.switch input:checked + .slider {\n  background-color: #e2c08c;\n}\n.switch input:focus + .slider {\n  box-shadow: 0 0 1px #6a7aac;\n}\n.switch input:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(-93px);\n}\n\n.turn-signal {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n}\n.turn-signal .hit {\n  font-family: \"Original Surfer\", \"cursive\";\n  font-size: 24px;\n}\n.turn-signal .miss {\n  font-family: \"Original Surfer\", \"cursive\";\n  font-size: 24px;\n}\n.turn-signal .winner {\n  font-family: \"Original Surfer\", \"cursive\";\n  font-size: 32px;\n  color: #6a7aac;\n}\n\n.player-info {\n  grid-area: 3/1/4/2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 100px;\n  font-family: \"Lato\", sans-serif;\n}\n.player-info div {\n  display: flex;\n  justify-content: space-between;\n  width: 300px;\n  font-size: 15px;\n  line-height: 35px;\n}\n.player-info #player-one-name,\n.player-info #player-two-name {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 7px;\n}\n.player-info #player-one-name-input,\n.player-info #player-two-name-input {\n  display: flex;\n  align-items: center;\n  background-color: #f8f1e8;\n  width: 150px;\n  height: 35px;\n  padding: 5px;\n  border-radius: 7px;\n  z-index: 20;\n  outline: 1px solid #6a7aac;\n}\n.player-info .edit:hover {\n  box-shadow: 1px 1px #6a7aac;\n}\n.player-info #player-one-ships,\n.player-info #player-two-ships {\n  display: flex;\n  align-items: center;\n  width: 130px;\n}\n.player-info span {\n  font-family: \"Original Surfer\", \"cursive\";\n  font-size: 18px;\n}\n\n.battle-boards {\n  grid-area: 4/1/5/2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 100px;\n  padding: 30px;\n  position: relative;\n}\n.battle-boards #board-one,\n.battle-boards #board-two {\n  width: 300px;\n  height: 300px;\n  background-color: rgba(248, 248, 255, 0.9);\n  display: grid;\n  grid-template: repeat(10, 30px)/repeat(10, 30px);\n  outline: 1px solid #6a7aac;\n}\n.battle-boards #board-one div,\n.battle-boards #board-two div {\n  outline: 0.3px solid #6a7aac;\n  height: 100%;\n  width: 100%;\n}\n.battle-boards #board-one div:hover,\n.battle-boards #board-two div:hover {\n  box-shadow: inset 1px 1px #6a7aac;\n  cursor: pointer;\n}\n.battle-boards #board-one .hasShip,\n.battle-boards #board-two .hasShip {\n  background-color: #e2c08c;\n}\n.battle-boards #board-one .hideShip,\n.battle-boards #board-two .hideShip {\n  background-color: transparent;\n}\n.battle-boards #board-one .hit,\n.battle-boards #board-two .hit {\n  background-color: #e2958c;\n}\n.battle-boards #board-one .miss,\n.battle-boards #board-two .miss {\n  background-color: #8ce2c0;\n}\n\n#ships {\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 220px;\n  width: 220px;\n  gap: 10px;\n  top: -20px;\n  position: relative;\n}\n#ships div {\n  display: flex;\n}\n#ships div div {\n  width: 30px;\n  height: 30px;\n  background-color: #e2c08c;\n  border: 0.5px dotted rgb(248, 248, 255);\n  cursor: pointer;\n}\n#ships #change-directions {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  width: 120px;\n  height: 40px;\n  bottom: -55px;\n  background-color: #6a7aac;\n  border-radius: 7px;\n  color: white;\n  font-size: 13px;\n}\n\n.player-not-ready,\n.info-missing {\n  position: relative;\n}\n.player-not-ready:after,\n.info-missing:after {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  position: absolute;\n  height: 35px;\n  width: 250px;\n  bottom: -43px;\n  left: 5px;\n  border-radius: 7px;\n  padding: 0 20px;\n  content: \"Hit the 'Ready' button below to reveal your ships and fire at your opponent\";\n  background-color: #e2c08c;\n  font-family: \"Lato\", sans-serif;\n  font-size: 13px;\n  color: black;\n}\n\n.game-startup,\n.player-one-ready,\n.player-two-ready {\n  display: none;\n  align-items: center;\n  justify-content: center;\n  gap: 60px;\n  grid-area: 5/1/6/2;\n}\n.game-startup div,\n.player-one-ready div,\n.player-two-ready div {\n  border-radius: 7px;\n  background-color: #6a7aac;\n  box-shadow: 1px 1px rgb(248, 248, 255);\n  color: white;\n  font-size: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.game-startup #randomly-place-button,\n.game-startup #drag-and-drop-button,\n.player-one-ready #randomly-place-button,\n.player-one-ready #drag-and-drop-button,\n.player-two-ready #randomly-place-button,\n.player-two-ready #drag-and-drop-button {\n  width: 190px;\n  height: 40px;\n}\n.game-startup #randomly-place-button:hover,\n.game-startup #drag-and-drop-button:hover,\n.player-one-ready #randomly-place-button:hover,\n.player-one-ready #drag-and-drop-button:hover,\n.player-two-ready #randomly-place-button:hover,\n.player-two-ready #drag-and-drop-button:hover {\n  background-color: rgb(248, 248, 255);\n  color: #6a7aac;\n  box-shadow: 2px 2px #6a7aac;\n}\n.game-startup #start-next-button,\n.player-one-ready #start-next-button,\n.player-two-ready #start-next-button {\n  font-family: \"Original Surfer\", \"cursive\";\n  font-size: 24px;\n  text-shadow: 1px 1px #e2c08c;\n  width: 100px;\n  height: 50px;\n}\n.game-startup #start-next-button:hover,\n.player-one-ready #start-next-button:hover,\n.player-two-ready #start-next-button:hover {\n  background-color: rgb(248, 248, 255);\n  color: #e2c08c;\n  box-shadow: 2px 2px #6a7aac;\n}\n.game-startup .info-missing:after,\n.player-one-ready .info-missing:after,\n.player-two-ready .info-missing:after {\n  top: -39px;\n  left: auto;\n  content: \"You must place all of your ships on the gameboard before continuing\";\n}\n\n#player-one-ready-button,\n#player-two-ready-button {\n  font-family: \"Original Surfer\", \"cursive\";\n  font-size: 24px;\n  text-shadow: 1px 1px #e2c08c;\n  width: 100px;\n  height: 50px;\n}\n#player-one-ready-button:hover,\n#player-two-ready-button:hover {\n  background-color: rgb(248, 248, 255);\n  color: #e2c08c;\n  box-shadow: 2px 2px #6a7aac;\n}\n\n.footer {\n  display: flex;\n  align-items: center;\n  background-color: rgba(0, 0, 0, 0.5);\n  grid-area: 6/1/7/2;\n}\n.footer .made-by {\n  color: rgb(248, 248, 255);\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  font-size: 13px;\n  padding: 7px;\n  border-radius: 7px;\n  width: 100%;\n}\n.footer .made-by a {\n  text-decoration: none;\n  color: rgb(248, 248, 255);\n}\n.footer .made-by img {\n  height: 16px;\n  transition: transform 0.3s ease-in-out;\n}\n.footer .made-by #github-icon {\n  max-height: 16px;\n}\n.footer .made-by img:hover {\n  transform: rotate(360deg) scale(1.2);\n}\n\n@media screen and (max-width: 760px) {\n  .header .header-left {\n    font-size: 32px;\n  }\n  .turn-signal {\n    font-size: 16px;\n  }\n  .turn-signal .hit {\n    font-size: 20px;\n  }\n  .turn-signal .miss {\n    font-size: 20px;\n  }\n  .turn-signal .winner {\n    font-size: 26px;\n  }\n  .player-info {\n    flex-direction: column;\n    justify-content: flex-start;\n    gap: 400px;\n    margin-top: 20px;\n  }\n  .battle-boards {\n    flex-direction: column;\n    gap: 100px;\n    margin-bottom: 90px;\n  }\n  #ships {\n    margin-top: -70px;\n    margin-bottom: 20px;\n    order: 1;\n  }\n  #change-directions {\n    margin-bottom: 10px;\n  }\n  .game-startup {\n    flex-direction: column;\n    gap: 10px;\n    margin-top: -180px;\n  }\n  .randomly-place {\n    position: relative;\n    top: 160px;\n  }\n  #randomly-place-button,\n#drag-and-drop-button,\n#start-next-button {\n    font-size: 14px;\n  }\n  .player-one-ready,\n.player-two-ready {\n    margin-top: -200px;\n  }\n  .player-not-ready:after {\n    left: 5px;\n    bottom: -37px;\n  }\n}\n@media screen and (max-width: 500px) {\n  .header .header-left {\n    font-size: 28px;\n  }\n  .turn-signal {\n    font-size: 14px;\n  }\n  .turn-signal .hit {\n    font-size: 16px;\n  }\n  .turn-signal .miss {\n    font-size: 16px;\n  }\n  .turn-signal .winner {\n    font-size: 20px;\n  }\n  .player-info {\n    flex-direction: column;\n    justify-content: flex-start;\n    gap: 290px;\n    margin-top: 20px;\n  }\n  .battle-boards #board-one,\n.battle-boards #board-two {\n    width: 200px;\n    height: 200px;\n    grid-template: repeat(10, 20px)/repeat(10, 20px);\n  }\n  #ships {\n    top: -10px;\n    width: 160px;\n    height: 160px;\n  }\n  #ships div div {\n    width: 20px;\n    height: 20px;\n  }\n}", "",{"version":3,"sources":["webpack://./src/styles/index.scss"],"names":[],"mappings":"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","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Original+Surfer&display=swap\");\n@import url(\"https://fonts.googleapis.com/css2?family=Original+Surfer&display=swap\");\n\n$background-color: rgb(248, 248, 255);\n$board-color: rgba(248, 248, 255, 0.9);\n$ship-color: #e2c08c;\n$highlight-color: #6a7aac;\n$header-font: \"Original Surfer\", \"cursive\";\n$main-font: \"Lato\", sans-serif;\n$medium: 760px;\n$small: 500px;\n\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  overflow: auto;\n  font-family: $main-font;\n  min-width: 400px;\n}\n\n.container {\n  min-height: 100vh;\n  min-width: 100vw;\n  background-color: $background-color;\n  background: linear-gradient(\n      rgba(255, 255, 255, 0.4),\n      rgba(255, 255, 255, 0.4)\n    ),\n    url(\"../assets/japanese-waves.png\");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  font-family: $main-font;\n  display: grid;\n  grid-template: 140px 75px 75px 1fr 75px 75px / 1fr;\n}\n\n.header {\n  font-family: $header-font;\n  display: flex;\n  align-items: center;\n  margin: 30px 50px;\n  grid-area: 1 / 1 / 2 / 2;\n  .header-left {\n    font-size: 40px;\n  }\n  .header-right {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-left: auto;\n    margin-top: 50px;\n    font-size: 20px;\n    z-index: 10;\n    #new-game:hover,\n    #one-player:hover,\n    #two-player:hover {\n      color: $highlight-color;\n      cursor: pointer;\n    }\n    .game-players {\n      font-family: $main-font;\n      font-size: 13px;\n      margin-top: 10px;\n      div {\n        margin-bottom: 3px;\n        display: flex;\n        align-items: center;\n        gap: 15px;\n      }\n    }\n  }\n}\n\n.turn-signal {\n  grid-area: 2 / 1 / 3 / 2;\n  width: 100%;\n  height: 100%;\n}\n\n// Toggle number of players\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 150px;\n  height: 34px;\n  margin-top: 5px;\n  input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n  }\n  .slider {\n    display: none;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    width: 150px;\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: $background-color;\n    -webkit-transition: 0.4s;\n    transition: 0.4s;\n    border-radius: 7px;\n    &:before {\n      position: absolute;\n      content: \"\";\n      height: 26px;\n      width: 50px;\n      left: 97px;\n      bottom: 4px;\n      background-color: white;\n      -webkit-transition: 0.5s;\n      transition: 0.5s;\n      border-radius: 7px;\n    }\n    .one-player-logo,\n    .two-player-logo {\n      background-image: url(\"../assets/one-player.png\");\n      background-size: 100%;\n      background-repeat: no-repeat;\n      background-position: center center;\n      width: 18px;\n      height: 18px;\n    }\n    .two-player-logo {\n      background-image: url(\"../assets/two-player.png\");\n    }\n  }\n  input:checked + .slider {\n    background-color: $ship-color;\n  }\n  input:focus + .slider {\n    box-shadow: 0 0 1px $highlight-color;\n  }\n  input:checked + .slider:before {\n    -webkit-transform: translateX(26px);\n    -ms-transform: translateX(26px);\n    transform: translateX(-93px);\n  }\n}\n\n.turn-signal {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  .hit {\n    font-family: $header-font;\n    font-size: 24px;\n  }\n  .miss {\n    font-family: $header-font;\n    font-size: 24px;\n  }\n  .winner {\n    font-family: $header-font;\n    font-size: 32px;\n    color: $highlight-color;\n  }\n}\n\n.player-info {\n  grid-area: 3 / 1 / 4 / 2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 100px;\n  font-family: $main-font;\n  div {\n    display: flex;\n    justify-content: space-between;\n    width: 300px;\n    font-size: 15px;\n    line-height: 35px;\n  }\n  #player-one-name,\n  #player-two-name {\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    gap: 7px;\n  }\n  #player-one-name-input,\n  #player-two-name-input {\n    display: flex;\n    align-items: center;\n    background-color: #f8f1e8;\n    width: 150px;\n    height: 35px;\n    padding: 5px;\n    border-radius: 7px;\n    z-index: 20;\n    outline: 1px solid $highlight-color;\n  }\n  .edit {\n    &:hover {\n      box-shadow: 1px 1px $highlight-color;\n    }\n  }\n  #player-one-ships,\n  #player-two-ships {\n    display: flex;\n    align-items: center;\n    width: 130px;\n  }\n  span {\n    font-family: $header-font;\n    font-size: 18px;\n  }\n}\n\n.battle-boards {\n  grid-area: 4 / 1 / 5 / 2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 100px;\n  padding: 30px;\n  position: relative;\n  #board-one,\n  #board-two {\n    width: 300px;\n    height: 300px;\n    background-color: $board-color;\n    display: grid;\n    grid-template: repeat(10, 30px) / repeat(10, 30px);\n    outline: 1px solid $highlight-color;\n    div {\n      outline: 0.3px solid $highlight-color;\n      height: 100%;\n      width: 100%;\n      &:hover {\n        box-shadow: inset 1px 1px $highlight-color;\n        cursor: pointer;\n      }\n    }\n    .hasShip {\n      background-color: $ship-color;\n    }\n    .hideShip {\n      background-color: transparent;\n    }\n    .hit {\n      background-color: #e2958c;\n    }\n    .miss {\n      background-color: #8ce2c0;\n    }\n  }\n}\n\n#ships {\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 220px;\n  width: 220px;\n  gap: 10px;\n  top: -20px;\n  position: relative;\n  div {\n    display: flex;\n    div {\n      width: 30px;\n      height: 30px;\n      background-color: $ship-color;\n      border: 0.5px dotted $background-color;\n      cursor: pointer;\n    }\n  }\n  #change-directions {\n    position: absolute;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    width: 120px;\n    height: 40px;\n    bottom: -55px;\n    background-color: $highlight-color;\n    border-radius: 7px;\n    color: white;\n    font-size: 13px;\n  }\n}\n\n.player-not-ready,\n.info-missing {\n  position: relative;\n  &:after {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    position: absolute;\n    height: 35px;\n    width: 250px;\n    bottom: -43px;\n    left: 5px;\n    border-radius: 7px;\n    padding: 0 20px;\n    content: \"Hit the 'Ready' button below to reveal your ships and fire at your opponent\";\n    background-color: $ship-color;\n    font-family: $main-font;\n    font-size: 13px;\n    color: black;\n  }\n}\n\n.game-startup,\n.player-one-ready,\n.player-two-ready {\n  display: none;\n  align-items: center;\n  justify-content: center;\n  gap: 60px;\n  grid-area: 5 / 1 / 6 / 2;\n  div {\n    border-radius: 7px;\n    background-color: $highlight-color;\n    box-shadow: 1px 1px $background-color;\n    color: white;\n    font-size: 16px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n  }\n  #randomly-place-button,\n  #drag-and-drop-button {\n    width: 190px;\n    height: 40px;\n    &:hover {\n      background-color: $background-color;\n      color: $highlight-color;\n      box-shadow: 2px 2px $highlight-color;\n    }\n  }\n  #start-next-button {\n    font-family: $header-font;\n    font-size: 24px;\n    text-shadow: 1px 1px $ship-color;\n    width: 100px;\n    height: 50px;\n    &:hover {\n      background-color: $background-color;\n      color: $ship-color;\n      box-shadow: 2px 2px $highlight-color;\n    }\n  }\n  .info-missing {\n    &:after {\n      top: -39px;\n      left: auto;\n      content: \"You must place all of your ships on the gameboard before continuing\";\n    }\n  }\n}\n\n#player-one-ready-button,\n#player-two-ready-button {\n  font-family: $header-font;\n  font-size: 24px;\n  text-shadow: 1px 1px $ship-color;\n  width: 100px;\n  height: 50px;\n  &:hover {\n    background-color: $background-color;\n    color: $ship-color;\n    box-shadow: 2px 2px $highlight-color;\n  }\n}\n\n.footer {\n  display: flex;\n  align-items: center;\n  background-color: rgba(0, 0, 0, 0.5);\n  grid-area: 6 / 1 / 7 / 2;\n  .made-by {\n    color: $background-color;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    font-size: 13px;\n    padding: 7px;\n    border-radius: 7px;\n    width: 100%;\n    a {\n      text-decoration: none;\n      color: $background-color;\n    }\n    img {\n      height: 16px;\n      transition: transform 0.3s ease-in-out;\n    }\n    #github-icon {\n      max-height: 16px;\n    }\n    img:hover {\n      transform: rotate(360deg) scale(1.2);\n    }\n  }\n}\n\n@media screen and (max-width: $medium) {\n  .header {\n    .header-left {\n      font-size: 32px;\n    }\n  }\n  .turn-signal {\n    font-size: 16px;\n    .hit {\n      font-size: 20px;\n    }\n    .miss {\n      font-size: 20px;\n    }\n    .winner {\n      font-size: 26px;\n    }\n  }\n  .player-info {\n    flex-direction: column;\n    justify-content: flex-start;\n    gap: 400px;\n    margin-top: 20px;\n  }\n\n  .battle-boards {\n    flex-direction: column;\n    gap: 100px;\n    margin-bottom: 90px;\n  }\n  #ships {\n    margin-top: -70px;\n    margin-bottom: 20px;\n    order: 1;\n  }\n  #change-directions {\n    margin-bottom: 10px;\n  }\n  .game-startup {\n    flex-direction: column;\n    gap: 10px;\n    margin-top: -180px;\n  }\n  .randomly-place {\n    position: relative;\n    top: 160px;\n  }\n  #randomly-place-button,\n  #drag-and-drop-button,\n  #start-next-button {\n    font-size: 14px;\n  }\n  .player-one-ready,\n  .player-two-ready {\n    margin-top: -200px;\n  }\n  .player-not-ready {\n    &:after {\n      left: 5px;\n      bottom: -37px;\n    }\n  }\n}\n\n@media screen and (max-width: $small) {\n  .header {\n    .header-left {\n      font-size: 28px;\n    }\n  }\n  .turn-signal {\n    font-size: 14px;\n    .hit {\n      font-size: 16px;\n    }\n    .miss {\n      font-size: 16px;\n    }\n    .winner {\n      font-size: 20px;\n    }\n  }\n  .player-info {\n    flex-direction: column;\n    justify-content: flex-start;\n    gap: 290px;\n    margin-top: 20px;\n  }\n  .battle-boards {\n    #board-one,\n    #board-two {\n      width: 200px;\n      height: 200px;\n      grid-template: repeat(10, 20px) / repeat(10, 20px);\n    }\n  }\n  #ships {\n    top: -10px;\n    width: 160px;\n    height: 160px;\n    div {\n      div {\n        width: 20px;\n        height: 20px;\n      }\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/favicon.ico":
/*!********************************!*\
  !*** ./src/assets/favicon.ico ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9f16e943b468a2e58812.ico";

/***/ }),

/***/ "./src/assets/gitHubIconWhite.png":
/*!****************************************!*\
  !*** ./src/assets/gitHubIconWhite.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4d74fd76ac168df7723c.png";

/***/ }),

/***/ "./src/assets/japanese-waves.png":
/*!***************************************!*\
  !*** ./src/assets/japanese-waves.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "25f2d4e13e7be937c465.png";

/***/ }),

/***/ "./src/assets/one-player.png":
/*!***********************************!*\
  !*** ./src/assets/one-player.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6deef6126d40d69d610f.png";

/***/ }),

/***/ "./src/assets/two-player.png":
/*!***********************************!*\
  !*** ./src/assets/two-player.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ec71ee8341b7a7c170a1.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_favicon_ico__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/favicon.ico */ "./src/assets/favicon.ico");
/* harmony import */ var _assets_gitHubIconWhite_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/gitHubIconWhite.png */ "./src/assets/gitHubIconWhite.png");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _scripts_modules_displayControl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scripts/modules/displayControl.js */ "./src/scripts/modules/displayControl.js");




document.querySelector('[type="image/x-icon"]').href = _assets_favicon_ico__WEBPACK_IMPORTED_MODULE_0__;
document.getElementById("github-icon").src = _assets_gitHubIconWhite_png__WEBPACK_IMPORTED_MODULE_1__;
_scripts_modules_displayControl_js__WEBPACK_IMPORTED_MODULE_3__["default"];
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQSxJQUFNRSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFDQyxPQUFELEVBQWE7RUFDeEI7RUFDQSxJQUFNQyxXQUFXLEdBQUdILHNEQUFNLENBQUNFLE9BQUQsQ0FBMUI7RUFDQSxJQUFNRSxVQUFVLEdBQUdKLHNEQUFNLENBQUMsWUFBRCxDQUF6QixDQUh3QixDQUl4Qjs7RUFDQSxJQUFNSyxVQUFVLEdBQUdOLHlEQUFTLENBQUNJLFdBQUQsQ0FBNUI7RUFDQSxJQUFNRyxTQUFTLEdBQUdQLHlEQUFTLENBQUNLLFVBQUQsQ0FBM0I7O0VBQ0EsSUFBTUcsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBTTtJQUNsQkYsVUFBVSxDQUFDRyxjQUFYO0lBQ0FGLFNBQVMsQ0FBQ0UsY0FBVjtFQUNELENBSEQsQ0FQd0IsQ0FXeEI7OztFQUNBLE9BQU87SUFBRUgsVUFBVSxFQUFWQSxVQUFGO0lBQWNDLFNBQVMsRUFBVEEsU0FBZDtJQUF5QkMsS0FBSyxFQUFMQTtFQUF6QixDQUFQO0FBQ0QsQ0FiRDs7QUFlQSxpRUFBZU4sSUFBZjs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBOztBQUVBLElBQU1GLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNZLE1BQUQsRUFBWTtFQUM1QixJQUFNQyxJQUFJLEdBQUc7SUFDWEMsS0FBSyxFQUFFLEVBREk7SUFFWEYsTUFBTSxFQUFFQSxNQUZHO0lBR1hHLFNBQVMsRUFBRSxJQUhBO0lBSVhDLEtBQUssRUFBRSxFQUpJO0lBS1hDLFdBQVcsRUFBRTtFQUxGLENBQWI7O0VBUUEsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBTTtJQUN0QixLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsR0FBcEIsRUFBeUJBLENBQUMsRUFBMUIsRUFBOEI7TUFDNUJOLElBQUksQ0FBQ0MsS0FBTCxDQUFXTSxJQUFYLENBQWdCO1FBQUVDLEtBQUssRUFBRUYsQ0FBVDtRQUFZRyxPQUFPLEVBQUUsS0FBckI7UUFBNEJDLEtBQUssRUFBRTtNQUFuQyxDQUFoQjtJQUNEO0VBQ0YsQ0FKRDs7RUFNQUwsU0FBUzs7RUFFVCxJQUFNTSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO0lBQ3JCZCxrRUFBQSxDQUFpQixVQUFDZ0IsSUFBRDtNQUFBLE9BQVViLElBQUksQ0FBQ0csS0FBTCxDQUFXSSxJQUFYLENBQWdCVCxpREFBSSxDQUFDZSxJQUFJLENBQUNDLElBQU4sRUFBWUQsSUFBSSxDQUFDRSxNQUFqQixDQUFwQixDQUFWO0lBQUEsQ0FBakI7RUFDRCxDQUZEOztFQUlBSixRQUFRO0VBRVIsSUFBTUssVUFBVSxHQUFHLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixFQUFoQixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixFQUFnQyxFQUFoQyxFQUFvQyxFQUFwQyxDQUFuQjtFQUNBLElBQU1DLFdBQVcsR0FBRyxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsRUFBakMsRUFBcUMsRUFBckMsQ0FBcEI7O0VBRUEsSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsSUFBRCxFQUFPQyxHQUFQLEVBQWU7SUFDaEMsSUFBSUQsSUFBSSxDQUFDRSxRQUFMLEtBQWtCLEtBQXRCLEVBQTZCO01BQzNCLEtBQUssSUFBSWYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2EsSUFBSSxDQUFDSixNQUF6QixFQUFpQ1QsQ0FBQyxFQUFsQyxFQUFzQztRQUNwQyxJQUFJTixJQUFJLENBQUNDLEtBQUwsQ0FBV21CLEdBQUcsR0FBR2QsQ0FBakIsS0FBdUJOLElBQUksQ0FBQ0MsS0FBTCxDQUFXbUIsR0FBRyxHQUFHZCxDQUFqQixFQUFvQkcsT0FBcEIsS0FBZ0MsSUFBM0QsRUFBaUU7VUFDL0QsT0FBTyxLQUFQO1FBQ0Q7TUFDRjs7TUFDRCxPQUFPLElBQVA7SUFDRCxDQVBELE1BT08sSUFBSVUsSUFBSSxDQUFDRSxRQUFMLEtBQWtCLElBQXRCLEVBQTRCO01BQ2pDLEtBQUssSUFBSWYsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBR2EsSUFBSSxDQUFDSixNQUF6QixFQUFpQ1QsRUFBQyxFQUFsQyxFQUFzQztRQUNwQyxJQUNFTixJQUFJLENBQUNDLEtBQUwsQ0FBV21CLEdBQUcsR0FBR2QsRUFBQyxHQUFHLEVBQXJCLEtBQ0FOLElBQUksQ0FBQ0MsS0FBTCxDQUFXbUIsR0FBRyxHQUFHZCxFQUFDLEdBQUcsRUFBckIsRUFBeUJHLE9BQXpCLEtBQXFDLElBRnZDLEVBR0U7VUFDQSxPQUFPLEtBQVA7UUFDRDtNQUNGOztNQUNELE9BQU8sSUFBUDtJQUNEO0VBQ0YsQ0FuQkQ7O0VBcUJBLElBQU1hLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNILElBQUQsRUFBT0MsR0FBUCxFQUFlO0lBQ2hDLElBQUlELElBQUksQ0FBQ0UsUUFBTCxLQUFrQixLQUF0QixFQUE2QjtNQUMzQixJQUFNRSxRQUFRLEdBQUdQLFVBQVUsQ0FBQ1EsS0FBWCxFQUFqQjtNQUNBRCxRQUFRLENBQUNoQixJQUFULENBQWNhLEdBQWQ7TUFDQUcsUUFBUSxDQUFDRSxJQUFULENBQWMsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO1FBQUEsT0FBVUQsQ0FBQyxHQUFHQyxDQUFkO01BQUEsQ0FBZDtNQUNBLElBQU1uQixLQUFLLEdBQUdlLFFBQVEsQ0FBQ0ssT0FBVCxDQUFpQlIsR0FBakIsQ0FBZDtNQUNBLE9BQU9HLFFBQVEsQ0FBQ2YsS0FBSyxHQUFHLENBQVQsQ0FBUixHQUFzQmUsUUFBUSxDQUFDZixLQUFELENBQTlCLElBQXlDVyxJQUFJLENBQUNKLE1BQTlDLEdBQ0gsSUFERyxHQUVILEtBRko7SUFHRCxDQVJELE1BUU8sSUFBSUksSUFBSSxDQUFDRSxRQUFMLEtBQWtCLElBQXRCLEVBQTRCO01BQ2pDLElBQU1RLElBQUksR0FBR1osV0FBVyxDQUFDYSxJQUFaLENBQWlCLFVBQUNELElBQUQ7UUFBQSxPQUFVQSxJQUFJLEdBQUcsRUFBUCxLQUFjVCxHQUFHLEdBQUcsRUFBOUI7TUFBQSxDQUFqQixDQUFiO01BQ0EsT0FBTyxDQUFDUyxJQUFJLEdBQUdULEdBQVIsSUFBZSxFQUFmLEdBQW9CLENBQXBCLElBQXlCRCxJQUFJLENBQUNKLE1BQTlCLEdBQXVDLElBQXZDLEdBQThDLEtBQXJEO0lBQ0Q7RUFDRixDQWJEOztFQWVBLElBQU1nQixTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDWixJQUFELEVBQU9hLGFBQVAsRUFBeUI7SUFDekMsSUFBSWIsSUFBSSxDQUFDRSxRQUFMLEtBQWtCLEtBQXRCLEVBQTZCO01BQzNCLElBQUlILFVBQVUsQ0FBQ0MsSUFBRCxFQUFPYSxhQUFQLENBQVYsSUFBbUNWLFVBQVUsQ0FBQ0gsSUFBRCxFQUFPYSxhQUFQLENBQWpELEVBQXdFO1FBQ3RFLEtBQUssSUFBSTFCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdhLElBQUksQ0FBQ0osTUFBekIsRUFBaUNULENBQUMsRUFBbEMsRUFBc0M7VUFDcENOLElBQUksQ0FBQ0MsS0FBTCxDQUFXK0IsYUFBYSxHQUFHMUIsQ0FBM0IsRUFBOEJHLE9BQTlCLEdBQXdDLElBQXhDO1VBQ0FULElBQUksQ0FBQ0MsS0FBTCxDQUFXK0IsYUFBYSxHQUFHMUIsQ0FBM0IsRUFBOEIsVUFBOUIsSUFBNENhLElBQTVDO1VBQ0FBLElBQUksQ0FBQ2MsUUFBTCxDQUFjMUIsSUFBZCxDQUFtQnlCLGFBQWEsR0FBRzFCLENBQW5DO1FBQ0Q7TUFDRixDQU5ELE1BTU87UUFDTCxPQUFPLEtBQVA7TUFDRDtJQUNGLENBVkQsTUFVTyxJQUFJYSxJQUFJLENBQUNFLFFBQUwsS0FBa0IsSUFBdEIsRUFBNEI7TUFDakMsSUFBSUgsVUFBVSxDQUFDQyxJQUFELEVBQU9hLGFBQVAsQ0FBVixJQUFtQ1YsVUFBVSxDQUFDSCxJQUFELEVBQU9hLGFBQVAsQ0FBakQsRUFBd0U7UUFDdEUsS0FBSyxJQUFJMUIsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR2EsSUFBSSxDQUFDSixNQUF6QixFQUFpQ1QsR0FBQyxFQUFsQyxFQUFzQztVQUNwQ04sSUFBSSxDQUFDQyxLQUFMLENBQVcrQixhQUFhLEdBQUcxQixHQUFDLEdBQUcsRUFBL0IsRUFBbUNHLE9BQW5DLEdBQTZDLElBQTdDO1VBQ0FULElBQUksQ0FBQ0MsS0FBTCxDQUFXK0IsYUFBYSxHQUFHMUIsR0FBQyxHQUFHLEVBQS9CLEVBQW1DLFVBQW5DLElBQWlEYSxJQUFqRDtVQUNBQSxJQUFJLENBQUNjLFFBQUwsQ0FBYzFCLElBQWQsQ0FBbUJ5QixhQUFhLEdBQUcxQixHQUFDLEdBQUcsRUFBdkM7UUFDRDtNQUNGLENBTkQsTUFNTztRQUNMLE9BQU8sS0FBUDtNQUNEO0lBQ0Y7RUFDRixDQXRCRDs7RUF3QkEsSUFBTTRCLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBYTtJQUFBLGtDQUFUQyxJQUFTO01BQVRBLElBQVM7SUFBQTs7SUFDakNBLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUXZCLE9BQVIsQ0FBZ0IsVUFBQ3dCLEdBQUQsRUFBUztNQUN2QixJQUFNQyxVQUFVLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsRUFBWCxDQUFuQjtNQUNBSCxVQUFVLEtBQUssQ0FBZixHQUFvQkQsR0FBRyxDQUFDZixRQUFKLEdBQWUsSUFBbkMsR0FBNENlLEdBQUcsQ0FBQ2YsUUFBSixHQUFlLEtBQTNEO01BQ0EsSUFBSW9CLFVBQVUsR0FBR0gsSUFBSSxDQUFDSSxLQUFMLENBQVdKLElBQUksQ0FBQ0UsTUFBTCxLQUFnQixHQUEzQixDQUFqQjs7TUFDQSxPQUFPSixHQUFHLENBQUNILFFBQUosQ0FBYWxCLE1BQWIsS0FBd0IsQ0FBL0IsRUFBa0M7UUFDaEMsSUFBSUcsVUFBVSxDQUFDa0IsR0FBRCxFQUFNSyxVQUFOLENBQVYsSUFBK0JuQixVQUFVLENBQUNjLEdBQUQsRUFBTUssVUFBTixDQUE3QyxFQUFnRTtVQUM5RFYsU0FBUyxDQUFDSyxHQUFELEVBQU1LLFVBQU4sQ0FBVDtRQUNELENBRkQsTUFFTztVQUNMQSxVQUFVLEdBQUdILElBQUksQ0FBQ0ksS0FBTCxDQUFXSixJQUFJLENBQUNFLE1BQUwsS0FBZ0IsR0FBM0IsQ0FBYjtRQUNEO01BQ0Y7SUFDRixDQVhEO0VBWUQsQ0FiRDs7RUFlQSxJQUFNRyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDeEIsSUFBRCxFQUFVO0lBQzNCQSxJQUFJLENBQUNjLFFBQUwsQ0FBY3JCLE9BQWQsQ0FBc0IsVUFBQ0osS0FBRCxFQUFXO01BQy9CUixJQUFJLENBQUNDLEtBQUwsQ0FBV08sS0FBWCxJQUFvQjtRQUFFQyxPQUFPLEVBQUUsS0FBWDtRQUFrQkMsS0FBSyxFQUFFO01BQXpCLENBQXBCO0lBQ0QsQ0FGRDtJQUdBUyxJQUFJLENBQUN5QixhQUFMO0lBQ0F6QixJQUFJLENBQUMwQixTQUFMO0lBQ0E3QyxJQUFJLENBQUNFLFNBQUwsR0FBaUIsS0FBakI7SUFDQUYsSUFBSSxDQUFDSSxXQUFMLEdBQW1CLEVBQW5CO0VBQ0QsQ0FSRDs7RUFVQSxJQUFNUixjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07SUFDM0JJLElBQUksQ0FBQ0csS0FBTCxDQUFXUyxPQUFYLENBQW1CLFVBQUNPLElBQUQ7TUFBQSxPQUFVd0IsVUFBVSxDQUFDeEIsSUFBRCxDQUFwQjtJQUFBLENBQW5CO0VBQ0QsQ0FGRDs7RUFJQSxJQUFNMkIsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDMUIsR0FBRCxFQUFTO0lBQzdCLElBQUlwQixJQUFJLENBQUNDLEtBQUwsQ0FBV21CLEdBQVgsRUFBZ0JYLE9BQWhCLEtBQTRCLElBQWhDLEVBQXNDO01BQ3BDVCxJQUFJLENBQUNDLEtBQUwsQ0FBV21CLEdBQVgsRUFBZ0IyQixRQUFoQixDQUF5QkMsR0FBekIsQ0FBNkI1QixHQUE3QjtNQUNBcEIsSUFBSSxDQUFDQyxLQUFMLENBQVdtQixHQUFYLEVBQWdCVixLQUFoQixHQUF3QixJQUF4QjtNQUNBLE9BQU8sSUFBUDtJQUNELENBSkQsTUFJTztNQUNMVixJQUFJLENBQUNDLEtBQUwsQ0FBV21CLEdBQVgsRUFBZ0JWLEtBQWhCLEdBQXdCLElBQXhCO01BQ0FWLElBQUksQ0FBQ0ksV0FBTCxDQUFpQkcsSUFBakIsQ0FBc0JhLEdBQXRCO01BQ0EsT0FBTyxLQUFQO0lBQ0Q7RUFDRixDQVZEOztFQVlBLElBQU02QixPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFNO0lBQ3BCLE9BQU9qRCxJQUFJLENBQUNHLEtBQUwsQ0FBVytDLEtBQVgsQ0FBaUIsVUFBQy9CLElBQUQ7TUFBQSxPQUFVQSxJQUFJLENBQUNnQyxNQUFMLE9BQWtCLElBQTVCO0lBQUEsQ0FBakIsSUFBcUQsSUFBckQsR0FBNEQsS0FBbkU7RUFDRCxDQUZEOztFQUlBLE9BQU87SUFDTG5ELElBQUksRUFBSkEsSUFESztJQUVMc0IsVUFBVSxFQUFWQSxVQUZLO0lBR0xKLFVBQVUsRUFBVkEsVUFISztJQUlMYSxTQUFTLEVBQVRBLFNBSks7SUFLTEcsYUFBYSxFQUFiQSxhQUxLO0lBTUxZLGFBQWEsRUFBYkEsYUFOSztJQU9MRyxPQUFPLEVBQVBBLE9BUEs7SUFRTHJELGNBQWMsRUFBZEE7RUFSSyxDQUFQO0FBVUQsQ0E3SUQ7O0FBK0lBLGlFQUFlVCxTQUFmOzs7Ozs7Ozs7Ozs7OztBQ2xKQSxJQUFNQyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDMEIsSUFBRCxFQUFVO0VBQ3ZCLElBQU1zQyxVQUFVLEdBQUc7SUFDakJ0QyxJQUFJLEVBQUVBLElBRFc7SUFFakJ1QyxLQUFLLEVBQUU7RUFGVSxDQUFuQjs7RUFLQSxJQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxTQUFELEVBQVluQyxHQUFaLEVBQW9CO0lBQ25DLE9BQU9tQyxTQUFTLENBQUNULGFBQVYsQ0FBd0IxQixHQUF4QixJQUNIZ0MsVUFBVSxDQUFDQyxLQUFYLENBQWlCOUMsSUFBakIsQ0FBc0I7TUFBRUMsS0FBSyxFQUFFWSxHQUFUO01BQWNvQyxJQUFJLEVBQUU7SUFBcEIsQ0FBdEIsQ0FERyxHQUVISixVQUFVLENBQUNDLEtBQVgsQ0FBaUI5QyxJQUFqQixDQUFzQjtNQUFFQyxLQUFLLEVBQUVZLEdBQVQ7TUFBY29DLElBQUksRUFBRTtJQUFwQixDQUF0QixDQUZKO0VBR0QsQ0FKRCxDQU51QixDQVl2Qjs7O0VBQ0EsSUFBSUMsU0FBUyxHQUFHLEVBQWhCOztFQUNBLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUN6RCxLQUFELEVBQVFtQixHQUFSLEVBQWdCO0lBQ25DO0lBQ0FxQyxTQUFTLENBQUNFLE1BQVYsQ0FBaUJGLFNBQVMsQ0FBQzdCLE9BQVYsQ0FBa0JSLEdBQWxCLENBQWpCLEVBQXlDLENBQXpDOztJQUNBLElBQUluQixLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQm1CLEdBQWpCLEVBQXNCWCxPQUF0QixLQUFrQyxJQUF0QyxFQUE0QztNQUMxQ2dELFNBQVMsR0FBRyxFQUFaLENBRDBDLENBRTFDOztNQUNBLElBQUl4RCxLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQm1CLEdBQUcsR0FBRyxDQUF2QixDQUFKLEVBQStCO1FBQzdCLElBQUluQixLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQm1CLEdBQUcsR0FBRyxDQUF2QixFQUEwQlYsS0FBMUIsS0FBb0MsS0FBeEMsRUFBK0M7VUFDN0MrQyxTQUFTLENBQUNsRCxJQUFWLENBQWVhLEdBQUcsR0FBRyxDQUFyQjtRQUNEO01BQ0Y7O01BQ0QsSUFBSW5CLEtBQUssQ0FBQ0QsSUFBTixDQUFXQyxLQUFYLENBQWlCbUIsR0FBRyxHQUFHLENBQXZCLENBQUosRUFBK0I7UUFDN0IsSUFBSW5CLEtBQUssQ0FBQ0QsSUFBTixDQUFXQyxLQUFYLENBQWlCbUIsR0FBRyxHQUFHLENBQXZCLEVBQTBCVixLQUExQixLQUFvQyxLQUF4QyxFQUErQztVQUM3QytDLFNBQVMsQ0FBQ2xELElBQVYsQ0FBZWEsR0FBRyxHQUFHLENBQXJCO1FBQ0Q7TUFDRjs7TUFDRCxJQUFJbkIsS0FBSyxDQUFDRCxJQUFOLENBQVdDLEtBQVgsQ0FBaUJtQixHQUFHLEdBQUcsRUFBdkIsQ0FBSixFQUFnQztRQUM5QixJQUFJbkIsS0FBSyxDQUFDRCxJQUFOLENBQVdDLEtBQVgsQ0FBaUJtQixHQUFHLEdBQUcsRUFBdkIsRUFBMkJWLEtBQTNCLEtBQXFDLEtBQXpDLEVBQWdEO1VBQzlDK0MsU0FBUyxDQUFDbEQsSUFBVixDQUFlYSxHQUFHLEdBQUcsRUFBckI7UUFDRDtNQUNGOztNQUNELElBQUluQixLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQm1CLEdBQUcsR0FBRyxFQUF2QixDQUFKLEVBQWdDO1FBQzlCLElBQUluQixLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQm1CLEdBQUcsR0FBRyxFQUF2QixFQUEyQlYsS0FBM0IsS0FBcUMsS0FBekMsRUFBZ0Q7VUFDOUMrQyxTQUFTLENBQUNsRCxJQUFWLENBQWVhLEdBQUcsR0FBRyxFQUFyQjtRQUNEO01BQ0Y7O01BQ0QsT0FBT3FDLFNBQVA7SUFDRCxDQXhCRCxNQXdCTztNQUNMLE9BQU9BLFNBQVA7SUFDRDtFQUNGLENBOUJEOztFQWdDQSxJQUFNRyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDM0QsS0FBRCxFQUFRNEQsUUFBUixFQUFxQjtJQUNwQyxJQUFJcEIsVUFBVSxHQUFHSCxJQUFJLENBQUNJLEtBQUwsQ0FBV0osSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEdBQTNCLENBQWpCOztJQUNBLElBQUlxQixRQUFRLElBQUlBLFFBQVEsQ0FBQzlDLE1BQVQsR0FBa0IsQ0FBbEMsRUFBcUM7TUFDbkMsSUFBTStDLFlBQVksR0FDaEJELFFBQVEsQ0FBQ3ZCLElBQUksQ0FBQ0ksS0FBTCxDQUFXSixJQUFJLENBQUNFLE1BQUwsS0FBZ0JxQixRQUFRLENBQUM5QyxNQUFwQyxDQUFELENBRFY7TUFFQXVDLFFBQVEsQ0FBQ3JELEtBQUQsRUFBUTZELFlBQVIsQ0FBUjtNQUNBQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsUUFBWixFQUFzQkMsWUFBdEI7TUFDQSxPQUFPO1FBQ0xHLFFBQVEsRUFBRUgsWUFETDtRQUVMRCxRQUFRLEVBQUVILFlBQVksQ0FBQ3pELEtBQUQsRUFBUTZELFlBQVI7TUFGakIsQ0FBUDtJQUlELENBVEQsTUFTTztNQUNMLElBQUlJLElBQUksR0FBRyxJQUFYOztNQUNBLE9BQU9BLElBQVAsRUFBYTtRQUNYLElBQ0VqRSxLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQndDLFVBQWpCLEtBQ0F4QyxLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQndDLFVBQWpCLEVBQTZCL0IsS0FBN0IsS0FBdUMsS0FEdkMsSUFFQSxDQUFDMEMsVUFBVSxDQUFDQyxLQUFYLENBQWlCYyxRQUFqQixDQUEwQixVQUFDdEQsSUFBRDtVQUFBLE9BQVVBLElBQUksQ0FBQ0wsS0FBTCxLQUFlaUMsVUFBekI7UUFBQSxDQUExQixDQUhILEVBSUU7VUFDQWEsUUFBUSxDQUFDckQsS0FBRCxFQUFRd0MsVUFBUixDQUFSO1VBQ0F5QixJQUFJLEdBQUcsS0FBUDtVQUNBLE9BQU87WUFDTEQsUUFBUSxFQUFFeEIsVUFETDtZQUVMb0IsUUFBUSxFQUFFSCxZQUFZLENBQUN6RCxLQUFELEVBQVF3QyxVQUFSO1VBRmpCLENBQVA7UUFJRCxDQVhELE1BV087VUFDTEEsVUFBVSxHQUFHSCxJQUFJLENBQUNJLEtBQUwsQ0FBV0osSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEdBQTNCLENBQWI7UUFDRDtNQUNGO0lBQ0Y7RUFDRixDQTlCRDs7RUFnQ0EsT0FBTztJQUNMWSxVQUFVLEVBQVZBLFVBREs7SUFFTEUsUUFBUSxFQUFSQSxRQUZLO0lBR0xJLFlBQVksRUFBWkEsWUFISztJQUlMRSxRQUFRLEVBQVJBO0VBSkssQ0FBUDtBQU1ELENBcEZEOztBQXNGQSxpRUFBZXhFLE1BQWY7Ozs7Ozs7Ozs7Ozs7O0FDdEZBLElBQU1VLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNnQixJQUFELEVBQU9DLE1BQVAsRUFBa0I7RUFDN0IsT0FBTztJQUNMRCxJQUFJLEVBQUVBLElBREQ7SUFFTEMsTUFBTSxFQUFFQSxNQUZIO0lBR0xNLFFBQVEsRUFBRSxLQUhMO0lBSUwrQyxJQUFJLEVBQUVDLEtBQUssQ0FBQ3RELE1BQUQsQ0FBTCxDQUFjdUQsSUFBZCxDQUFtQixJQUFuQixDQUpEO0lBS0xyQyxRQUFRLEVBQUUsRUFMTDtJQU1Mc0MsVUFOSyxzQkFNTUMsU0FOTixFQU1pQjtNQUNwQixJQUFJQSxTQUFTLEtBQUssVUFBbEIsRUFBOEI7UUFDNUIsS0FBS25ELFFBQUwsR0FBZ0IsSUFBaEI7TUFDRCxDQUZELE1BRU8sSUFBSW1ELFNBQVMsS0FBSyxZQUFsQixFQUFnQztRQUNyQyxLQUFLbkQsUUFBTCxHQUFnQixLQUFoQjtNQUNEO0lBQ0YsQ0FaSTtJQWFMMkIsR0FiSyxlQWFENUIsR0FiQyxFQWFJO01BQ1AsSUFBTVosS0FBSyxHQUFHLEtBQUt5QixRQUFMLENBQWNMLE9BQWQsQ0FBc0I2QyxNQUFNLENBQUNyRCxHQUFELENBQTVCLENBQWQ7TUFDQSxLQUFLZ0QsSUFBTCxDQUFVNUQsS0FBVixJQUFtQixLQUFuQjtJQUNELENBaEJJO0lBaUJMMkMsTUFqQkssb0JBaUJJO01BQ1AsT0FBTyxLQUFLaUIsSUFBTCxDQUFVbEIsS0FBVixDQUFnQixVQUFDakIsUUFBRDtRQUFBLE9BQWVBLFFBQVEsS0FBSyxLQUFiLEdBQXFCLElBQXJCLEdBQTRCLEtBQTNDO01BQUEsQ0FBaEIsQ0FBUDtJQUNELENBbkJJO0lBb0JMVyxhQXBCSywyQkFvQlc7TUFDZCxPQUFRLEtBQUtYLFFBQUwsR0FBZ0IsRUFBeEI7SUFDRCxDQXRCSTtJQXVCTFksU0F2QkssdUJBdUJPO01BQ1YsS0FBS3VCLElBQUwsR0FBWUMsS0FBSyxDQUFDLEtBQUt0RCxNQUFOLENBQUwsQ0FBbUJ1RCxJQUFuQixDQUF3QixJQUF4QixDQUFaO0lBQ0Q7RUF6QkksQ0FBUDtBQTJCRCxDQTVCRDs7QUE4QkEsaUVBQWV4RSxJQUFmOzs7Ozs7Ozs7Ozs7OztBQzlCQSxJQUFNRCxRQUFRLEdBQUcsQ0FDZjtFQUNFaUIsSUFBSSxFQUFFLFNBRFI7RUFFRUMsTUFBTSxFQUFFO0FBRlYsQ0FEZSxFQUtmO0VBQ0VELElBQUksRUFBRSxZQURSO0VBRUVDLE1BQU0sRUFBRTtBQUZWLENBTGUsRUFTZjtFQUNFRCxJQUFJLEVBQUUsV0FEUjtFQUVFQyxNQUFNLEVBQUU7QUFGVixDQVRlLEVBYWY7RUFDRUQsSUFBSSxFQUFFLFdBRFI7RUFFRUMsTUFBTSxFQUFFO0FBRlYsQ0FiZSxFQWlCZjtFQUNFRCxJQUFJLEVBQUUsYUFEUjtFQUVFQyxNQUFNLEVBQUU7QUFGVixDQWpCZSxDQUFqQjtBQXVCQSxpRUFBZWxCLFFBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNZ0YsaUJBQWlCLEdBQUksWUFBTTtFQUMvQixJQUFNQyxJQUFJLEdBQUd6Riw4REFBSSxDQUFDLE9BQUQsQ0FBakI7RUFDQSxJQUFNMEYsUUFBUSxHQUFHRCxJQUFJLENBQUNyRixVQUFMLENBQWdCTyxJQUFoQixDQUFxQkMsS0FBdEM7RUFDQSxJQUFNK0UsUUFBUSxHQUFHRixJQUFJLENBQUNwRixTQUFMLENBQWVNLElBQWYsQ0FBb0JDLEtBQXJDO0VBQ0EsSUFBTWdGLFNBQVMsR0FBR0gsSUFBSSxDQUFDckYsVUFBTCxDQUFnQk8sSUFBaEIsQ0FBcUJELE1BQXZDO0VBQ0EsSUFBTW1GLFNBQVMsR0FBR0osSUFBSSxDQUFDcEYsU0FBTCxDQUFlTSxJQUFmLENBQW9CRCxNQUF0QztFQUNBLElBQU1vRixXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUFwQjtFQUNBLElBQU1DLFdBQVcsR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQXBCO0VBQ0EsSUFBTUUsUUFBUSxHQUFHSCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBakI7RUFDQSxJQUFNRyxhQUFhLEdBQUdKLFFBQVEsQ0FBQ0ssc0JBQVQsQ0FBZ0MsWUFBaEMsRUFBOEMsQ0FBOUMsQ0FBdEI7RUFDQSxJQUFNQyxhQUFhLEdBQUdOLFFBQVEsQ0FBQ0ssc0JBQVQsQ0FBZ0MsWUFBaEMsRUFBOEMsQ0FBOUMsQ0FBdEI7RUFDQSxJQUFNRSxhQUFhLEdBQUdQLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3Qix1QkFBeEIsQ0FBdEI7RUFDQSxJQUFNTyxhQUFhLEdBQUdSLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3Qix1QkFBeEIsQ0FBdEI7RUFDQSxJQUFNUSxrQkFBa0IsR0FBR1QsUUFBUSxDQUFDQyxjQUFULENBQXdCLHVCQUF4QixDQUEzQjtFQUNBLElBQU1TLGtCQUFrQixHQUFHVixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsdUJBQXhCLENBQTNCO0VBQ0EsSUFBTVUsV0FBVyxHQUFHWCxRQUFRLENBQUNLLHNCQUFULENBQWdDLGNBQWhDLEVBQWdELENBQWhELENBQXBCO0VBQ0EsSUFBTU8sU0FBUyxHQUFHWixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsbUJBQXhCLENBQWxCO0VBQ0EsSUFBTVksVUFBVSxHQUFHYixRQUFRLENBQUNDLGNBQVQsQ0FBd0Isa0JBQXhCLENBQW5CO0VBQ0EsSUFBTWEsZUFBZSxHQUFHZCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsbUJBQXhCLENBQXhCLENBbEIrQixDQW9CL0I7O0VBQ0EsSUFBTWMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ2xHLEtBQUQsRUFBUW1HLE9BQVIsRUFBb0I7SUFDdENuRyxLQUFLLENBQUNXLE9BQU4sQ0FBYyxVQUFDeUYsSUFBRCxFQUFVO01BQ3RCLElBQU1DLEdBQUcsR0FBR2xCLFFBQVEsQ0FBQ21CLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtNQUNBRCxHQUFHLENBQUNFLE9BQUosQ0FBWWhHLEtBQVosR0FBb0JQLEtBQUssQ0FBQzJCLE9BQU4sQ0FBY3lFLElBQWQsQ0FBcEI7O01BQ0EsSUFBSUEsSUFBSSxDQUFDNUYsT0FBTCxLQUFpQixJQUFyQixFQUEyQjtRQUN6QjZGLEdBQUcsQ0FBQ0csU0FBSixDQUFjQyxHQUFkLENBQWtCLFNBQWxCO1FBQ0FKLEdBQUcsQ0FBQ0csU0FBSixDQUFjQyxHQUFkLFdBQXFCTCxJQUFJLENBQUN0RCxRQUFMLENBQWNqQyxJQUFuQztNQUNELENBSEQsTUFHTztRQUNMd0YsR0FBRyxDQUFDRyxTQUFKLENBQWNDLEdBQWQsQ0FBa0IsUUFBbEI7TUFDRDs7TUFDRHpHLEtBQUssS0FBSzhFLFFBQVYsR0FDSXVCLEdBQUcsQ0FBQ0csU0FBSixDQUFjQyxHQUFkLENBQWtCLFdBQWxCLENBREosR0FFSUosR0FBRyxDQUFDRyxTQUFKLENBQWNDLEdBQWQsQ0FBa0IsV0FBbEIsQ0FGSjtNQUdBTixPQUFPLENBQUNPLFdBQVIsQ0FBb0JMLEdBQXBCO0lBQ0QsQ0FiRDtFQWNELENBZkQ7O0VBZ0JBSCxXQUFXLENBQUNwQixRQUFELEVBQVdJLFdBQVgsQ0FBWDtFQUNBZ0IsV0FBVyxDQUFDbkIsUUFBRCxFQUFXTSxXQUFYLENBQVg7O0VBRUEsSUFBTXNCLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNSLE9BQUQsRUFBYTtJQUMvQixPQUFPQSxPQUFPLENBQUNTLFVBQWYsRUFBMkI7TUFDekJULE9BQU8sQ0FBQ1UsV0FBUixDQUFvQlYsT0FBTyxDQUFDVyxTQUE1QjtJQUNEO0VBQ0YsQ0FKRCxDQXhDK0IsQ0E4Qy9COzs7RUFDQSxJQUFNQyxRQUFRLEdBQUc1QixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBakI7RUFDQSxJQUFNNEIsTUFBTSxHQUFHN0IsUUFBUSxDQUFDSyxzQkFBVCxDQUFnQyxRQUFoQyxFQUEwQyxDQUExQyxDQUFmO0VBQ0F1QixRQUFRLENBQUNFLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFlBQU07SUFDdkMsSUFBSUYsUUFBUSxDQUFDRyxPQUFULEtBQXFCLElBQXpCLEVBQStCO01BQzdCRixNQUFNLENBQUNHLFNBQVA7TUFHQXRCLGtCQUFrQixDQUFDdUIsU0FBbkIsR0FBK0IsQ0FBL0I7TUFDQXJCLFNBQVMsQ0FBQ3FCLFNBQVYsR0FBc0IsTUFBdEI7TUFDQXpCLGFBQWEsQ0FBQzBCLFdBQWQsR0FBNEIsU0FBNUI7TUFDQXhDLElBQUksQ0FBQ3BGLFNBQUwsQ0FBZU0sSUFBZixDQUFvQkQsTUFBcEIsQ0FBMkJxRCxVQUEzQixDQUFzQ3RDLElBQXRDLEdBQTZDLFNBQTdDO01BQ0E4RSxhQUFhLENBQUMyQixLQUFkLENBQW9CQyxNQUFwQixHQUE2QixTQUE3QjtNQUNBNUIsYUFBYSxDQUFDMkIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsbUJBQTlCO01BQ0EzQixrQkFBa0IsQ0FBQ3VCLFNBQW5CLEdBQStCLENBQS9CO0lBQ0QsQ0FYRCxNQVdPO01BQ0xKLE1BQU0sQ0FBQ0csU0FBUDtNQUdBakMsV0FBVyxDQUFDb0MsS0FBWixDQUFrQkcsT0FBbEIsR0FBNEIsRUFBNUI7TUFDQWxDLGFBQWEsQ0FBQytCLEtBQWQsQ0FBb0JHLE9BQXBCLEdBQThCLEVBQTlCO01BQ0FwQyxXQUFXLENBQUNpQyxLQUFaLENBQWtCRyxPQUFsQixHQUE0QixNQUE1QjtNQUNBaEMsYUFBYSxDQUFDNkIsS0FBZCxDQUFvQkcsT0FBcEIsR0FBOEIsTUFBOUI7TUFDQTFCLFNBQVMsQ0FBQ3FCLFNBQVYsR0FBc0IsUUFBdEI7TUFDQXpCLGFBQWEsQ0FBQzBCLFdBQWQsR0FBNEIsWUFBNUI7TUFDQTFCLGFBQWEsQ0FBQzJCLEtBQWQsQ0FBb0JDLE1BQXBCLEdBQTZCLEVBQTdCO01BQ0E1QixhQUFhLENBQUMyQixLQUFkLENBQW9CRSxPQUFwQixHQUE4QixFQUE5QjtJQUNEO0VBQ0YsQ0F6QkQsRUFqRCtCLENBNEUvQjs7RUFDQSxTQUFTRSxTQUFULENBQW1CQyxJQUFuQixFQUF5QkMsSUFBekIsRUFBK0I7SUFDN0JBLElBQUksR0FBR0EsSUFBSSxJQUFJLHNCQUFmO0lBQ0EsSUFBSUMsQ0FBQyxHQUFHMUMsUUFBUSxDQUFDbUIsYUFBVCxDQUF1QixRQUF2QixDQUFSO0lBQ0EsSUFBSXdCLEdBQUcsR0FBR0QsQ0FBQyxDQUFDRSxVQUFGLENBQWEsSUFBYixDQUFWO0lBQ0FELEdBQUcsQ0FBQ0YsSUFBSixHQUFXQSxJQUFYO0lBQ0EsT0FBT0UsR0FBRyxDQUFDRSxXQUFKLENBQWdCTCxJQUFoQixFQUFzQk0sS0FBN0I7RUFDRCxDQW5GOEIsQ0FxRi9COzs7RUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLEdBQU07SUFDOUIsSUFBTUMsV0FBVyxHQUFHLENBQUN6QyxhQUFELEVBQWdCQyxhQUFoQixDQUFwQjtJQUNBd0MsV0FBVyxDQUFDeEgsT0FBWixDQUFvQixVQUFDRSxJQUFEO01BQUEsT0FDbEJBLElBQUksQ0FBQ29HLGdCQUFMLENBQXNCLFNBQXRCLEVBQWlDLFVBQUNtQixDQUFELEVBQU87UUFDdEMsSUFBSUEsQ0FBQyxDQUFDQyxHQUFGLEtBQVUsT0FBZCxFQUF1QjtVQUNyQkQsQ0FBQyxDQUFDRSxjQUFGO1FBQ0QsQ0FGRCxNQUVPLElBQUlaLFNBQVMsQ0FBQ1UsQ0FBQyxDQUFDRyxNQUFGLENBQVNsQixXQUFWLENBQVQsSUFBbUMsR0FBdkMsRUFBNEM7VUFDakQsSUFBSWUsQ0FBQyxDQUFDQyxHQUFGLEtBQVUsV0FBZCxFQUEyQjtZQUN6QkQsQ0FBQyxDQUFDRSxjQUFGO1VBQ0Q7UUFDRjtNQUNGLENBUkQsQ0FEa0I7SUFBQSxDQUFwQjtJQVdBLElBQU1FLE1BQU0sR0FBRztNQUNiQyxVQUFVLEVBQUUsSUFEQztNQUViQyxTQUFTLEVBQUUsSUFGRTtNQUdiQyxPQUFPLEVBQUUsSUFISTtNQUliQyxhQUFhLEVBQUU7SUFKRixDQUFmOztJQU1BLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQVVDLFlBQVYsRUFBd0I7TUFBQSwyQ0FDaEJBLFlBRGdCO01BQUE7O01BQUE7UUFDdkMsb0RBQXFDO1VBQUEsSUFBMUJDLFFBQTBCOztVQUNuQyxJQUFJO1lBQ0YsSUFBSUEsUUFBUSxDQUFDUixNQUFULENBQWdCbEIsV0FBaEIsQ0FBNEJ2RyxNQUE1QixHQUFxQyxDQUF6QyxFQUE0QztjQUMxQyxJQUFJaEIsTUFBTSxTQUFWO2NBQ0FpSixRQUFRLENBQUNSLE1BQVQsQ0FBZ0JTLFVBQWhCLENBQTJCQyxFQUEzQixLQUFrQyx1QkFBbEMsR0FDS25KLE1BQU0sR0FBRytFLElBQUksQ0FBQ3JGLFVBQUwsQ0FBZ0JPLElBQWhCLENBQXFCRCxNQURuQyxHQUVLQSxNQUFNLEdBQUcrRSxJQUFJLENBQUNwRixTQUFMLENBQWVNLElBQWYsQ0FBb0JELE1BRmxDO2NBR0FBLE1BQU0sQ0FBQ3FELFVBQVAsQ0FBa0J0QyxJQUFsQixHQUF5QmtJLFFBQVEsQ0FBQ1IsTUFBVCxDQUFnQmxCLFdBQXpDO2NBQ0E2QixXQUFXO1lBQ1o7VUFDRixDQVRELENBU0UsT0FBT0MsR0FBUCxFQUFZO1lBQ1pyRixPQUFPLENBQUNDLEdBQVIsQ0FBWW9GLEdBQVo7VUFDRDtRQUNGO01BZHNDO1FBQUE7TUFBQTtRQUFBO01BQUE7SUFleEMsQ0FmRDs7SUFnQkEsSUFBTUMsUUFBUSxHQUFHLElBQUlDLGdCQUFKLENBQXFCUixRQUFyQixDQUFqQjtJQUNBTyxRQUFRLENBQUNFLE9BQVQsQ0FBaUI1RCxhQUFqQixFQUFnQzhDLE1BQWhDO0lBQ0FZLFFBQVEsQ0FBQ0UsT0FBVCxDQUFpQjNELGFBQWpCLEVBQWdDNkMsTUFBaEM7RUFDRCxDQXRDRDs7RUF1Q0FOLGlCQUFpQixHQTdIYyxDQStIL0I7O0VBQ0EsSUFBTXFCLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBTTtJQUM1QjNELGtCQUFrQixDQUFDeUIsV0FBbkIsR0FBaUN4QyxJQUFJLENBQUNyRixVQUFMLENBQWdCTyxJQUFoQixDQUFxQkcsS0FBckIsQ0FBMkJzSixNQUEzQixDQUFrQyxVQUFDdEksSUFBRDtNQUFBLE9BQ2pFQSxJQUFJLENBQUNpRCxJQUFMLENBQVVELFFBQVYsQ0FBbUIsSUFBbkIsQ0FEaUU7SUFBQSxDQUFsQyxFQUUvQnBELE1BRkY7SUFHQStFLGtCQUFrQixDQUFDd0IsV0FBbkIsR0FBaUN4QyxJQUFJLENBQUNwRixTQUFMLENBQWVNLElBQWYsQ0FBb0JHLEtBQXBCLENBQTBCc0osTUFBMUIsQ0FBaUMsVUFBQ3RJLElBQUQ7TUFBQSxPQUNoRUEsSUFBSSxDQUFDaUQsSUFBTCxDQUFVRCxRQUFWLENBQW1CLElBQW5CLENBRGdFO0lBQUEsQ0FBakMsRUFFL0JwRCxNQUZGO0VBR0QsQ0FQRCxDQWhJK0IsQ0F5SS9COzs7RUFDQSxJQUFNb0ksV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtJQUN4QixJQUFJcEQsV0FBVyxDQUFDd0IsS0FBWixDQUFrQkcsT0FBbEIsS0FBOEIsTUFBbEMsRUFBMEM7TUFDeEM7TUFDQWxDLGFBQWEsQ0FBQytCLEtBQWQsQ0FBb0JHLE9BQXBCLEtBQWdDLEVBQWhDLEdBQ0t6QixVQUFVLENBQUNvQixTQUFYLGFBQTBCcEMsU0FBUyxDQUFDN0IsVUFBVixDQUFxQnRDLElBQS9DLG9EQURMLEdBRUttRixVQUFVLENBQUNvQixTQUFYLGFBQTBCbkMsU0FBUyxDQUFDOUIsVUFBVixDQUFxQnRDLElBQS9DLG9EQUZMO0lBR0QsQ0FMRCxNQUtPO01BQ0wsSUFBSSxDQUFDZ0UsSUFBSSxDQUFDckYsVUFBTCxDQUFnQndELE9BQWhCLEVBQUQsSUFBOEIsQ0FBQzZCLElBQUksQ0FBQ3BGLFNBQUwsQ0FBZXVELE9BQWYsRUFBbkMsRUFDRTBDLGFBQWEsQ0FBQzRCLEtBQWQsQ0FBb0JFLE9BQXBCLEtBQWdDLG1CQUFoQyxHQUNLeEIsVUFBVSxDQUFDb0IsU0FBWCxhQUEwQnBDLFNBQVMsQ0FBQzdCLFVBQVYsQ0FBcUJ0QyxJQUEvQyx3QkFETCxHQUVLbUYsVUFBVSxDQUFDb0IsU0FBWCxhQUEwQm5DLFNBQVMsQ0FBQzlCLFVBQVYsQ0FBcUJ0QyxJQUEvQyx3QkFGTDtJQUdIO0VBQ0YsQ0FaRDs7RUFhQXFJLFdBQVcsR0F2Sm9CLENBeUovQjs7RUFDQSxJQUFNTyxVQUFVLEdBQUd0RSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBbkI7O0VBQ0EsSUFBTXNFLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07SUFDdEI7SUFDQTdFLElBQUksQ0FBQ25GLEtBQUw7SUFDQTRGLFFBQVEsQ0FBQ2dDLEtBQVQsQ0FBZUcsT0FBZixHQUF5QixFQUF6QjtJQUNBN0Isa0JBQWtCLENBQUN3QixTQUFuQixHQUErQixHQUEvQjtJQUNBdkIsa0JBQWtCLENBQUN1QixTQUFuQixHQUErQixHQUEvQjtJQUNBakMsUUFBUSxDQUFDSyxzQkFBVCxDQUFnQyxrQkFBaEMsRUFBb0QsQ0FBcEQsRUFBdUQ4QixLQUF2RCxDQUE2REcsT0FBN0QsR0FBdUUsRUFBdkU7SUFDQXRDLFFBQVEsQ0FBQ0ssc0JBQVQsQ0FBZ0Msa0JBQWhDLEVBQW9ELENBQXBELEVBQXVEOEIsS0FBdkQsQ0FBNkRHLE9BQTdELEdBQXVFLEVBQXZFO0lBQ0F4QixlQUFlLENBQUNPLFNBQWhCLENBQTBCbUQsTUFBMUIsQ0FBaUMsY0FBakM7SUFDQWpFLGFBQWEsQ0FBQ2MsU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsTUFBNUI7SUFDQWQsYUFBYSxDQUFDYSxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixNQUE1QjtJQUNBZixhQUFhLENBQUNrRSxZQUFkLENBQTJCLGlCQUEzQixFQUE4QyxJQUE5QztJQUNBakUsYUFBYSxDQUFDaUUsWUFBZCxDQUEyQixpQkFBM0IsRUFBOEMsSUFBOUM7SUFDQWxFLGFBQWEsQ0FBQzRCLEtBQWQsQ0FBb0JFLE9BQXBCLEdBQThCLG9CQUE5QjtJQUNBN0IsYUFBYSxDQUFDMkIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsb0JBQTlCO0lBQ0F0QyxXQUFXLENBQUNvQyxLQUFaLENBQWtCRyxPQUFsQixHQUE0QixFQUE1QjtJQUNBbEMsYUFBYSxDQUFDK0IsS0FBZCxDQUFvQkcsT0FBcEIsR0FBOEIsRUFBOUI7SUFDQWQsV0FBVyxDQUFDekIsV0FBRCxDQUFYO0lBQ0FMLElBQUksQ0FBQ3JGLFVBQUwsQ0FBZ0JHLGNBQWhCO0lBQ0F1RyxXQUFXLENBQUNwQixRQUFELEVBQVdJLFdBQVgsQ0FBWDtJQUNBeUIsV0FBVyxDQUFDdEIsV0FBRCxDQUFYO0lBQ0FSLElBQUksQ0FBQ3BGLFNBQUwsQ0FBZUUsY0FBZjtJQUNBdUcsV0FBVyxDQUFDbkIsUUFBRCxFQUFXTSxXQUFYLENBQVg7SUFDQTBCLFFBQVEsQ0FBQ0csT0FBVCxHQUFtQixLQUFuQjtJQUNBRixNQUFNLENBQUNNLEtBQVAsQ0FBYUcsT0FBYixHQUF1QixNQUF2QjtJQUNBVCxNQUFNLENBQUNHLFNBQVA7SUFHQXJCLFdBQVcsQ0FBQ3dCLEtBQVosQ0FBa0JHLE9BQWxCLEdBQTRCLE1BQTVCO0lBQ0FwQyxXQUFXLENBQUNpQyxLQUFaLENBQWtCRyxPQUFsQixHQUE0QixNQUE1QjtJQUNBaEMsYUFBYSxDQUFDNkIsS0FBZCxDQUFvQkcsT0FBcEIsR0FBOEIsTUFBOUI7SUFDQXpCLFVBQVUsQ0FBQzZELGVBQVgsQ0FBMkIsT0FBM0I7SUFDQVgsV0FBVztFQUNaLENBakNELENBM0orQixDQTZML0I7OztFQUNBUSxTQUFTO0VBQ1RELFVBQVUsQ0FBQ3hDLGdCQUFYLENBQTRCLFdBQTVCLEVBQXlDeUMsU0FBekM7RUFFQSxJQUFNSSxtQkFBbUIsR0FBRzNFLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3Qix1QkFBeEIsQ0FBNUI7O0VBQ0EsSUFBTTJFLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsR0FBTTtJQUMvQnpFLFFBQVEsQ0FBQ2dDLEtBQVQsQ0FBZUcsT0FBZixHQUF5QixFQUF6QjtJQUNBeEIsZUFBZSxDQUFDTyxTQUFoQixDQUEwQm1ELE1BQTFCLENBQWlDLGNBQWpDOztJQUNBLElBQUl0RSxXQUFXLENBQUNpQyxLQUFaLENBQWtCRyxPQUFsQixLQUE4QixNQUFsQyxFQUEwQztNQUN4Q2QsV0FBVyxDQUFDekIsV0FBRCxDQUFYO01BQ0FMLElBQUksQ0FBQ3JGLFVBQUwsQ0FBZ0JHLGNBQWhCO01BQ0FrRixJQUFJLENBQUNyRixVQUFMLENBQWdCeUMsYUFBaEIsQ0FBOEI0QyxJQUFJLENBQUNyRixVQUFMLENBQWdCTyxJQUFoQixDQUFxQkcsS0FBbkQ7TUFDQWdHLFdBQVcsQ0FBQ3BCLFFBQUQsRUFBV0ksV0FBWCxDQUFYO01BQ0FxRSxlQUFlO0lBQ2hCLENBTkQsTUFNTyxJQUFJckUsV0FBVyxDQUFDb0MsS0FBWixDQUFrQkcsT0FBbEIsS0FBOEIsTUFBbEMsRUFBMEM7TUFDL0NkLFdBQVcsQ0FBQ3RCLFdBQUQsQ0FBWDtNQUNBUixJQUFJLENBQUNwRixTQUFMLENBQWVFLGNBQWY7TUFDQWtGLElBQUksQ0FBQ3BGLFNBQUwsQ0FBZXdDLGFBQWYsQ0FBNkI0QyxJQUFJLENBQUNwRixTQUFMLENBQWVNLElBQWYsQ0FBb0JHLEtBQWpEO01BQ0FnRyxXQUFXLENBQUNuQixRQUFELEVBQVdNLFdBQVgsQ0FBWDtNQUNBa0UsZUFBZTtJQUNoQjtFQUNGLENBaEJEOztFQWlCQU8sbUJBQW1CLENBQUM3QyxnQkFBcEIsQ0FBcUMsV0FBckMsRUFBa0Q4QyxrQkFBbEQ7RUFFQSxJQUFNQyxpQkFBaUIsR0FBRzdFLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixzQkFBeEIsQ0FBMUI7RUFDQTRFLGlCQUFpQixDQUFDL0MsZ0JBQWxCLENBQW1DLFdBQW5DLEVBQWdELFlBQU07SUFDcER0QywyREFBQSxDQUFnQkUsSUFBaEI7RUFDRCxDQUZELEVBdE4rQixDQTBOL0I7O0VBQ0EsSUFBTXFGLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQzlCLENBQUQsRUFBTztJQUMzQixJQUNHQSxDQUFDLENBQUNHLE1BQUYsQ0FBU25CLFNBQVQsS0FBdUIsTUFBdkIsSUFBaUN4QixrQkFBa0IsQ0FBQ3dCLFNBQW5CLEtBQWlDLEdBQW5FLElBQ0NnQixDQUFDLENBQUNHLE1BQUYsQ0FBU25CLFNBQVQsS0FBdUIsUUFBdkIsSUFDQ3hCLGtCQUFrQixDQUFDd0IsU0FBbkIsS0FBaUMsR0FGbkMsSUFHQ2dCLENBQUMsQ0FBQ0csTUFBRixDQUFTbkIsU0FBVCxLQUF1QixRQUF2QixJQUNDTCxRQUFRLENBQUNHLE9BQVQsS0FBcUIsSUFEdEIsSUFFQ3JCLGtCQUFrQixDQUFDdUIsU0FBbkIsS0FBaUMsR0FOckMsRUFPRTtNQUNBbkIsZUFBZSxDQUFDTyxTQUFoQixDQUEwQkMsR0FBMUIsQ0FBOEIsY0FBOUI7TUFDQTJCLENBQUMsQ0FBQ0UsY0FBRixHQUZBLENBRW9CO0lBQ3JCLENBVkQsTUFVTyxJQUFJRixDQUFDLENBQUNHLE1BQUYsQ0FBU25CLFNBQVQsS0FBdUIsTUFBM0IsRUFBbUM7TUFDeEM7TUFDQW5CLGVBQWUsQ0FBQ08sU0FBaEIsQ0FBMEJtRCxNQUExQixDQUFpQyxjQUFqQztNQUNBekUsV0FBVyxDQUFDb0MsS0FBWixDQUFrQkcsT0FBbEIsR0FBNEIsTUFBNUI7TUFDQWxDLGFBQWEsQ0FBQytCLEtBQWQsQ0FBb0JHLE9BQXBCLEdBQThCLE1BQTlCO01BQ0FwQyxXQUFXLENBQUNpQyxLQUFaLENBQWtCRyxPQUFsQixHQUE0QixFQUE1QjtNQUNBaEMsYUFBYSxDQUFDNkIsS0FBZCxDQUFvQkcsT0FBcEIsR0FBOEIsRUFBOUI7TUFDQW5DLFFBQVEsQ0FBQ2dDLEtBQVQsQ0FBZUcsT0FBZixHQUF5QixFQUF6QjtNQUNBMUIsU0FBUyxDQUFDcUIsU0FBVixHQUFzQixRQUF0QjtNQUNBdkIsa0JBQWtCLENBQUN1QixTQUFuQixHQUErQixDQUEvQjtNQUNBMUIsYUFBYSxDQUFDa0UsWUFBZCxDQUEyQixpQkFBM0IsRUFBOEMsS0FBOUM7TUFDQWxFLGFBQWEsQ0FBQzRCLEtBQWQsQ0FBb0JFLE9BQXBCLEdBQThCLEVBQTlCO01BQ0E3QixhQUFhLENBQUNpRSxZQUFkLENBQTJCLGlCQUEzQixFQUE4QyxJQUE5QztNQUNBakUsYUFBYSxDQUFDMkIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsRUFBOUI7TUFDQXBELEtBQUssQ0FBQytGLElBQU4sQ0FBV2hGLFFBQVEsQ0FBQ0ssc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBWCxFQUF1RDdFLE9BQXZELENBQStELFVBQUNDLElBQUQ7UUFBQSxPQUM3REEsSUFBSSxDQUFDNEYsU0FBTCxDQUFlQyxHQUFmLENBQW1CLFVBQW5CLENBRDZEO01BQUEsQ0FBL0Q7SUFHRCxDQWpCTSxNQWlCQSxJQUFJMkIsQ0FBQyxDQUFDRyxNQUFGLENBQVNuQixTQUFULEtBQXVCLFFBQTNCLEVBQXFDO01BQzFDOUIsUUFBUSxDQUFDZ0MsS0FBVCxDQUFlRyxPQUFmLEdBQXlCLEVBQXpCO01BQ0EvQixhQUFhLENBQUNtRSxlQUFkLENBQThCLE9BQTlCO01BQ0FsRSxhQUFhLENBQUNrRSxlQUFkLENBQThCLE9BQTlCO01BQ0E1RCxlQUFlLENBQUNPLFNBQWhCLENBQTBCbUQsTUFBMUIsQ0FBaUMsY0FBakM7TUFDQTdELFdBQVcsQ0FBQ3dCLEtBQVosQ0FBa0JHLE9BQWxCLEdBQTRCLEVBQTVCO01BQ0FULE1BQU0sQ0FBQ00sS0FBUCxDQUFhRyxPQUFiLEdBQXVCLEVBQXZCO01BQ0F2QyxXQUFXLENBQUNvQyxLQUFaLENBQWtCRyxPQUFsQixHQUE0QixFQUE1QjtNQUNBbEMsYUFBYSxDQUFDK0IsS0FBZCxDQUFvQkcsT0FBcEIsR0FBOEIsRUFBOUI7TUFDQWhDLGFBQWEsQ0FBQzZCLEtBQWQsQ0FBb0JHLE9BQXBCLEdBQThCLEVBQTlCO01BQ0EvQixhQUFhLENBQUNrRSxZQUFkLENBQTJCLGlCQUEzQixFQUE4QyxLQUE5QztNQUNBbEUsYUFBYSxDQUFDNEIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsRUFBOUI7TUFDQTdCLGFBQWEsQ0FBQ2lFLFlBQWQsQ0FBMkIsaUJBQTNCLEVBQThDLEtBQTlDO01BQ0FqRSxhQUFhLENBQUMyQixLQUFkLENBQW9CRSxPQUFwQixHQUE4QixFQUE5Qjs7TUFDQSxJQUFJVCxRQUFRLENBQUNHLE9BQVQsS0FBcUIsS0FBekIsRUFBZ0M7UUFDOUJ2QixhQUFhLENBQUMwQixXQUFkLEdBQTRCLFlBQTVCLENBRDhCLENBRTlCOztRQUNBNUMsNERBQUEsQ0FBaUJJLElBQWpCO01BQ0QsQ0FKRCxNQUlPLElBQUlrQyxRQUFRLENBQUNHLE9BQVQsS0FBcUIsSUFBekIsRUFBK0I7UUFDcEM5QyxLQUFLLENBQUMrRixJQUFOLENBQVdoRixRQUFRLENBQUNLLHNCQUFULENBQWdDLFNBQWhDLENBQVgsRUFBdUQ3RSxPQUF2RCxDQUErRCxVQUFDQyxJQUFEO1VBQUEsT0FDN0RBLElBQUksQ0FBQzRGLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixVQUFuQixDQUQ2RDtRQUFBLENBQS9ELEVBRG9DLENBSXBDOztRQUNBL0IsaUVBQUEsQ0FBc0JHLElBQXRCO01BQ0Q7SUFDRjtFQUNGLENBdEREOztFQXVEQW9CLGVBQWUsQ0FBQ2dCLGdCQUFoQixDQUFpQyxXQUFqQyxFQUE4Q2lELGFBQTlDO0VBRUEsT0FBTztJQUNMaEUsV0FBVyxFQUFYQSxXQURLO0lBRUxTLFdBQVcsRUFBWEEsV0FGSztJQUdMNEMsZUFBZSxFQUFmQSxlQUhLO0lBSUxMLFdBQVcsRUFBWEE7RUFKSyxDQUFQO0FBTUQsQ0ExUnlCLEVBQTFCOztBQTRSQSxpRUFBZXRFLGlCQUFmOzs7Ozs7Ozs7Ozs7Ozs7QUNqU0E7O0FBRUEsSUFBTUQsV0FBVyxHQUFJLFlBQU07RUFDekIsSUFBTW9DLFFBQVEsR0FBRzVCLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixDQUFqQjtFQUNBLElBQU1RLGtCQUFrQixHQUFHVCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsdUJBQXhCLENBQTNCO0VBQ0EsSUFBTVMsa0JBQWtCLEdBQUdWLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3Qix1QkFBeEIsQ0FBM0I7RUFDQSxJQUFNRixXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUFwQjtFQUNBLElBQU1DLFdBQVcsR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQXBCO0VBQ0EsSUFBTUUsUUFBUSxHQUFHSCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBakI7RUFDQSxJQUFNaUYsT0FBTyxHQUFHbEYsUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBQWhCO0VBQ0EsSUFBTWtGLFVBQVUsR0FBR25GLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixZQUF4QixDQUFuQjtFQUNBLElBQU1tRixTQUFTLEdBQUdwRixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbEI7RUFDQSxJQUFNb0YsU0FBUyxHQUFHckYsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQWxCO0VBQ0EsSUFBTXFGLFVBQVUsR0FBR3RGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixhQUF4QixDQUFuQjtFQUNBLElBQU1zRixnQkFBZ0IsR0FBR3ZGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixtQkFBeEIsQ0FBekI7RUFDQSxJQUFNYSxlQUFlLEdBQUdkLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixtQkFBeEIsQ0FBeEI7RUFDQSxJQUFNdUYsT0FBTyxHQUFHLENBQUN6RixXQUFELEVBQWNHLFdBQWQsQ0FBaEI7RUFDQSxJQUFNdUYsVUFBVSxHQUFHLENBQUNQLE9BQUQsRUFBVUMsVUFBVixFQUFzQkMsU0FBdEIsRUFBaUNDLFNBQWpDLEVBQTRDQyxVQUE1QyxDQUFuQjs7RUFFQSxJQUFNUixHQUFHLEdBQUcsU0FBTkEsR0FBTSxDQUFDcEYsSUFBRCxFQUFVO0lBQ3BCLElBQU1nRyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07TUFDMUJ2RixRQUFRLENBQUNnQyxLQUFULENBQWV3RCxhQUFmLEdBQStCLEtBQS9CO01BQ0FGLFVBQVUsQ0FBQ2pLLE9BQVgsQ0FBbUIsVUFBQ08sSUFBRCxFQUFVO1FBQzNCQSxJQUFJLENBQUNvRyxLQUFMLENBQVd3RCxhQUFYLEdBQTJCLFFBQTNCO1FBQ0E1SixJQUFJLENBQUNxRixPQUFMLENBQWFuRixRQUFiLEdBQXdCLE1BQXhCO01BQ0QsQ0FIRDtNQUlBQSxRQUFRLEdBQUcsSUFBWDtJQUNELENBUEQ7O0lBU0EsSUFBTTJKLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBTTtNQUM1QnpGLFFBQVEsQ0FBQ2dDLEtBQVQsQ0FBZXdELGFBQWYsR0FBK0IsRUFBL0I7TUFDQUYsVUFBVSxDQUFDakssT0FBWCxDQUFtQixVQUFDTyxJQUFELEVBQVU7UUFDM0JBLElBQUksQ0FBQ29HLEtBQUwsQ0FBV3dELGFBQVgsR0FBMkIsRUFBM0I7UUFDQTVKLElBQUksQ0FBQ3FGLE9BQUwsQ0FBYW5GLFFBQWIsR0FBd0IsT0FBeEI7TUFDRCxDQUhEO01BSUFBLFFBQVEsR0FBRyxLQUFYO0lBQ0QsQ0FQRDs7SUFTQSxJQUFJQSxRQUFRLEdBQUcsS0FBZjtJQUNBLElBQU0wRCxRQUFRLEdBQUdELElBQUksQ0FBQ3JGLFVBQUwsQ0FBZ0JPLElBQWhCLENBQXFCQyxLQUF0QztJQUNBLElBQU0rRSxRQUFRLEdBQUdGLElBQUksQ0FBQ3BGLFNBQUwsQ0FBZU0sSUFBZixDQUFvQkMsS0FBckM7SUFDQStLLGVBQWU7SUFDZnpGLFFBQVEsQ0FBQ2dDLEtBQVQsQ0FBZUcsT0FBZixHQUF5QixNQUF6QjtJQUNBbUQsVUFBVSxDQUFDakssT0FBWCxDQUFtQixVQUFDTyxJQUFEO01BQUEsT0FBV0EsSUFBSSxDQUFDb0csS0FBTCxDQUFXRyxPQUFYLEdBQXFCLEVBQWhDO0lBQUEsQ0FBbkIsRUF4Qm9CLENBMEJwQjs7SUFDQSxJQUFJVixRQUFRLENBQUNHLE9BQVQsS0FBcUIsS0FBekIsRUFBZ0M7TUFDOUJ0QyxtRUFBQSxDQUE4Qk0sV0FBOUI7TUFDQUwsSUFBSSxDQUFDckYsVUFBTCxDQUFnQkcsY0FBaEI7TUFDQWlGLG1FQUFBLENBQThCRSxRQUE5QixFQUF3Q0ksV0FBeEM7TUFDQVUsa0JBQWtCLENBQUN3QixTQUFuQixHQUErQixDQUEvQjtJQUNELENBTEQsTUFLTyxJQUFJTCxRQUFRLENBQUNHLE9BQVQsS0FBcUIsSUFBekIsRUFBK0I7TUFDcEMsSUFBSWhDLFdBQVcsQ0FBQ29DLEtBQVosQ0FBa0JHLE9BQWxCLEtBQThCLEVBQWxDLEVBQXNDO1FBQ3BDN0MsbUVBQUEsQ0FBOEJNLFdBQTlCO1FBQ0FMLElBQUksQ0FBQ3JGLFVBQUwsQ0FBZ0JHLGNBQWhCO1FBQ0FpRixtRUFBQSxDQUE4QkUsUUFBOUIsRUFBd0NJLFdBQXhDO1FBQ0FVLGtCQUFrQixDQUFDd0IsU0FBbkIsR0FBK0IsQ0FBL0I7TUFDRCxDQUxELE1BS08sSUFBSS9CLFdBQVcsQ0FBQ2lDLEtBQVosQ0FBa0JHLE9BQWxCLEtBQThCLEVBQWxDLEVBQXNDO1FBQzNDN0MsbUVBQUEsQ0FBOEJTLFdBQTlCO1FBQ0FSLElBQUksQ0FBQ3BGLFNBQUwsQ0FBZUUsY0FBZjtRQUNBaUYsbUVBQUEsQ0FBOEJHLFFBQTlCLEVBQXdDTSxXQUF4QztRQUNBUSxrQkFBa0IsQ0FBQ3VCLFNBQW5CLEdBQStCLENBQS9CO01BQ0Q7SUFDRjs7SUFFRHNELGdCQUFnQixDQUFDekQsZ0JBQWpCLENBQWtDLFdBQWxDLEVBQStDLFlBQU07TUFDbkQ3RixRQUFRLEtBQUssS0FBYixHQUFxQnlKLGFBQWEsRUFBbEMsR0FBdUNFLGVBQWUsRUFBdEQ7SUFDRCxDQUZEO0lBSUEsSUFBSUMsT0FBTyxHQUFHLElBQWQ7SUFDQUosVUFBVSxDQUFDakssT0FBWCxDQUFtQixVQUFDTyxJQUFEO01BQUEsT0FDakJBLElBQUksQ0FBQytGLGdCQUFMLENBQXNCLFdBQXRCLEVBQW1DLFVBQUNtQixDQUFELEVBQU87UUFDeENuQyxlQUFlLENBQUNPLFNBQWhCLENBQTBCbUQsTUFBMUIsQ0FBaUMsY0FBakM7UUFDQXFCLE9BQU8sR0FBRzVDLENBQUMsQ0FBQ0csTUFBWjtNQUNELENBSEQsQ0FEaUI7SUFBQSxDQUFuQjtJQU1Bb0MsT0FBTyxDQUFDaEssT0FBUixDQUFnQixVQUFDNEgsTUFBRDtNQUFBLE9BQ2RBLE1BQU0sQ0FBQ3RCLGdCQUFQLENBQXdCLFVBQXhCLEVBQW9DLFVBQUNtQixDQUFELEVBQU87UUFDekNBLENBQUMsQ0FBQ0UsY0FBRjtNQUNELENBRkQsQ0FEYztJQUFBLENBQWhCO0lBS0FxQyxPQUFPLENBQUNoSyxPQUFSLENBQWdCLFVBQUM0SCxNQUFEO01BQUEsT0FDZEEsTUFBTSxDQUFDdEIsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsVUFBQ21CLENBQUQsRUFBTztRQUNyQyxJQUFNN0gsS0FBSyxHQUFHNkgsQ0FBQyxDQUFDRyxNQUFGLENBQVNoQyxPQUFULENBQWlCaEcsS0FBL0I7UUFDQSxJQUFJUCxLQUFKO1FBQ0EsSUFBSWtCLElBQUo7O1FBQ0EsSUFBSWtILENBQUMsQ0FBQ0csTUFBRixDQUFTL0IsU0FBVCxDQUFtQixDQUFuQixNQUEwQixXQUE5QixFQUEyQztVQUN6Q3hHLEtBQUssR0FBRzZFLElBQUksQ0FBQ3JGLFVBQWI7VUFDQVEsS0FBSyxDQUFDRCxJQUFOLENBQVdHLEtBQVgsQ0FBaUJTLE9BQWpCLENBQXlCLFVBQUNzSyxJQUFELEVBQVU7WUFDakMsSUFBSUEsSUFBSSxDQUFDcEssSUFBTCxLQUFjbUssT0FBTyxDQUFDL0IsRUFBMUIsRUFBOEI7Y0FDNUIvSCxJQUFJLEdBQUcrSixJQUFQO1lBQ0Q7VUFDRixDQUpEOztVQUtBLElBQUlELE9BQU8sQ0FBQ3pFLE9BQVIsQ0FBZ0JuRixRQUFoQixLQUE2QixNQUFqQyxFQUF5QztZQUN2Q0YsSUFBSSxDQUFDRSxRQUFMLEdBQWdCLElBQWhCO1VBQ0QsQ0FGRCxNQUVPO1lBQ0xGLElBQUksQ0FBQ0UsUUFBTCxHQUFnQixLQUFoQjtVQUNEOztVQUNELElBQUlwQixLQUFLLENBQUNpQixVQUFOLENBQWlCQyxJQUFqQixFQUF1QlgsS0FBdkIsS0FBaUNQLEtBQUssQ0FBQ3FCLFVBQU4sQ0FBaUJILElBQWpCLEVBQXVCWCxLQUF2QixDQUFyQyxFQUFvRTtZQUNsRVAsS0FBSyxDQUFDOEIsU0FBTixDQUFnQlosSUFBaEIsRUFBc0JzRCxNQUFNLENBQUNqRSxLQUFELENBQTVCO1lBQ0FxRSxtRUFBQSxDQUE4Qk0sV0FBOUI7WUFDQU4sbUVBQUEsQ0FBOEJFLFFBQTlCLEVBQXdDSSxXQUF4QztZQUNBVSxrQkFBa0IsQ0FBQ3dCLFNBQW5CLEdBQStCcEgsS0FBSyxDQUFDRCxJQUFOLENBQVdHLEtBQVgsQ0FBaUJzSixNQUFqQixDQUM3QixVQUFDdEksSUFBRDtjQUFBLE9BQVVBLElBQUksQ0FBQ2MsUUFBTCxDQUFjbEIsTUFBZCxHQUF1QixDQUFqQztZQUFBLENBRDZCLEVBRTdCQSxNQUZGO1lBR0FrSyxPQUFPLENBQUMxRCxLQUFSLENBQWNHLE9BQWQsR0FBd0IsTUFBeEI7VUFDRDtRQUNGLENBckJELE1BcUJPO1VBQ0x6SCxLQUFLLEdBQUc2RSxJQUFJLENBQUNwRixTQUFiO1VBQ0FPLEtBQUssQ0FBQ0QsSUFBTixDQUFXRyxLQUFYLENBQWlCUyxPQUFqQixDQUF5QixVQUFDc0ssSUFBRCxFQUFVO1lBQ2pDLElBQUlBLElBQUksQ0FBQ3BLLElBQUwsS0FBY21LLE9BQU8sQ0FBQy9CLEVBQTFCLEVBQThCO2NBQzVCL0gsSUFBSSxHQUFHK0osSUFBUDtZQUNEO1VBQ0YsQ0FKRDs7VUFLQSxJQUFJRCxPQUFPLENBQUN6RSxPQUFSLENBQWdCbkYsUUFBaEIsS0FBNkIsTUFBakMsRUFBeUM7WUFDdkNGLElBQUksQ0FBQ0UsUUFBTCxHQUFnQixJQUFoQjtVQUNELENBRkQsTUFFTztZQUNMRixJQUFJLENBQUNFLFFBQUwsR0FBZ0IsS0FBaEI7VUFDRDs7VUFDRCxJQUFJcEIsS0FBSyxDQUFDaUIsVUFBTixDQUFpQkMsSUFBakIsRUFBdUJYLEtBQXZCLEtBQWlDUCxLQUFLLENBQUNxQixVQUFOLENBQWlCSCxJQUFqQixFQUF1QlgsS0FBdkIsQ0FBckMsRUFBb0U7WUFDbEVQLEtBQUssQ0FBQzhCLFNBQU4sQ0FBZ0JaLElBQWhCLEVBQXNCc0QsTUFBTSxDQUFDakUsS0FBRCxDQUE1QjtZQUNBcUUsbUVBQUEsQ0FBOEJTLFdBQTlCO1lBQ0FULG1FQUFBLENBQThCRyxRQUE5QixFQUF3Q00sV0FBeEM7WUFDQVEsa0JBQWtCLENBQUN1QixTQUFuQixHQUErQnBILEtBQUssQ0FBQ0QsSUFBTixDQUFXRyxLQUFYLENBQWlCc0osTUFBakIsQ0FDN0IsVUFBQ3RJLElBQUQ7Y0FBQSxPQUFVQSxJQUFJLENBQUNjLFFBQUwsQ0FBY2xCLE1BQWQsR0FBdUIsQ0FBakM7WUFBQSxDQUQ2QixFQUU3QkEsTUFGRjtZQUdBa0ssT0FBTyxDQUFDMUQsS0FBUixDQUFjRyxPQUFkLEdBQXdCLE1BQXhCO1VBQ0Q7UUFDRjtNQUNGLENBL0NELENBRGM7SUFBQSxDQUFoQjtFQWtERCxDQWhIRDs7RUFrSEEsT0FBTztJQUNMd0MsR0FBRyxFQUFIQTtFQURLLENBQVA7QUFHRCxDQXRJbUIsRUFBcEI7O0FBd0lBLGlFQUFldEYsV0FBZjs7Ozs7Ozs7Ozs7Ozs7O0FDMUlBOztBQUVBLElBQU1GLFFBQVEsR0FBSSxZQUFNO0VBQ3RCLElBQU1ZLFdBQVcsR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQXBCO0VBQ0EsSUFBTU0sYUFBYSxHQUFHUCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsdUJBQXhCLENBQXRCO0VBQ0EsSUFBTU8sYUFBYSxHQUFHUixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsdUJBQXhCLENBQXRCO0VBQ0EsSUFBTVksVUFBVSxHQUFHYixRQUFRLENBQUNDLGNBQVQsQ0FBd0Isa0JBQXhCLENBQW5COztFQUVBLElBQU1nRixPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFDdkYsSUFBRCxFQUFVO0lBQ3hCLElBQU1HLFNBQVMsR0FBR0gsSUFBSSxDQUFDckYsVUFBTCxDQUFnQk8sSUFBaEIsQ0FBcUJELE1BQXZDO0lBQ0EsSUFBTW1GLFNBQVMsR0FBR0osSUFBSSxDQUFDcEYsU0FBTCxDQUFlTSxJQUFmLENBQW9CRCxNQUF0QztJQUNBLElBQU1pRixRQUFRLEdBQUdGLElBQUksQ0FBQ3BGLFNBQUwsQ0FBZU0sSUFBZixDQUFvQkMsS0FBckM7SUFDQXFGLFdBQVcsQ0FBQ2lDLEtBQVosQ0FBa0JHLE9BQWxCLEdBQTRCLEVBQTVCO0lBQ0E3QyxtRUFBQSxDQUE4QlMsV0FBOUI7SUFDQVIsSUFBSSxDQUFDcEYsU0FBTCxDQUFlRSxjQUFmO0lBQ0FrRixJQUFJLENBQUNwRixTQUFMLENBQWV3QyxhQUFmLENBQTZCNEMsSUFBSSxDQUFDcEYsU0FBTCxDQUFlTSxJQUFmLENBQW9CRyxLQUFqRDtJQUNBMEUsbUVBQUEsQ0FBOEJHLFFBQTlCLEVBQXdDTSxXQUF4QztJQUNBakIsS0FBSyxDQUFDK0YsSUFBTixDQUFXaEYsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDOEYsVUFBaEQsRUFBNER2SyxPQUE1RCxDQUNFLFVBQUNDLElBQUQ7TUFBQSxPQUFVQSxJQUFJLENBQUM0RixTQUFMLENBQWVDLEdBQWYsQ0FBbUIsVUFBbkIsQ0FBVjtJQUFBLENBREY7O0lBSUEsSUFBTTBFLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUMvQyxDQUFELEVBQU87TUFDeEJwQyxVQUFVLENBQUM2RCxlQUFYLENBQTJCLE9BQTNCO01BQ0EsSUFBTXRKLEtBQUssR0FBRzZILENBQUMsQ0FBQ0csTUFBRixDQUFTNkMsWUFBVCxDQUFzQixZQUF0QixDQUFkOztNQUNBLElBQUl2RyxJQUFJLENBQUNwRixTQUFMLENBQWVNLElBQWYsQ0FBb0JDLEtBQXBCLENBQTBCTyxLQUExQixFQUFpQ0UsS0FBakMsS0FBMkMsSUFBL0MsRUFBcUQ7UUFDbkQySCxDQUFDLENBQUNFLGNBQUY7TUFDRCxDQUZELE1BRU87UUFDTHpELElBQUksQ0FBQ3BGLFNBQUwsQ0FBZW9ELGFBQWYsQ0FBNkJ0QyxLQUE3Qjs7UUFDQSxJQUFJc0UsSUFBSSxDQUFDcEYsU0FBTCxDQUFlTSxJQUFmLENBQW9CQyxLQUFwQixDQUEwQk8sS0FBMUIsRUFBaUNDLE9BQWpDLEtBQTZDLElBQWpELEVBQXVEO1VBQ3JEcUUsSUFBSSxDQUFDcEYsU0FBTCxDQUFlTSxJQUFmLENBQW9CQyxLQUFwQixDQUEwQk8sS0FBMUIsRUFBaUNFLEtBQWpDLEdBQXlDLElBQXpDO1VBQ0EySCxDQUFDLENBQUNHLE1BQUYsQ0FBUy9CLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLEtBQXZCO1VBQ0FULFVBQVUsQ0FBQ29CLFNBQVgsR0FBdUIsTUFBdkI7VUFDQXBCLFVBQVUsQ0FBQ1EsU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUIsS0FBekI7VUFDQTdCLHVFQUFBO1FBQ0QsQ0FORCxNQU1PO1VBQ0xDLElBQUksQ0FBQ3BGLFNBQUwsQ0FBZU0sSUFBZixDQUFvQkMsS0FBcEIsQ0FBMEJPLEtBQTFCLEVBQWlDRSxLQUFqQyxHQUF5QyxJQUF6QztVQUNBMkgsQ0FBQyxDQUFDRyxNQUFGLENBQVMvQixTQUFULENBQW1CQyxHQUFuQixDQUF1QixNQUF2QjtVQUNBVCxVQUFVLENBQUNvQixTQUFYLEdBQXVCLG9CQUF2QjtVQUNBcEIsVUFBVSxDQUFDUSxTQUFYLENBQXFCQyxHQUFyQixDQUF5QixNQUF6QjtRQUNEOztRQUNENEUsT0FBTzs7UUFDUCxJQUFJeEcsSUFBSSxDQUFDcEYsU0FBTCxDQUFldUQsT0FBZixPQUE2QixLQUFqQyxFQUF3QztVQUN0Q3NJLFFBQVE7UUFDVDtNQUNGO0lBQ0YsQ0F4QkQ7O0lBMEJBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQU07TUFDdkI1RixhQUFhLENBQUMyQixLQUFkLENBQW9CRSxPQUFwQixHQUE4QixFQUE5QjtNQUNBeEIsVUFBVSxDQUFDNkQsZUFBWCxDQUEyQixPQUEzQjtNQUNBbkUsYUFBYSxDQUFDNEIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsbUJBQTlCO01BQ0F4QixVQUFVLENBQUNvQixTQUFYLGFBQTBCcEMsU0FBUyxDQUFDN0IsVUFBVixDQUFxQnRDLElBQS9DO01BQ0F1RCxLQUFLLENBQUMrRixJQUFOLENBQVc5RSxXQUFXLENBQUM2RixVQUF2QixFQUFtQ3ZLLE9BQW5DLENBQTJDLFVBQUMwRixHQUFEO1FBQUEsT0FDekNBLEdBQUcsQ0FBQ1ksZ0JBQUosQ0FBcUIsV0FBckIsRUFBa0NrRSxVQUFsQyxDQUR5QztNQUFBLENBQTNDO0lBR0QsQ0FSRDs7SUFTQUksVUFBVTs7SUFFVixJQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO01BQ3JCOUYsYUFBYSxDQUFDNEIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsRUFBOUI7TUFDQXhCLFVBQVUsQ0FBQzZELGVBQVgsQ0FBMkIsT0FBM0I7TUFDQWxFLGFBQWEsQ0FBQzJCLEtBQWQsQ0FBb0JFLE9BQXBCLEdBQThCLG1CQUE5QjtNQUNBeEIsVUFBVSxDQUFDb0IsU0FBWCxhQUEwQm5DLFNBQVMsQ0FBQzlCLFVBQVYsQ0FBcUJ0QyxJQUEvQztNQUNBNEssVUFBVSxDQUFDQyxVQUFELEVBQWEsR0FBYixDQUFWO0lBQ0QsQ0FORDs7SUFRQSxJQUFJQyxZQUFKOztJQUVBLElBQU1ELFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQU07TUFDdkIsSUFBTUUsUUFBUSxHQUFHL0csSUFBSSxDQUFDcEYsU0FBTCxDQUFlTSxJQUFmLENBQW9CRCxNQUFwQixDQUEyQjZELFFBQTNCLENBQ2ZrQixJQUFJLENBQUNyRixVQURVLEVBRWZtTSxZQUZlLENBQWpCOztNQUlBLElBQUlDLFFBQVEsQ0FBQ2hJLFFBQWIsRUFBdUI7UUFDckIrSCxZQUFZLEdBQUdDLFFBQVEsQ0FBQ2hJLFFBQXhCO01BQ0Q7O01BQ0QsSUFBTWlJLFVBQVUsR0FBRzFHLFFBQVEsQ0FBQzJHLGFBQVQsd0JBQ0RGLFFBQVEsQ0FBQzVILFFBRFIsUUFBbkI7O01BR0EsSUFBSWEsSUFBSSxDQUFDckYsVUFBTCxDQUFnQk8sSUFBaEIsQ0FBcUJDLEtBQXJCLENBQTJCNEwsUUFBUSxDQUFDNUgsUUFBcEMsRUFBOEN4RCxPQUE5QyxLQUEwRCxJQUE5RCxFQUFvRTtRQUNsRXFFLElBQUksQ0FBQ3JGLFVBQUwsQ0FBZ0JPLElBQWhCLENBQXFCQyxLQUFyQixDQUEyQjRMLFFBQVEsQ0FBQzVILFFBQXBDLEVBQThDdkQsS0FBOUMsR0FBc0QsSUFBdEQ7UUFDQW9MLFVBQVUsQ0FBQ3JGLFNBQVgsQ0FBcUJDLEdBQXJCLENBQXlCLEtBQXpCO1FBQ0FULFVBQVUsQ0FBQ29CLFNBQVgsR0FBdUIsTUFBdkI7UUFDQXBCLFVBQVUsQ0FBQ1EsU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUIsS0FBekI7UUFDQTdCLHVFQUFBO01BQ0QsQ0FORCxNQU1PO1FBQ0xpSCxVQUFVLENBQUNyRixTQUFYLENBQXFCQyxHQUFyQixDQUF5QixNQUF6QjtRQUNBVCxVQUFVLENBQUNvQixTQUFYLEdBQXVCLG9CQUF2QjtRQUNBcEIsVUFBVSxDQUFDUSxTQUFYLENBQXFCQyxHQUFyQixDQUF5QixNQUF6QjtNQUNEOztNQUNENEUsT0FBTzs7TUFDUCxJQUFJeEcsSUFBSSxDQUFDckYsVUFBTCxDQUFnQndELE9BQWhCLE9BQThCLEtBQWxDLEVBQXlDO1FBQ3ZDeUksVUFBVSxDQUFDRixVQUFELEVBQWEsR0FBYixDQUFWO01BQ0Q7SUFDRixDQTFCRDs7SUE0QkEsSUFBTUQsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBTTtNQUNyQmxILEtBQUssQ0FBQytGLElBQU4sQ0FBVzlFLFdBQVcsQ0FBQzZGLFVBQXZCLEVBQW1DdkssT0FBbkMsQ0FBMkMsVUFBQzBGLEdBQUQ7UUFBQSxPQUN6Q0EsR0FBRyxDQUFDMEYsbUJBQUosQ0FBd0IsV0FBeEIsRUFBcUNaLFVBQXJDLENBRHlDO01BQUEsQ0FBM0M7TUFHQU0sVUFBVSxDQUFDRCxRQUFELEVBQVcsR0FBWCxDQUFWO0lBQ0QsQ0FMRDs7SUFPQSxJQUFNSCxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFNO01BQ3BCLElBQUl4RyxJQUFJLENBQUNwRixTQUFMLENBQWV1RCxPQUFmLEVBQUosRUFBOEI7UUFDNUJvQixLQUFLLENBQUMrRixJQUFOLENBQVc5RSxXQUFXLENBQUM2RixVQUF2QixFQUFtQ3ZLLE9BQW5DLENBQTJDLFVBQUMwRixHQUFEO1VBQUEsT0FDekNBLEdBQUcsQ0FBQzBGLG1CQUFKLENBQXdCLFdBQXhCLEVBQXFDWixVQUFyQyxDQUR5QztRQUFBLENBQTNDO1FBR0F6RixhQUFhLENBQUM0QixLQUFkLENBQW9CRSxPQUFwQixHQUE4QixtQkFBOUI7UUFDQTdCLGFBQWEsQ0FBQzJCLEtBQWQsQ0FBb0JFLE9BQXBCLEdBQThCLEVBQTlCO1FBQ0F4QixVQUFVLENBQUM2RCxlQUFYLENBQTJCLE9BQTNCO1FBQ0E3RCxVQUFVLENBQUNRLFNBQVgsQ0FBcUJDLEdBQXJCLENBQXlCLFFBQXpCO1FBQ0FULFVBQVUsQ0FBQ29CLFNBQVgsYUFBMEJwQyxTQUFTLENBQUM3QixVQUFWLENBQXFCdEMsSUFBL0M7TUFDRCxDQVRELE1BU08sSUFBSWdFLElBQUksQ0FBQ3JGLFVBQUwsQ0FBZ0J3RCxPQUFoQixFQUFKLEVBQStCO1FBQ3BDZ0QsVUFBVSxDQUFDNkQsZUFBWCxDQUEyQixPQUEzQjtRQUNBN0QsVUFBVSxDQUFDUSxTQUFYLENBQXFCQyxHQUFyQixDQUF5QixRQUF6QjtRQUNBVCxVQUFVLENBQUNvQixTQUFYLGFBQTBCbkMsU0FBUyxDQUFDOUIsVUFBVixDQUFxQnRDLElBQS9DO1FBQ0E2RSxhQUFhLENBQUM0QixLQUFkLENBQW9CRSxPQUFwQixHQUE4QixFQUE5QjtRQUNBN0IsYUFBYSxDQUFDMkIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsbUJBQTlCO01BQ0Q7SUFDRixDQWpCRDtFQWtCRCxDQWpIRDs7RUFtSEEsT0FBTztJQUNMNEMsT0FBTyxFQUFQQTtFQURLLENBQVA7QUFHRCxDQTVIZ0IsRUFBakI7O0FBOEhBLGlFQUFlM0YsUUFBZjs7Ozs7Ozs7Ozs7Ozs7O0FDaElBOztBQUVBLElBQU1DLGFBQWEsR0FBSSxZQUFNO0VBQzNCLElBQU1RLFdBQVcsR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQXBCO0VBQ0EsSUFBTUMsV0FBVyxHQUFHRixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBcEI7RUFDQSxJQUFNTSxhQUFhLEdBQUdQLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3Qix1QkFBeEIsQ0FBdEI7RUFDQSxJQUFNTyxhQUFhLEdBQUdSLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3Qix1QkFBeEIsQ0FBdEI7RUFDQSxJQUFNWSxVQUFVLEdBQUdiLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixrQkFBeEIsQ0FBbkI7RUFDQSxJQUFNNEcsaUJBQWlCLEdBQUc3RyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IseUJBQXhCLENBQTFCO0VBQ0EsSUFBTTZHLGlCQUFpQixHQUFHOUcsUUFBUSxDQUFDQyxjQUFULENBQXdCLHlCQUF4QixDQUExQjtFQUNBLElBQU1xRSxVQUFVLEdBQUd0RSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBbkI7O0VBRUEsSUFBTWdGLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUN2RixJQUFELEVBQVU7SUFDeEIsSUFBTUcsU0FBUyxHQUFHSCxJQUFJLENBQUNyRixVQUFMLENBQWdCTyxJQUFoQixDQUFxQkQsTUFBdkM7SUFDQSxJQUFNbUYsU0FBUyxHQUFHSixJQUFJLENBQUNwRixTQUFMLENBQWVNLElBQWYsQ0FBb0JELE1BQXRDO0lBQ0EsSUFBTWdGLFFBQVEsR0FBR0QsSUFBSSxDQUFDckYsVUFBdEI7SUFDQSxJQUFNdUYsUUFBUSxHQUFHRixJQUFJLENBQUNwRixTQUF0Qjs7SUFFQSxJQUFNeU0saUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixHQUFNO01BQzlCN0csV0FBVyxDQUFDbUIsU0FBWixDQUFzQkMsR0FBdEIsQ0FBMEIsa0JBQTFCO0lBQ0QsQ0FGRDs7SUFJQWdELFVBQVUsQ0FBQ3hDLGdCQUFYLENBQTRCLFdBQTVCLEVBQXlDLFlBQU07TUFDN0MvQixXQUFXLENBQUM2RyxtQkFBWixDQUFnQyxXQUFoQyxFQUE2Q0ksaUJBQTdDO01BQ0E5RyxXQUFXLENBQUMwRyxtQkFBWixDQUFnQyxXQUFoQyxFQUE2Q0csaUJBQTdDO01BQ0FoSCxXQUFXLENBQUNzQixTQUFaLENBQXNCbUQsTUFBdEIsQ0FBNkIsa0JBQTdCO01BQ0F0RSxXQUFXLENBQUNtQixTQUFaLENBQXNCbUQsTUFBdEIsQ0FBNkIsa0JBQTdCO0lBQ0QsQ0FMRDs7SUFPQSxJQUFNeUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixHQUFNO01BQzFCekcsYUFBYSxDQUFDMkIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsRUFBOUI7TUFDQXhCLFVBQVUsQ0FBQzZELGVBQVgsQ0FBMkIsT0FBM0I7TUFDQW5FLGFBQWEsQ0FBQzRCLEtBQWQsQ0FBb0JFLE9BQXBCLEdBQThCLG1CQUE5QixDQUgwQixDQUkxQjs7TUFDQXJDLFFBQVEsQ0FBQ0ssc0JBQVQsQ0FBZ0Msa0JBQWhDLEVBQW9ELENBQXBELEVBQXVEOEIsS0FBdkQsQ0FBNkRHLE9BQTdELEdBQ0UsTUFERjtNQUVBcEMsV0FBVyxDQUFDNEIsZ0JBQVosQ0FBNkIsV0FBN0IsRUFBMENpRixpQkFBMUM7SUFDRCxDQVJEOztJQVNBRSxhQUFhOztJQUViLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBTTtNQUMzQmhILFdBQVcsQ0FBQzBHLG1CQUFaLENBQWdDLFdBQWhDLEVBQTZDRyxpQkFBN0M7TUFDQTdHLFdBQVcsQ0FBQ21CLFNBQVosQ0FBc0JtRCxNQUF0QixDQUE2QixrQkFBN0I7TUFDQXZGLEtBQUssQ0FBQytGLElBQU4sQ0FBV2pGLFdBQVcsQ0FBQ2dHLFVBQXZCLEVBQW1DdkssT0FBbkMsQ0FBMkMsVUFBQzBGLEdBQUQsRUFBUztRQUNsRCxJQUFJakMsS0FBSyxDQUFDK0YsSUFBTixDQUFXOUQsR0FBRyxDQUFDRyxTQUFmLEVBQTBCdEMsUUFBMUIsQ0FBbUMsVUFBbkMsQ0FBSixFQUFvRDtVQUNsRG1DLEdBQUcsQ0FBQ0csU0FBSixDQUFjbUQsTUFBZCxDQUFxQixVQUFyQjtRQUNEO01BQ0YsQ0FKRDtNQUtBeEUsUUFBUSxDQUFDSyxzQkFBVCxDQUFnQyxrQkFBaEMsRUFBb0QsQ0FBcEQsRUFBdUQ4QixLQUF2RCxDQUE2REcsT0FBN0QsR0FBdUUsRUFBdkU7TUFDQXJELEtBQUssQ0FBQytGLElBQU4sQ0FBVzlFLFdBQVcsQ0FBQzZGLFVBQXZCLEVBQW1DdkssT0FBbkMsQ0FBMkMsVUFBQzBGLEdBQUQ7UUFBQSxPQUN6Q0EsR0FBRyxDQUFDWSxnQkFBSixDQUFxQixXQUFyQixFQUFrQ3FGLGFBQWxDLENBRHlDO01BQUEsQ0FBM0M7SUFHRCxDQVpEOztJQWFBTixpQkFBaUIsQ0FBQy9FLGdCQUFsQixDQUFtQyxXQUFuQyxFQUFnRG9GLGNBQWhEOztJQUVBLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ2xFLENBQUQsRUFBTztNQUMzQmhFLEtBQUssQ0FBQytGLElBQU4sQ0FBV2hGLFFBQVEsQ0FBQ0ssc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBWCxFQUF1RDdFLE9BQXZELENBQStELFVBQUNDLElBQUQ7UUFBQSxPQUM3REEsSUFBSSxDQUFDNEYsU0FBTCxDQUFlQyxHQUFmLENBQW1CLFVBQW5CLENBRDZEO01BQUEsQ0FBL0Q7TUFHQVQsVUFBVSxDQUFDNkQsZUFBWCxDQUEyQixPQUEzQjtNQUNBLElBQU10SixLQUFLLEdBQUc2SCxDQUFDLENBQUNHLE1BQUYsQ0FBUzZDLFlBQVQsQ0FBc0IsWUFBdEIsQ0FBZDs7TUFDQSxJQUFJckcsUUFBUSxDQUFDaEYsSUFBVCxDQUFjQyxLQUFkLENBQW9CTyxLQUFwQixFQUEyQkUsS0FBM0IsS0FBcUMsSUFBekMsRUFBK0M7UUFDN0MySCxDQUFDLENBQUNFLGNBQUY7TUFDRCxDQUZELE1BRU87UUFDTHZELFFBQVEsQ0FBQ2xDLGFBQVQsQ0FBdUJ0QyxLQUF2Qjs7UUFDQSxJQUFJd0UsUUFBUSxDQUFDaEYsSUFBVCxDQUFjQyxLQUFkLENBQW9CTyxLQUFwQixFQUEyQkMsT0FBM0IsS0FBdUMsSUFBM0MsRUFBaUQ7VUFDL0N1RSxRQUFRLENBQUNoRixJQUFULENBQWNDLEtBQWQsQ0FBb0JPLEtBQXBCLEVBQTJCRSxLQUEzQixHQUFtQyxJQUFuQztVQUNBMkgsQ0FBQyxDQUFDRyxNQUFGLENBQVMvQixTQUFULENBQW1CQyxHQUFuQixDQUF1QixLQUF2QjtVQUNBVCxVQUFVLENBQUNvQixTQUFYLEdBQXVCLE1BQXZCO1VBQ0FwQixVQUFVLENBQUNRLFNBQVgsQ0FBcUJDLEdBQXJCLENBQXlCLEtBQXpCO1VBQ0E3Qix1RUFBQTtRQUNELENBTkQsTUFNTztVQUNMRyxRQUFRLENBQUNoRixJQUFULENBQWNDLEtBQWQsQ0FBb0JPLEtBQXBCLEVBQTJCRSxLQUEzQixHQUFtQyxJQUFuQztVQUNBMkgsQ0FBQyxDQUFDRyxNQUFGLENBQVMvQixTQUFULENBQW1CQyxHQUFuQixDQUF1QixNQUF2QjtVQUNBVCxVQUFVLENBQUNvQixTQUFYLEdBQXVCLG9CQUF2QjtVQUNBcEIsVUFBVSxDQUFDUSxTQUFYLENBQXFCQyxHQUFyQixDQUF5QixNQUF6QjtRQUNEOztRQUNENEUsT0FBTzs7UUFDUCxJQUFJdEcsUUFBUSxDQUFDL0IsT0FBVCxPQUF1QixLQUEzQixFQUFrQztVQUNoQ3VKLGFBQWE7UUFDZDtNQUNGOztNQUNEbkksS0FBSyxDQUFDK0YsSUFBTixDQUFXOUUsV0FBVyxDQUFDNkYsVUFBdkIsRUFBbUN2SyxPQUFuQyxDQUEyQyxVQUFDMEYsR0FBRDtRQUFBLE9BQ3pDQSxHQUFHLENBQUMwRixtQkFBSixDQUF3QixXQUF4QixFQUFxQ08sYUFBckMsQ0FEeUM7TUFBQSxDQUEzQztJQUdELENBOUJEOztJQWdDQSxJQUFNSCxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLEdBQU07TUFDOUJqSCxXQUFXLENBQUNzQixTQUFaLENBQXNCQyxHQUF0QixDQUEwQixrQkFBMUI7SUFDRCxDQUZEOztJQUlBLElBQU04RixhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07TUFDMUI3RyxhQUFhLENBQUM0QixLQUFkLENBQW9CRSxPQUFwQixHQUE4QixFQUE5QjtNQUNBeEIsVUFBVSxDQUFDNkQsZUFBWCxDQUEyQixPQUEzQjtNQUNBbEUsYUFBYSxDQUFDMkIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsbUJBQTlCO01BQ0FyQyxRQUFRLENBQUNLLHNCQUFULENBQWdDLGtCQUFoQyxFQUFvRCxDQUFwRCxFQUF1RDhCLEtBQXZELENBQTZERyxPQUE3RCxHQUNFLE1BREY7TUFFQXZDLFdBQVcsQ0FBQytCLGdCQUFaLENBQTZCLFdBQTdCLEVBQTBDa0YsaUJBQTFDO0lBQ0QsQ0FQRDs7SUFTQSxJQUFNSyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07TUFDM0J0SCxXQUFXLENBQUM2RyxtQkFBWixDQUFnQyxXQUFoQyxFQUE2Q0ksaUJBQTdDO01BQ0FqSCxXQUFXLENBQUNzQixTQUFaLENBQXNCbUQsTUFBdEIsQ0FBNkIsa0JBQTdCO01BQ0F2RixLQUFLLENBQUMrRixJQUFOLENBQVc5RSxXQUFXLENBQUM2RixVQUF2QixFQUFtQ3ZLLE9BQW5DLENBQTJDLFVBQUMwRixHQUFELEVBQVM7UUFDbEQsSUFBSWpDLEtBQUssQ0FBQytGLElBQU4sQ0FBVzlELEdBQUcsQ0FBQ0csU0FBZixFQUEwQnRDLFFBQTFCLENBQW1DLFVBQW5DLENBQUosRUFBb0Q7VUFDbERtQyxHQUFHLENBQUNHLFNBQUosQ0FBY21ELE1BQWQsQ0FBcUIsVUFBckI7UUFDRDtNQUNGLENBSkQ7TUFLQXhFLFFBQVEsQ0FBQ0ssc0JBQVQsQ0FBZ0Msa0JBQWhDLEVBQW9ELENBQXBELEVBQXVEOEIsS0FBdkQsQ0FBNkRHLE9BQTdELEdBQXVFLEVBQXZFO01BQ0FyRCxLQUFLLENBQUMrRixJQUFOLENBQVdqRixXQUFXLENBQUNnRyxVQUF2QixFQUFtQ3ZLLE9BQW5DLENBQTJDLFVBQUMwRixHQUFEO1FBQUEsT0FDekNBLEdBQUcsQ0FBQ1ksZ0JBQUosQ0FBcUIsV0FBckIsRUFBa0N3RixhQUFsQyxDQUR5QztNQUFBLENBQTNDO0lBR0QsQ0FaRDs7SUFhQVIsaUJBQWlCLENBQUNoRixnQkFBbEIsQ0FBbUMsV0FBbkMsRUFBZ0R1RixjQUFoRDs7SUFFQSxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNyRSxDQUFELEVBQU87TUFDM0JoRSxLQUFLLENBQUMrRixJQUFOLENBQVdoRixRQUFRLENBQUNLLHNCQUFULENBQWdDLFNBQWhDLENBQVgsRUFBdUQ3RSxPQUF2RCxDQUErRCxVQUFDQyxJQUFEO1FBQUEsT0FDN0RBLElBQUksQ0FBQzRGLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixVQUFuQixDQUQ2RDtNQUFBLENBQS9EO01BR0FULFVBQVUsQ0FBQzZELGVBQVgsQ0FBMkIsT0FBM0I7TUFDQSxJQUFNdEosS0FBSyxHQUFHNkgsQ0FBQyxDQUFDRyxNQUFGLENBQVM2QyxZQUFULENBQXNCLFlBQXRCLENBQWQ7O01BQ0EsSUFBSXRHLFFBQVEsQ0FBQy9FLElBQVQsQ0FBY0MsS0FBZCxDQUFvQk8sS0FBcEIsRUFBMkJFLEtBQTNCLEtBQXFDLElBQXpDLEVBQStDO1FBQzdDMkgsQ0FBQyxDQUFDRSxjQUFGO01BQ0QsQ0FGRCxNQUVPO1FBQ0x4RCxRQUFRLENBQUNqQyxhQUFULENBQXVCdEMsS0FBdkI7O1FBQ0EsSUFBSXVFLFFBQVEsQ0FBQy9FLElBQVQsQ0FBY0MsS0FBZCxDQUFvQk8sS0FBcEIsRUFBMkJDLE9BQTNCLEtBQXVDLElBQTNDLEVBQWlEO1VBQy9Dc0UsUUFBUSxDQUFDL0UsSUFBVCxDQUFjQyxLQUFkLENBQW9CTyxLQUFwQixFQUEyQkUsS0FBM0IsR0FBbUMsSUFBbkM7VUFDQTJILENBQUMsQ0FBQ0csTUFBRixDQUFTL0IsU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUIsS0FBdkI7VUFDQVQsVUFBVSxDQUFDb0IsU0FBWCxHQUF1QixNQUF2QjtVQUNBcEIsVUFBVSxDQUFDUSxTQUFYLENBQXFCQyxHQUFyQixDQUF5QixLQUF6QjtVQUNBN0IsdUVBQUE7UUFDRCxDQU5ELE1BTU87VUFDTEUsUUFBUSxDQUFDL0UsSUFBVCxDQUFjQyxLQUFkLENBQW9CTyxLQUFwQixFQUEyQkUsS0FBM0IsR0FBbUMsSUFBbkM7VUFDQTJILENBQUMsQ0FBQ0csTUFBRixDQUFTL0IsU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUIsTUFBdkI7VUFDQVQsVUFBVSxDQUFDb0IsU0FBWCxHQUF1QixvQkFBdkI7VUFDQXBCLFVBQVUsQ0FBQ1EsU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUIsTUFBekI7UUFDRDs7UUFDRDRFLE9BQU87O1FBQ1AsSUFBSXZHLFFBQVEsQ0FBQzlCLE9BQVQsT0FBdUIsS0FBM0IsRUFBa0M7VUFDaENvSixhQUFhO1FBQ2Q7TUFDRjs7TUFDRGhJLEtBQUssQ0FBQytGLElBQU4sQ0FBV2pGLFdBQVcsQ0FBQ2dHLFVBQXZCLEVBQW1DdkssT0FBbkMsQ0FBMkMsVUFBQzBGLEdBQUQ7UUFBQSxPQUN6Q0EsR0FBRyxDQUFDMEYsbUJBQUosQ0FBd0IsV0FBeEIsRUFBcUNVLGFBQXJDLENBRHlDO01BQUEsQ0FBM0M7SUFHRCxDQTlCRDs7SUFnQ0EsSUFBTXBCLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQU07TUFDcEIsSUFBSXRHLFFBQVEsQ0FBQy9CLE9BQVQsRUFBSixFQUF3QjtRQUN0Qm1DLFFBQVEsQ0FBQ0ssc0JBQVQsQ0FBZ0MsY0FBaEMsRUFBZ0QsQ0FBaEQsRUFBbUQ4QixLQUFuRCxDQUF5REcsT0FBekQsR0FBbUUsRUFBbkU7UUFDQXJELEtBQUssQ0FBQytGLElBQU4sQ0FBVzlFLFdBQVcsQ0FBQzZGLFVBQXZCLEVBQW1DdkssT0FBbkMsQ0FBMkMsVUFBQzBGLEdBQUQ7VUFBQSxPQUN6Q0EsR0FBRyxDQUFDMEYsbUJBQUosQ0FBd0IsV0FBeEIsRUFBcUNPLGFBQXJDLENBRHlDO1FBQUEsQ0FBM0M7UUFHQTVHLGFBQWEsQ0FBQzRCLEtBQWQsQ0FBb0JFLE9BQXBCLEdBQThCLG1CQUE5QjtRQUNBN0IsYUFBYSxDQUFDMkIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsRUFBOUI7UUFDQXhCLFVBQVUsQ0FBQzZELGVBQVgsQ0FBMkIsT0FBM0I7UUFDQTdELFVBQVUsQ0FBQ1EsU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUIsUUFBekI7UUFDQVQsVUFBVSxDQUFDb0IsU0FBWCxhQUEwQnBDLFNBQVMsQ0FBQzdCLFVBQVYsQ0FBcUJ0QyxJQUEvQztNQUNELENBVkQsTUFVTyxJQUFJaUUsUUFBUSxDQUFDOUIsT0FBVCxFQUFKLEVBQXdCO1FBQzdCbUMsUUFBUSxDQUFDSyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxFQUFtRDhCLEtBQW5ELENBQXlERyxPQUF6RCxHQUFtRSxFQUFuRTtRQUNBckQsS0FBSyxDQUFDK0YsSUFBTixDQUFXakYsV0FBVyxDQUFDZ0csVUFBdkIsRUFBbUN2SyxPQUFuQyxDQUEyQyxVQUFDMEYsR0FBRDtVQUFBLE9BQ3pDQSxHQUFHLENBQUMwRixtQkFBSixDQUF3QixXQUF4QixFQUFxQ1UsYUFBckMsQ0FEeUM7UUFBQSxDQUEzQztRQUdBekcsVUFBVSxDQUFDNkQsZUFBWCxDQUEyQixPQUEzQjtRQUNBN0QsVUFBVSxDQUFDUSxTQUFYLENBQXFCQyxHQUFyQixDQUF5QixRQUF6QjtRQUNBVCxVQUFVLENBQUNvQixTQUFYLGFBQTBCbkMsU0FBUyxDQUFDOUIsVUFBVixDQUFxQnRDLElBQS9DO1FBQ0E2RSxhQUFhLENBQUM0QixLQUFkLENBQW9CRSxPQUFwQixHQUE4QixFQUE5QjtRQUNBN0IsYUFBYSxDQUFDMkIsS0FBZCxDQUFvQkUsT0FBcEIsR0FBOEIsbUJBQTlCO01BQ0Q7SUFDRixDQXRCRDtFQXVCRCxDQTlKRDs7RUFnS0EsT0FBTztJQUNMNEMsT0FBTyxFQUFQQTtFQURLLENBQVA7QUFHRCxDQTdLcUIsRUFBdEI7O0FBK0tBLGlFQUFlMUYsYUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqTEE7QUFDNkc7QUFDakI7QUFDTztBQUNuRyw0Q0FBNEMsb0lBQStDO0FBQzNGLDRDQUE0Qyw0SEFBMkM7QUFDdkYsNENBQTRDLDRIQUEyQztBQUN2Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLDZIQUE2SDtBQUM3SCw2SEFBNkg7QUFDN0gseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEU7QUFDQSw2Q0FBNkMsZUFBZSxjQUFjLDJCQUEyQixHQUFHLFVBQVUsbUJBQW1CLHNDQUFzQyxxQkFBcUIsR0FBRyxnQkFBZ0Isc0JBQXNCLHFCQUFxQix5Q0FBeUMscUlBQXFJLDJCQUEyQixpQ0FBaUMsdUNBQXVDLHNDQUFzQyxrQkFBa0IscURBQXFELEdBQUcsYUFBYSxrREFBa0Qsa0JBQWtCLHdCQUF3QixzQkFBc0IsdUJBQXVCLEdBQUcsd0JBQXdCLG9CQUFvQixHQUFHLHlCQUF5QixrQkFBa0IsMkJBQTJCLHdCQUF3QixzQkFBc0IscUJBQXFCLG9CQUFvQixnQkFBZ0IsR0FBRyw2SEFBNkgsbUJBQW1CLG9CQUFvQixHQUFHLHVDQUF1QyxzQ0FBc0Msb0JBQW9CLHFCQUFxQixHQUFHLDJDQUEyQyx1QkFBdUIsa0JBQWtCLHdCQUF3QixjQUFjLEdBQUcsa0JBQWtCLHVCQUF1QixnQkFBZ0IsaUJBQWlCLEdBQUcsYUFBYSx1QkFBdUIsMEJBQTBCLGlCQUFpQixpQkFBaUIsb0JBQW9CLEdBQUcsaUJBQWlCLGVBQWUsYUFBYSxjQUFjLEdBQUcsbUJBQW1CLGtCQUFrQiw0QkFBNEIsd0JBQXdCLGFBQWEsaUJBQWlCLHVCQUF1QixvQkFBb0IsV0FBVyxZQUFZLGFBQWEsY0FBYyx5Q0FBeUMsNkJBQTZCLHFCQUFxQix1QkFBdUIsR0FBRywwQkFBMEIsdUJBQXVCLGtCQUFrQixpQkFBaUIsZ0JBQWdCLGVBQWUsZ0JBQWdCLDRCQUE0Qiw2QkFBNkIscUJBQXFCLHVCQUF1QixHQUFHLHVFQUF1RSxzRUFBc0UsMEJBQTBCLGlDQUFpQyx1Q0FBdUMsZ0JBQWdCLGlCQUFpQixHQUFHLG9DQUFvQyxzRUFBc0UsR0FBRyxtQ0FBbUMsOEJBQThCLEdBQUcsaUNBQWlDLGdDQUFnQyxHQUFHLDBDQUEwQyx3Q0FBd0Msb0NBQW9DLGlDQUFpQyxHQUFHLGtCQUFrQixrQkFBa0IsNEJBQTRCLHdCQUF3QixvQkFBb0IsR0FBRyxxQkFBcUIsa0RBQWtELG9CQUFvQixHQUFHLHNCQUFzQixrREFBa0Qsb0JBQW9CLEdBQUcsd0JBQXdCLGtEQUFrRCxvQkFBb0IsbUJBQW1CLEdBQUcsa0JBQWtCLHVCQUF1QixrQkFBa0Isd0JBQXdCLDRCQUE0QixlQUFlLHNDQUFzQyxHQUFHLG9CQUFvQixrQkFBa0IsbUNBQW1DLGlCQUFpQixvQkFBb0Isc0JBQXNCLEdBQUcsaUVBQWlFLGtCQUFrQixnQ0FBZ0Msd0JBQXdCLGFBQWEsR0FBRyw2RUFBNkUsa0JBQWtCLHdCQUF3Qiw4QkFBOEIsaUJBQWlCLGlCQUFpQixpQkFBaUIsdUJBQXVCLGdCQUFnQiwrQkFBK0IsR0FBRyw0QkFBNEIsZ0NBQWdDLEdBQUcsbUVBQW1FLGtCQUFrQix3QkFBd0IsaUJBQWlCLEdBQUcscUJBQXFCLGtEQUFrRCxvQkFBb0IsR0FBRyxvQkFBb0IsdUJBQXVCLGtCQUFrQix3QkFBd0IsNEJBQTRCLGVBQWUsa0JBQWtCLHVCQUF1QixHQUFHLHlEQUF5RCxpQkFBaUIsa0JBQWtCLCtDQUErQyxrQkFBa0IscURBQXFELCtCQUErQixHQUFHLGlFQUFpRSxpQ0FBaUMsaUJBQWlCLGdCQUFnQixHQUFHLDZFQUE2RSxzQ0FBc0Msb0JBQW9CLEdBQUcsMkVBQTJFLDhCQUE4QixHQUFHLDZFQUE2RSxrQ0FBa0MsR0FBRyxtRUFBbUUsOEJBQThCLEdBQUcscUVBQXFFLDhCQUE4QixHQUFHLFlBQVksa0JBQWtCLDJCQUEyQix3QkFBd0IsNEJBQTRCLGtCQUFrQixpQkFBaUIsY0FBYyxlQUFlLHVCQUF1QixHQUFHLGNBQWMsa0JBQWtCLEdBQUcsa0JBQWtCLGdCQUFnQixpQkFBaUIsOEJBQThCLDRDQUE0QyxvQkFBb0IsR0FBRyw2QkFBNkIsdUJBQXVCLGtCQUFrQix3QkFBd0IsNEJBQTRCLG9CQUFvQixpQkFBaUIsaUJBQWlCLGtCQUFrQiw4QkFBOEIsdUJBQXVCLGlCQUFpQixvQkFBb0IsR0FBRyx1Q0FBdUMsdUJBQXVCLEdBQUcsaURBQWlELGtCQUFrQiw0QkFBNEIsd0JBQXdCLHVCQUF1Qix1QkFBdUIsaUJBQWlCLGlCQUFpQixrQkFBa0IsY0FBYyx1QkFBdUIsb0JBQW9CLDZGQUE2Riw4QkFBOEIsc0NBQXNDLG9CQUFvQixpQkFBaUIsR0FBRywyREFBMkQsa0JBQWtCLHdCQUF3Qiw0QkFBNEIsY0FBYyx1QkFBdUIsR0FBRyxxRUFBcUUsdUJBQXVCLDhCQUE4QiwyQ0FBMkMsaUJBQWlCLG9CQUFvQixrQkFBa0Isd0JBQXdCLDRCQUE0QixvQkFBb0IsR0FBRyx3UEFBd1AsaUJBQWlCLGlCQUFpQixHQUFHLDRSQUE0Uix5Q0FBeUMsbUJBQW1CLGdDQUFnQyxHQUFHLGtIQUFrSCxrREFBa0Qsb0JBQW9CLGlDQUFpQyxpQkFBaUIsaUJBQWlCLEdBQUcsb0lBQW9JLHlDQUF5QyxtQkFBbUIsZ0NBQWdDLEdBQUcscUhBQXFILGVBQWUsZUFBZSxxRkFBcUYsR0FBRyx5REFBeUQsa0RBQWtELG9CQUFvQixpQ0FBaUMsaUJBQWlCLGlCQUFpQixHQUFHLG1FQUFtRSx5Q0FBeUMsbUJBQW1CLGdDQUFnQyxHQUFHLGFBQWEsa0JBQWtCLHdCQUF3Qix5Q0FBeUMsdUJBQXVCLEdBQUcsb0JBQW9CLDhCQUE4QixrQkFBa0Isd0JBQXdCLHdCQUF3Qiw0QkFBNEIsY0FBYyxvQkFBb0IsaUJBQWlCLHVCQUF1QixnQkFBZ0IsR0FBRyxzQkFBc0IsMEJBQTBCLDhCQUE4QixHQUFHLHdCQUF3QixpQkFBaUIsMkNBQTJDLEdBQUcsaUNBQWlDLHFCQUFxQixHQUFHLDhCQUE4Qix5Q0FBeUMsR0FBRywwQ0FBMEMsMEJBQTBCLHNCQUFzQixLQUFLLGtCQUFrQixzQkFBc0IsS0FBSyx1QkFBdUIsc0JBQXNCLEtBQUssd0JBQXdCLHNCQUFzQixLQUFLLDBCQUEwQixzQkFBc0IsS0FBSyxrQkFBa0IsNkJBQTZCLGtDQUFrQyxpQkFBaUIsdUJBQXVCLEtBQUssb0JBQW9CLDZCQUE2QixpQkFBaUIsMEJBQTBCLEtBQUssWUFBWSx3QkFBd0IsMEJBQTBCLGVBQWUsS0FBSyx3QkFBd0IsMEJBQTBCLEtBQUssbUJBQW1CLDZCQUE2QixnQkFBZ0IseUJBQXlCLEtBQUsscUJBQXFCLHlCQUF5QixpQkFBaUIsS0FBSyx5RUFBeUUsc0JBQXNCLEtBQUssMkNBQTJDLHlCQUF5QixLQUFLLDZCQUE2QixnQkFBZ0Isb0JBQW9CLEtBQUssR0FBRyx3Q0FBd0MsMEJBQTBCLHNCQUFzQixLQUFLLGtCQUFrQixzQkFBc0IsS0FBSyx1QkFBdUIsc0JBQXNCLEtBQUssd0JBQXdCLHNCQUFzQixLQUFLLDBCQUEwQixzQkFBc0IsS0FBSyxrQkFBa0IsNkJBQTZCLGtDQUFrQyxpQkFBaUIsdUJBQXVCLEtBQUssMkRBQTJELG1CQUFtQixvQkFBb0IsdURBQXVELEtBQUssWUFBWSxpQkFBaUIsbUJBQW1CLG9CQUFvQixLQUFLLG9CQUFvQixrQkFBa0IsbUJBQW1CLEtBQUssR0FBRyxPQUFPLHdGQUF3RixVQUFVLFVBQVUsV0FBVyxNQUFNLEtBQUssVUFBVSxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxhQUFhLGFBQWEsV0FBVyxXQUFXLFdBQVcsWUFBWSxXQUFXLFdBQVcsTUFBTSxNQUFNLFlBQVksV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxLQUFLLE9BQU8sV0FBVyxXQUFXLEtBQUssS0FBSyxZQUFZLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFlBQVksV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLFVBQVUsS0FBSyxLQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssWUFBWSxXQUFXLEtBQUssS0FBSyxZQUFZLFdBQVcsV0FBVyxRQUFRLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxLQUFLLE1BQU0sVUFBVSxXQUFXLFdBQVcsVUFBVSxLQUFLLE1BQU0sVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFdBQVcsS0FBSyxNQUFNLFdBQVcsS0FBSyxPQUFPLFVBQVUsV0FBVyxVQUFVLEtBQUssTUFBTSxZQUFZLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsTUFBTSxPQUFPLFVBQVUsVUFBVSxZQUFZLFdBQVcsV0FBVyxXQUFXLEtBQUssT0FBTyxXQUFXLFVBQVUsVUFBVSxLQUFLLE1BQU0sV0FBVyxVQUFVLEtBQUssTUFBTSxZQUFZLE1BQU0sTUFBTSxXQUFXLEtBQUssTUFBTSxXQUFXLEtBQUssTUFBTSxXQUFXLE1BQU0sS0FBSyxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLFlBQVksWUFBWSxVQUFVLEtBQUssS0FBSyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxZQUFZLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxLQUFLLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLE9BQU8sVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLEtBQUssT0FBTyxXQUFXLFlBQVksWUFBWSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxLQUFLLFVBQVUsVUFBVSxVQUFVLEtBQUssVUFBVSxZQUFZLFlBQVksWUFBWSxLQUFLLE9BQU8sWUFBWSxXQUFXLFdBQVcsVUFBVSxVQUFVLEtBQUssT0FBTyxZQUFZLFlBQVksWUFBWSxLQUFLLE9BQU8sVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFlBQVksV0FBVyxXQUFXLFVBQVUsVUFBVSxLQUFLLE1BQU0sWUFBWSxZQUFZLFlBQVksTUFBTSxLQUFLLFVBQVUsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFlBQVksV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsS0FBSyxLQUFLLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxXQUFXLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLE1BQU0sS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFdBQVcsV0FBVyxVQUFVLFdBQVcsS0FBSyxLQUFLLFdBQVcsVUFBVSxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsVUFB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Ozs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBRUFTLFFBQVEsQ0FBQzJHLGFBQVQsQ0FBdUIsdUJBQXZCLEVBQWdEYyxJQUFoRCxHQUF1REYsZ0RBQXZEO0FBQ0F2SCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUN5SCxHQUF2QyxHQUE2Q0Ysd0RBQTdDO0FBRUEvSCwwRUFBaUIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9mYWN0b3JpZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2hlbHBlcnMvc2hpcC1kYXRhLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9tb2R1bGVzL2Rpc3BsYXlDb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9tb2R1bGVzL2RyYWdBbmREcm9wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9tb2R1bGVzL3JvYm9HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9tb2R1bGVzL3R3b1BsYXllckdhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz80YzM3Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5cbmNvbnN0IEdhbWUgPSAocGxheWVyMSkgPT4ge1xuICAvLyBDcmVhdGUgUGxheWVyIE9iamVjdHNcbiAgY29uc3QgaHVtYW5QbGF5ZXIgPSBQbGF5ZXIocGxheWVyMSk7XG4gIGNvbnN0IHJvYm9QbGF5ZXIgPSBQbGF5ZXIoXCJyb2JvUGxheWVyXCIpO1xuICAvLyBDcmVhdGUgR2FtZWJvYXJkcyBmb3IgZWFjaCBQbGF5ZXJcbiAgY29uc3QgaHVtYW5Cb2FyZCA9IEdhbWVib2FyZChodW1hblBsYXllcik7XG4gIGNvbnN0IHJvYm9Cb2FyZCA9IEdhbWVib2FyZChyb2JvUGxheWVyKTtcbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgaHVtYW5Cb2FyZC5yZW1vdmVBbGxTaGlwcygpO1xuICAgIHJvYm9Cb2FyZC5yZW1vdmVBbGxTaGlwcygpO1xuICB9O1xuICAvLyBSZXNldCBHYW1lXG4gIHJldHVybiB7IGh1bWFuQm9hcmQsIHJvYm9Cb2FyZCwgcmVzZXQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJpbXBvcnQgc2hpcERhdGEgZnJvbSBcIi4uL2hlbHBlcnMvc2hpcC1kYXRhXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICBib2FyZDogW10sXG4gICAgcGxheWVyOiBwbGF5ZXIsXG4gICAgc2hpcHNMZWZ0OiB0cnVlLFxuICAgIHNoaXBzOiBbXSxcbiAgICBtaXNzZWRTaG90czogW10sXG4gIH07XG5cbiAgY29uc3QgaW5pdEJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGRhdGEuYm9hcmQucHVzaCh7IGluZGV4OiBpLCBoYXNTaGlwOiBmYWxzZSwgaXNIaXQ6IGZhbHNlIH0pO1xuICAgIH1cbiAgfTtcblxuICBpbml0Qm9hcmQoKTtcblxuICBjb25zdCBuZXdGbGVldCA9ICgpID0+IHtcbiAgICBzaGlwRGF0YS5mb3JFYWNoKChpdGVtKSA9PiBkYXRhLnNoaXBzLnB1c2goU2hpcChpdGVtLm5hbWUsIGl0ZW0ubGVuZ3RoKSkpO1xuICB9O1xuXG4gIG5ld0ZsZWV0KCk7XG5cbiAgY29uc3QgcmlnaHRFZGdlcyA9IFs5LCAxOSwgMjksIDM5LCA0OSwgNTksIDY5LCA3OSwgODksIDk5XTtcbiAgY29uc3QgYm90dG9tRWRnZXMgPSBbOTAsIDkxLCA5MiwgOTMsIDk0LCA5NSwgOTYsIDk3LCA5OCwgOTldO1xuXG4gIGNvbnN0IGNoZWNrU2hpcHMgPSAoc2hpcCwgbnVtKSA9PiB7XG4gICAgaWYgKHNoaXAudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGRhdGEuYm9hcmRbbnVtICsgaV0gJiYgZGF0YS5ib2FyZFtudW0gKyBpXS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNoaXAudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZGF0YS5ib2FyZFtudW0gKyBpICogMTBdICYmXG4gICAgICAgICAgZGF0YS5ib2FyZFtudW0gKyBpICogMTBdLmhhc1NoaXAgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tFZGdlcyA9IChzaGlwLCBudW0pID0+IHtcbiAgICBpZiAoc2hpcC52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IGVkZ2VMaXN0ID0gcmlnaHRFZGdlcy5zbGljZSgpO1xuICAgICAgZWRnZUxpc3QucHVzaChudW0pO1xuICAgICAgZWRnZUxpc3Quc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgY29uc3QgaW5kZXggPSBlZGdlTGlzdC5pbmRleE9mKG51bSk7XG4gICAgICByZXR1cm4gZWRnZUxpc3RbaW5kZXggKyAxXSAtIGVkZ2VMaXN0W2luZGV4XSA+PSBzaGlwLmxlbmd0aFxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHNoaXAudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGVkZ2UgPSBib3R0b21FZGdlcy5maW5kKChlZGdlKSA9PiBlZGdlICUgMTAgPT09IG51bSAlIDEwKTtcbiAgICAgIHJldHVybiAoZWRnZSAtIG51bSkgLyAxMCArIDEgPj0gc2hpcC5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCBzdGFydGluZ1BvaW50KSA9PiB7XG4gICAgaWYgKHNoaXAudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoY2hlY2tTaGlwcyhzaGlwLCBzdGFydGluZ1BvaW50KSAmJiBjaGVja0VkZ2VzKHNoaXAsIHN0YXJ0aW5nUG9pbnQpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRhdGEuYm9hcmRbc3RhcnRpbmdQb2ludCArIGldLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICAgIGRhdGEuYm9hcmRbc3RhcnRpbmdQb2ludCArIGldW1wic2hpcFR5cGVcIl0gPSBzaGlwO1xuICAgICAgICAgIHNoaXAucG9zaXRpb24ucHVzaChzdGFydGluZ1BvaW50ICsgaSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNoaXAudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgIGlmIChjaGVja1NoaXBzKHNoaXAsIHN0YXJ0aW5nUG9pbnQpICYmIGNoZWNrRWRnZXMoc2hpcCwgc3RhcnRpbmdQb2ludCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZGF0YS5ib2FyZFtzdGFydGluZ1BvaW50ICsgaSAqIDEwXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgICBkYXRhLmJvYXJkW3N0YXJ0aW5nUG9pbnQgKyBpICogMTBdW1wic2hpcFR5cGVcIl0gPSBzaGlwO1xuICAgICAgICAgIHNoaXAucG9zaXRpb24ucHVzaChzdGFydGluZ1BvaW50ICsgaSAqIDEwKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByYW5kb21seVBsYWNlID0gKC4uLmFyZ3MpID0+IHtcbiAgICBhcmdzWzBdLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgY29uc3QgaXNWZXJ0aWNhbCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSk7XG4gICAgICBpc1ZlcnRpY2FsID09PSAxID8gKGFyZy52ZXJ0aWNhbCA9IHRydWUpIDogKGFyZy52ZXJ0aWNhbCA9IGZhbHNlKTtcbiAgICAgIGxldCByYW5kb21TcG90ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICAgIHdoaWxlIChhcmcucG9zaXRpb24ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChjaGVja1NoaXBzKGFyZywgcmFuZG9tU3BvdCkgJiYgY2hlY2tFZGdlcyhhcmcsIHJhbmRvbVNwb3QpKSB7XG4gICAgICAgICAgcGxhY2VTaGlwKGFyZywgcmFuZG9tU3BvdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmFuZG9tU3BvdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVTaGlwID0gKHNoaXApID0+IHtcbiAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICBkYXRhLmJvYXJkW2luZGV4XSA9IHsgaGFzU2hpcDogZmFsc2UsIGlzSGl0OiBmYWxzZSB9O1xuICAgIH0pO1xuICAgIHNoaXAucmVzZXRQb3NpdGlvbigpO1xuICAgIHNoaXAucmVzZXRIaXRzKCk7XG4gICAgZGF0YS5zaGlwc0xlZnQgPSBmYWxzZTtcbiAgICBkYXRhLm1pc3NlZFNob3RzID0gW107XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlQWxsU2hpcHMgPSAoKSA9PiB7XG4gICAgZGF0YS5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiByZW1vdmVTaGlwKHNoaXApKTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKG51bSkgPT4ge1xuICAgIGlmIChkYXRhLmJvYXJkW251bV0uaGFzU2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgZGF0YS5ib2FyZFtudW1dLnNoaXBUeXBlLmhpdChudW0pO1xuICAgICAgZGF0YS5ib2FyZFtudW1dLmlzSGl0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhLmJvYXJkW251bV0uaXNIaXQgPSB0cnVlO1xuICAgICAgZGF0YS5taXNzZWRTaG90cy5wdXNoKG51bSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRhdGEuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT09IHRydWUpID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBjaGVja0VkZ2VzLFxuICAgIGNoZWNrU2hpcHMsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJhbmRvbWx5UGxhY2UsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTdW5rLFxuICAgIHJlbW92ZUFsbFNoaXBzLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiY29uc3QgUGxheWVyID0gKG5hbWUpID0+IHtcbiAgY29uc3QgcGxheWVySW5mbyA9IHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIHNob3RzOiBbXSxcbiAgfTtcblxuICBjb25zdCBmaXJlQXdheSA9IChnYW1lYm9hcmQsIG51bSkgPT4ge1xuICAgIHJldHVybiBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhudW0pXG4gICAgICA/IHBsYXllckluZm8uc2hvdHMucHVzaCh7IGluZGV4OiBudW0sIHNob3Q6IFwiaGl0XCIgfSlcbiAgICAgIDogcGxheWVySW5mby5zaG90cy5wdXNoKHsgaW5kZXg6IG51bSwgc2hvdDogXCJtaXNzXCIgfSk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBuZXh0IGJlc3QgbW92ZSBiYXNlZCBvbiBzb21lIGxvZ2ljYWwgYXNzdW1wdGlvbnMgYWJvdXQgdGhlIGdhbWVcbiAgbGV0IG5leHRNb3ZlcyA9IFtdO1xuICBjb25zdCBmaW5kTmV4dE1vdmUgPSAoYm9hcmQsIG51bSkgPT4ge1xuICAgIC8vIFJlbW92ZSBudW0gZnJvbSBuZXh0TW92ZXMgYXJyYXkgdG8gYXZvaWQgZHVwbGljYXRpb25cbiAgICBuZXh0TW92ZXMuc3BsaWNlKG5leHRNb3Zlcy5pbmRleE9mKG51bSksIDEpO1xuICAgIGlmIChib2FyZC5kYXRhLmJvYXJkW251bV0uaGFzU2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgbmV4dE1vdmVzID0gW107XG4gICAgICAvLyBQcm90ZWN0IHJvYm9QbGF5ZXIgZnJvbSBtYWtpbmcgb3V0LW9mLWJvdW5kIG1vdmVzXG4gICAgICBpZiAoYm9hcmQuZGF0YS5ib2FyZFtudW0gLSAxXSkge1xuICAgICAgICBpZiAoYm9hcmQuZGF0YS5ib2FyZFtudW0gLSAxXS5pc0hpdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBuZXh0TW92ZXMucHVzaChudW0gLSAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGJvYXJkLmRhdGEuYm9hcmRbbnVtICsgMV0pIHtcbiAgICAgICAgaWYgKGJvYXJkLmRhdGEuYm9hcmRbbnVtICsgMV0uaXNIaXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgbmV4dE1vdmVzLnB1c2gobnVtICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChib2FyZC5kYXRhLmJvYXJkW251bSAtIDEwXSkge1xuICAgICAgICBpZiAoYm9hcmQuZGF0YS5ib2FyZFtudW0gLSAxMF0uaXNIaXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgbmV4dE1vdmVzLnB1c2gobnVtIC0gMTApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYm9hcmQuZGF0YS5ib2FyZFtudW0gKyAxMF0pIHtcbiAgICAgICAgaWYgKGJvYXJkLmRhdGEuYm9hcmRbbnVtICsgMTBdLmlzSGl0ID09PSBmYWxzZSkge1xuICAgICAgICAgIG5leHRNb3Zlcy5wdXNoKG51bSArIDEwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHRNb3ZlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5leHRNb3ZlcztcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgcm9ib1BsYXkgPSAoYm9hcmQsIG5leHRNb3ZlKSA9PiB7XG4gICAgbGV0IHJhbmRvbVNwb3QgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgIGlmIChuZXh0TW92ZSAmJiBuZXh0TW92ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBuZXh0QmVzdE1vdmUgPVxuICAgICAgICBuZXh0TW92ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuZXh0TW92ZS5sZW5ndGgpXTtcbiAgICAgIGZpcmVBd2F5KGJvYXJkLCBuZXh0QmVzdE1vdmUpO1xuICAgICAgY29uc29sZS5sb2cobmV4dE1vdmUsIG5leHRCZXN0TW92ZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aGlzTW92ZTogbmV4dEJlc3RNb3ZlLFxuICAgICAgICBuZXh0TW92ZTogZmluZE5leHRNb3ZlKGJvYXJkLCBuZXh0QmVzdE1vdmUpLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBhc3MgPSB0cnVlO1xuICAgICAgd2hpbGUgKHBhc3MpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJvYXJkLmRhdGEuYm9hcmRbcmFuZG9tU3BvdF0gJiZcbiAgICAgICAgICBib2FyZC5kYXRhLmJvYXJkW3JhbmRvbVNwb3RdLmlzSGl0ID09PSBmYWxzZSAmJlxuICAgICAgICAgICFwbGF5ZXJJbmZvLnNob3RzLmluY2x1ZGVzKChpdGVtKSA9PiBpdGVtLmluZGV4ID09PSByYW5kb21TcG90KVxuICAgICAgICApIHtcbiAgICAgICAgICBmaXJlQXdheShib2FyZCwgcmFuZG9tU3BvdCk7XG4gICAgICAgICAgcGFzcyA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aGlzTW92ZTogcmFuZG9tU3BvdCxcbiAgICAgICAgICAgIG5leHRNb3ZlOiBmaW5kTmV4dE1vdmUoYm9hcmQsIHJhbmRvbVNwb3QpLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmFuZG9tU3BvdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGF5ZXJJbmZvLFxuICAgIGZpcmVBd2F5LFxuICAgIGZpbmROZXh0TW92ZSxcbiAgICByb2JvUGxheSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IFNoaXAgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBsZW5ndGg6IGxlbmd0aCxcbiAgICB2ZXJ0aWNhbDogZmFsc2UsXG4gICAgaGl0czogQXJyYXkobGVuZ3RoKS5maWxsKG51bGwpLFxuICAgIHBvc2l0aW9uOiBbXSxcbiAgICBjaGFuZ2VBeGlzKGRpcmVjdGlvbikge1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgIHRoaXMudmVydGljYWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIHRoaXMudmVydGljYWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhpdChudW0pIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wb3NpdGlvbi5pbmRleE9mKE51bWJlcihudW0pKTtcbiAgICAgIHRoaXMuaGl0c1tpbmRleF0gPSBcImhpdFwiO1xuICAgIH0sXG4gICAgaXNTdW5rKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0cy5ldmVyeSgocG9zaXRpb24pID0+IChwb3NpdGlvbiA9PT0gXCJoaXRcIiA/IHRydWUgOiBmYWxzZSkpO1xuICAgIH0sXG4gICAgcmVzZXRQb3NpdGlvbigpIHtcbiAgICAgIHJldHVybiAodGhpcy5wb3NpdGlvbiA9IFtdKTtcbiAgICB9LFxuICAgIHJlc2V0SGl0cygpIHtcbiAgICAgIHRoaXMuaGl0cyA9IEFycmF5KHRoaXMubGVuZ3RoKS5maWxsKG51bGwpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiY29uc3Qgc2hpcERhdGEgPSBbXG4gIHtcbiAgICBuYW1lOiBcImNhcnJpZXJcIixcbiAgICBsZW5ndGg6IDUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImJhdHRsZXNoaXBcIixcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRlc3Ryb3llclwiLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic3VibWFyaW5lXCIsXG4gICAgbGVuZ3RoOiAyLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwYXRyb2wtYm9hdFwiLFxuICAgIGxlbmd0aDogMSxcbiAgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBEYXRhO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2ZhY3Rvcmllcy9nYW1lLmpzXCI7XG5pbXBvcnQgcm9ib0dhbWUgZnJvbSBcIi4vcm9ib0dhbWUuanNcIjtcbmltcG9ydCB0d29QbGF5ZXJHYW1lIGZyb20gXCIuL3R3b1BsYXllckdhbWUuanNcIjtcbmltcG9ydCBkcmFnQW5kRHJvcCBmcm9tIFwiLi9kcmFnQW5kRHJvcC5qc1wiO1xuXG5jb25zdCBkaXNwbGF5Q29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGdhbWUgPSBHYW1lKFwiSmVycnlcIik7XG4gIGNvbnN0IGJvYXJkT25lID0gZ2FtZS5odW1hbkJvYXJkLmRhdGEuYm9hcmQ7XG4gIGNvbnN0IGJvYXJkVHdvID0gZ2FtZS5yb2JvQm9hcmQuZGF0YS5ib2FyZDtcbiAgY29uc3QgcGxheWVyT25lID0gZ2FtZS5odW1hbkJvYXJkLmRhdGEucGxheWVyO1xuICBjb25zdCBwbGF5ZXJUd28gPSBnYW1lLnJvYm9Cb2FyZC5kYXRhLnBsYXllcjtcbiAgY29uc3QgYm9hcmRPbmVET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLW9uZVwiKTtcbiAgY29uc3QgYm9hcmRUd29ET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLXR3b1wiKTtcbiAgY29uc3Qgc2hpcHNET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBzXCIpO1xuICBjb25zdCBwbGF5ZXJPbmVJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYXllci1vbmVcIilbMF07XG4gIGNvbnN0IHBsYXllclR3b0luZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGxheWVyLXR3b1wiKVswXTtcbiAgY29uc3QgcGxheWVyT25lTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1uYW1lLWlucHV0XCIpO1xuICBjb25zdCBwbGF5ZXJUd29OYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLW5hbWUtaW5wdXRcIik7XG4gIGNvbnN0IHBsYXllck9uZVNoaXBzTGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1zaGlwcy1sZWZ0XCIpO1xuICBjb25zdCBwbGF5ZXJUd29TaGlwc0xlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tc2hpcHMtbGVmdFwiKTtcbiAgY29uc3QgZ2FtZVN0YXJ0dXAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ2FtZS1zdGFydHVwXCIpWzBdO1xuICBjb25zdCBzdGFydE5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LW5leHQtYnV0dG9uXCIpO1xuICBjb25zdCB0dXJuU2lnbmFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0dXJuLXNpZ25hbC10ZXh0XCIpO1xuICBjb25zdCBzdGFydE5leHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LW5leHQtYnV0dG9uXCIpO1xuXG4gIC8vIERpc3BsYXkgdGhlIEdhbWVib2FyZHNcbiAgY29uc3QgcmVuZGVyQm9hcmQgPSAoYm9hcmQsIERPTWVsZW0pID0+IHtcbiAgICBib2FyZC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LmRhdGFzZXQuaW5kZXggPSBib2FyZC5pbmRleE9mKGNlbGwpO1xuICAgICAgaWYgKGNlbGwuaGFzU2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImhhc1NoaXBcIik7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKGAke2NlbGwuc2hpcFR5cGUubmFtZX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwibm9TaGlwXCIpO1xuICAgICAgfVxuICAgICAgYm9hcmQgPT09IGJvYXJkT25lXG4gICAgICAgID8gZGl2LmNsYXNzTGlzdC5hZGQoXCJib2FyZC1vbmVcIilcbiAgICAgICAgOiBkaXYuY2xhc3NMaXN0LmFkZChcImJvYXJkLXR3b1wiKTtcbiAgICAgIERPTWVsZW0uYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9KTtcbiAgfTtcbiAgcmVuZGVyQm9hcmQoYm9hcmRPbmUsIGJvYXJkT25lRE9NKTtcbiAgcmVuZGVyQm9hcmQoYm9hcmRUd28sIGJvYXJkVHdvRE9NKTtcblxuICBjb25zdCByZW1vdmVCb2FyZCA9IChET01lbGVtKSA9PiB7XG4gICAgd2hpbGUgKERPTWVsZW0uZmlyc3RDaGlsZCkge1xuICAgICAgRE9NZWxlbS5yZW1vdmVDaGlsZChET01lbGVtLmxhc3RDaGlsZCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFRvZ2dsZSBidXR0b24gZm9yIG51bWJlciBvZiBwbGF5ZXJzXG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJzXCIpO1xuICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2xpZGVyXCIpWzBdO1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgIGlmIChjaGVja2JveC5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICBzbGlkZXIuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJvbmUtcGxheWVyLWxvZ29cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICBPbmUgVHdvIFBsYXllclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGxheWVyLWxvZ29cIj48L2Rpdj5gO1xuICAgICAgcGxheWVyVHdvU2hpcHNMZWZ0LmlubmVyVGV4dCA9IDA7XG4gICAgICBzdGFydE5leHQuaW5uZXJUZXh0ID0gXCJOZXh0XCI7XG4gICAgICBwbGF5ZXJUd29OYW1lLnRleHRDb250ZW50ID0gXCJQbGF5ZXIyXCI7XG4gICAgICBnYW1lLnJvYm9Cb2FyZC5kYXRhLnBsYXllci5wbGF5ZXJJbmZvLm5hbWUgPSBcIlBsYXllcjJcIjtcbiAgICAgIHBsYXllclR3b05hbWUuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XG4gICAgICBwbGF5ZXJUd29OYW1lLnN0eWxlLm91dGxpbmUgPSBcIjFweCBzb2xpZCAjNmE3YWFjXCI7XG4gICAgICBwbGF5ZXJUd29TaGlwc0xlZnQuaW5uZXJUZXh0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVyLmlubmVySFRNTCA9IGAgPGRpdiBjbGFzcz1cIm9uZS1wbGF5ZXItbG9nb1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIE9uZSBQbGF5ZXIgVHdvXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wbGF5ZXItbG9nb1wiPjwvZGl2PmA7XG4gICAgICBib2FyZE9uZURPTS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgIHBsYXllck9uZUluZm8uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICBib2FyZFR3b0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBwbGF5ZXJUd29JbmZvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHN0YXJ0TmV4dC5pbm5lclRleHQgPSBcIlN0YXJ0IVwiO1xuICAgICAgcGxheWVyVHdvTmFtZS50ZXh0Q29udGVudCA9IFwicm9ib1BsYXllclwiO1xuICAgICAgcGxheWVyVHdvTmFtZS5zdHlsZS5jdXJzb3IgPSBcIlwiO1xuICAgICAgcGxheWVyVHdvTmFtZS5zdHlsZS5vdXRsaW5lID0gXCJcIjtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEZpbmQgd2lkdGggb2Ygc3BhbiB0ZXh0Q29udGVudFxuICBmdW5jdGlvbiB0ZXh0V2lkdGgodGV4dCwgZm9udCkge1xuICAgIGZvbnQgPSBmb250IHx8IFwiMThweCBPcmlnaW5hbCBTdXJmZXJcIjtcbiAgICB2YXIgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdmFyIGN0eCA9IGMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5mb250ID0gZm9udDtcbiAgICByZXR1cm4gY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xuICB9XG5cbiAgLy8gTG9nIHBsYXllck5hbWUgY2hhbmdlcyB0byBlYWNoIFBsYXllciBPYmplY3RcbiAgY29uc3QgdXBkYXRlUGxheWVyTmFtZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyTmFtZXMgPSBbcGxheWVyT25lTmFtZSwgcGxheWVyVHdvTmFtZV07XG4gICAgcGxheWVyTmFtZXMuZm9yRWFjaCgobmFtZSkgPT5cbiAgICAgIG5hbWUuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGV4dFdpZHRoKGUudGFyZ2V0LnRleHRDb250ZW50KSA+PSAxNDApIHtcbiAgICAgICAgICBpZiAoZS5rZXkgIT09IFwiQmFja3NwYWNlXCIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgfTtcbiAgICBjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uIChtdXRhdGlvbkxpc3QpIHtcbiAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKG11dGF0aW9uLnRhcmdldC50ZXh0Q29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgcGxheWVyO1xuICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnBhcmVudE5vZGUuaWQgPT09IFwicGxheWVyLW9uZS1uYW1lLWlucHV0XCJcbiAgICAgICAgICAgICAgPyAocGxheWVyID0gZ2FtZS5odW1hbkJvYXJkLmRhdGEucGxheWVyKVxuICAgICAgICAgICAgICA6IChwbGF5ZXIgPSBnYW1lLnJvYm9Cb2FyZC5kYXRhLnBsYXllcik7XG4gICAgICAgICAgICBwbGF5ZXIucGxheWVySW5mby5uYW1lID0gbXV0YXRpb24udGFyZ2V0LnRleHRDb250ZW50O1xuICAgICAgICAgICAgZGlzcGxheVR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgIG9ic2VydmVyLm9ic2VydmUocGxheWVyT25lTmFtZSwgY29uZmlnKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHBsYXllclR3b05hbWUsIGNvbmZpZyk7XG4gIH07XG4gIHVwZGF0ZVBsYXllck5hbWVzKCk7XG5cbiAgLy8gVXBkYXRlIHBsYXllci1pbmZvIG51bWJlciBvZiBzaGlwcyBsZWZ0XG4gIGNvbnN0IHVwZGF0ZVNoaXBzTGVmdCA9ICgpID0+IHtcbiAgICBwbGF5ZXJPbmVTaGlwc0xlZnQudGV4dENvbnRlbnQgPSBnYW1lLmh1bWFuQm9hcmQuZGF0YS5zaGlwcy5maWx0ZXIoKHNoaXApID0+XG4gICAgICBzaGlwLmhpdHMuaW5jbHVkZXMobnVsbClcbiAgICApLmxlbmd0aDtcbiAgICBwbGF5ZXJUd29TaGlwc0xlZnQudGV4dENvbnRlbnQgPSBnYW1lLnJvYm9Cb2FyZC5kYXRhLnNoaXBzLmZpbHRlcigoc2hpcCkgPT5cbiAgICAgIHNoaXAuaGl0cy5pbmNsdWRlcyhudWxsKVxuICAgICkubGVuZ3RoO1xuICB9O1xuXG4gIC8vIERpc3BsYXkgd2hvc2UgdHVybiBpdCBpc1xuICBjb25zdCBkaXNwbGF5VHVybiA9ICgpID0+IHtcbiAgICBpZiAoZ2FtZVN0YXJ0dXAuc3R5bGUuZGlzcGxheSA9PT0gXCJmbGV4XCIpIHtcbiAgICAgIC8vaWYgdGhlIGdhbWUgaXMgc3RpbGwgYmVpbmcgc2V0dXBcbiAgICAgIHBsYXllck9uZUluZm8uc3R5bGUuZGlzcGxheSA9PT0gXCJcIlxuICAgICAgICA/ICh0dXJuU2lnbmFsLmlubmVyVGV4dCA9IGAke3BsYXllck9uZS5wbGF5ZXJJbmZvLm5hbWV9J3MgdHVybjogcGxhY2UgeW91ciBzaGlwcyBvbiB0aGUgYm9hcmQgdG8gc3RhcnRgKVxuICAgICAgICA6ICh0dXJuU2lnbmFsLmlubmVyVGV4dCA9IGAke3BsYXllclR3by5wbGF5ZXJJbmZvLm5hbWV9J3MgdHVybjogcGxhY2UgeW91ciBzaGlwcyBvbiB0aGUgYm9hcmQgdG8gc3RhcnRgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFnYW1lLmh1bWFuQm9hcmQuYWxsU3VuaygpICYmICFnYW1lLnJvYm9Cb2FyZC5hbGxTdW5rKCkpXG4gICAgICAgIHBsYXllck9uZU5hbWUuc3R5bGUub3V0bGluZSA9PT0gXCIycHggc29saWQgI2UyYzA4Y1wiXG4gICAgICAgICAgPyAodHVyblNpZ25hbC5pbm5lclRleHQgPSBgJHtwbGF5ZXJPbmUucGxheWVySW5mby5uYW1lfSdzIHR1cm46IGZpcmUgYXdheSFgKVxuICAgICAgICAgIDogKHR1cm5TaWduYWwuaW5uZXJUZXh0ID0gYCR7cGxheWVyVHdvLnBsYXllckluZm8ubmFtZX0ncyB0dXJuOiBmaXJlIGF3YXkhYCk7XG4gICAgfVxuICB9O1xuICBkaXNwbGF5VHVybigpO1xuXG4gIC8vIFN0YXJ0IGEgbmV3IGdhbWUgd2hlbiB1c2VycyBjbGljayBvbiB0aGUgYnV0dG9uXG4gIGNvbnN0IG5ld0dhbWVET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1nYW1lXCIpO1xuICBjb25zdCBzZXR1cEdhbWUgPSAoKSA9PiB7XG4gICAgLy8gUmVzZXQgR2FtZSBPYmplY3RzXG4gICAgZ2FtZS5yZXNldCgpO1xuICAgIHNoaXBzRE9NLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgIHBsYXllck9uZVNoaXBzTGVmdC5pbm5lclRleHQgPSBcIjBcIjtcbiAgICBwbGF5ZXJUd29TaGlwc0xlZnQuaW5uZXJUZXh0ID0gXCIwXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYXllci1vbmUtcmVhZHlcIilbMF0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYXllci10d28tcmVhZHlcIilbMF0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgc3RhcnROZXh0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmZvLW1pc3NpbmdcIik7XG4gICAgcGxheWVyT25lTmFtZS5jbGFzc0xpc3QuYWRkKFwiZWRpdFwiKTtcbiAgICBwbGF5ZXJUd29OYW1lLmNsYXNzTGlzdC5hZGQoXCJlZGl0XCIpO1xuICAgIHBsYXllck9uZU5hbWUuc2V0QXR0cmlidXRlKFwiY29udGVudEVkaXRhYmxlXCIsIHRydWUpO1xuICAgIHBsYXllclR3b05hbWUuc2V0QXR0cmlidXRlKFwiY29udGVudEVkaXRhYmxlXCIsIHRydWUpO1xuICAgIHBsYXllck9uZU5hbWUuc3R5bGUub3V0bGluZSA9IFwiMXB4IGRvdHRlZCAjNmE3YWFjXCI7XG4gICAgcGxheWVyVHdvTmFtZS5zdHlsZS5vdXRsaW5lID0gXCIxcHggZG90dGVkICM2YTdhYWNcIjtcbiAgICBib2FyZE9uZURPTS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICBwbGF5ZXJPbmVJbmZvLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgIHJlbW92ZUJvYXJkKGJvYXJkT25lRE9NKTtcbiAgICBnYW1lLmh1bWFuQm9hcmQucmVtb3ZlQWxsU2hpcHMoKTtcbiAgICByZW5kZXJCb2FyZChib2FyZE9uZSwgYm9hcmRPbmVET00pO1xuICAgIHJlbW92ZUJvYXJkKGJvYXJkVHdvRE9NKTtcbiAgICBnYW1lLnJvYm9Cb2FyZC5yZW1vdmVBbGxTaGlwcygpO1xuICAgIHJlbmRlckJvYXJkKGJvYXJkVHdvLCBib2FyZFR3b0RPTSk7XG4gICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgIHNsaWRlci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgc2xpZGVyLmlubmVySFRNTCA9IGAgPGRpdiBjbGFzcz1cIm9uZS1wbGF5ZXItbG9nb1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIE9uZSBQbGF5ZXIgVHdvXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wbGF5ZXItbG9nb1wiPjwvZGl2PmA7XG4gICAgZ2FtZVN0YXJ0dXAuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIGJvYXJkVHdvRE9NLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBwbGF5ZXJUd29JbmZvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB0dXJuU2lnbmFsLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgIGRpc3BsYXlUdXJuKCk7XG4gIH07XG4gIC8vIENhbGwgc2V0dXBHYW1lIHRvIHN0YXJ0IGEgbmV3IGdhbWUgb24gcGFnZSBsb2FkXG4gIHNldHVwR2FtZSgpO1xuICBuZXdHYW1lRE9NLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc2V0dXBHYW1lKTtcblxuICBjb25zdCByYW5kb21seVBsYWNlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5kb21seS1wbGFjZS1idXR0b25cIik7XG4gIGNvbnN0IHJhbmRvbWx5UGxhY2VTaGlwcyA9ICgpID0+IHtcbiAgICBzaGlwc0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICBzdGFydE5leHRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImluZm8tbWlzc2luZ1wiKTtcbiAgICBpZiAoYm9hcmRUd29ET00uc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgIHJlbW92ZUJvYXJkKGJvYXJkT25lRE9NKTtcbiAgICAgIGdhbWUuaHVtYW5Cb2FyZC5yZW1vdmVBbGxTaGlwcygpO1xuICAgICAgZ2FtZS5odW1hbkJvYXJkLnJhbmRvbWx5UGxhY2UoZ2FtZS5odW1hbkJvYXJkLmRhdGEuc2hpcHMpO1xuICAgICAgcmVuZGVyQm9hcmQoYm9hcmRPbmUsIGJvYXJkT25lRE9NKTtcbiAgICAgIHVwZGF0ZVNoaXBzTGVmdCgpO1xuICAgIH0gZWxzZSBpZiAoYm9hcmRPbmVET00uc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgIHJlbW92ZUJvYXJkKGJvYXJkVHdvRE9NKTtcbiAgICAgIGdhbWUucm9ib0JvYXJkLnJlbW92ZUFsbFNoaXBzKCk7XG4gICAgICBnYW1lLnJvYm9Cb2FyZC5yYW5kb21seVBsYWNlKGdhbWUucm9ib0JvYXJkLmRhdGEuc2hpcHMpO1xuICAgICAgcmVuZGVyQm9hcmQoYm9hcmRUd28sIGJvYXJkVHdvRE9NKTtcbiAgICAgIHVwZGF0ZVNoaXBzTGVmdCgpO1xuICAgIH1cbiAgfTtcbiAgcmFuZG9tbHlQbGFjZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHJhbmRvbWx5UGxhY2VTaGlwcyk7XG5cbiAgY29uc3QgZHJhZ0FuZERyb3BCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyYWctYW5kLWRyb3AtYnV0dG9uXCIpO1xuICBkcmFnQW5kRHJvcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsICgpID0+IHtcbiAgICBkcmFnQW5kRHJvcC5ydW4oZ2FtZSk7XG4gIH0pO1xuXG4gIC8vIENvbnRyb2wgdGhlIGdhbWUgc2V0dXAgZm9yIGJvdGggb25lLXBsYXllciBhbmQgdHdvLXBsYXllclxuICBjb25zdCBnYW1lU3RhcnROZXh0ID0gKGUpID0+IHtcbiAgICBpZiAoXG4gICAgICAoZS50YXJnZXQuaW5uZXJUZXh0ID09PSBcIk5leHRcIiAmJiBwbGF5ZXJPbmVTaGlwc0xlZnQuaW5uZXJUZXh0ICE9PSBcIjVcIikgfHxcbiAgICAgIChlLnRhcmdldC5pbm5lclRleHQgPT09IFwiU3RhcnQhXCIgJiZcbiAgICAgICAgcGxheWVyT25lU2hpcHNMZWZ0LmlubmVyVGV4dCAhPT0gXCI1XCIpIHx8XG4gICAgICAoZS50YXJnZXQuaW5uZXJUZXh0ID09PSBcIlN0YXJ0IVwiICYmXG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPT09IHRydWUgJiZcbiAgICAgICAgcGxheWVyVHdvU2hpcHNMZWZ0LmlubmVyVGV4dCAhPT0gXCI1XCIpXG4gICAgKSB7XG4gICAgICBzdGFydE5leHRCdXR0b24uY2xhc3NMaXN0LmFkZChcImluZm8tbWlzc2luZ1wiKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCB0aGUgZ2FtZSBmcm9tIHN0YXJ0aW5nIHdoZW4gbm8gU2hpcHMgYXJlIG9uIEJvYXJkXG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5pbm5lclRleHQgPT09IFwiTmV4dFwiKSB7XG4gICAgICAvLyBUd28tcGxheWVyIG1vZGVcbiAgICAgIHN0YXJ0TmV4dEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaW5mby1taXNzaW5nXCIpO1xuICAgICAgYm9hcmRPbmVET00uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgcGxheWVyT25lSW5mby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBib2FyZFR3b0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgIHBsYXllclR3b0luZm8uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICBzaGlwc0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgIHN0YXJ0TmV4dC5pbm5lclRleHQgPSBcIlN0YXJ0IVwiO1xuICAgICAgcGxheWVyVHdvU2hpcHNMZWZ0LmlubmVyVGV4dCA9IDA7XG4gICAgICBwbGF5ZXJPbmVOYW1lLnNldEF0dHJpYnV0ZShcImNvbnRlbnRFZGl0YWJsZVwiLCBmYWxzZSk7XG4gICAgICBwbGF5ZXJPbmVOYW1lLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgcGxheWVyVHdvTmFtZS5zZXRBdHRyaWJ1dGUoXCJjb250ZW50RWRpdGFibGVcIiwgdHJ1ZSk7XG4gICAgICBwbGF5ZXJUd29OYW1lLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGFzU2hpcFwiKSkuZm9yRWFjaCgoaXRlbSkgPT5cbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGlkZVNoaXBcIilcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5pbm5lclRleHQgPT09IFwiU3RhcnQhXCIpIHtcbiAgICAgIHNoaXBzRE9NLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgcGxheWVyT25lTmFtZS5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgIHBsYXllclR3b05hbWUucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICBzdGFydE5leHRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImluZm8tbWlzc2luZ1wiKTtcbiAgICAgIGdhbWVTdGFydHVwLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgc2xpZGVyLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgYm9hcmRPbmVET00uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICBwbGF5ZXJPbmVJbmZvLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgcGxheWVyVHdvSW5mby5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgIHBsYXllck9uZU5hbWUuc2V0QXR0cmlidXRlKFwiY29udGVudEVkaXRhYmxlXCIsIGZhbHNlKTtcbiAgICAgIHBsYXllck9uZU5hbWUuc3R5bGUub3V0bGluZSA9IFwiXCI7XG4gICAgICBwbGF5ZXJUd29OYW1lLnNldEF0dHJpYnV0ZShcImNvbnRlbnRFZGl0YWJsZVwiLCBmYWxzZSk7XG4gICAgICBwbGF5ZXJUd29OYW1lLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHBsYXllclR3b05hbWUudGV4dENvbnRlbnQgPSBcInJvYm9QbGF5ZXJcIjtcbiAgICAgICAgLy8gQ2FsbCByb2JvR2FtZSBtb2R1bGVcbiAgICAgICAgcm9ib0dhbWUucnVuR2FtZShnYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tib3guY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoYXNTaGlwXCIpKS5mb3JFYWNoKChpdGVtKSA9PlxuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImhpZGVTaGlwXCIpXG4gICAgICAgICk7XG4gICAgICAgIC8vIENhbGwgdHdvUGxheWVyR2FtZSBtb2R1bGVcbiAgICAgICAgdHdvUGxheWVyR2FtZS5ydW5HYW1lKGdhbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgc3RhcnROZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZ2FtZVN0YXJ0TmV4dCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJCb2FyZCxcbiAgICByZW1vdmVCb2FyZCxcbiAgICB1cGRhdGVTaGlwc0xlZnQsXG4gICAgZGlzcGxheVR1cm4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5Q29udHJvbGxlcjtcbiIsImltcG9ydCBkaXNwbGF5Q29udHJvbGxlciBmcm9tIFwiLi9kaXNwbGF5Q29udHJvbFwiO1xuXG5jb25zdCBkcmFnQW5kRHJvcCA9ICgoKSA9PiB7XG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJzXCIpO1xuICBjb25zdCBwbGF5ZXJPbmVTaGlwc0xlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtc2hpcHMtbGVmdFwiKTtcbiAgY29uc3QgcGxheWVyVHdvU2hpcHNMZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLXNoaXBzLWxlZnRcIik7XG4gIGNvbnN0IGJvYXJkT25lRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1vbmVcIik7XG4gIGNvbnN0IGJvYXJkVHdvRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC10d29cIik7XG4gIGNvbnN0IHNoaXBzRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwc1wiKTtcbiAgY29uc3QgY2FycmllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FycmllclwiKTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmF0dGxlc2hpcFwiKTtcbiAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXN0cm95ZXJcIik7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWFyaW5lXCIpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXRyb2wtYm9hdFwiKTtcbiAgY29uc3QgY2hhbmdlRGlyZWN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhbmdlLWRpcmVjdGlvbnNcIik7XG4gIGNvbnN0IHN0YXJ0TmV4dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtbmV4dC1idXR0b25cIik7XG4gIGNvbnN0IHRhcmdldHMgPSBbYm9hcmRPbmVET00sIGJvYXJkVHdvRE9NXTtcbiAgY29uc3Qgc2hpcHNBcnJheSA9IFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdF07XG5cbiAgY29uc3QgcnVuID0gKGdhbWUpID0+IHtcbiAgICBjb25zdCB2ZXJ0aWNhbFNoaXBzID0gKCkgPT4ge1xuICAgICAgc2hpcHNET00uc3R5bGUuZmxleERpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICBzaGlwc0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5zdHlsZS5mbGV4RGlyZWN0aW9uID0gXCJjb2x1bW5cIjtcbiAgICAgICAgc2hpcC5kYXRhc2V0LnZlcnRpY2FsID0gXCJ0cnVlXCI7XG4gICAgICB9KTtcbiAgICAgIHZlcnRpY2FsID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgaG9yaXpvbnRhbFNoaXBzID0gKCkgPT4ge1xuICAgICAgc2hpcHNET00uc3R5bGUuZmxleERpcmVjdGlvbiA9IFwiXCI7XG4gICAgICBzaGlwc0FycmF5LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5zdHlsZS5mbGV4RGlyZWN0aW9uID0gXCJcIjtcbiAgICAgICAgc2hpcC5kYXRhc2V0LnZlcnRpY2FsID0gXCJmYWxzZVwiO1xuICAgICAgfSk7XG4gICAgICB2ZXJ0aWNhbCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBsZXQgdmVydGljYWwgPSBmYWxzZTtcbiAgICBjb25zdCBib2FyZE9uZSA9IGdhbWUuaHVtYW5Cb2FyZC5kYXRhLmJvYXJkO1xuICAgIGNvbnN0IGJvYXJkVHdvID0gZ2FtZS5yb2JvQm9hcmQuZGF0YS5ib2FyZDtcbiAgICBob3Jpem9udGFsU2hpcHMoKTtcbiAgICBzaGlwc0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgc2hpcHNBcnJheS5mb3JFYWNoKChzaGlwKSA9PiAoc2hpcC5zdHlsZS5kaXNwbGF5ID0gXCJcIikpO1xuXG4gICAgLy8gUmVtb3ZlIGFueSBzaGlwcyBhbHJlYWR5IG9uIHRoZSBib2FyZFxuICAgIGlmIChjaGVja2JveC5jaGVja2VkID09PSBmYWxzZSkge1xuICAgICAgZGlzcGxheUNvbnRyb2xsZXIucmVtb3ZlQm9hcmQoYm9hcmRPbmVET00pO1xuICAgICAgZ2FtZS5odW1hbkJvYXJkLnJlbW92ZUFsbFNoaXBzKCk7XG4gICAgICBkaXNwbGF5Q29udHJvbGxlci5yZW5kZXJCb2FyZChib2FyZE9uZSwgYm9hcmRPbmVET00pO1xuICAgICAgcGxheWVyT25lU2hpcHNMZWZ0LmlubmVyVGV4dCA9IDA7XG4gICAgfSBlbHNlIGlmIChjaGVja2JveC5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICBpZiAoYm9hcmRPbmVET00uc3R5bGUuZGlzcGxheSA9PT0gXCJcIikge1xuICAgICAgICBkaXNwbGF5Q29udHJvbGxlci5yZW1vdmVCb2FyZChib2FyZE9uZURPTSk7XG4gICAgICAgIGdhbWUuaHVtYW5Cb2FyZC5yZW1vdmVBbGxTaGlwcygpO1xuICAgICAgICBkaXNwbGF5Q29udHJvbGxlci5yZW5kZXJCb2FyZChib2FyZE9uZSwgYm9hcmRPbmVET00pO1xuICAgICAgICBwbGF5ZXJPbmVTaGlwc0xlZnQuaW5uZXJUZXh0ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRUd29ET00uc3R5bGUuZGlzcGxheSA9PT0gXCJcIikge1xuICAgICAgICBkaXNwbGF5Q29udHJvbGxlci5yZW1vdmVCb2FyZChib2FyZFR3b0RPTSk7XG4gICAgICAgIGdhbWUucm9ib0JvYXJkLnJlbW92ZUFsbFNoaXBzKCk7XG4gICAgICAgIGRpc3BsYXlDb250cm9sbGVyLnJlbmRlckJvYXJkKGJvYXJkVHdvLCBib2FyZFR3b0RPTSk7XG4gICAgICAgIHBsYXllclR3b1NoaXBzTGVmdC5pbm5lclRleHQgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZURpcmVjdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiB7XG4gICAgICB2ZXJ0aWNhbCA9PT0gZmFsc2UgPyB2ZXJ0aWNhbFNoaXBzKCkgOiBob3Jpem9udGFsU2hpcHMoKTtcbiAgICB9KTtcblxuICAgIGxldCBkcmFnZ2VkID0gbnVsbDtcbiAgICBzaGlwc0FycmF5LmZvckVhY2goKHNoaXApID0+XG4gICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgICAgICAgc3RhcnROZXh0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmZvLW1pc3NpbmdcIik7XG4gICAgICAgIGRyYWdnZWQgPSBlLnRhcmdldDtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT5cbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PlxuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgICAgbGV0IGJvYXJkO1xuICAgICAgICBsZXQgc2hpcDtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdFsxXSA9PT0gXCJib2FyZC1vbmVcIikge1xuICAgICAgICAgIGJvYXJkID0gZ2FtZS5odW1hbkJvYXJkO1xuICAgICAgICAgIGJvYXJkLmRhdGEuc2hpcHMuZm9yRWFjaCgoYm9hdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJvYXQubmFtZSA9PT0gZHJhZ2dlZC5pZCkge1xuICAgICAgICAgICAgICBzaGlwID0gYm9hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZHJhZ2dlZC5kYXRhc2V0LnZlcnRpY2FsID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgc2hpcC52ZXJ0aWNhbCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNoaXAudmVydGljYWwgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJvYXJkLmNoZWNrU2hpcHMoc2hpcCwgaW5kZXgpICYmIGJvYXJkLmNoZWNrRWRnZXMoc2hpcCwgaW5kZXgpKSB7XG4gICAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoc2hpcCwgTnVtYmVyKGluZGV4KSk7XG4gICAgICAgICAgICBkaXNwbGF5Q29udHJvbGxlci5yZW1vdmVCb2FyZChib2FyZE9uZURPTSk7XG4gICAgICAgICAgICBkaXNwbGF5Q29udHJvbGxlci5yZW5kZXJCb2FyZChib2FyZE9uZSwgYm9hcmRPbmVET00pO1xuICAgICAgICAgICAgcGxheWVyT25lU2hpcHNMZWZ0LmlubmVyVGV4dCA9IGJvYXJkLmRhdGEuc2hpcHMuZmlsdGVyKFxuICAgICAgICAgICAgICAoc2hpcCkgPT4gc2hpcC5wb3NpdGlvbi5sZW5ndGggPiAwXG4gICAgICAgICAgICApLmxlbmd0aDtcbiAgICAgICAgICAgIGRyYWdnZWQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib2FyZCA9IGdhbWUucm9ib0JvYXJkO1xuICAgICAgICAgIGJvYXJkLmRhdGEuc2hpcHMuZm9yRWFjaCgoYm9hdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJvYXQubmFtZSA9PT0gZHJhZ2dlZC5pZCkge1xuICAgICAgICAgICAgICBzaGlwID0gYm9hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZHJhZ2dlZC5kYXRhc2V0LnZlcnRpY2FsID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgc2hpcC52ZXJ0aWNhbCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNoaXAudmVydGljYWwgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJvYXJkLmNoZWNrU2hpcHMoc2hpcCwgaW5kZXgpICYmIGJvYXJkLmNoZWNrRWRnZXMoc2hpcCwgaW5kZXgpKSB7XG4gICAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoc2hpcCwgTnVtYmVyKGluZGV4KSk7XG4gICAgICAgICAgICBkaXNwbGF5Q29udHJvbGxlci5yZW1vdmVCb2FyZChib2FyZFR3b0RPTSk7XG4gICAgICAgICAgICBkaXNwbGF5Q29udHJvbGxlci5yZW5kZXJCb2FyZChib2FyZFR3bywgYm9hcmRUd29ET00pO1xuICAgICAgICAgICAgcGxheWVyVHdvU2hpcHNMZWZ0LmlubmVyVGV4dCA9IGJvYXJkLmRhdGEuc2hpcHMuZmlsdGVyKFxuICAgICAgICAgICAgICAoc2hpcCkgPT4gc2hpcC5wb3NpdGlvbi5sZW5ndGggPiAwXG4gICAgICAgICAgICApLmxlbmd0aDtcbiAgICAgICAgICAgIGRyYWdnZWQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcnVuLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZHJhZ0FuZERyb3A7XG4iLCJpbXBvcnQgZGlzcGxheUNvbnRyb2xsZXIgZnJvbSBcIi4vZGlzcGxheUNvbnRyb2xcIjtcblxuY29uc3Qgcm9ib0dhbWUgPSAoKCkgPT4ge1xuICBjb25zdCBib2FyZFR3b0RPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtdHdvXCIpO1xuICBjb25zdCBwbGF5ZXJPbmVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLW5hbWUtaW5wdXRcIik7XG4gIGNvbnN0IHBsYXllclR3b05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tbmFtZS1pbnB1dFwiKTtcbiAgY29uc3QgdHVyblNpZ25hbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybi1zaWduYWwtdGV4dFwiKTtcblxuICBjb25zdCBydW5HYW1lID0gKGdhbWUpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJPbmUgPSBnYW1lLmh1bWFuQm9hcmQuZGF0YS5wbGF5ZXI7XG4gICAgY29uc3QgcGxheWVyVHdvID0gZ2FtZS5yb2JvQm9hcmQuZGF0YS5wbGF5ZXI7XG4gICAgY29uc3QgYm9hcmRUd28gPSBnYW1lLnJvYm9Cb2FyZC5kYXRhLmJvYXJkO1xuICAgIGJvYXJkVHdvRE9NLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgIGRpc3BsYXlDb250cm9sbGVyLnJlbW92ZUJvYXJkKGJvYXJkVHdvRE9NKTtcbiAgICBnYW1lLnJvYm9Cb2FyZC5yZW1vdmVBbGxTaGlwcygpO1xuICAgIGdhbWUucm9ib0JvYXJkLnJhbmRvbWx5UGxhY2UoZ2FtZS5yb2JvQm9hcmQuZGF0YS5zaGlwcyk7XG4gICAgZGlzcGxheUNvbnRyb2xsZXIucmVuZGVyQm9hcmQoYm9hcmRUd28sIGJvYXJkVHdvRE9NKTtcbiAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtdHdvXCIpLmNoaWxkTm9kZXMpLmZvckVhY2goXG4gICAgICAoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGlkZVNoaXBcIilcbiAgICApO1xuXG4gICAgY29uc3QgcGxheWVyRmlyZSA9IChlKSA9PiB7XG4gICAgICB0dXJuU2lnbmFsLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgY29uc3QgaW5kZXggPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpO1xuICAgICAgaWYgKGdhbWUucm9ib0JvYXJkLmRhdGEuYm9hcmRbaW5kZXhdLmlzSGl0ID09PSB0cnVlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdhbWUucm9ib0JvYXJkLnJlY2VpdmVBdHRhY2soaW5kZXgpO1xuICAgICAgICBpZiAoZ2FtZS5yb2JvQm9hcmQuZGF0YS5ib2FyZFtpbmRleF0uaGFzU2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGdhbWUucm9ib0JvYXJkLmRhdGEuYm9hcmRbaW5kZXhdLmlzSGl0ID0gdHJ1ZTtcbiAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgIHR1cm5TaWduYWwuaW5uZXJUZXh0ID0gXCJISVQhXCI7XG4gICAgICAgICAgdHVyblNpZ25hbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgIGRpc3BsYXlDb250cm9sbGVyLnVwZGF0ZVNoaXBzTGVmdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhbWUucm9ib0JvYXJkLmRhdGEuYm9hcmRbaW5kZXhdLmlzSGl0ID0gdHJ1ZTtcbiAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgICB0dXJuU2lnbmFsLmlubmVyVGV4dCA9IFwiTWlzcywgdHJ5IGFnYWluLi4uXCI7XG4gICAgICAgICAgdHVyblNpZ25hbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbmRHYW1lKCk7XG4gICAgICAgIGlmIChnYW1lLnJvYm9Cb2FyZC5hbGxTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcm9ib1R1cm4oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwbGF5ZXJUdXJuID0gKCkgPT4ge1xuICAgICAgcGxheWVyVHdvTmFtZS5zdHlsZS5vdXRsaW5lID0gXCJcIjtcbiAgICAgIHR1cm5TaWduYWwucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICBwbGF5ZXJPbmVOYW1lLnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCAjZTJjMDhjXCI7XG4gICAgICB0dXJuU2lnbmFsLmlubmVyVGV4dCA9IGAke3BsYXllck9uZS5wbGF5ZXJJbmZvLm5hbWV9J3MgdHVybjogZmlyZSBhd2F5IWA7XG4gICAgICBBcnJheS5mcm9tKGJvYXJkVHdvRE9NLmNoaWxkTm9kZXMpLmZvckVhY2goKGRpdikgPT5cbiAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyRmlyZSlcbiAgICAgICk7XG4gICAgfTtcbiAgICBwbGF5ZXJUdXJuKCk7XG5cbiAgICBjb25zdCByb2JvRmlyZSA9ICgpID0+IHtcbiAgICAgIHBsYXllck9uZU5hbWUuc3R5bGUub3V0bGluZSA9IFwiXCI7XG4gICAgICB0dXJuU2lnbmFsLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgcGxheWVyVHdvTmFtZS5zdHlsZS5vdXRsaW5lID0gXCIycHggc29saWQgI2UyYzA4Y1wiO1xuICAgICAgdHVyblNpZ25hbC5pbm5lclRleHQgPSBgJHtwbGF5ZXJUd28ucGxheWVySW5mby5uYW1lfSdzIHR1cm46IGZpcmUgYXdheSFgO1xuICAgICAgc2V0VGltZW91dChyb2JvQXR0YWNrLCA1MDApO1xuICAgIH07XG5cbiAgICBsZXQgbmV4dFJvYm9Nb3ZlO1xuXG4gICAgY29uc3Qgcm9ib0F0dGFjayA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJvYm9Nb3ZlID0gZ2FtZS5yb2JvQm9hcmQuZGF0YS5wbGF5ZXIucm9ib1BsYXkoXG4gICAgICAgIGdhbWUuaHVtYW5Cb2FyZCxcbiAgICAgICAgbmV4dFJvYm9Nb3ZlXG4gICAgICApO1xuICAgICAgaWYgKHJvYm9Nb3ZlLm5leHRNb3ZlKSB7XG4gICAgICAgIG5leHRSb2JvTW92ZSA9IHJvYm9Nb3ZlLm5leHRNb3ZlO1xuICAgICAgfVxuICAgICAgY29uc3QgYm9hcmRQaWVjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS1pbmRleD0nJHtyb2JvTW92ZS50aGlzTW92ZX0nXWBcbiAgICAgICk7XG4gICAgICBpZiAoZ2FtZS5odW1hbkJvYXJkLmRhdGEuYm9hcmRbcm9ib01vdmUudGhpc01vdmVdLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgZ2FtZS5odW1hbkJvYXJkLmRhdGEuYm9hcmRbcm9ib01vdmUudGhpc01vdmVdLmlzSGl0ID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRQaWVjZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICB0dXJuU2lnbmFsLmlubmVyVGV4dCA9IFwiSElUIVwiO1xuICAgICAgICB0dXJuU2lnbmFsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgIGRpc3BsYXlDb250cm9sbGVyLnVwZGF0ZVNoaXBzTGVmdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRQaWVjZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgdHVyblNpZ25hbC5pbm5lclRleHQgPSBcIk1pc3MsIHRyeSBhZ2Fpbi4uLlwiO1xuICAgICAgICB0dXJuU2lnbmFsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgfVxuICAgICAgZW5kR2FtZSgpO1xuICAgICAgaWYgKGdhbWUuaHVtYW5Cb2FyZC5hbGxTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHNldFRpbWVvdXQocGxheWVyVHVybiwgNTAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgcm9ib1R1cm4gPSAoKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKGJvYXJkVHdvRE9NLmNoaWxkTm9kZXMpLmZvckVhY2goKGRpdikgPT5cbiAgICAgICAgZGl2LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyRmlyZSlcbiAgICAgICk7XG4gICAgICBzZXRUaW1lb3V0KHJvYm9GaXJlLCA1MDApO1xuICAgIH07XG5cbiAgICBjb25zdCBlbmRHYW1lID0gKCkgPT4ge1xuICAgICAgaWYgKGdhbWUucm9ib0JvYXJkLmFsbFN1bmsoKSkge1xuICAgICAgICBBcnJheS5mcm9tKGJvYXJkVHdvRE9NLmNoaWxkTm9kZXMpLmZvckVhY2goKGRpdikgPT5cbiAgICAgICAgICBkaXYucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBwbGF5ZXJGaXJlKVxuICAgICAgICApO1xuICAgICAgICBwbGF5ZXJPbmVOYW1lLnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCAjZTJjMDhjXCI7XG4gICAgICAgIHBsYXllclR3b05hbWUuc3R5bGUub3V0bGluZSA9IFwiXCI7XG4gICAgICAgIHR1cm5TaWduYWwucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgIHR1cm5TaWduYWwuY2xhc3NMaXN0LmFkZChcIndpbm5lclwiKTtcbiAgICAgICAgdHVyblNpZ25hbC5pbm5lclRleHQgPSBgJHtwbGF5ZXJPbmUucGxheWVySW5mby5uYW1lfSB3aW5zISEhISFgO1xuICAgICAgfSBlbHNlIGlmIChnYW1lLmh1bWFuQm9hcmQuYWxsU3VuaygpKSB7XG4gICAgICAgIHR1cm5TaWduYWwucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgIHR1cm5TaWduYWwuY2xhc3NMaXN0LmFkZChcIndpbm5lclwiKTtcbiAgICAgICAgdHVyblNpZ25hbC5pbm5lclRleHQgPSBgJHtwbGF5ZXJUd28ucGxheWVySW5mby5uYW1lfSB3aW5zISEhISFgO1xuICAgICAgICBwbGF5ZXJPbmVOYW1lLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgICBwbGF5ZXJUd29OYW1lLnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCAjZTJjMDhjXCI7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJ1bkdhbWUsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCByb2JvR2FtZTtcbiIsImltcG9ydCBkaXNwbGF5Q29udHJvbGxlciBmcm9tIFwiLi9kaXNwbGF5Q29udHJvbFwiO1xuXG5jb25zdCB0d29QbGF5ZXJHYW1lID0gKCgpID0+IHtcbiAgY29uc3QgYm9hcmRPbmVET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLW9uZVwiKTtcbiAgY29uc3QgYm9hcmRUd29ET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLXR3b1wiKTtcbiAgY29uc3QgcGxheWVyT25lTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1uYW1lLWlucHV0XCIpO1xuICBjb25zdCBwbGF5ZXJUd29OYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLW5hbWUtaW5wdXRcIik7XG4gIGNvbnN0IHR1cm5TaWduYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm4tc2lnbmFsLXRleHRcIik7XG4gIGNvbnN0IHBsYXllck9uZVJlYWR5RE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLXJlYWR5LWJ1dHRvblwiKTtcbiAgY29uc3QgcGxheWVyVHdvUmVhZHlET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tcmVhZHktYnV0dG9uXCIpO1xuICBjb25zdCBuZXdHYW1lRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctZ2FtZVwiKTtcblxuICBjb25zdCBydW5HYW1lID0gKGdhbWUpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJPbmUgPSBnYW1lLmh1bWFuQm9hcmQuZGF0YS5wbGF5ZXI7XG4gICAgY29uc3QgcGxheWVyVHdvID0gZ2FtZS5yb2JvQm9hcmQuZGF0YS5wbGF5ZXI7XG4gICAgY29uc3QgYm9hcmRPbmUgPSBnYW1lLmh1bWFuQm9hcmQ7XG4gICAgY29uc3QgYm9hcmRUd28gPSBnYW1lLnJvYm9Cb2FyZDtcblxuICAgIGNvbnN0IHBsYXllck9uZU5vdFJlYWR5ID0gKCkgPT4ge1xuICAgICAgYm9hcmRUd29ET00uY2xhc3NMaXN0LmFkZChcInBsYXllci1ub3QtcmVhZHlcIik7XG4gICAgfTtcblxuICAgIG5ld0dhbWVET00uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiB7XG4gICAgICBib2FyZE9uZURPTS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHBsYXllclR3b05vdFJlYWR5KTtcbiAgICAgIGJvYXJkVHdvRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyT25lTm90UmVhZHkpO1xuICAgICAgYm9hcmRPbmVET00uY2xhc3NMaXN0LnJlbW92ZShcInBsYXllci1ub3QtcmVhZHlcIik7XG4gICAgICBib2FyZFR3b0RPTS5jbGFzc0xpc3QucmVtb3ZlKFwicGxheWVyLW5vdC1yZWFkeVwiKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBsYXllck9uZVR1cm4gPSAoKSA9PiB7XG4gICAgICBwbGF5ZXJUd29OYW1lLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgdHVyblNpZ25hbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgIHBsYXllck9uZU5hbWUuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICNlMmMwOGNcIjtcbiAgICAgIC8vIERpc3BsYXkgcGxheWVyTmV4dCBidXR0b25cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwbGF5ZXItb25lLXJlYWR5XCIpWzBdLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgICBcImZsZXhcIjtcbiAgICAgIGJvYXJkVHdvRE9NLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyT25lTm90UmVhZHkpO1xuICAgIH07XG4gICAgcGxheWVyT25lVHVybigpO1xuXG4gICAgY29uc3QgcGxheWVyT25lUmVhZHkgPSAoKSA9PiB7XG4gICAgICBib2FyZFR3b0RPTS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHBsYXllck9uZU5vdFJlYWR5KTtcbiAgICAgIGJvYXJkVHdvRE9NLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGF5ZXItbm90LXJlYWR5XCIpO1xuICAgICAgQXJyYXkuZnJvbShib2FyZE9uZURPTS5jaGlsZE5vZGVzKS5mb3JFYWNoKChkaXYpID0+IHtcbiAgICAgICAgaWYgKEFycmF5LmZyb20oZGl2LmNsYXNzTGlzdCkuaW5jbHVkZXMoXCJoaWRlU2hpcFwiKSkge1xuICAgICAgICAgIGRpdi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYXllci1vbmUtcmVhZHlcIilbMF0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICBBcnJheS5mcm9tKGJvYXJkVHdvRE9NLmNoaWxkTm9kZXMpLmZvckVhY2goKGRpdikgPT5cbiAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyT25lRmlyZSlcbiAgICAgICk7XG4gICAgfTtcbiAgICBwbGF5ZXJPbmVSZWFkeURPTS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHBsYXllck9uZVJlYWR5KTtcblxuICAgIGNvbnN0IHBsYXllck9uZUZpcmUgPSAoZSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGFzU2hpcFwiKSkuZm9yRWFjaCgoaXRlbSkgPT5cbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGlkZVNoaXBcIilcbiAgICAgICk7XG4gICAgICB0dXJuU2lnbmFsLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgY29uc3QgaW5kZXggPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpO1xuICAgICAgaWYgKGJvYXJkVHdvLmRhdGEuYm9hcmRbaW5kZXhdLmlzSGl0ID09PSB0cnVlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkVHdvLnJlY2VpdmVBdHRhY2soaW5kZXgpO1xuICAgICAgICBpZiAoYm9hcmRUd28uZGF0YS5ib2FyZFtpbmRleF0uaGFzU2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGJvYXJkVHdvLmRhdGEuYm9hcmRbaW5kZXhdLmlzSGl0ID0gdHJ1ZTtcbiAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgIHR1cm5TaWduYWwuaW5uZXJUZXh0ID0gXCJISVQhXCI7XG4gICAgICAgICAgdHVyblNpZ25hbC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgIGRpc3BsYXlDb250cm9sbGVyLnVwZGF0ZVNoaXBzTGVmdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvYXJkVHdvLmRhdGEuYm9hcmRbaW5kZXhdLmlzSGl0ID0gdHJ1ZTtcbiAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgICB0dXJuU2lnbmFsLmlubmVyVGV4dCA9IFwiTWlzcywgdHJ5IGFnYWluLi4uXCI7XG4gICAgICAgICAgdHVyblNpZ25hbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbmRHYW1lKCk7XG4gICAgICAgIGlmIChib2FyZFR3by5hbGxTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcGxheWVyVHdvVHVybigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBBcnJheS5mcm9tKGJvYXJkVHdvRE9NLmNoaWxkTm9kZXMpLmZvckVhY2goKGRpdikgPT5cbiAgICAgICAgZGl2LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyT25lRmlyZSlcbiAgICAgICk7XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYXllclR3b05vdFJlYWR5ID0gKCkgPT4ge1xuICAgICAgYm9hcmRPbmVET00uY2xhc3NMaXN0LmFkZChcInBsYXllci1ub3QtcmVhZHlcIik7XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYXllclR3b1R1cm4gPSAoKSA9PiB7XG4gICAgICBwbGF5ZXJPbmVOYW1lLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgdHVyblNpZ25hbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgIHBsYXllclR3b05hbWUuc3R5bGUub3V0bGluZSA9IFwiMnB4IHNvbGlkICNlMmMwOGNcIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwbGF5ZXItdHdvLXJlYWR5XCIpWzBdLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgICBcImZsZXhcIjtcbiAgICAgIGJvYXJkT25lRE9NLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyVHdvTm90UmVhZHkpO1xuICAgIH07XG5cbiAgICBjb25zdCBwbGF5ZXJUd29SZWFkeSA9ICgpID0+IHtcbiAgICAgIGJvYXJkT25lRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyVHdvTm90UmVhZHkpO1xuICAgICAgYm9hcmRPbmVET00uY2xhc3NMaXN0LnJlbW92ZShcInBsYXllci1ub3QtcmVhZHlcIik7XG4gICAgICBBcnJheS5mcm9tKGJvYXJkVHdvRE9NLmNoaWxkTm9kZXMpLmZvckVhY2goKGRpdikgPT4ge1xuICAgICAgICBpZiAoQXJyYXkuZnJvbShkaXYuY2xhc3NMaXN0KS5pbmNsdWRlcyhcImhpZGVTaGlwXCIpKSB7XG4gICAgICAgICAgZGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlU2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGxheWVyLXR3by1yZWFkeVwiKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgIEFycmF5LmZyb20oYm9hcmRPbmVET00uY2hpbGROb2RlcykuZm9yRWFjaCgoZGl2KSA9PlxuICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBwbGF5ZXJUd29GaXJlKVxuICAgICAgKTtcbiAgICB9O1xuICAgIHBsYXllclR3b1JlYWR5RE9NLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyVHdvUmVhZHkpO1xuXG4gICAgY29uc3QgcGxheWVyVHdvRmlyZSA9IChlKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoYXNTaGlwXCIpKS5mb3JFYWNoKChpdGVtKSA9PlxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJoaWRlU2hpcFwiKVxuICAgICAgKTtcbiAgICAgIHR1cm5TaWduYWwucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICBjb25zdCBpbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIik7XG4gICAgICBpZiAoYm9hcmRPbmUuZGF0YS5ib2FyZFtpbmRleF0uaXNIaXQgPT09IHRydWUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRPbmUucmVjZWl2ZUF0dGFjayhpbmRleCk7XG4gICAgICAgIGlmIChib2FyZE9uZS5kYXRhLmJvYXJkW2luZGV4XS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgYm9hcmRPbmUuZGF0YS5ib2FyZFtpbmRleF0uaXNIaXQgPSB0cnVlO1xuICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgdHVyblNpZ25hbC5pbm5lclRleHQgPSBcIkhJVCFcIjtcbiAgICAgICAgICB0dXJuU2lnbmFsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgZGlzcGxheUNvbnRyb2xsZXIudXBkYXRlU2hpcHNMZWZ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9hcmRPbmUuZGF0YS5ib2FyZFtpbmRleF0uaXNIaXQgPSB0cnVlO1xuICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgICAgIHR1cm5TaWduYWwuaW5uZXJUZXh0ID0gXCJNaXNzLCB0cnkgYWdhaW4uLi5cIjtcbiAgICAgICAgICB0dXJuU2lnbmFsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVuZEdhbWUoKTtcbiAgICAgICAgaWYgKGJvYXJkT25lLmFsbFN1bmsoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBwbGF5ZXJPbmVUdXJuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEFycmF5LmZyb20oYm9hcmRPbmVET00uY2hpbGROb2RlcykuZm9yRWFjaCgoZGl2KSA9PlxuICAgICAgICBkaXYucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBwbGF5ZXJUd29GaXJlKVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kR2FtZSA9ICgpID0+IHtcbiAgICAgIGlmIChib2FyZFR3by5hbGxTdW5rKCkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYXllci1yZWFkeVwiKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgQXJyYXkuZnJvbShib2FyZFR3b0RPTS5jaGlsZE5vZGVzKS5mb3JFYWNoKChkaXYpID0+XG4gICAgICAgICAgZGl2LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcGxheWVyT25lRmlyZSlcbiAgICAgICAgKTtcbiAgICAgICAgcGxheWVyT25lTmFtZS5zdHlsZS5vdXRsaW5lID0gXCIycHggc29saWQgI2UyYzA4Y1wiO1xuICAgICAgICBwbGF5ZXJUd29OYW1lLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgICB0dXJuU2lnbmFsLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICB0dXJuU2lnbmFsLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXJcIik7XG4gICAgICAgIHR1cm5TaWduYWwuaW5uZXJUZXh0ID0gYCR7cGxheWVyT25lLnBsYXllckluZm8ubmFtZX0gd2lucyEhISEhYDtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRPbmUuYWxsU3VuaygpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwbGF5ZXItcmVhZHlcIilbMF0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgIEFycmF5LmZyb20oYm9hcmRPbmVET00uY2hpbGROb2RlcykuZm9yRWFjaCgoZGl2KSA9PlxuICAgICAgICAgIGRpdi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHBsYXllclR3b0ZpcmUpXG4gICAgICAgICk7XG4gICAgICAgIHR1cm5TaWduYWwucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgIHR1cm5TaWduYWwuY2xhc3NMaXN0LmFkZChcIndpbm5lclwiKTtcbiAgICAgICAgdHVyblNpZ25hbC5pbm5lclRleHQgPSBgJHtwbGF5ZXJUd28ucGxheWVySW5mby5uYW1lfSB3aW5zISEhISFgO1xuICAgICAgICBwbGF5ZXJPbmVOYW1lLnN0eWxlLm91dGxpbmUgPSBcIlwiO1xuICAgICAgICBwbGF5ZXJUd29OYW1lLnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCAjZTJjMDhjXCI7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJ1bkdhbWUsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0d29QbGF5ZXJHYW1lO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9qYXBhbmVzZS13YXZlcy5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvb25lLXBsYXllci5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvdHdvLXBsYXllci5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU9yaWdpbmFsK1N1cmZlciZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PcmlnaW5hbCtTdXJmZXImZGlzcGxheT1zd2FwKTtcIl0pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTGF0b1xcXCIsIHNhbnMtc2VyaWY7XFxuICBtaW4td2lkdGg6IDQwMHB4O1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWluLXdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDgsIDI0OCwgMjU1KTtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCksIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBib3R0b207XFxuICBmb250LWZhbWlseTogXFxcIkxhdG9cXFwiLCBzYW5zLXNlcmlmO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IDE0MHB4IDc1cHggNzVweCAxZnIgNzVweCA3NXB4LzFmcjtcXG59XFxuXFxuLmhlYWRlciB7XFxuICBmb250LWZhbWlseTogXFxcIk9yaWdpbmFsIFN1cmZlclxcXCIsIFxcXCJjdXJzaXZlXFxcIjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luOiAzMHB4IDUwcHg7XFxuICBncmlkLWFyZWE6IDEvMS8yLzI7XFxufVxcbi5oZWFkZXIgLmhlYWRlci1sZWZ0IHtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG59XFxuLmhlYWRlciAuaGVhZGVyLXJpZ2h0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogNTBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHotaW5kZXg6IDEwO1xcbn1cXG4uaGVhZGVyIC5oZWFkZXItcmlnaHQgI25ldy1nYW1lOmhvdmVyLFxcbi5oZWFkZXIgLmhlYWRlci1yaWdodCAjb25lLXBsYXllcjpob3ZlcixcXG4uaGVhZGVyIC5oZWFkZXItcmlnaHQgI3R3by1wbGF5ZXI6aG92ZXIge1xcbiAgY29sb3I6ICM2YTdhYWM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5oZWFkZXIgLmhlYWRlci1yaWdodCAuZ2FtZS1wbGF5ZXJzIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTGF0b1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG4uaGVhZGVyIC5oZWFkZXItcmlnaHQgLmdhbWUtcGxheWVycyBkaXYge1xcbiAgbWFyZ2luLWJvdHRvbTogM3B4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDE1cHg7XFxufVxcblxcbi50dXJuLXNpZ25hbCB7XFxuICBncmlkLWFyZWE6IDIvMS8zLzI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLnN3aXRjaCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMTUwcHg7XFxuICBoZWlnaHQ6IDM0cHg7XFxuICBtYXJnaW4tdG9wOiA1cHg7XFxufVxcbi5zd2l0Y2ggaW5wdXQge1xcbiAgb3BhY2l0eTogMDtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbn1cXG4uc3dpdGNoIC5zbGlkZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogNXB4O1xcbiAgd2lkdGg6IDE1MHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OCwgMjQ4LCAyNTUpO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAwLjRzO1xcbiAgdHJhbnNpdGlvbjogMC40cztcXG4gIGJvcmRlci1yYWRpdXM6IDdweDtcXG59XFxuLnN3aXRjaCAuc2xpZGVyOmJlZm9yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGhlaWdodDogMjZweDtcXG4gIHdpZHRoOiA1MHB4O1xcbiAgbGVmdDogOTdweDtcXG4gIGJvdHRvbTogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IDAuNXM7XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xcbn1cXG4uc3dpdGNoIC5zbGlkZXIgLm9uZS1wbGF5ZXItbG9nbyxcXG4uc3dpdGNoIC5zbGlkZXIgLnR3by1wbGF5ZXItbG9nbyB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICB3aWR0aDogMThweDtcXG4gIGhlaWdodDogMThweDtcXG59XFxuLnN3aXRjaCAuc2xpZGVyIC50d28tcGxheWVyLWxvZ28ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKTtcXG59XFxuLnN3aXRjaCBpbnB1dDpjaGVja2VkICsgLnNsaWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTJjMDhjO1xcbn1cXG4uc3dpdGNoIGlucHV0OmZvY3VzICsgLnNsaWRlciB7XFxuICBib3gtc2hhZG93OiAwIDAgMXB4ICM2YTdhYWM7XFxufVxcbi5zd2l0Y2ggaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXI6YmVmb3JlIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDI2cHgpO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtOTNweCk7XFxufVxcblxcbi50dXJuLXNpZ25hbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbn1cXG4udHVybi1zaWduYWwgLmhpdCB7XFxuICBmb250LWZhbWlseTogXFxcIk9yaWdpbmFsIFN1cmZlclxcXCIsIFxcXCJjdXJzaXZlXFxcIjtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG59XFxuLnR1cm4tc2lnbmFsIC5taXNzIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiT3JpZ2luYWwgU3VyZmVyXFxcIiwgXFxcImN1cnNpdmVcXFwiO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbn1cXG4udHVybi1zaWduYWwgLndpbm5lciB7XFxuICBmb250LWZhbWlseTogXFxcIk9yaWdpbmFsIFN1cmZlclxcXCIsIFxcXCJjdXJzaXZlXFxcIjtcXG4gIGZvbnQtc2l6ZTogMzJweDtcXG4gIGNvbG9yOiAjNmE3YWFjO1xcbn1cXG5cXG4ucGxheWVyLWluZm8ge1xcbiAgZ3JpZC1hcmVhOiAzLzEvNC8yO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTAwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkxhdG9cXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG4ucGxheWVyLWluZm8gZGl2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogMzAwcHg7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBsaW5lLWhlaWdodDogMzVweDtcXG59XFxuLnBsYXllci1pbmZvICNwbGF5ZXItb25lLW5hbWUsXFxuLnBsYXllci1pbmZvICNwbGF5ZXItdHdvLW5hbWUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDdweDtcXG59XFxuLnBsYXllci1pbmZvICNwbGF5ZXItb25lLW5hbWUtaW5wdXQsXFxuLnBsYXllci1pbmZvICNwbGF5ZXItdHdvLW5hbWUtaW5wdXQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmMWU4O1xcbiAgd2lkdGg6IDE1MHB4O1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgei1pbmRleDogMjA7XFxuICBvdXRsaW5lOiAxcHggc29saWQgIzZhN2FhYztcXG59XFxuLnBsYXllci1pbmZvIC5lZGl0OmhvdmVyIHtcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggIzZhN2FhYztcXG59XFxuLnBsYXllci1pbmZvICNwbGF5ZXItb25lLXNoaXBzLFxcbi5wbGF5ZXItaW5mbyAjcGxheWVyLXR3by1zaGlwcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMzBweDtcXG59XFxuLnBsYXllci1pbmZvIHNwYW4ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJPcmlnaW5hbCBTdXJmZXJcXFwiLCBcXFwiY3Vyc2l2ZVxcXCI7XFxuICBmb250LXNpemU6IDE4cHg7XFxufVxcblxcbi5iYXR0bGUtYm9hcmRzIHtcXG4gIGdyaWQtYXJlYTogNC8xLzUvMjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDEwMHB4O1xcbiAgcGFkZGluZzogMzBweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmJhdHRsZS1ib2FyZHMgI2JvYXJkLW9uZSxcXG4uYmF0dGxlLWJvYXJkcyAjYm9hcmQtdHdvIHtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIGhlaWdodDogMzAwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0OCwgMjQ4LCAyNTUsIDAuOSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAzMHB4KS9yZXBlYXQoMTAsIDMwcHgpO1xcbiAgb3V0bGluZTogMXB4IHNvbGlkICM2YTdhYWM7XFxufVxcbi5iYXR0bGUtYm9hcmRzICNib2FyZC1vbmUgZGl2LFxcbi5iYXR0bGUtYm9hcmRzICNib2FyZC10d28gZGl2IHtcXG4gIG91dGxpbmU6IDAuM3B4IHNvbGlkICM2YTdhYWM7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmJhdHRsZS1ib2FyZHMgI2JvYXJkLW9uZSBkaXY6aG92ZXIsXFxuLmJhdHRsZS1ib2FyZHMgI2JvYXJkLXR3byBkaXY6aG92ZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMXB4IDFweCAjNmE3YWFjO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYmF0dGxlLWJvYXJkcyAjYm9hcmQtb25lIC5oYXNTaGlwLFxcbi5iYXR0bGUtYm9hcmRzICNib2FyZC10d28gLmhhc1NoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UyYzA4YztcXG59XFxuLmJhdHRsZS1ib2FyZHMgI2JvYXJkLW9uZSAuaGlkZVNoaXAsXFxuLmJhdHRsZS1ib2FyZHMgI2JvYXJkLXR3byAuaGlkZVNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5iYXR0bGUtYm9hcmRzICNib2FyZC1vbmUgLmhpdCxcXG4uYmF0dGxlLWJvYXJkcyAjYm9hcmQtdHdvIC5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UyOTU4YztcXG59XFxuLmJhdHRsZS1ib2FyZHMgI2JvYXJkLW9uZSAubWlzcyxcXG4uYmF0dGxlLWJvYXJkcyAjYm9hcmQtdHdvIC5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4Y2UyYzA7XFxufVxcblxcbiNzaGlwcyB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogMjIwcHg7XFxuICB3aWR0aDogMjIwcHg7XFxuICBnYXA6IDEwcHg7XFxuICB0b3A6IC0yMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4jc2hpcHMgZGl2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbiNzaGlwcyBkaXYgZGl2IHtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UyYzA4YztcXG4gIGJvcmRlcjogMC41cHggZG90dGVkIHJnYigyNDgsIDI0OCwgMjU1KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuI3NoaXBzICNjaGFuZ2UtZGlyZWN0aW9ucyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgd2lkdGg6IDEyMHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgYm90dG9tOiAtNTVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2YTdhYWM7XFxuICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXNpemU6IDEzcHg7XFxufVxcblxcbi5wbGF5ZXItbm90LXJlYWR5LFxcbi5pbmZvLW1pc3Npbmcge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4ucGxheWVyLW5vdC1yZWFkeTphZnRlcixcXG4uaW5mby1taXNzaW5nOmFmdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogMjUwcHg7XFxuICBib3R0b206IC00M3B4O1xcbiAgbGVmdDogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgcGFkZGluZzogMCAyMHB4O1xcbiAgY29udGVudDogXFxcIkhpdCB0aGUgJ1JlYWR5JyBidXR0b24gYmVsb3cgdG8gcmV2ZWFsIHlvdXIgc2hpcHMgYW5kIGZpcmUgYXQgeW91ciBvcHBvbmVudFxcXCI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTJjMDhjO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJMYXRvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuLmdhbWUtc3RhcnR1cCxcXG4ucGxheWVyLW9uZS1yZWFkeSxcXG4ucGxheWVyLXR3by1yZWFkeSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiA2MHB4O1xcbiAgZ3JpZC1hcmVhOiA1LzEvNi8yO1xcbn1cXG4uZ2FtZS1zdGFydHVwIGRpdixcXG4ucGxheWVyLW9uZS1yZWFkeSBkaXYsXFxuLnBsYXllci10d28tcmVhZHkgZGl2IHtcXG4gIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2YTdhYWM7XFxuICBib3gtc2hhZG93OiAxcHggMXB4IHJnYigyNDgsIDI0OCwgMjU1KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5nYW1lLXN0YXJ0dXAgI3JhbmRvbWx5LXBsYWNlLWJ1dHRvbixcXG4uZ2FtZS1zdGFydHVwICNkcmFnLWFuZC1kcm9wLWJ1dHRvbixcXG4ucGxheWVyLW9uZS1yZWFkeSAjcmFuZG9tbHktcGxhY2UtYnV0dG9uLFxcbi5wbGF5ZXItb25lLXJlYWR5ICNkcmFnLWFuZC1kcm9wLWJ1dHRvbixcXG4ucGxheWVyLXR3by1yZWFkeSAjcmFuZG9tbHktcGxhY2UtYnV0dG9uLFxcbi5wbGF5ZXItdHdvLXJlYWR5ICNkcmFnLWFuZC1kcm9wLWJ1dHRvbiB7XFxuICB3aWR0aDogMTkwcHg7XFxuICBoZWlnaHQ6IDQwcHg7XFxufVxcbi5nYW1lLXN0YXJ0dXAgI3JhbmRvbWx5LXBsYWNlLWJ1dHRvbjpob3ZlcixcXG4uZ2FtZS1zdGFydHVwICNkcmFnLWFuZC1kcm9wLWJ1dHRvbjpob3ZlcixcXG4ucGxheWVyLW9uZS1yZWFkeSAjcmFuZG9tbHktcGxhY2UtYnV0dG9uOmhvdmVyLFxcbi5wbGF5ZXItb25lLXJlYWR5ICNkcmFnLWFuZC1kcm9wLWJ1dHRvbjpob3ZlcixcXG4ucGxheWVyLXR3by1yZWFkeSAjcmFuZG9tbHktcGxhY2UtYnV0dG9uOmhvdmVyLFxcbi5wbGF5ZXItdHdvLXJlYWR5ICNkcmFnLWFuZC1kcm9wLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAyNDgsIDI1NSk7XFxuICBjb2xvcjogIzZhN2FhYztcXG4gIGJveC1zaGFkb3c6IDJweCAycHggIzZhN2FhYztcXG59XFxuLmdhbWUtc3RhcnR1cCAjc3RhcnQtbmV4dC1idXR0b24sXFxuLnBsYXllci1vbmUtcmVhZHkgI3N0YXJ0LW5leHQtYnV0dG9uLFxcbi5wbGF5ZXItdHdvLXJlYWR5ICNzdGFydC1uZXh0LWJ1dHRvbiB7XFxuICBmb250LWZhbWlseTogXFxcIk9yaWdpbmFsIFN1cmZlclxcXCIsIFxcXCJjdXJzaXZlXFxcIjtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIHRleHQtc2hhZG93OiAxcHggMXB4ICNlMmMwOGM7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxufVxcbi5nYW1lLXN0YXJ0dXAgI3N0YXJ0LW5leHQtYnV0dG9uOmhvdmVyLFxcbi5wbGF5ZXItb25lLXJlYWR5ICNzdGFydC1uZXh0LWJ1dHRvbjpob3ZlcixcXG4ucGxheWVyLXR3by1yZWFkeSAjc3RhcnQtbmV4dC1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0OCwgMjQ4LCAyNTUpO1xcbiAgY29sb3I6ICNlMmMwOGM7XFxuICBib3gtc2hhZG93OiAycHggMnB4ICM2YTdhYWM7XFxufVxcbi5nYW1lLXN0YXJ0dXAgLmluZm8tbWlzc2luZzphZnRlcixcXG4ucGxheWVyLW9uZS1yZWFkeSAuaW5mby1taXNzaW5nOmFmdGVyLFxcbi5wbGF5ZXItdHdvLXJlYWR5IC5pbmZvLW1pc3Npbmc6YWZ0ZXIge1xcbiAgdG9wOiAtMzlweDtcXG4gIGxlZnQ6IGF1dG87XFxuICBjb250ZW50OiBcXFwiWW91IG11c3QgcGxhY2UgYWxsIG9mIHlvdXIgc2hpcHMgb24gdGhlIGdhbWVib2FyZCBiZWZvcmUgY29udGludWluZ1xcXCI7XFxufVxcblxcbiNwbGF5ZXItb25lLXJlYWR5LWJ1dHRvbixcXG4jcGxheWVyLXR3by1yZWFkeS1idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJPcmlnaW5hbCBTdXJmZXJcXFwiLCBcXFwiY3Vyc2l2ZVxcXCI7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICB0ZXh0LXNoYWRvdzogMXB4IDFweCAjZTJjMDhjO1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG4jcGxheWVyLW9uZS1yZWFkeS1idXR0b246aG92ZXIsXFxuI3BsYXllci10d28tcmVhZHktYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDgsIDI0OCwgMjU1KTtcXG4gIGNvbG9yOiAjZTJjMDhjO1xcbiAgYm94LXNoYWRvdzogMnB4IDJweCAjNmE3YWFjO1xcbn1cXG5cXG4uZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgZ3JpZC1hcmVhOiA2LzEvNy8yO1xcbn1cXG4uZm9vdGVyIC5tYWRlLWJ5IHtcXG4gIGNvbG9yOiByZ2IoMjQ4LCAyNDgsIDI1NSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIHBhZGRpbmc6IDdweDtcXG4gIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4uZm9vdGVyIC5tYWRlLWJ5IGEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IHJnYigyNDgsIDI0OCwgMjU1KTtcXG59XFxuLmZvb3RlciAubWFkZS1ieSBpbWcge1xcbiAgaGVpZ2h0OiAxNnB4O1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQ7XFxufVxcbi5mb290ZXIgLm1hZGUtYnkgI2dpdGh1Yi1pY29uIHtcXG4gIG1heC1oZWlnaHQ6IDE2cHg7XFxufVxcbi5mb290ZXIgLm1hZGUtYnkgaW1nOmhvdmVyIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZykgc2NhbGUoMS4yKTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzYwcHgpIHtcXG4gIC5oZWFkZXIgLmhlYWRlci1sZWZ0IHtcXG4gICAgZm9udC1zaXplOiAzMnB4O1xcbiAgfVxcbiAgLnR1cm4tc2lnbmFsIHtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgfVxcbiAgLnR1cm4tc2lnbmFsIC5oaXQge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICB9XFxuICAudHVybi1zaWduYWwgLm1pc3Mge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICB9XFxuICAudHVybi1zaWduYWwgLndpbm5lciB7XFxuICAgIGZvbnQtc2l6ZTogMjZweDtcXG4gIH1cXG4gIC5wbGF5ZXItaW5mbyB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgZ2FwOiA0MDBweDtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG4gIH1cXG4gIC5iYXR0bGUtYm9hcmRzIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxMDBweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogOTBweDtcXG4gIH1cXG4gICNzaGlwcyB7XFxuICAgIG1hcmdpbi10b3A6IC03MHB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICBvcmRlcjogMTtcXG4gIH1cXG4gICNjaGFuZ2UtZGlyZWN0aW9ucyB7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICB9XFxuICAuZ2FtZS1zdGFydHVwIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAtMTgwcHg7XFxuICB9XFxuICAucmFuZG9tbHktcGxhY2Uge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogMTYwcHg7XFxuICB9XFxuICAjcmFuZG9tbHktcGxhY2UtYnV0dG9uLFxcbiNkcmFnLWFuZC1kcm9wLWJ1dHRvbixcXG4jc3RhcnQtbmV4dC1idXR0b24ge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICB9XFxuICAucGxheWVyLW9uZS1yZWFkeSxcXG4ucGxheWVyLXR3by1yZWFkeSB7XFxuICAgIG1hcmdpbi10b3A6IC0yMDBweDtcXG4gIH1cXG4gIC5wbGF5ZXItbm90LXJlYWR5OmFmdGVyIHtcXG4gICAgbGVmdDogNXB4O1xcbiAgICBib3R0b206IC0zN3B4O1xcbiAgfVxcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgLmhlYWRlciAuaGVhZGVyLWxlZnQge1xcbiAgICBmb250LXNpemU6IDI4cHg7XFxuICB9XFxuICAudHVybi1zaWduYWwge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICB9XFxuICAudHVybi1zaWduYWwgLmhpdCB7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gIH1cXG4gIC50dXJuLXNpZ25hbCAubWlzcyB7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gIH1cXG4gIC50dXJuLXNpZ25hbCAud2lubmVyIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgfVxcbiAgLnBsYXllci1pbmZvIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBnYXA6IDI5MHB4O1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgfVxcbiAgLmJhdHRsZS1ib2FyZHMgI2JvYXJkLW9uZSxcXG4uYmF0dGxlLWJvYXJkcyAjYm9hcmQtdHdvIHtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDIwMHB4O1xcbiAgICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDIwcHgpL3JlcGVhdCgxMCwgMjBweCk7XFxuICB9XFxuICAjc2hpcHMge1xcbiAgICB0b3A6IC0xMHB4O1xcbiAgICB3aWR0aDogMTYwcHg7XFxuICAgIGhlaWdodDogMTYwcHg7XFxuICB9XFxuICAjc2hpcHMgZGl2IGRpdiB7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFZQTtFQUNFLFVBQUE7RUFDQSxTQUFBO0VBQ0Esc0JBQUE7QUFURjs7QUFZQTtFQUNFLGNBQUE7RUFDQSwrQkFaVTtFQWFWLGdCQUFBO0FBVEY7O0FBWUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBeEJpQjtFQXlCakIsd0hBQUE7RUFLQSxzQkFBQTtFQUNBLDRCQUFBO0VBQ0Esa0NBQUE7RUFDQSwrQkE1QlU7RUE2QlYsYUFBQTtFQUNBLGdEQUFBO0FBYkY7O0FBZ0JBO0VBQ0UseUNBbkNZO0VBb0NaLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFiRjtBQWNFO0VBQ0UsZUFBQTtBQVpKO0FBY0U7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQVpKO0FBYUk7OztFQUdFLGNBdkRZO0VBd0RaLGVBQUE7QUFYTjtBQWFJO0VBQ0UsK0JBekRNO0VBMEROLGVBQUE7RUFDQSxnQkFBQTtBQVhOO0FBWU07RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFWUjs7QUFnQkE7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBYkY7O0FBaUJBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQWRGO0FBZUU7RUFDRSxVQUFB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O0FBU047QUFQSTtFQUNFLG9DQUFBO0FBU047O0FBSkE7RUFFSTtJQUNFLGVBQUE7RUFNSjtFQUhBO0lBQ0UsZUFBQTtFQUtGO0VBSkU7SUFDRSxlQUFBO0VBTUo7RUFKRTtJQUNFLGVBQUE7RUFNSjtFQUpFO0lBQ0UsZUFBQTtFQU1KO0VBSEE7SUFDRSxzQkFBQTtJQUNBLDJCQUFBO0lBQ0EsVUFBQTtJQUNBLGdCQUFBO0VBS0Y7RUFGQTtJQUNFLHNCQUFBO0lBQ0EsVUFBQTtJQUNBLG1CQUFBO0VBSUY7RUFGQTtJQUNFLGlCQUFBO0lBQ0EsbUJBQUE7SUFDQSxRQUFBO0VBSUY7RUFGQTtJQUNFLG1CQUFBO0VBSUY7RUFGQTtJQUNFLHNCQUFBO0lBQ0EsU0FBQTtJQUNBLGtCQUFBO0VBSUY7RUFGQTtJQUNFLGtCQUFBO0lBQ0EsVUFBQTtFQUlGO0VBRkE7OztJQUdFLGVBQUE7RUFJRjtFQUZBOztJQUVFLGtCQUFBO0VBSUY7RUFERTtJQUNFLFNBQUE7SUFDQSxhQUFBO0VBR0o7QUFDRjtBQUNBO0VBRUk7SUFDRSxlQUFBO0VBQUo7RUFHQTtJQUNFLGVBQUE7RUFERjtFQUVFO0lBQ0UsZUFBQTtFQUFKO0VBRUU7SUFDRSxlQUFBO0VBQUo7RUFFRTtJQUNFLGVBQUE7RUFBSjtFQUdBO0lBQ0Usc0JBQUE7SUFDQSwyQkFBQTtJQUNBLFVBQUE7SUFDQSxnQkFBQTtFQURGO0VBSUU7O0lBRUUsWUFBQTtJQUNBLGFBQUE7SUFDQSxnREFBQTtFQUZKO0VBS0E7SUFDRSxVQUFBO0lBQ0EsWUFBQTtJQUNBLGFBQUE7RUFIRjtFQUtJO0lBQ0UsV0FBQTtJQUNBLFlBQUE7RUFITjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU9yaWdpbmFsK1N1cmZlciZkaXNwbGF5PXN3YXBcXFwiKTtcXG5AaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PcmlnaW5hbCtTdXJmZXImZGlzcGxheT1zd2FwXFxcIik7XFxuXFxuJGJhY2tncm91bmQtY29sb3I6IHJnYigyNDgsIDI0OCwgMjU1KTtcXG4kYm9hcmQtY29sb3I6IHJnYmEoMjQ4LCAyNDgsIDI1NSwgMC45KTtcXG4kc2hpcC1jb2xvcjogI2UyYzA4YztcXG4kaGlnaGxpZ2h0LWNvbG9yOiAjNmE3YWFjO1xcbiRoZWFkZXItZm9udDogXFxcIk9yaWdpbmFsIFN1cmZlclxcXCIsIFxcXCJjdXJzaXZlXFxcIjtcXG4kbWFpbi1mb250OiBcXFwiTGF0b1xcXCIsIHNhbnMtc2VyaWY7XFxuJG1lZGl1bTogNzYwcHg7XFxuJHNtYWxsOiA1MDBweDtcXG5cXG4qIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgZm9udC1mYW1pbHk6ICRtYWluLWZvbnQ7XFxuICBtaW4td2lkdGg6IDQwMHB4O1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWluLXdpZHRoOiAxMDB2dztcXG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSxcXG4gICAgICByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNClcXG4gICAgKSxcXG4gICAgdXJsKFxcXCIuLi9hc3NldHMvamFwYW5lc2Utd2F2ZXMucG5nXFxcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBib3R0b207XFxuICBmb250LWZhbWlseTogJG1haW4tZm9udDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiAxNDBweCA3NXB4IDc1cHggMWZyIDc1cHggNzVweCAvIDFmcjtcXG59XFxuXFxuLmhlYWRlciB7XFxuICBmb250LWZhbWlseTogJGhlYWRlci1mb250O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW46IDMwcHggNTBweDtcXG4gIGdyaWQtYXJlYTogMSAvIDEgLyAyIC8gMjtcXG4gIC5oZWFkZXItbGVmdCB7XFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXG4gIH1cXG4gIC5oZWFkZXItcmlnaHQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXRvcDogNTBweDtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICB6LWluZGV4OiAxMDtcXG4gICAgI25ldy1nYW1lOmhvdmVyLFxcbiAgICAjb25lLXBsYXllcjpob3ZlcixcXG4gICAgI3R3by1wbGF5ZXI6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAkaGlnaGxpZ2h0LWNvbG9yO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgfVxcbiAgICAuZ2FtZS1wbGF5ZXJzIHtcXG4gICAgICBmb250LWZhbWlseTogJG1haW4tZm9udDtcXG4gICAgICBmb250LXNpemU6IDEzcHg7XFxuICAgICAgbWFyZ2luLXRvcDogMTBweDtcXG4gICAgICBkaXYge1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogM3B4O1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICBnYXA6IDE1cHg7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxufVxcblxcbi50dXJuLXNpZ25hbCB7XFxuICBncmlkLWFyZWE6IDIgLyAxIC8gMyAvIDI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLy8gVG9nZ2xlIG51bWJlciBvZiBwbGF5ZXJzXFxuLnN3aXRjaCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMTUwcHg7XFxuICBoZWlnaHQ6IDM0cHg7XFxuICBtYXJnaW4tdG9wOiA1cHg7XFxuICBpbnB1dCB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDA7XFxuICB9XFxuICAuc2xpZGVyIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogNXB4O1xcbiAgICB3aWR0aDogMTUwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IDAuNHM7XFxuICAgIHRyYW5zaXRpb246IDAuNHM7XFxuICAgIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gICAgJjpiZWZvcmUge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICBoZWlnaHQ6IDI2cHg7XFxuICAgICAgd2lkdGg6IDUwcHg7XFxuICAgICAgbGVmdDogOTdweDtcXG4gICAgICBib3R0b206IDRweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IDAuNXM7XFxuICAgICAgdHJhbnNpdGlvbjogMC41cztcXG4gICAgICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICAgIH1cXG4gICAgLm9uZS1wbGF5ZXItbG9nbyxcXG4gICAgLnR3by1wbGF5ZXItbG9nbyB7XFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9hc3NldHMvb25lLXBsYXllci5wbmdcXFwiKTtcXG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcbiAgICAgIHdpZHRoOiAxOHB4O1xcbiAgICAgIGhlaWdodDogMThweDtcXG4gICAgfVxcbiAgICAudHdvLXBsYXllci1sb2dvIHtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2Fzc2V0cy90d28tcGxheWVyLnBuZ1xcXCIpO1xcbiAgICB9XFxuICB9XFxuICBpbnB1dDpjaGVja2VkICsgLnNsaWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRzaGlwLWNvbG9yO1xcbiAgfVxcbiAgaW5wdXQ6Zm9jdXMgKyAuc2xpZGVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDFweCAkaGlnaGxpZ2h0LWNvbG9yO1xcbiAgfVxcbiAgaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXI6YmVmb3JlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtOTNweCk7XFxuICB9XFxufVxcblxcbi50dXJuLXNpZ25hbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgLmhpdCB7XFxuICAgIGZvbnQtZmFtaWx5OiAkaGVhZGVyLWZvbnQ7XFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXG4gIH1cXG4gIC5taXNzIHtcXG4gICAgZm9udC1mYW1pbHk6ICRoZWFkZXItZm9udDtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgfVxcbiAgLndpbm5lciB7XFxuICAgIGZvbnQtZmFtaWx5OiAkaGVhZGVyLWZvbnQ7XFxuICAgIGZvbnQtc2l6ZTogMzJweDtcXG4gICAgY29sb3I6ICRoaWdobGlnaHQtY29sb3I7XFxuICB9XFxufVxcblxcbi5wbGF5ZXItaW5mbyB7XFxuICBncmlkLWFyZWE6IDMgLyAxIC8gNCAvIDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxMDBweDtcXG4gIGZvbnQtZmFtaWx5OiAkbWFpbi1mb250O1xcbiAgZGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICB3aWR0aDogMzAwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgbGluZS1oZWlnaHQ6IDM1cHg7XFxuICB9XFxuICAjcGxheWVyLW9uZS1uYW1lLFxcbiAgI3BsYXllci10d28tbmFtZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA3cHg7XFxuICB9XFxuICAjcGxheWVyLW9uZS1uYW1lLWlucHV0LFxcbiAgI3BsYXllci10d28tbmFtZS1pbnB1dCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmOGYxZTg7XFxuICAgIHdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiAzNXB4O1xcbiAgICBwYWRkaW5nOiA1cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gICAgei1pbmRleDogMjA7XFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCAkaGlnaGxpZ2h0LWNvbG9yO1xcbiAgfVxcbiAgLmVkaXQge1xcbiAgICAmOmhvdmVyIHtcXG4gICAgICBib3gtc2hhZG93OiAxcHggMXB4ICRoaWdobGlnaHQtY29sb3I7XFxuICAgIH1cXG4gIH1cXG4gICNwbGF5ZXItb25lLXNoaXBzLFxcbiAgI3BsYXllci10d28tc2hpcHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB3aWR0aDogMTMwcHg7XFxuICB9XFxuICBzcGFuIHtcXG4gICAgZm9udC1mYW1pbHk6ICRoZWFkZXItZm9udDtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgfVxcbn1cXG5cXG4uYmF0dGxlLWJvYXJkcyB7XFxuICBncmlkLWFyZWE6IDQgLyAxIC8gNSAvIDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxMDBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAjYm9hcmQtb25lLFxcbiAgI2JvYXJkLXR3byB7XFxuICAgIHdpZHRoOiAzMDBweDtcXG4gICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJvYXJkLWNvbG9yO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDMwcHgpIC8gcmVwZWF0KDEwLCAzMHB4KTtcXG4gICAgb3V0bGluZTogMXB4IHNvbGlkICRoaWdobGlnaHQtY29sb3I7XFxuICAgIGRpdiB7XFxuICAgICAgb3V0bGluZTogMC4zcHggc29saWQgJGhpZ2hsaWdodC1jb2xvcjtcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgJjpob3ZlciB7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAxcHggMXB4ICRoaWdobGlnaHQtY29sb3I7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgfVxcbiAgICB9XFxuICAgIC5oYXNTaGlwIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2hpcC1jb2xvcjtcXG4gICAgfVxcbiAgICAuaGlkZVNoaXAge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB9XFxuICAgIC5oaXQge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlMjk1OGM7XFxuICAgIH1cXG4gICAgLm1pc3Mge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICM4Y2UyYzA7XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuI3NoaXBzIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgaGVpZ2h0OiAyMjBweDtcXG4gIHdpZHRoOiAyMjBweDtcXG4gIGdhcDogMTBweDtcXG4gIHRvcDogLTIwcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBkaXYge1xcbiAgICAgIHdpZHRoOiAzMHB4O1xcbiAgICAgIGhlaWdodDogMzBweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2hpcC1jb2xvcjtcXG4gICAgICBib3JkZXI6IDAuNXB4IGRvdHRlZCAkYmFja2dyb3VuZC1jb2xvcjtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIH1cXG4gIH1cXG4gICNjaGFuZ2UtZGlyZWN0aW9ucyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGJvdHRvbTogLTU1cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRoaWdobGlnaHQtY29sb3I7XFxuICAgIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICB9XFxufVxcblxcbi5wbGF5ZXItbm90LXJlYWR5LFxcbi5pbmZvLW1pc3Npbmcge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgJjphZnRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgaGVpZ2h0OiAzNXB4O1xcbiAgICB3aWR0aDogMjUwcHg7XFxuICAgIGJvdHRvbTogLTQzcHg7XFxuICAgIGxlZnQ6IDVweDtcXG4gICAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgICBwYWRkaW5nOiAwIDIwcHg7XFxuICAgIGNvbnRlbnQ6IFxcXCJIaXQgdGhlICdSZWFkeScgYnV0dG9uIGJlbG93IHRvIHJldmVhbCB5b3VyIHNoaXBzIGFuZCBmaXJlIGF0IHlvdXIgb3Bwb25lbnRcXFwiO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2hpcC1jb2xvcjtcXG4gICAgZm9udC1mYW1pbHk6ICRtYWluLWZvbnQ7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgfVxcbn1cXG5cXG4uZ2FtZS1zdGFydHVwLFxcbi5wbGF5ZXItb25lLXJlYWR5LFxcbi5wbGF5ZXItdHdvLXJlYWR5IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDYwcHg7XFxuICBncmlkLWFyZWE6IDUgLyAxIC8gNiAvIDI7XFxuICBkaXYge1xcbiAgICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRoaWdobGlnaHQtY29sb3I7XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggJGJhY2tncm91bmQtY29sb3I7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgfVxcbiAgI3JhbmRvbWx5LXBsYWNlLWJ1dHRvbixcXG4gICNkcmFnLWFuZC1kcm9wLWJ1dHRvbiB7XFxuICAgIHdpZHRoOiAxOTBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICAmOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcXG4gICAgICBjb2xvcjogJGhpZ2hsaWdodC1jb2xvcjtcXG4gICAgICBib3gtc2hhZG93OiAycHggMnB4ICRoaWdobGlnaHQtY29sb3I7XFxuICAgIH1cXG4gIH1cXG4gICNzdGFydC1uZXh0LWJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiAkaGVhZGVyLWZvbnQ7XFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXG4gICAgdGV4dC1zaGFkb3c6IDFweCAxcHggJHNoaXAtY29sb3I7XFxuICAgIHdpZHRoOiAxMDBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICAmOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcXG4gICAgICBjb2xvcjogJHNoaXAtY29sb3I7XFxuICAgICAgYm94LXNoYWRvdzogMnB4IDJweCAkaGlnaGxpZ2h0LWNvbG9yO1xcbiAgICB9XFxuICB9XFxuICAuaW5mby1taXNzaW5nIHtcXG4gICAgJjphZnRlciB7XFxuICAgICAgdG9wOiAtMzlweDtcXG4gICAgICBsZWZ0OiBhdXRvO1xcbiAgICAgIGNvbnRlbnQ6IFxcXCJZb3UgbXVzdCBwbGFjZSBhbGwgb2YgeW91ciBzaGlwcyBvbiB0aGUgZ2FtZWJvYXJkIGJlZm9yZSBjb250aW51aW5nXFxcIjtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4jcGxheWVyLW9uZS1yZWFkeS1idXR0b24sXFxuI3BsYXllci10d28tcmVhZHktYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiAkaGVhZGVyLWZvbnQ7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICB0ZXh0LXNoYWRvdzogMXB4IDFweCAkc2hpcC1jb2xvcjtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogNTBweDtcXG4gICY6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcXG4gICAgY29sb3I6ICRzaGlwLWNvbG9yO1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4ICRoaWdobGlnaHQtY29sb3I7XFxuICB9XFxufVxcblxcbi5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBncmlkLWFyZWE6IDYgLyAxIC8gNyAvIDI7XFxuICAubWFkZS1ieSB7XFxuICAgIGNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMTBweDtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBwYWRkaW5nOiA3cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGEge1xcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgICBjb2xvcjogJGJhY2tncm91bmQtY29sb3I7XFxuICAgIH1cXG4gICAgaW1nIHtcXG4gICAgICBoZWlnaHQ6IDE2cHg7XFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAgIH1cXG4gICAgI2dpdGh1Yi1pY29uIHtcXG4gICAgICBtYXgtaGVpZ2h0OiAxNnB4O1xcbiAgICB9XFxuICAgIGltZzpob3ZlciB7XFxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKSBzY2FsZSgxLjIpO1xcbiAgICB9XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtZWRpdW0pIHtcXG4gIC5oZWFkZXIge1xcbiAgICAuaGVhZGVyLWxlZnQge1xcbiAgICAgIGZvbnQtc2l6ZTogMzJweDtcXG4gICAgfVxcbiAgfVxcbiAgLnR1cm4tc2lnbmFsIHtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAuaGl0IHtcXG4gICAgICBmb250LXNpemU6IDIwcHg7XFxuICAgIH1cXG4gICAgLm1pc3Mge1xcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgfVxcbiAgICAud2lubmVyIHtcXG4gICAgICBmb250LXNpemU6IDI2cHg7XFxuICAgIH1cXG4gIH1cXG4gIC5wbGF5ZXItaW5mbyB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgZ2FwOiA0MDBweDtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG4gIH1cXG5cXG4gIC5iYXR0bGUtYm9hcmRzIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxMDBweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogOTBweDtcXG4gIH1cXG4gICNzaGlwcyB7XFxuICAgIG1hcmdpbi10b3A6IC03MHB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICBvcmRlcjogMTtcXG4gIH1cXG4gICNjaGFuZ2UtZGlyZWN0aW9ucyB7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICB9XFxuICAuZ2FtZS1zdGFydHVwIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAtMTgwcHg7XFxuICB9XFxuICAucmFuZG9tbHktcGxhY2Uge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogMTYwcHg7XFxuICB9XFxuICAjcmFuZG9tbHktcGxhY2UtYnV0dG9uLFxcbiAgI2RyYWctYW5kLWRyb3AtYnV0dG9uLFxcbiAgI3N0YXJ0LW5leHQtYnV0dG9uIHtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgfVxcbiAgLnBsYXllci1vbmUtcmVhZHksXFxuICAucGxheWVyLXR3by1yZWFkeSB7XFxuICAgIG1hcmdpbi10b3A6IC0yMDBweDtcXG4gIH1cXG4gIC5wbGF5ZXItbm90LXJlYWR5IHtcXG4gICAgJjphZnRlciB7XFxuICAgICAgbGVmdDogNXB4O1xcbiAgICAgIGJvdHRvbTogLTM3cHg7XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHNtYWxsKSB7XFxuICAuaGVhZGVyIHtcXG4gICAgLmhlYWRlci1sZWZ0IHtcXG4gICAgICBmb250LXNpemU6IDI4cHg7XFxuICAgIH1cXG4gIH1cXG4gIC50dXJuLXNpZ25hbCB7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgLmhpdCB7XFxuICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICB9XFxuICAgIC5taXNzIHtcXG4gICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIH1cXG4gICAgLndpbm5lciB7XFxuICAgICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICB9XFxuICB9XFxuICAucGxheWVyLWluZm8ge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIGdhcDogMjkwcHg7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxuICB9XFxuICAuYmF0dGxlLWJvYXJkcyB7XFxuICAgICNib2FyZC1vbmUsXFxuICAgICNib2FyZC10d28ge1xcbiAgICAgIHdpZHRoOiAyMDBweDtcXG4gICAgICBoZWlnaHQ6IDIwMHB4O1xcbiAgICAgIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMjBweCkgLyByZXBlYXQoMTAsIDIwcHgpO1xcbiAgICB9XFxuICB9XFxuICAjc2hpcHMge1xcbiAgICB0b3A6IC0xMHB4O1xcbiAgICB3aWR0aDogMTYwcHg7XFxuICAgIGhlaWdodDogMTYwcHg7XFxuICAgIGRpdiB7XFxuICAgICAgZGl2IHtcXG4gICAgICAgIHdpZHRoOiAyMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IGZhdmljb24gZnJvbSBcIi4uL2Fzc2V0cy9mYXZpY29uLmljb1wiO1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSBcIi4uL2Fzc2V0cy9naXRIdWJJY29uV2hpdGUucG5nXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IGRpc3BsYXlDb250cm9sbGVyIGZyb20gXCIuLi9zY3JpcHRzL21vZHVsZXMvZGlzcGxheUNvbnRyb2wuanNcIjtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3R5cGU9XCJpbWFnZS94LWljb25cIl0nKS5ocmVmID0gZmF2aWNvbjtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2l0aHViLWljb25cIikuc3JjID0gZ2l0aHViSWNvbjtcblxuZGlzcGxheUNvbnRyb2xsZXI7XG4iXSwibmFtZXMiOlsiR2FtZWJvYXJkIiwiUGxheWVyIiwiR2FtZSIsInBsYXllcjEiLCJodW1hblBsYXllciIsInJvYm9QbGF5ZXIiLCJodW1hbkJvYXJkIiwicm9ib0JvYXJkIiwicmVzZXQiLCJyZW1vdmVBbGxTaGlwcyIsInNoaXBEYXRhIiwiU2hpcCIsInBsYXllciIsImRhdGEiLCJib2FyZCIsInNoaXBzTGVmdCIsInNoaXBzIiwibWlzc2VkU2hvdHMiLCJpbml0Qm9hcmQiLCJpIiwicHVzaCIsImluZGV4IiwiaGFzU2hpcCIsImlzSGl0IiwibmV3RmxlZXQiLCJmb3JFYWNoIiwiaXRlbSIsIm5hbWUiLCJsZW5ndGgiLCJyaWdodEVkZ2VzIiwiYm90dG9tRWRnZXMiLCJjaGVja1NoaXBzIiwic2hpcCIsIm51bSIsInZlcnRpY2FsIiwiY2hlY2tFZGdlcyIsImVkZ2VMaXN0Iiwic2xpY2UiLCJzb3J0IiwiYSIsImIiLCJpbmRleE9mIiwiZWRnZSIsImZpbmQiLCJwbGFjZVNoaXAiLCJzdGFydGluZ1BvaW50IiwicG9zaXRpb24iLCJyYW5kb21seVBsYWNlIiwiYXJncyIsImFyZyIsImlzVmVydGljYWwiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJyYW5kb21TcG90IiwiZmxvb3IiLCJyZW1vdmVTaGlwIiwicmVzZXRQb3NpdGlvbiIsInJlc2V0SGl0cyIsInJlY2VpdmVBdHRhY2siLCJzaGlwVHlwZSIsImhpdCIsImFsbFN1bmsiLCJldmVyeSIsImlzU3VuayIsInBsYXllckluZm8iLCJzaG90cyIsImZpcmVBd2F5IiwiZ2FtZWJvYXJkIiwic2hvdCIsIm5leHRNb3ZlcyIsImZpbmROZXh0TW92ZSIsInNwbGljZSIsInJvYm9QbGF5IiwibmV4dE1vdmUiLCJuZXh0QmVzdE1vdmUiLCJjb25zb2xlIiwibG9nIiwidGhpc01vdmUiLCJwYXNzIiwiaW5jbHVkZXMiLCJoaXRzIiwiQXJyYXkiLCJmaWxsIiwiY2hhbmdlQXhpcyIsImRpcmVjdGlvbiIsIk51bWJlciIsInJvYm9HYW1lIiwidHdvUGxheWVyR2FtZSIsImRyYWdBbmREcm9wIiwiZGlzcGxheUNvbnRyb2xsZXIiLCJnYW1lIiwiYm9hcmRPbmUiLCJib2FyZFR3byIsInBsYXllck9uZSIsInBsYXllclR3byIsImJvYXJkT25lRE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImJvYXJkVHdvRE9NIiwic2hpcHNET00iLCJwbGF5ZXJPbmVJbmZvIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInBsYXllclR3b0luZm8iLCJwbGF5ZXJPbmVOYW1lIiwicGxheWVyVHdvTmFtZSIsInBsYXllck9uZVNoaXBzTGVmdCIsInBsYXllclR3b1NoaXBzTGVmdCIsImdhbWVTdGFydHVwIiwic3RhcnROZXh0IiwidHVyblNpZ25hbCIsInN0YXJ0TmV4dEJ1dHRvbiIsInJlbmRlckJvYXJkIiwiRE9NZWxlbSIsImNlbGwiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiZGF0YXNldCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwicmVtb3ZlQm9hcmQiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJjaGVja2JveCIsInNsaWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjaGVja2VkIiwiaW5uZXJIVE1MIiwiaW5uZXJUZXh0IiwidGV4dENvbnRlbnQiLCJzdHlsZSIsImN1cnNvciIsIm91dGxpbmUiLCJkaXNwbGF5IiwidGV4dFdpZHRoIiwidGV4dCIsImZvbnQiLCJjIiwiY3R4IiwiZ2V0Q29udGV4dCIsIm1lYXN1cmVUZXh0Iiwid2lkdGgiLCJ1cGRhdGVQbGF5ZXJOYW1lcyIsInBsYXllck5hbWVzIiwiZSIsImtleSIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiY29uZmlnIiwiYXR0cmlidXRlcyIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJjaGFyYWN0ZXJEYXRhIiwiY2FsbGJhY2siLCJtdXRhdGlvbkxpc3QiLCJtdXRhdGlvbiIsInBhcmVudE5vZGUiLCJpZCIsImRpc3BsYXlUdXJuIiwiZXJyIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsInVwZGF0ZVNoaXBzTGVmdCIsImZpbHRlciIsIm5ld0dhbWVET00iLCJzZXR1cEdhbWUiLCJyZW1vdmUiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyYW5kb21seVBsYWNlQnV0dG9uIiwicmFuZG9tbHlQbGFjZVNoaXBzIiwiZHJhZ0FuZERyb3BCdXR0b24iLCJydW4iLCJnYW1lU3RhcnROZXh0IiwiZnJvbSIsInJ1bkdhbWUiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJjaGFuZ2VEaXJlY3Rpb25zIiwidGFyZ2V0cyIsInNoaXBzQXJyYXkiLCJ2ZXJ0aWNhbFNoaXBzIiwiZmxleERpcmVjdGlvbiIsImhvcml6b250YWxTaGlwcyIsImRyYWdnZWQiLCJib2F0IiwiY2hpbGROb2RlcyIsInBsYXllckZpcmUiLCJnZXRBdHRyaWJ1dGUiLCJlbmRHYW1lIiwicm9ib1R1cm4iLCJwbGF5ZXJUdXJuIiwicm9ib0ZpcmUiLCJzZXRUaW1lb3V0Iiwicm9ib0F0dGFjayIsIm5leHRSb2JvTW92ZSIsInJvYm9Nb3ZlIiwiYm9hcmRQaWVjZSIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicGxheWVyT25lUmVhZHlET00iLCJwbGF5ZXJUd29SZWFkeURPTSIsInBsYXllck9uZU5vdFJlYWR5IiwicGxheWVyVHdvTm90UmVhZHkiLCJwbGF5ZXJPbmVUdXJuIiwicGxheWVyT25lUmVhZHkiLCJwbGF5ZXJPbmVGaXJlIiwicGxheWVyVHdvVHVybiIsInBsYXllclR3b1JlYWR5IiwicGxheWVyVHdvRmlyZSIsImZhdmljb24iLCJnaXRodWJJY29uIiwiaHJlZiIsInNyYyJdLCJzb3VyY2VSb290IjoiIn0=