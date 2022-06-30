const Ship = (name, length) => {
  return {
    name: name,
    length: length,
    vertical: false,
    hits: Array(length).fill(null),
    changeAxis(direction) {
      if (direction === "vertical") {
        this.vertical = true;
      } else if (direction === "horizontal") {
        this.vertical = false;
      }
    },
    hit(num) {
      this.hits[num] = "hit";
    },
    isSunk() {
      return this.hits.every((position) => (position === "hit" ? true : false));
    },
  };
};

export default Ship;
