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
  let nextMoves = [];
  const findNextMove = (board, num) => {
    // Remove num from nextMoves array to avoid duplication
    nextMoves.splice(nextMoves.indexOf(num), 1);
    if (board.data.board[num].hasShip === true) {
      nextMoves = [];
      // Protect roboPlayer from making out-of-bound moves
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

  const roboPlay = (board, nextMove) => {
    let randomSpot = Math.floor(Math.random() * 100);
    if (nextMove && nextMove.length > 0) {
      const nextBestMove =
        nextMove[Math.floor(Math.random() * nextMove.length)];
      fireAway(board, nextBestMove);
      console.log(nextMove, nextBestMove);
      return {
        thisMove: nextBestMove,
        nextMove: findNextMove(board, nextBestMove),
      };
    } else {
      let pass = true;
      while (pass) {
        if (
          board.data.board[randomSpot] &&
          board.data.board[randomSpot].isHit === false &&
          !playerInfo.shots.includes((item) => item.index === randomSpot)
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
