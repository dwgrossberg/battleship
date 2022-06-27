const Ship = () => {
  const ships = [
    {
      type: "carrier",
      length: 5,
      hits: [null, null, null, null, null],
    },
    {
      type: "battleship",
      length: 4,
      hits: [null, null, null, null],
    },
    {
      type: "destroyer",
      length: 3,
      hits: [null, null, null],
    },
    {
      type: "submarine",
      length: 2,
      hits: [null, null],
    },
    {
      type: "patrol boat",
      length: 1,
      hits: [null],
    },
  ];

  return {
    ships,
    // length,
  };
};

export default Ship;
