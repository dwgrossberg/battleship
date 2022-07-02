const Gameboard = (player) => {
  const data = {
    board: [],
    player: player,
    shipsLeft: true,
    missedShots: [],
  };

  const initBoard = () => {
    for (let i = 0; i < 100; i++) {
      data.board.push({ hasShip: false, isHit: false });
    }
  };

  initBoard();

  const placeShip = (ship, startingPoint) => {
    const rightEdges = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    const bottomEdges = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
    const checkRightEdge = () => {
      const edgeList = rightEdges.slice();
      edgeList.push(startingPoint);
      edgeList.sort((a, b) => a - b);
      const index = edgeList.indexOf(startingPoint);
      return edgeList[index + 1] - edgeList[index] >= ship.length
        ? true
        : false;
    };
    const checkBottomEdge = () => {
      let open = true;
      bottomEdges.forEach((num) => {
        (num - startingPoint) / 7.5 >= ship.length
          ? (open = true)
          : (open = false);
      });
      return open;
    };
    if (
      ship.vertical === false &&
      data.board[startingPoint].hasShip === false
    ) {
      if (checkRightEdge()) {
        for (let i = 0; i < ship.length; i++) {
          data.board[startingPoint + i].hasShip = true;
          data.board[startingPoint + i]["shipType"] = ship.name;
          ship.position.push(startingPoint + i);
        }
      }
    } else if (
      ship.vertical === true &&
      data.board[startingPoint].hasShip === false
    ) {
      if (checkBottomEdge()) {
        for (let i = 0; i < ship.length; i++) {
          data.board[startingPoint + i * 10].hasShip = true;
          data.board[startingPoint + i * 10]["shipName"] = ship.name;
          ship.position.push(startingPoint + i);
        }
      }
    }
  };

  const randomlyPlace = (...args) => {
    args.forEach((arg) => {
      const isVertical = Math.round(Math.random());
      isVertical === 1 ? (arg.vertical = true) : (arg.vertical = false);
      const randomSpot = Math.floor(Math.random() * 100);
      console.log(isVertical, data.board[randomSpot]);
      placeShip(arg, randomSpot);
    });
  };

  return {
    data,
    initBoard,
    placeShip,
    randomlyPlace,
  };
};

export default Gameboard;
