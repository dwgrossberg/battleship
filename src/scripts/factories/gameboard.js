import shipData from "../helpers/ship-data";
import Ship from "./ship";

const Gameboard = (player) => {
  const data = {
    board: [],
    player: player,
    shipsLeft: true,
    ships: [],
    missedShots: [],
  };

  const initBoard = () => {
    for (let i = 0; i < 100; i++) {
      data.board.push({ hasShip: false, isHit: false });
    }
  };

  initBoard();

  const newFleet = () => {
    shipData.forEach((item) => data.ships.push(Ship(item.name, item.length)));
  };

  newFleet();

  const rightEdges = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
  const bottomEdges = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

  const checkEdges = (ship, num) => {
    if (ship.vertical === false) {
      const edgeList = rightEdges.slice();
      edgeList.push(num);
      edgeList.sort((a, b) => a - b);
      const index = edgeList.indexOf(num);
      return edgeList[index + 1] - edgeList[index] >= ship.length
        ? true
        : false;
    } else if (ship.vertical === true) {
      const edge = bottomEdges.find((edge) => edge % 10 === num % 10);
      return (edge - num) / 10 + 1 >= ship.length ? true : false;
    }
  };

  const placeShip = (ship, startingPoint) => {
    if (
      ship.vertical === false &&
      data.board[startingPoint].hasShip === false
    ) {
      if (checkEdges(ship, startingPoint)) {
        for (let i = 0; i < ship.length; i++) {
          data.board[startingPoint + i].hasShip = true;
          data.board[startingPoint + i]["shipType"] = ship;
          ship.position.push(startingPoint + i);
        }
      }
    } else if (
      ship.vertical === true &&
      data.board[startingPoint].hasShip === false
    ) {
      if (checkEdges(ship, startingPoint)) {
        for (let i = 0; i < ship.length; i++) {
          data.board[startingPoint + i * 10].hasShip = true;
          data.board[startingPoint + i * 10]["shipType"] = ship;
          ship.position.push(startingPoint + i * 10);
        }
      }
    }
  };

  const randomlyPlace = (...args) => {
    args[0].forEach((arg) => {
      const isVertical = Math.round(Math.random());
      isVertical === 1 ? (arg.vertical = true) : (arg.vertical = false);
      let randomSpot = Math.floor(Math.random() * 100);
      let pass = true;
      while (pass) {
        if (checkEdges(arg, randomSpot)) {
          placeShip(arg, randomSpot);
          pass = false;
        } else {
          randomSpot = Math.floor(Math.random() * 100);
        }
      }
    });
    //  Ensure at least one Ship is in the opposite direction if all Ships are turned the same way
    if (args.every((arg) => arg.vertical === false)) {
      args[2].vertical = true;
    } else if (args.every((arg) => arg.vertical === true)) {
      args[2].vertical = false;
    }
  };

  const removeShip = (ship) => {
    ship.position.forEach((index) => {
      data.board[index] = { hasShip: false, isHit: false };
    });
  };

  const receiveAttack = (num) => {
    data.board[num].hasShip === true
      ? (data.board[num].shipType.hits[
          data.board[num].shipType.position.indexOf(num)
        ] = "hit")
      : data.missedShots.push(num);
    // If Ship hits array is full, remove it from the Gameboard
    if (data.board[num].hasShip === true) {
      if (data.board[num].shipType.hits.every((item) => item === "hit")) {
        removeShip(data.board[num].shipType);
      }
      return true;
    } else {
      return false;
    }
  };

  const allSunk = () => {
    return data.board.every((space) => space.hasShip === false) ? true : false;
  };

  return {
    data,
    placeShip,
    randomlyPlace,
    receiveAttack,
    allSunk,
  };
};

export default Gameboard;
