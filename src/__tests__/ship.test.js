/* eslint-disable no-undef */
import Ship from "../scripts/ship";

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
    it.each(Ship().ships)(
      "each ship contains a hit function that takes a number and marks that position as 'hit'",
      ({ type, damage }) => {
        expect(Ship().hit(type, 0)).toBe(damage);
      }
    );
  });
});
