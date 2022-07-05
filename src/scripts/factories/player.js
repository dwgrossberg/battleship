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

  const findNextMove = (board, num) => {
    if (board.data.board[num].hasShip === true) {
      return [num - 1, num + 1, num + 10, num - 10];
    } else {
      return null;
    }
  };

  const roboPlay = (board, nextMove) => {
    if (nextMove) {
      fireAway(board, nextMove);
      return findNextMove(board, nextMove);
    } else {
      let randomSpot = Math.floor(Math.random() * 100);
      let pass = true;
      while (pass) {
        if (board.data.board[randomSpot].hasShip === false) {
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
    playerInfo,
    fireAway,
    roboPlay,
  };
};

export default Player;
