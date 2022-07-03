import shipData from "../helpers/ship-data";
import Ship from "./ship";

const Player = (name) => {
  const playerInfo = {
    name: name,
    ships: [],
  };

  shipData.forEach((item) =>
    playerInfo.ships.push(Ship(item.name, item.length))
  );

  return {
    playerInfo,
  };
};

export default Player;
