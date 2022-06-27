const Ship = () => {
  const ships = [
    {
      type: "carrier",
      length: 5,
      damage: [null, null, null, null, null],
      sunk: false,
    },
    {
      type: "battleship",
      length: 4,
      damage: [null, null, null, null],
      sunk: false,
    },
    {
      type: "destroyer",
      length: 3,
      damage: [null, null, null],
      sunk: false,
    },
    {
      type: "submarine",
      length: 2,
      damage: [null, null],
      sunk: false,
    },
    {
      type: "patrol boat",
      length: 1,
      damage: [null],
      sunk: false,
    },
  ];

  const hit = (type, num) => {
    return (ships.filter((x) => x.type === type)[0].damage[num] = "hit");
  };

  return {
    ships,
    hit,
  };
};

export default Ship;

Ship();
