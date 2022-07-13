/* eslint-disable no-undef */
import Ship from "../ship";
import Gameboard from "../gameboard";

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
    test("Ship name matches input name", () => {
      expect(testShip1.name).toBe("a");
    });
    test("Ship length matches input length", () => {
      expect(testShip1.length).toBe(5);
    });
    test("Ship hits array is empty at initialization & corresponds to ship length", () => {
      expect(testShip1.hits).toEqual([null, null, null, null, null]);
    });
  });

  describe("methods", () => {
    test("changeAxis function correctly updates Ship vertical property", () => {
      testShip1.changeAxis("vertical");
      expect(testShip1.vertical).toBe(true);
    });
    test("Ship hit function logs to hits array", () => {
      testShip1.hit(2);
      expect(testShip1.hits).toEqual([null, null, "hit", null, null]);
    });
    test("Ship hit function removes index from position array", () => {
      const gameboard = Gameboard("test");
      gameboard.placeShip(testShip1, 10);
      testShip1.hit(2, 30);
      console.log(testShip1.position);
      expect(testShip1.position).toEqual([10, 20, 40, 50]);
    });
    test("isSunk function correctly identifies when Ship hits array is full", () => {
      testShip1.hit(0);
      testShip1.hit(1);
      testShip1.hit(2);
      testShip1.hit(3);
      testShip1.hit(4);
      expect(testShip1.isSunk()).toBe(true);
    });
    test("isSunk function does not incorrectly log true when Ship hits array is not full", () => {
      testShip2.hit(0);
      testShip2.hit(2);
      expect(testShip2.isSunk()).toBe(false);
    });
  });
});
