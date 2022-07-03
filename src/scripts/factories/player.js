import shipData from "../helpers/ship-data";
import Ship from "./ship";

const Player = (name) => {
  const playerInfo = {
    name: name,
    ships: [],
  };

  const newFleet = () => {
    console.log(shipData);
    shipData.forEach((item) => {
      console.log(item);
      playerInfo.ships.push(Ship(item.name, item.length));
    });
  };

  newFleet();

  return {
    playerInfo,
  };
};

export default Player;
