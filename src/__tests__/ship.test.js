/* eslint-disable no-undef */
import Ship from "../scripts/ship";

// jest.mock("../scripts/ship");

describe("Ship Factory", () => {
  describe("type", () => {
    it("happy path", () => {
      expect(Ship);
    });
    it("returns an object", () => {
      expect(typeof Ship()).toBe("object");
    });
  });

  describe("properties", () => {
    it("contains the correct number of ships", () => {
      expect(Ship().ships.length).toBe(5);
    });
    it.each(Ship().ships)(
      "each ship contains a hits array that corresponds to its length: $length",
      ({ length, damage }) => {
        expect(damage.length).toBe(length);
      }
    );
    it.each(Ship().ships)(
      "each ship contains a sunk property that returns false by default",
      ({ sunk }) => {
        expect(sunk).toBe(false);
      }
    );
  });

  describe("methods", () => {
    const testShip = Ship();
    it.each(testShip.ships)("each ship contains a hit function", () => {
      expect(testShip.ships.forEach((ship) => ship.hit()));
    });
    testShip.ships.forEach((ship) => ship.hit(0));
    it("test ship hit", () => {
      expect(testShip.ships[0].damage).toContain("hit");
    });

    it.each(testShip.ships)(
      "each ship contains a hit function that takes a number and marks that position as 'hit'",
      ({ damage }) => {
        expect(damage).toContain("hit");
      }
    );
  });
});
