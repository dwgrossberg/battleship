const Ship = () => {
  const ships = [
    {
      type: "carrier",
      length: 5,
      damage: [null, null, null, null, null],
      sunk: false,
      hit(num) {
        return (this.damage[num] = "hit");
      },
    },
    {
      type: "battleship",
      length: 4,
      damage: [null, null, null, null],
      sunk: false,
      hit(num) {
        return (this.damage[num] = "hit");
      },
    },
    {
      type: "destroyer",
      length: 3,
      damage: [null, null, null],
      sunk: false,
      hit(num) {
        return (this.damage[num] = "hit");
      },
    },
    {
      type: "submarine",
      length: 2,
      damage: [null, null],
      sunk: false,
      hit(num) {
        return (this.damage[num] = "hit");
      },
    },
    {
      type: "patrol boat",
      length: 1,
      damage: [null],
      sunk: false,
      hit(num) {
        return (this.damage[num] = "hit");
      },
    },
  ];

  return {
    ships,
  };
};

export default Ship;

Ship();
