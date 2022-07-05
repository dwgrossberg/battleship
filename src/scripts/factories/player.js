const Player = (name) => {
  const playerInfo = {
    name: name,
    // gameboard: [],
    shots: [],
  };

  const fireAway = (gameboard, num) => {
    return gameboard.receiveAttack(num)
      ? playerInfo.shots.push({ index: num, shot: "hit" })
      : playerInfo.shots.push({ index: num, shot: "miss" });
  };

  const roboPlay = (board) => {
    let randomSpot = Math.floor(Math.random() * 100);
    let pass = true;
    while (pass) {
      if (board.data.board[randomSpot].hasShip === false) {
        fireAway(board, randomSpot);
        pass = false;
      } else {
        randomSpot = Math.floor(Math.random() * 100);
      }
    }
  };

  return {
    playerInfo,
    fireAway,
    roboPlay,
  };
};

export default Player;
