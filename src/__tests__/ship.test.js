/* eslint-disable no-undef */
import Ship from "../scripts/factories/ship";

describe("Ship Factory", () => {
  const testShip1 = Ship("a", 5);
  const testShip2 = Ship("b", 3);
  describe("type", () => {
    test("happy path", () => {
      expect(Ship);
    });
    test("returns an object", () => {
      expect(typeof testShip1).toBe("object");
    });
  });

  describe("properties", () => {
    test("ship name matches input name", () => {
      expect(testShip1.name).toBe("a");
    });
    test("ship length matches input length", () => {
      expect(testShip1.length).toBe(5);
    });
    test("ship hits array is empty at initialization", () => {
      expect(testShip1.hits).toEqual([null, null, null, null, null]);
    });
  });

  describe("methods", () => {
    test("ship hit function logs to hits array", () => {
      testShip1.hit(2);
      expect(testShip1.hits).toEqual([null, null, "hit", null, null]);
    });
    test("ship isSunk function correctly identifies when hits array is full", () => {
      testShip1.hit(0);
      testShip1.hit(1);
      testShip1.hit(2);
      testShip1.hit(3);
      testShip1.hit(4);
      expect(testShip1.isSunk()).toBe(true);
    });
    test("ship isSunk function does not incorrectly log true when hits array is not full", () => {
      testShip2.hit(0);
      testShip2.hit(2);
      expect(testShip2.isSunk()).toBe(false);
    });
  });
});
