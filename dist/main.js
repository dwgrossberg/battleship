/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
      var open = true;
      bottomEdges.forEach(function (edge) {
        (edge - num) / 7.5 >= ship.length ? open = true : open = false;
      });
      return open;
    }
  };

  var placeShip = function placeShip(ship, startingPoint) {
    if (ship.vertical === false && data.board[startingPoint].hasShip === false) {
      if (checkEdges(ship, startingPoint)) {
        for (var i = 0; i < ship.length; i++) {
          data.board[startingPoint + i].hasShip = true;
          data.board[startingPoint + i]["shipType"] = ship;
          ship.position.push(startingPoint + i);
        }
      }
    } else if (ship.vertical === true && data.board[startingPoint].hasShip === false) {
      if (checkEdges(ship, startingPoint)) {
        for (var _i = 0; _i < ship.length; _i++) {
          data.board[startingPoint + _i * 10].hasShip = true;
          data.board[startingPoint + _i * 10]["shipType"] = ship;
          ship.position.push(startingPoint + _i * 10);
        }
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
        if (checkEdges(arg, randomSpot)) {
          placeShip(arg, randomSpot);
        } else {
          randomSpot = Math.floor(Math.random() * 100);
        }
      }
    }); //  Ensure at least one Ship is in the opposite direction if all Ships are turned the same way

    if (args.every(function (arg) {
      return arg.vertical === false;
    })) {
      args[2].vertical = true;
    } else if (args.every(function (arg) {
      return arg.vertical === true;
    })) {
      args[2].vertical = false;
    }
  };

  var removeShip = function removeShip(ship) {
    ship.position.forEach(function (index) {
      data.board[index] = {
        hasShip: false,
        isHit: false
      };
    });
  };

  var receiveAttack = function receiveAttack(num) {
    data.board[num].hasShip === true ? data.board[num].shipType.hits[data.board[num].shipType.position.indexOf(num)] = "hit" : data.missedShots.push(num); // If Ship hits array is full, remove it from the Gameboard

    if (data.board[num].hasShip === true) {
      if (data.board[num].shipType.hits.every(function (item) {
        return item === "hit";
      })) {
        removeShip(data.board[num].shipType);
      }

      return true;
    } else {
      return false;
    }
  };

  var allSunk = function allSunk() {
    return data.board.every(function (space) {
      return space.hasShip === false;
    }) ? true : false;
  };

  return {
    data: data,
    placeShip: placeShip,
    randomlyPlace: randomlyPlace,
    receiveAttack: receiveAttack,
    allSunk: allSunk
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
    // gameboard: [],
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


  var findNextMove = function findNextMove(board, num) {
    if (board.data.board[num].hasShip === true) {
      var nextMoves = []; // Protect roboPlayer from making out-of-bound moves

      if (board.data.board[num - 1]) {
        if (board.data.board[num - 1].hasShip === true && board.data.board[num - 1].isHit === false) {
          nextMoves.push(num - 1);
        }
      }

      if (board.data.board[num + 1]) {
        if (board.data.board[num + 1].hasShip === true && board.data.board[num + 1].isHit === false) {
          nextMoves.push(num + 1);
        }
      }

      if (board.data.board[num - 10]) {
        if (board.data.board[num - 10].hasShip === true && board.data.board[num - 10].isHit === false) {
          nextMoves.push(num - 10);
        }
      }

      if (board.data.board[num + 10]) {
        if (board.data.board[num + 10].hasShip === true && board.data.board[num + 10].isHit === false) {
          nextMoves.push(num + 10);
        }
      }

      return nextMoves;
    } else {
      return null;
    }
  };

  var roboPlay = function roboPlay(board, nextMove) {
    if (nextMove) {
      var nextBestMove = nextMove[Math.floor(Math.random() * nextMove.length)];
      fireAway(board, nextBestMove);
      return findNextMove(board, nextBestMove);
    } else {
      var randomSpot = Math.floor(Math.random() * 100);
      var pass = true;

      while (pass) {
        if (board.data.board[randomSpot].isHit === false && !playerInfo.shots.includes(function (item) {
          return item.index;
        })) {
          fireAway(board, randomSpot);
          pass = false;
          return findNextMove(board, randomSpot);
        } else {
          randomSpot = Math.floor(Math.random() * 100);
        }
      }
    }
  };

  return {
    playerInfo: playerInfo,
    fireAway: fireAway,
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
      this.hits[num] = "hit";
    },
    isSunk: function isSunk() {
      return this.hits.every(function (position) {
        return position === "hit" ? true : false;
      });
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

/***/ "./src/scripts/modules/gameControl.js":
/*!********************************************!*\
  !*** ./src/scripts/modules/gameControl.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/gameboard.js */ "./src/scripts/factories/gameboard.js");
/* harmony import */ var _factories_player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/player.js */ "./src/scripts/factories/player.js");



var gameController = function (player1, player2) {
  // Create Player Objects
  var humanPlayer = (0,_factories_player_js__WEBPACK_IMPORTED_MODULE_1__["default"])(player1);
  var roboHuman;

  if (player2) {
    roboHuman = (0,_factories_player_js__WEBPACK_IMPORTED_MODULE_1__["default"])(player2);
  } else {
    roboHuman = (0,_factories_player_js__WEBPACK_IMPORTED_MODULE_1__["default"])("roboPlayer");
  } // Create Gameboards


  var humanBoard = (0,_factories_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])(humanPlayer);
  var roboBoard = (0,_factories_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])(roboHuman);
  humanBoard.randomlyPlace(humanBoard.data.ships);
  roboBoard.randomlyPlace(roboBoard.data.ships);
  console.log(humanBoard, roboBoard);
  return {};
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameController);

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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  overflow: auto;\n}\n\n.container {\n  background-color: rgb(173, 138, 144);\n  height: 500px;\n  width: 500px;\n}", "",{"version":3,"sources":["webpack://./src/styles/index.scss"],"names":[],"mappings":"AAEA;EACE,UAAA;EACA,SAAA;EACA,sBAAA;AADF;;AAIA;EACE,cAAA;AADF;;AAIA;EACE,oCAbc;EAcd,aAAA;EACA,YAAA;AADF","sourcesContent":["$primary-color: rgb(173, 138, 144);\n\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  overflow: auto;\n}\n\n.container {\n  background-color: $primary-color;\n  height: 500px;\n  width: 500px;\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _modules_gameControl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameControl.js */ "./src/scripts/modules/gameControl.js");


(0,_modules_gameControl_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQSxJQUFNRSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDQyxNQUFELEVBQVk7RUFDNUIsSUFBTUMsSUFBSSxHQUFHO0lBQ1hDLEtBQUssRUFBRSxFQURJO0lBRVhGLE1BQU0sRUFBRUEsTUFGRztJQUdYRyxTQUFTLEVBQUUsSUFIQTtJQUlYQyxLQUFLLEVBQUUsRUFKSTtJQUtYQyxXQUFXLEVBQUU7RUFMRixDQUFiOztFQVFBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07SUFDdEIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEdBQXBCLEVBQXlCQSxDQUFDLEVBQTFCLEVBQThCO01BQzVCTixJQUFJLENBQUNDLEtBQUwsQ0FBV00sSUFBWCxDQUFnQjtRQUFFQyxPQUFPLEVBQUUsS0FBWDtRQUFrQkMsS0FBSyxFQUFFO01BQXpCLENBQWhCO0lBQ0Q7RUFDRixDQUpEOztFQU1BSixTQUFTOztFQUVULElBQU1LLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQU07SUFDckJkLGtFQUFBLENBQWlCLFVBQUNnQixJQUFEO01BQUEsT0FBVVosSUFBSSxDQUFDRyxLQUFMLENBQVdJLElBQVgsQ0FBZ0JWLGlEQUFJLENBQUNlLElBQUksQ0FBQ0MsSUFBTixFQUFZRCxJQUFJLENBQUNFLE1BQWpCLENBQXBCLENBQVY7SUFBQSxDQUFqQjtFQUNELENBRkQ7O0VBSUFKLFFBQVE7RUFFUixJQUFNSyxVQUFVLEdBQUcsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DLEVBQXBDLENBQW5CO0VBQ0EsSUFBTUMsV0FBVyxHQUFHLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxFQUFxQyxFQUFyQyxDQUFwQjs7RUFFQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxJQUFELEVBQU9DLEdBQVAsRUFBZTtJQUNoQyxJQUFJRCxJQUFJLENBQUNFLFFBQUwsS0FBa0IsS0FBdEIsRUFBNkI7TUFDM0IsSUFBTUMsUUFBUSxHQUFHTixVQUFVLENBQUNPLEtBQVgsRUFBakI7TUFDQUQsUUFBUSxDQUFDZCxJQUFULENBQWNZLEdBQWQ7TUFDQUUsUUFBUSxDQUFDRSxJQUFULENBQWMsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO1FBQUEsT0FBVUQsQ0FBQyxHQUFHQyxDQUFkO01BQUEsQ0FBZDtNQUNBLElBQU1DLEtBQUssR0FBR0wsUUFBUSxDQUFDTSxPQUFULENBQWlCUixHQUFqQixDQUFkO01BQ0EsT0FBT0UsUUFBUSxDQUFDSyxLQUFLLEdBQUcsQ0FBVCxDQUFSLEdBQXNCTCxRQUFRLENBQUNLLEtBQUQsQ0FBOUIsSUFBeUNSLElBQUksQ0FBQ0osTUFBOUMsR0FDSCxJQURHLEdBRUgsS0FGSjtJQUdELENBUkQsTUFRTyxJQUFJSSxJQUFJLENBQUNFLFFBQUwsS0FBa0IsSUFBdEIsRUFBNEI7TUFDakMsSUFBSVEsSUFBSSxHQUFHLElBQVg7TUFDQVosV0FBVyxDQUFDTCxPQUFaLENBQW9CLFVBQUNrQixJQUFELEVBQVU7UUFDNUIsQ0FBQ0EsSUFBSSxHQUFHVixHQUFSLElBQWUsR0FBZixJQUFzQkQsSUFBSSxDQUFDSixNQUEzQixHQUFxQ2MsSUFBSSxHQUFHLElBQTVDLEdBQXFEQSxJQUFJLEdBQUcsS0FBNUQ7TUFDRCxDQUZEO01BR0EsT0FBT0EsSUFBUDtJQUNEO0VBQ0YsQ0FoQkQ7O0VBa0JBLElBQU1FLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNaLElBQUQsRUFBT2EsYUFBUCxFQUF5QjtJQUN6QyxJQUNFYixJQUFJLENBQUNFLFFBQUwsS0FBa0IsS0FBbEIsSUFDQXBCLElBQUksQ0FBQ0MsS0FBTCxDQUFXOEIsYUFBWCxFQUEwQnZCLE9BQTFCLEtBQXNDLEtBRnhDLEVBR0U7TUFDQSxJQUFJUyxVQUFVLENBQUNDLElBQUQsRUFBT2EsYUFBUCxDQUFkLEVBQXFDO1FBQ25DLEtBQUssSUFBSXpCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdZLElBQUksQ0FBQ0osTUFBekIsRUFBaUNSLENBQUMsRUFBbEMsRUFBc0M7VUFDcENOLElBQUksQ0FBQ0MsS0FBTCxDQUFXOEIsYUFBYSxHQUFHekIsQ0FBM0IsRUFBOEJFLE9BQTlCLEdBQXdDLElBQXhDO1VBQ0FSLElBQUksQ0FBQ0MsS0FBTCxDQUFXOEIsYUFBYSxHQUFHekIsQ0FBM0IsRUFBOEIsVUFBOUIsSUFBNENZLElBQTVDO1VBQ0FBLElBQUksQ0FBQ2MsUUFBTCxDQUFjekIsSUFBZCxDQUFtQndCLGFBQWEsR0FBR3pCLENBQW5DO1FBQ0Q7TUFDRjtJQUNGLENBWEQsTUFXTyxJQUNMWSxJQUFJLENBQUNFLFFBQUwsS0FBa0IsSUFBbEIsSUFDQXBCLElBQUksQ0FBQ0MsS0FBTCxDQUFXOEIsYUFBWCxFQUEwQnZCLE9BQTFCLEtBQXNDLEtBRmpDLEVBR0w7TUFDQSxJQUFJUyxVQUFVLENBQUNDLElBQUQsRUFBT2EsYUFBUCxDQUFkLEVBQXFDO1FBQ25DLEtBQUssSUFBSXpCLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUdZLElBQUksQ0FBQ0osTUFBekIsRUFBaUNSLEVBQUMsRUFBbEMsRUFBc0M7VUFDcENOLElBQUksQ0FBQ0MsS0FBTCxDQUFXOEIsYUFBYSxHQUFHekIsRUFBQyxHQUFHLEVBQS9CLEVBQW1DRSxPQUFuQyxHQUE2QyxJQUE3QztVQUNBUixJQUFJLENBQUNDLEtBQUwsQ0FBVzhCLGFBQWEsR0FBR3pCLEVBQUMsR0FBRyxFQUEvQixFQUFtQyxVQUFuQyxJQUFpRFksSUFBakQ7VUFDQUEsSUFBSSxDQUFDYyxRQUFMLENBQWN6QixJQUFkLENBQW1Cd0IsYUFBYSxHQUFHekIsRUFBQyxHQUFHLEVBQXZDO1FBQ0Q7TUFDRjtJQUNGO0VBQ0YsQ0F4QkQ7O0VBMEJBLElBQU0yQixhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQWE7SUFBQSxrQ0FBVEMsSUFBUztNQUFUQSxJQUFTO0lBQUE7O0lBQ2pDQSxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVF2QixPQUFSLENBQWdCLFVBQUN3QixHQUFELEVBQVM7TUFDdkIsSUFBTUMsVUFBVSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEVBQVgsQ0FBbkI7TUFDQUgsVUFBVSxLQUFLLENBQWYsR0FBb0JELEdBQUcsQ0FBQ2YsUUFBSixHQUFlLElBQW5DLEdBQTRDZSxHQUFHLENBQUNmLFFBQUosR0FBZSxLQUEzRDtNQUNBLElBQUlvQixVQUFVLEdBQUdILElBQUksQ0FBQ0ksS0FBTCxDQUFXSixJQUFJLENBQUNFLE1BQUwsS0FBZ0IsR0FBM0IsQ0FBakI7O01BQ0EsT0FBT0osR0FBRyxDQUFDSCxRQUFKLENBQWFsQixNQUFiLEtBQXdCLENBQS9CLEVBQWtDO1FBQ2hDLElBQUlHLFVBQVUsQ0FBQ2tCLEdBQUQsRUFBTUssVUFBTixDQUFkLEVBQWlDO1VBQy9CVixTQUFTLENBQUNLLEdBQUQsRUFBTUssVUFBTixDQUFUO1FBQ0QsQ0FGRCxNQUVPO1VBQ0xBLFVBQVUsR0FBR0gsSUFBSSxDQUFDSSxLQUFMLENBQVdKLElBQUksQ0FBQ0UsTUFBTCxLQUFnQixHQUEzQixDQUFiO1FBQ0Q7TUFDRjtJQUNGLENBWEQsRUFEaUMsQ0FhakM7O0lBQ0EsSUFBSUwsSUFBSSxDQUFDUSxLQUFMLENBQVcsVUFBQ1AsR0FBRDtNQUFBLE9BQVNBLEdBQUcsQ0FBQ2YsUUFBSixLQUFpQixLQUExQjtJQUFBLENBQVgsQ0FBSixFQUFpRDtNQUMvQ2MsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRZCxRQUFSLEdBQW1CLElBQW5CO0lBQ0QsQ0FGRCxNQUVPLElBQUljLElBQUksQ0FBQ1EsS0FBTCxDQUFXLFVBQUNQLEdBQUQ7TUFBQSxPQUFTQSxHQUFHLENBQUNmLFFBQUosS0FBaUIsSUFBMUI7SUFBQSxDQUFYLENBQUosRUFBZ0Q7TUFDckRjLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUWQsUUFBUixHQUFtQixLQUFuQjtJQUNEO0VBQ0YsQ0FuQkQ7O0VBcUJBLElBQU11QixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDekIsSUFBRCxFQUFVO0lBQzNCQSxJQUFJLENBQUNjLFFBQUwsQ0FBY3JCLE9BQWQsQ0FBc0IsVUFBQ2UsS0FBRCxFQUFXO01BQy9CMUIsSUFBSSxDQUFDQyxLQUFMLENBQVd5QixLQUFYLElBQW9CO1FBQUVsQixPQUFPLEVBQUUsS0FBWDtRQUFrQkMsS0FBSyxFQUFFO01BQXpCLENBQXBCO0lBQ0QsQ0FGRDtFQUdELENBSkQ7O0VBTUEsSUFBTW1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ3pCLEdBQUQsRUFBUztJQUM3Qm5CLElBQUksQ0FBQ0MsS0FBTCxDQUFXa0IsR0FBWCxFQUFnQlgsT0FBaEIsS0FBNEIsSUFBNUIsR0FDS1IsSUFBSSxDQUFDQyxLQUFMLENBQVdrQixHQUFYLEVBQWdCMEIsUUFBaEIsQ0FBeUJDLElBQXpCLENBQ0M5QyxJQUFJLENBQUNDLEtBQUwsQ0FBV2tCLEdBQVgsRUFBZ0IwQixRQUFoQixDQUF5QmIsUUFBekIsQ0FBa0NMLE9BQWxDLENBQTBDUixHQUExQyxDQURELElBRUcsS0FIUixHQUlJbkIsSUFBSSxDQUFDSSxXQUFMLENBQWlCRyxJQUFqQixDQUFzQlksR0FBdEIsQ0FKSixDQUQ2QixDQU03Qjs7SUFDQSxJQUFJbkIsSUFBSSxDQUFDQyxLQUFMLENBQVdrQixHQUFYLEVBQWdCWCxPQUFoQixLQUE0QixJQUFoQyxFQUFzQztNQUNwQyxJQUFJUixJQUFJLENBQUNDLEtBQUwsQ0FBV2tCLEdBQVgsRUFBZ0IwQixRQUFoQixDQUF5QkMsSUFBekIsQ0FBOEJKLEtBQTlCLENBQW9DLFVBQUM5QixJQUFEO1FBQUEsT0FBVUEsSUFBSSxLQUFLLEtBQW5CO01BQUEsQ0FBcEMsQ0FBSixFQUFtRTtRQUNqRStCLFVBQVUsQ0FBQzNDLElBQUksQ0FBQ0MsS0FBTCxDQUFXa0IsR0FBWCxFQUFnQjBCLFFBQWpCLENBQVY7TUFDRDs7TUFDRCxPQUFPLElBQVA7SUFDRCxDQUxELE1BS087TUFDTCxPQUFPLEtBQVA7SUFDRDtFQUNGLENBZkQ7O0VBaUJBLElBQU1FLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQU07SUFDcEIsT0FBTy9DLElBQUksQ0FBQ0MsS0FBTCxDQUFXeUMsS0FBWCxDQUFpQixVQUFDTSxLQUFEO01BQUEsT0FBV0EsS0FBSyxDQUFDeEMsT0FBTixLQUFrQixLQUE3QjtJQUFBLENBQWpCLElBQXVELElBQXZELEdBQThELEtBQXJFO0VBQ0QsQ0FGRDs7RUFJQSxPQUFPO0lBQ0xSLElBQUksRUFBSkEsSUFESztJQUVMOEIsU0FBUyxFQUFUQSxTQUZLO0lBR0xHLGFBQWEsRUFBYkEsYUFISztJQUlMVyxhQUFhLEVBQWJBLGFBSks7SUFLTEcsT0FBTyxFQUFQQTtFQUxLLENBQVA7QUFPRCxDQTdIRDs7QUErSEEsaUVBQWVqRCxTQUFmOzs7Ozs7Ozs7Ozs7OztBQ2xJQSxJQUFNbUQsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ3BDLElBQUQsRUFBVTtFQUN2QixJQUFNcUMsVUFBVSxHQUFHO0lBQ2pCckMsSUFBSSxFQUFFQSxJQURXO0lBRWpCO0lBQ0FzQyxLQUFLLEVBQUU7RUFIVSxDQUFuQjs7RUFNQSxJQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxTQUFELEVBQVlsQyxHQUFaLEVBQW9CO0lBQ25DLE9BQU9rQyxTQUFTLENBQUNULGFBQVYsQ0FBd0J6QixHQUF4QixJQUNIK0IsVUFBVSxDQUFDQyxLQUFYLENBQWlCNUMsSUFBakIsQ0FBc0I7TUFBRW1CLEtBQUssRUFBRVAsR0FBVDtNQUFjbUMsSUFBSSxFQUFFO0lBQXBCLENBQXRCLENBREcsR0FFSEosVUFBVSxDQUFDQyxLQUFYLENBQWlCNUMsSUFBakIsQ0FBc0I7TUFBRW1CLEtBQUssRUFBRVAsR0FBVDtNQUFjbUMsSUFBSSxFQUFFO0lBQXBCLENBQXRCLENBRko7RUFHRCxDQUpELENBUHVCLENBYXZCOzs7RUFDQSxJQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDdEQsS0FBRCxFQUFRa0IsR0FBUixFQUFnQjtJQUNuQyxJQUFJbEIsS0FBSyxDQUFDRCxJQUFOLENBQVdDLEtBQVgsQ0FBaUJrQixHQUFqQixFQUFzQlgsT0FBdEIsS0FBa0MsSUFBdEMsRUFBNEM7TUFDMUMsSUFBTWdELFNBQVMsR0FBRyxFQUFsQixDQUQwQyxDQUUxQzs7TUFDQSxJQUFJdkQsS0FBSyxDQUFDRCxJQUFOLENBQVdDLEtBQVgsQ0FBaUJrQixHQUFHLEdBQUcsQ0FBdkIsQ0FBSixFQUErQjtRQUM3QixJQUNFbEIsS0FBSyxDQUFDRCxJQUFOLENBQVdDLEtBQVgsQ0FBaUJrQixHQUFHLEdBQUcsQ0FBdkIsRUFBMEJYLE9BQTFCLEtBQXNDLElBQXRDLElBQ0FQLEtBQUssQ0FBQ0QsSUFBTixDQUFXQyxLQUFYLENBQWlCa0IsR0FBRyxHQUFHLENBQXZCLEVBQTBCVixLQUExQixLQUFvQyxLQUZ0QyxFQUdFO1VBQ0ErQyxTQUFTLENBQUNqRCxJQUFWLENBQWVZLEdBQUcsR0FBRyxDQUFyQjtRQUNEO01BQ0Y7O01BQ0QsSUFBSWxCLEtBQUssQ0FBQ0QsSUFBTixDQUFXQyxLQUFYLENBQWlCa0IsR0FBRyxHQUFHLENBQXZCLENBQUosRUFBK0I7UUFDN0IsSUFDRWxCLEtBQUssQ0FBQ0QsSUFBTixDQUFXQyxLQUFYLENBQWlCa0IsR0FBRyxHQUFHLENBQXZCLEVBQTBCWCxPQUExQixLQUFzQyxJQUF0QyxJQUNBUCxLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQmtCLEdBQUcsR0FBRyxDQUF2QixFQUEwQlYsS0FBMUIsS0FBb0MsS0FGdEMsRUFHRTtVQUNBK0MsU0FBUyxDQUFDakQsSUFBVixDQUFlWSxHQUFHLEdBQUcsQ0FBckI7UUFDRDtNQUNGOztNQUNELElBQUlsQixLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQmtCLEdBQUcsR0FBRyxFQUF2QixDQUFKLEVBQWdDO1FBQzlCLElBQ0VsQixLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQmtCLEdBQUcsR0FBRyxFQUF2QixFQUEyQlgsT0FBM0IsS0FBdUMsSUFBdkMsSUFDQVAsS0FBSyxDQUFDRCxJQUFOLENBQVdDLEtBQVgsQ0FBaUJrQixHQUFHLEdBQUcsRUFBdkIsRUFBMkJWLEtBQTNCLEtBQXFDLEtBRnZDLEVBR0U7VUFDQStDLFNBQVMsQ0FBQ2pELElBQVYsQ0FBZVksR0FBRyxHQUFHLEVBQXJCO1FBQ0Q7TUFDRjs7TUFDRCxJQUFJbEIsS0FBSyxDQUFDRCxJQUFOLENBQVdDLEtBQVgsQ0FBaUJrQixHQUFHLEdBQUcsRUFBdkIsQ0FBSixFQUFnQztRQUM5QixJQUNFbEIsS0FBSyxDQUFDRCxJQUFOLENBQVdDLEtBQVgsQ0FBaUJrQixHQUFHLEdBQUcsRUFBdkIsRUFBMkJYLE9BQTNCLEtBQXVDLElBQXZDLElBQ0FQLEtBQUssQ0FBQ0QsSUFBTixDQUFXQyxLQUFYLENBQWlCa0IsR0FBRyxHQUFHLEVBQXZCLEVBQTJCVixLQUEzQixLQUFxQyxLQUZ2QyxFQUdFO1VBQ0ErQyxTQUFTLENBQUNqRCxJQUFWLENBQWVZLEdBQUcsR0FBRyxFQUFyQjtRQUNEO01BQ0Y7O01BQ0QsT0FBT3FDLFNBQVA7SUFDRCxDQXBDRCxNQW9DTztNQUNMLE9BQU8sSUFBUDtJQUNEO0VBQ0YsQ0F4Q0Q7O0VBMENBLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUN4RCxLQUFELEVBQVF5RCxRQUFSLEVBQXFCO0lBQ3BDLElBQUlBLFFBQUosRUFBYztNQUNaLElBQU1DLFlBQVksR0FDaEJELFFBQVEsQ0FBQ3JCLElBQUksQ0FBQ0ksS0FBTCxDQUFXSixJQUFJLENBQUNFLE1BQUwsS0FBZ0JtQixRQUFRLENBQUM1QyxNQUFwQyxDQUFELENBRFY7TUFFQXNDLFFBQVEsQ0FBQ25ELEtBQUQsRUFBUTBELFlBQVIsQ0FBUjtNQUNBLE9BQU9KLFlBQVksQ0FBQ3RELEtBQUQsRUFBUTBELFlBQVIsQ0FBbkI7SUFDRCxDQUxELE1BS087TUFDTCxJQUFJbkIsVUFBVSxHQUFHSCxJQUFJLENBQUNJLEtBQUwsQ0FBV0osSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEdBQTNCLENBQWpCO01BQ0EsSUFBSXFCLElBQUksR0FBRyxJQUFYOztNQUNBLE9BQU9BLElBQVAsRUFBYTtRQUNYLElBQ0UzRCxLQUFLLENBQUNELElBQU4sQ0FBV0MsS0FBWCxDQUFpQnVDLFVBQWpCLEVBQTZCL0IsS0FBN0IsS0FBdUMsS0FBdkMsSUFDQSxDQUFDeUMsVUFBVSxDQUFDQyxLQUFYLENBQWlCVSxRQUFqQixDQUEwQixVQUFDakQsSUFBRDtVQUFBLE9BQVVBLElBQUksQ0FBQ2MsS0FBZjtRQUFBLENBQTFCLENBRkgsRUFHRTtVQUNBMEIsUUFBUSxDQUFDbkQsS0FBRCxFQUFRdUMsVUFBUixDQUFSO1VBQ0FvQixJQUFJLEdBQUcsS0FBUDtVQUNBLE9BQU9MLFlBQVksQ0FBQ3RELEtBQUQsRUFBUXVDLFVBQVIsQ0FBbkI7UUFDRCxDQVBELE1BT087VUFDTEEsVUFBVSxHQUFHSCxJQUFJLENBQUNJLEtBQUwsQ0FBV0osSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEdBQTNCLENBQWI7UUFDRDtNQUNGO0lBQ0Y7RUFDRixDQXRCRDs7RUF3QkEsT0FBTztJQUNMVyxVQUFVLEVBQVZBLFVBREs7SUFFTEUsUUFBUSxFQUFSQSxRQUZLO0lBR0xLLFFBQVEsRUFBUkE7RUFISyxDQUFQO0FBS0QsQ0FyRkQ7O0FBdUZBLGlFQUFlUixNQUFmOzs7Ozs7Ozs7Ozs7OztBQ3ZGQSxJQUFNcEQsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBQ2dCLElBQUQsRUFBT0MsTUFBUCxFQUFrQjtFQUM3QixPQUFPO0lBQ0xELElBQUksRUFBRUEsSUFERDtJQUVMQyxNQUFNLEVBQUVBLE1BRkg7SUFHTE0sUUFBUSxFQUFFLEtBSEw7SUFJTDBCLElBQUksRUFBRWdCLEtBQUssQ0FBQ2hELE1BQUQsQ0FBTCxDQUFjaUQsSUFBZCxDQUFtQixJQUFuQixDQUpEO0lBS0wvQixRQUFRLEVBQUUsRUFMTDtJQU1MZ0MsVUFOSyxzQkFNTUMsU0FOTixFQU1pQjtNQUNwQixJQUFJQSxTQUFTLEtBQUssVUFBbEIsRUFBOEI7UUFDNUIsS0FBSzdDLFFBQUwsR0FBZ0IsSUFBaEI7TUFDRCxDQUZELE1BRU8sSUFBSTZDLFNBQVMsS0FBSyxZQUFsQixFQUFnQztRQUNyQyxLQUFLN0MsUUFBTCxHQUFnQixLQUFoQjtNQUNEO0lBQ0YsQ0FaSTtJQWFMOEMsR0FiSyxlQWFEL0MsR0FiQyxFQWFJO01BQ1AsS0FBSzJCLElBQUwsQ0FBVTNCLEdBQVYsSUFBaUIsS0FBakI7SUFDRCxDQWZJO0lBZ0JMZ0QsTUFoQkssb0JBZ0JJO01BQ1AsT0FBTyxLQUFLckIsSUFBTCxDQUFVSixLQUFWLENBQWdCLFVBQUNWLFFBQUQ7UUFBQSxPQUFlQSxRQUFRLEtBQUssS0FBYixHQUFxQixJQUFyQixHQUE0QixLQUEzQztNQUFBLENBQWhCLENBQVA7SUFDRDtFQWxCSSxDQUFQO0FBb0JELENBckJEOztBQXVCQSxpRUFBZW5DLElBQWY7Ozs7Ozs7Ozs7Ozs7O0FDdkJBLElBQU1ELFFBQVEsR0FBRyxDQUNmO0VBQ0VpQixJQUFJLEVBQUUsU0FEUjtFQUVFQyxNQUFNLEVBQUU7QUFGVixDQURlLEVBS2Y7RUFDRUQsSUFBSSxFQUFFLFlBRFI7RUFFRUMsTUFBTSxFQUFFO0FBRlYsQ0FMZSxFQVNmO0VBQ0VELElBQUksRUFBRSxXQURSO0VBRUVDLE1BQU0sRUFBRTtBQUZWLENBVGUsRUFhZjtFQUNFRCxJQUFJLEVBQUUsV0FEUjtFQUVFQyxNQUFNLEVBQUU7QUFGVixDQWJlLEVBaUJmO0VBQ0VELElBQUksRUFBRSxhQURSO0VBRUVDLE1BQU0sRUFBRTtBQUZWLENBakJlLENBQWpCO0FBdUJBLGlFQUFlbEIsUUFBZjs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBOztBQUVBLElBQU13RSxjQUFjLEdBQUksVUFBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQXNCO0VBQzVDO0VBQ0EsSUFBTUMsV0FBVyxHQUFHdEIsZ0VBQU0sQ0FBQ29CLE9BQUQsQ0FBMUI7RUFDQSxJQUFJRyxTQUFKOztFQUNBLElBQUlGLE9BQUosRUFBYTtJQUNYRSxTQUFTLEdBQUd2QixnRUFBTSxDQUFDcUIsT0FBRCxDQUFsQjtFQUNELENBRkQsTUFFTztJQUNMRSxTQUFTLEdBQUd2QixnRUFBTSxDQUFDLFlBQUQsQ0FBbEI7RUFDRCxDQVIyQyxDQVM1Qzs7O0VBQ0EsSUFBTXdCLFVBQVUsR0FBRzNFLG1FQUFTLENBQUN5RSxXQUFELENBQTVCO0VBQ0EsSUFBTUcsU0FBUyxHQUFHNUUsbUVBQVMsQ0FBQzBFLFNBQUQsQ0FBM0I7RUFFQUMsVUFBVSxDQUFDeEMsYUFBWCxDQUF5QndDLFVBQVUsQ0FBQ3pFLElBQVgsQ0FBZ0JHLEtBQXpDO0VBQ0F1RSxTQUFTLENBQUN6QyxhQUFWLENBQXdCeUMsU0FBUyxDQUFDMUUsSUFBVixDQUFlRyxLQUF2QztFQUVBd0UsT0FBTyxDQUFDQyxHQUFSLENBQVlILFVBQVosRUFBd0JDLFNBQXhCO0VBRUEsT0FBTyxFQUFQO0FBQ0QsQ0FuQnNCLEVBQXZCOztBQXFCQSxpRUFBZU4sY0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSw2Q0FBNkMsZUFBZSxjQUFjLDJCQUEyQixHQUFHLFVBQVUsbUJBQW1CLEdBQUcsZ0JBQWdCLHlDQUF5QyxrQkFBa0IsaUJBQWlCLEdBQUcsT0FBTyx3RkFBd0YsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFdBQVcsVUFBVSxVQUFVLDREQUE0RCxPQUFPLGVBQWUsY0FBYywyQkFBMkIsR0FBRyxVQUFVLG1CQUFtQixHQUFHLGdCQUFnQixxQ0FBcUMsa0JBQWtCLGlCQUFpQixHQUFHLHFCQUFxQjtBQUNsckI7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUNQMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQSxnREFBZ0Q7QUFDaEQ7O0FBRUE7QUFDQSxxRkFBcUY7QUFDckY7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHFCQUFxQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNyR2E7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUFrSjtBQUNsSjtBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLDRIQUFPOzs7O0FBSTRGO0FBQ3BILE9BQU8saUVBQWUsNEhBQU8sSUFBSSxtSUFBYyxHQUFHLG1JQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBRUFBLG1FQUFjLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2hlbHBlcnMvc2hpcC1kYXRhLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9tb2R1bGVzL2dhbWVDb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2luZGV4LnNjc3M/NGMzNyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hpcERhdGEgZnJvbSBcIi4uL2hlbHBlcnMvc2hpcC1kYXRhXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICBib2FyZDogW10sXG4gICAgcGxheWVyOiBwbGF5ZXIsXG4gICAgc2hpcHNMZWZ0OiB0cnVlLFxuICAgIHNoaXBzOiBbXSxcbiAgICBtaXNzZWRTaG90czogW10sXG4gIH07XG5cbiAgY29uc3QgaW5pdEJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGRhdGEuYm9hcmQucHVzaCh7IGhhc1NoaXA6IGZhbHNlLCBpc0hpdDogZmFsc2UgfSk7XG4gICAgfVxuICB9O1xuXG4gIGluaXRCb2FyZCgpO1xuXG4gIGNvbnN0IG5ld0ZsZWV0ID0gKCkgPT4ge1xuICAgIHNoaXBEYXRhLmZvckVhY2goKGl0ZW0pID0+IGRhdGEuc2hpcHMucHVzaChTaGlwKGl0ZW0ubmFtZSwgaXRlbS5sZW5ndGgpKSk7XG4gIH07XG5cbiAgbmV3RmxlZXQoKTtcblxuICBjb25zdCByaWdodEVkZ2VzID0gWzksIDE5LCAyOSwgMzksIDQ5LCA1OSwgNjksIDc5LCA4OSwgOTldO1xuICBjb25zdCBib3R0b21FZGdlcyA9IFs5MCwgOTEsIDkyLCA5MywgOTQsIDk1LCA5NiwgOTcsIDk4LCA5OV07XG5cbiAgY29uc3QgY2hlY2tFZGdlcyA9IChzaGlwLCBudW0pID0+IHtcbiAgICBpZiAoc2hpcC52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IGVkZ2VMaXN0ID0gcmlnaHRFZGdlcy5zbGljZSgpO1xuICAgICAgZWRnZUxpc3QucHVzaChudW0pO1xuICAgICAgZWRnZUxpc3Quc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgY29uc3QgaW5kZXggPSBlZGdlTGlzdC5pbmRleE9mKG51bSk7XG4gICAgICByZXR1cm4gZWRnZUxpc3RbaW5kZXggKyAxXSAtIGVkZ2VMaXN0W2luZGV4XSA+PSBzaGlwLmxlbmd0aFxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHNoaXAudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgIGxldCBvcGVuID0gdHJ1ZTtcbiAgICAgIGJvdHRvbUVkZ2VzLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICAgICAgKGVkZ2UgLSBudW0pIC8gNy41ID49IHNoaXAubGVuZ3RoID8gKG9wZW4gPSB0cnVlKSA6IChvcGVuID0gZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gb3BlbjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHN0YXJ0aW5nUG9pbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICBzaGlwLnZlcnRpY2FsID09PSBmYWxzZSAmJlxuICAgICAgZGF0YS5ib2FyZFtzdGFydGluZ1BvaW50XS5oYXNTaGlwID09PSBmYWxzZVxuICAgICkge1xuICAgICAgaWYgKGNoZWNrRWRnZXMoc2hpcCwgc3RhcnRpbmdQb2ludCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZGF0YS5ib2FyZFtzdGFydGluZ1BvaW50ICsgaV0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgICAgZGF0YS5ib2FyZFtzdGFydGluZ1BvaW50ICsgaV1bXCJzaGlwVHlwZVwiXSA9IHNoaXA7XG4gICAgICAgICAgc2hpcC5wb3NpdGlvbi5wdXNoKHN0YXJ0aW5nUG9pbnQgKyBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBzaGlwLnZlcnRpY2FsID09PSB0cnVlICYmXG4gICAgICBkYXRhLmJvYXJkW3N0YXJ0aW5nUG9pbnRdLmhhc1NoaXAgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICBpZiAoY2hlY2tFZGdlcyhzaGlwLCBzdGFydGluZ1BvaW50KSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBkYXRhLmJvYXJkW3N0YXJ0aW5nUG9pbnQgKyBpICogMTBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICAgIGRhdGEuYm9hcmRbc3RhcnRpbmdQb2ludCArIGkgKiAxMF1bXCJzaGlwVHlwZVwiXSA9IHNoaXA7XG4gICAgICAgICAgc2hpcC5wb3NpdGlvbi5wdXNoKHN0YXJ0aW5nUG9pbnQgKyBpICogMTApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJhbmRvbWx5UGxhY2UgPSAoLi4uYXJncykgPT4ge1xuICAgIGFyZ3NbMF0uZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICBjb25zdCBpc1ZlcnRpY2FsID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgICAgIGlzVmVydGljYWwgPT09IDEgPyAoYXJnLnZlcnRpY2FsID0gdHJ1ZSkgOiAoYXJnLnZlcnRpY2FsID0gZmFsc2UpO1xuICAgICAgbGV0IHJhbmRvbVNwb3QgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgd2hpbGUgKGFyZy5wb3NpdGlvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKGNoZWNrRWRnZXMoYXJnLCByYW5kb21TcG90KSkge1xuICAgICAgICAgIHBsYWNlU2hpcChhcmcsIHJhbmRvbVNwb3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJhbmRvbVNwb3QgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gIEVuc3VyZSBhdCBsZWFzdCBvbmUgU2hpcCBpcyBpbiB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uIGlmIGFsbCBTaGlwcyBhcmUgdHVybmVkIHRoZSBzYW1lIHdheVxuICAgIGlmIChhcmdzLmV2ZXJ5KChhcmcpID0+IGFyZy52ZXJ0aWNhbCA9PT0gZmFsc2UpKSB7XG4gICAgICBhcmdzWzJdLnZlcnRpY2FsID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZXZlcnkoKGFyZykgPT4gYXJnLnZlcnRpY2FsID09PSB0cnVlKSkge1xuICAgICAgYXJnc1syXS52ZXJ0aWNhbCA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW1vdmVTaGlwID0gKHNoaXApID0+IHtcbiAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICBkYXRhLmJvYXJkW2luZGV4XSA9IHsgaGFzU2hpcDogZmFsc2UsIGlzSGl0OiBmYWxzZSB9O1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAobnVtKSA9PiB7XG4gICAgZGF0YS5ib2FyZFtudW1dLmhhc1NoaXAgPT09IHRydWVcbiAgICAgID8gKGRhdGEuYm9hcmRbbnVtXS5zaGlwVHlwZS5oaXRzW1xuICAgICAgICAgIGRhdGEuYm9hcmRbbnVtXS5zaGlwVHlwZS5wb3NpdGlvbi5pbmRleE9mKG51bSlcbiAgICAgICAgXSA9IFwiaGl0XCIpXG4gICAgICA6IGRhdGEubWlzc2VkU2hvdHMucHVzaChudW0pO1xuICAgIC8vIElmIFNoaXAgaGl0cyBhcnJheSBpcyBmdWxsLCByZW1vdmUgaXQgZnJvbSB0aGUgR2FtZWJvYXJkXG4gICAgaWYgKGRhdGEuYm9hcmRbbnVtXS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICBpZiAoZGF0YS5ib2FyZFtudW1dLnNoaXBUeXBlLmhpdHMuZXZlcnkoKGl0ZW0pID0+IGl0ZW0gPT09IFwiaGl0XCIpKSB7XG4gICAgICAgIHJlbW92ZVNoaXAoZGF0YS5ib2FyZFtudW1dLnNoaXBUeXBlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRhdGEuYm9hcmQuZXZlcnkoKHNwYWNlKSA9PiBzcGFjZS5oYXNTaGlwID09PSBmYWxzZSkgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRhLFxuICAgIHBsYWNlU2hpcCxcbiAgICByYW5kb21seVBsYWNlLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU3VuayxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IHBsYXllckluZm8gPSB7XG4gICAgbmFtZTogbmFtZSxcbiAgICAvLyBnYW1lYm9hcmQ6IFtdLFxuICAgIHNob3RzOiBbXSxcbiAgfTtcblxuICBjb25zdCBmaXJlQXdheSA9IChnYW1lYm9hcmQsIG51bSkgPT4ge1xuICAgIHJldHVybiBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhudW0pXG4gICAgICA/IHBsYXllckluZm8uc2hvdHMucHVzaCh7IGluZGV4OiBudW0sIHNob3Q6IFwiaGl0XCIgfSlcbiAgICAgIDogcGxheWVySW5mby5zaG90cy5wdXNoKHsgaW5kZXg6IG51bSwgc2hvdDogXCJtaXNzXCIgfSk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBuZXh0IGJlc3QgbW92ZSBiYXNlZCBvbiBzb21lIGxvZ2ljYWwgYXNzdW1wdGlvbnMgYWJvdXQgdGhlIGdhbWVcbiAgY29uc3QgZmluZE5leHRNb3ZlID0gKGJvYXJkLCBudW0pID0+IHtcbiAgICBpZiAoYm9hcmQuZGF0YS5ib2FyZFtudW1dLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG5leHRNb3ZlcyA9IFtdO1xuICAgICAgLy8gUHJvdGVjdCByb2JvUGxheWVyIGZyb20gbWFraW5nIG91dC1vZi1ib3VuZCBtb3Zlc1xuICAgICAgaWYgKGJvYXJkLmRhdGEuYm9hcmRbbnVtIC0gMV0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJvYXJkLmRhdGEuYm9hcmRbbnVtIC0gMV0uaGFzU2hpcCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIGJvYXJkLmRhdGEuYm9hcmRbbnVtIC0gMV0uaXNIaXQgPT09IGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgIG5leHRNb3Zlcy5wdXNoKG51bSAtIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYm9hcmQuZGF0YS5ib2FyZFtudW0gKyAxXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgYm9hcmQuZGF0YS5ib2FyZFtudW0gKyAxXS5oYXNTaGlwID09PSB0cnVlICYmXG4gICAgICAgICAgYm9hcmQuZGF0YS5ib2FyZFtudW0gKyAxXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgbmV4dE1vdmVzLnB1c2gobnVtICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChib2FyZC5kYXRhLmJvYXJkW251bSAtIDEwXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgYm9hcmQuZGF0YS5ib2FyZFtudW0gLSAxMF0uaGFzU2hpcCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIGJvYXJkLmRhdGEuYm9hcmRbbnVtIC0gMTBdLmlzSGl0ID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICBuZXh0TW92ZXMucHVzaChudW0gLSAxMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChib2FyZC5kYXRhLmJvYXJkW251bSArIDEwXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgYm9hcmQuZGF0YS5ib2FyZFtudW0gKyAxMF0uaGFzU2hpcCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIGJvYXJkLmRhdGEuYm9hcmRbbnVtICsgMTBdLmlzSGl0ID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICBuZXh0TW92ZXMucHVzaChudW0gKyAxMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0TW92ZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByb2JvUGxheSA9IChib2FyZCwgbmV4dE1vdmUpID0+IHtcbiAgICBpZiAobmV4dE1vdmUpIHtcbiAgICAgIGNvbnN0IG5leHRCZXN0TW92ZSA9XG4gICAgICAgIG5leHRNb3ZlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5leHRNb3ZlLmxlbmd0aCldO1xuICAgICAgZmlyZUF3YXkoYm9hcmQsIG5leHRCZXN0TW92ZSk7XG4gICAgICByZXR1cm4gZmluZE5leHRNb3ZlKGJvYXJkLCBuZXh0QmVzdE1vdmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmFuZG9tU3BvdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICBsZXQgcGFzcyA9IHRydWU7XG4gICAgICB3aGlsZSAocGFzcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgYm9hcmQuZGF0YS5ib2FyZFtyYW5kb21TcG90XS5pc0hpdCA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAhcGxheWVySW5mby5zaG90cy5pbmNsdWRlcygoaXRlbSkgPT4gaXRlbS5pbmRleClcbiAgICAgICAgKSB7XG4gICAgICAgICAgZmlyZUF3YXkoYm9hcmQsIHJhbmRvbVNwb3QpO1xuICAgICAgICAgIHBhc3MgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gZmluZE5leHRNb3ZlKGJvYXJkLCByYW5kb21TcG90KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByYW5kb21TcG90ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHBsYXllckluZm8sXG4gICAgZmlyZUF3YXksXG4gICAgcm9ib1BsYXksXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgbGVuZ3RoOiBsZW5ndGgsXG4gICAgdmVydGljYWw6IGZhbHNlLFxuICAgIGhpdHM6IEFycmF5KGxlbmd0aCkuZmlsbChudWxsKSxcbiAgICBwb3NpdGlvbjogW10sXG4gICAgY2hhbmdlQXhpcyhkaXJlY3Rpb24pIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICB0aGlzLnZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICB0aGlzLnZlcnRpY2FsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBoaXQobnVtKSB7XG4gICAgICB0aGlzLmhpdHNbbnVtXSA9IFwiaGl0XCI7XG4gICAgfSxcbiAgICBpc1N1bmsoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXRzLmV2ZXJ5KChwb3NpdGlvbikgPT4gKHBvc2l0aW9uID09PSBcImhpdFwiID8gdHJ1ZSA6IGZhbHNlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCJjb25zdCBzaGlwRGF0YSA9IFtcbiAge1xuICAgIG5hbWU6IFwiY2FycmllclwiLFxuICAgIGxlbmd0aDogNSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYmF0dGxlc2hpcFwiLFxuICAgIGxlbmd0aDogNCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZGVzdHJveWVyXCIsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzdWJtYXJpbmVcIixcbiAgICBsZW5ndGg6IDIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBhdHJvbC1ib2F0XCIsXG4gICAgbGVuZ3RoOiAxLFxuICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgc2hpcERhdGE7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuLi9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9mYWN0b3JpZXMvcGxheWVyLmpzXCI7XG5cbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKChwbGF5ZXIxLCBwbGF5ZXIyKSA9PiB7XG4gIC8vIENyZWF0ZSBQbGF5ZXIgT2JqZWN0c1xuICBjb25zdCBodW1hblBsYXllciA9IFBsYXllcihwbGF5ZXIxKTtcbiAgbGV0IHJvYm9IdW1hbjtcbiAgaWYgKHBsYXllcjIpIHtcbiAgICByb2JvSHVtYW4gPSBQbGF5ZXIocGxheWVyMik7XG4gIH0gZWxzZSB7XG4gICAgcm9ib0h1bWFuID0gUGxheWVyKFwicm9ib1BsYXllclwiKTtcbiAgfVxuICAvLyBDcmVhdGUgR2FtZWJvYXJkc1xuICBjb25zdCBodW1hbkJvYXJkID0gR2FtZWJvYXJkKGh1bWFuUGxheWVyKTtcbiAgY29uc3Qgcm9ib0JvYXJkID0gR2FtZWJvYXJkKHJvYm9IdW1hbik7XG5cbiAgaHVtYW5Cb2FyZC5yYW5kb21seVBsYWNlKGh1bWFuQm9hcmQuZGF0YS5zaGlwcyk7XG4gIHJvYm9Cb2FyZC5yYW5kb21seVBsYWNlKHJvYm9Cb2FyZC5kYXRhLnNoaXBzKTtcblxuICBjb25zb2xlLmxvZyhodW1hbkJvYXJkLCByb2JvQm9hcmQpO1xuXG4gIHJldHVybiB7fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNzMsIDEzOCwgMTQ0KTtcXG4gIGhlaWdodDogNTAwcHg7XFxuICB3aWR0aDogNTAwcHg7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLFVBQUE7RUFDQSxTQUFBO0VBQ0Esc0JBQUE7QUFERjs7QUFJQTtFQUNFLGNBQUE7QUFERjs7QUFJQTtFQUNFLG9DQWJjO0VBY2QsYUFBQTtFQUNBLFlBQUE7QUFERlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIkcHJpbWFyeS1jb2xvcjogcmdiKDE3MywgMTM4LCAxNDQpO1xcblxcbioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnktY29sb3I7XFxuICBoZWlnaHQ6IDUwMHB4O1xcbiAgd2lkdGg6IDUwMHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvZ2FtZUNvbnRyb2wuanNcIjtcblxuZ2FtZUNvbnRyb2xsZXIoKTtcbiJdLCJuYW1lcyI6WyJzaGlwRGF0YSIsIlNoaXAiLCJHYW1lYm9hcmQiLCJwbGF5ZXIiLCJkYXRhIiwiYm9hcmQiLCJzaGlwc0xlZnQiLCJzaGlwcyIsIm1pc3NlZFNob3RzIiwiaW5pdEJvYXJkIiwiaSIsInB1c2giLCJoYXNTaGlwIiwiaXNIaXQiLCJuZXdGbGVldCIsImZvckVhY2giLCJpdGVtIiwibmFtZSIsImxlbmd0aCIsInJpZ2h0RWRnZXMiLCJib3R0b21FZGdlcyIsImNoZWNrRWRnZXMiLCJzaGlwIiwibnVtIiwidmVydGljYWwiLCJlZGdlTGlzdCIsInNsaWNlIiwic29ydCIsImEiLCJiIiwiaW5kZXgiLCJpbmRleE9mIiwib3BlbiIsImVkZ2UiLCJwbGFjZVNoaXAiLCJzdGFydGluZ1BvaW50IiwicG9zaXRpb24iLCJyYW5kb21seVBsYWNlIiwiYXJncyIsImFyZyIsImlzVmVydGljYWwiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJyYW5kb21TcG90IiwiZmxvb3IiLCJldmVyeSIsInJlbW92ZVNoaXAiLCJyZWNlaXZlQXR0YWNrIiwic2hpcFR5cGUiLCJoaXRzIiwiYWxsU3VuayIsInNwYWNlIiwiUGxheWVyIiwicGxheWVySW5mbyIsInNob3RzIiwiZmlyZUF3YXkiLCJnYW1lYm9hcmQiLCJzaG90IiwiZmluZE5leHRNb3ZlIiwibmV4dE1vdmVzIiwicm9ib1BsYXkiLCJuZXh0TW92ZSIsIm5leHRCZXN0TW92ZSIsInBhc3MiLCJpbmNsdWRlcyIsIkFycmF5IiwiZmlsbCIsImNoYW5nZUF4aXMiLCJkaXJlY3Rpb24iLCJoaXQiLCJpc1N1bmsiLCJnYW1lQ29udHJvbGxlciIsInBsYXllcjEiLCJwbGF5ZXIyIiwiaHVtYW5QbGF5ZXIiLCJyb2JvSHVtYW4iLCJodW1hbkJvYXJkIiwicm9ib0JvYXJkIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=