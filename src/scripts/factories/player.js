const Player = (name) => {
  const playerInfo = {
    name: name,
    shots: [],
  };

  const fireAway = (gameboard, num) => {
    return gameboard.receiveAttack(num)
      ? playerInfo.shots.push({ index: num, shot: "hit" })
      : playerInfo.shots.push({ index: num, shot: "miss" });
  };

  // Determine the next best move based on some logical assumptions about the game
  const findNextMove = (board, num) => {
    const nextMoves = [];
    if (board.data.board[num].hasShip === true) {
      // Protect roboPlayer from making out-of-bound moves
      if (board.data.board[num - 1]) {
        if (
          board.data.board[num - 1].hasShip === true &&
          board.data.board[num - 1].isHit === false
        ) {
          nextMoves.push(num - 1);
        }
      }
      if (board.data.board[num + 1]) {
        if (
          board.data.board[num + 1].hasShip === true &&
          board.data.board[num + 1].isHit === false
        ) {
          nextMoves.push(num + 1);
        }
      }
      if (board.data.board[num - 10]) {
        if (
          board.data.board[num - 10].hasShip === true &&
          board.data.board[num - 10].isHit === false
        ) {
          nextMoves.push(num - 10);
        }
      }
      if (board.data.board[num + 10]) {
        if (
          board.data.board[num + 10].hasShip === true &&
          board.data.board[num + 10].isHit === false
        ) {
          nextMoves.push(num + 10);
        }
      }
      return nextMoves;
    } else {
      return null;
    }
  };

  const roboPlay = (board, nextMove) => {
    let randomSpot = Math.floor(Math.random() * 100);
    if (nextMove && nextMove.length > 0) {
      const nextBestMove =
        nextMove[Math.floor(Math.random() * nextMove.length)];
      fireAway(board, nextBestMove);
      return {
        thisMove: nextBestMove,
        nextMove: findNextMove(board, nextBestMove),
      };
    } else {
      let pass = true;
      while (pass) {
        if (
          board.data.board[randomSpot].isHit === false &&
          !playerInfo.shots.includes((item) => item.index)
        ) {
          fireAway(board, randomSpot);
          pass = false;
          return {
            thisMove: randomSpot,
            nextMove: findNextMove(board, randomSpot),
          };
        } else {
          randomSpot = Math.floor(Math.random() * 100);
        }
      }
    }
  };

  return {
    playerInfo,
    fireAway,
    findNextMove,
    roboPlay,
  };
};

export default Player;
