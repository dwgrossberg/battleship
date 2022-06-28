const Ship = (name, length) => {
  return {
    name: name,
    length: length,
    hits: Array.from(Array(length).keys()).fill(null, 0),
    hit(num) {
      this.hits[num] = "hit";
    },
    isSunk() {
      return this.hits.every((position) => (position === "hit" ? true : false));
    },
  };
};

export default Ship;
