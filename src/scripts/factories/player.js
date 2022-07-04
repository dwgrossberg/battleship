const Player = (name) => {
  const playerInfo = {
    name: name,
    gameboard: [],
    shots: [],
  };

  const fireAway = (gameboard, num) => {
    return gameboard.receiveAttack(num)
      ? playerInfo.shots.push({ index: num, shot: "hit" })
      : playerInfo.shots.push({ index: num, shot: "miss" });
  };

  const roboPlay = () => {};

  return {
    playerInfo,
    fireAway,
    roboPlay,
  };
};

export default Player;
