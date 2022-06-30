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

  const placeShip = (ship, startingPoint) => {
    if (ship.vertical === false) {
      const checkEdges = () => {
        let rightEdges = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
        rightEdges.push(startingPoint);
        rightEdges.sort((a, b) => a - b);
        const index = rightEdges.indexOf(startingPoint);
        console.log(
          index,
          rightEdges[index + 1],
          rightEdges[index],
          ship.length
        );
        return rightEdges[index + 1] - rightEdges[index] >= ship.length
          ? true
          : false;
      };
      console.log(checkEdges());
      if (checkEdges()) {
        for (let i = 0; i < ship.length; i++) {
          data.board[startingPoint + i].hasShip = true;
        }
      }
    }
  };

  return {
    data,
    initBoard,
    placeShip,
  };
};

export default Gameboard;
