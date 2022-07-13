const Ship = (name, length) => {
  return {
    name: name,
    length: length,
    vertical: false,
    hits: Array(length).fill(null),
    position: [],
    changeAxis(direction) {
      if (direction === "vertical") {
        this.vertical = true;
      } else if (direction === "horizontal") {
        this.vertical = false;
      }
    },
    hit(position) {
      const index = this.position.indexOf(position);
      this.hits[index] = "hit";
    },
    isSunk() {
      return this.hits.every((position) => (position === "hit" ? true : false));
    },
  };
};

export default Ship;
