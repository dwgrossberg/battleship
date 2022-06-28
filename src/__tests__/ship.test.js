/* eslint-disable no-undef */
import Ship from "../scripts/factories/ship";

describe("Ship Factory", () => {
  const testShip1 = Ship("abc", 5);
  describe("type", () => {
    test("happy path", () => {
      expect(Ship);
    });
    test("returns an object", () => {
      expect(typeof testShip1).toBe("object");
    });
  });

  describe("properties", () => {
    test("ship name", () => {
      expect(testShip1.type.name).toBe("abc");
    });
    test("ship length", () => {
      expect(testShip1.type.length).toBe(5);
    });
    test("ship hits array corresponds to ship length", () => {
      expect(testShip1.type.hits).toEqual([]);
    });
  });
});
