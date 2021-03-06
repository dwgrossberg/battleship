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
    hit(num) {
      const index = this.position.indexOf(Number(num));
      this.hits[index] = "hit";
    },
    isSunk() {
      return this.hits.every((position) => (position === "hit" ? true : false));
    },
    resetPosition() {
      return (this.position = []);
    },
    resetHits() {
      this.hits = Array(this.length).fill(null);
    },
  };
};

export default Ship;
