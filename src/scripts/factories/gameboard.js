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

  return {
    data,
    initBoard,
  };
};

export default Gameboard;
