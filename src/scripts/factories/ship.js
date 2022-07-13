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
    hit(index, position) {
      this.position.splice(this.position.indexOf(position), 1);
      this.hits[index] = "hit";
    },
    isSunk() {
      return this.hits.every((position) => (position === "hit" ? true : false));
    },
  };
};

export default Ship;
