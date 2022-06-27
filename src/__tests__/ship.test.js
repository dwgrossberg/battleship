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
      ({ length, hits }) => {
        expect(hits.length).toBe(length);
      }
    );
  });
});
