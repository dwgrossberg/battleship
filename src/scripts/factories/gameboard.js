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
      data.board.push({ index: i, hasShip: false, isHit: false });
    }
  };

  initBoard();

  const newFleet = () => {
    shipData.forEach((item) => data.ships.push(Ship(item.name, item.length)));
  };

  newFleet();

  const rightEdges = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
  const bottomEdges = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

  const checkShips = (ship, num) => {
    if (ship.vertical === false) {
      for (let i = 0; i < ship.length; i++) {
        if (data.board[num + i] && data.board[num + i].hasShip === true) {
          return false;
        }
      }
      return true;
    } else if (ship.vertical === true) {
      for (let i = 0; i < ship.length; i++) {
        if (
          data.board[num + i * 10] &&
          data.board[num + i * 10].hasShip === true
        ) {
          return false;
        }
      }
      return true;
    }
  };

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
    if (ship.vertical === false) {
      if (checkShips(ship, startingPoint) && checkEdges(ship, startingPoint)) {
        for (let i = 0; i < ship.length; i++) {
          data.board[startingPoint + i].hasShip = true;
          data.board[startingPoint + i]["shipType"] = ship;
          ship.position.push(startingPoint + i);
        }
      }
    } else if (ship.vertical === true) {
      if (checkShips(ship, startingPoint) && checkEdges(ship, startingPoint)) {
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
      while (arg.position.length === 0) {
        if (checkShips(arg, randomSpot) && checkEdges(arg, randomSpot)) {
          placeShip(arg, randomSpot);
        } else {
          randomSpot = Math.floor(Math.random() * 100);
        }
      }
    });
  };

  const removeShip = (ship) => {
    ship.position.forEach((index) => {
      data.board[index] = { hasShip: false, isHit: false };
    });
    ship.resetPosition();
  };

  const removeAllShips = () => {
    data.ships.forEach((ship) => removeShip(ship));
  };

  const receiveAttack = (num) => {
    if (data.board[num].hasShip === true) {
      data.board[num].shipType.hit(num);
      return true;
    } else {
      data.missedShots.push(num);
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
    removeAllShips,
  };
};

export default Gameboard;
