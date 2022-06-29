const Ship = (name, length) => {
  return {
    name: name,
    length: length,
    vertical: false,
    hits: Array(length).fill(null),
    hit(num) {
      this.hits[num] = "hit";
    },
    isSunk() {
      return this.hits.every((position) => (position === "hit" ? true : false));
    },
  };
};

export default Ship;
