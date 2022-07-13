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
    const gameboard = Gameboard("test");
    const carrier = Ship("c", 5);
    const testShip3 = Ship("d", 4);
    testShip3.changeAxis("vertical");
    gameboard.placeShip(carrier, 10);
    gameboard.placeShip(testShip3, 30);
    test("changeAxis function correctly updates Ship vertical property", () => {
      testShip1.changeAxis("vertical");
      expect(testShip1.vertical).toBe(true);
    });
    test("Ship hit function logs to hits array", () => {
      carrier.hit(12);
      expect(carrier.hits).toEqual([null, null, "hit", null, null]);
    });
    test("isSunk function correctly identifies when Ship hits array is full", () => {
      testShip3.hit(30);
      testShip3.hit(40);
      testShip3.hit(50);
      testShip3.hit(60);
      expect(testShip3.isSunk()).toBe(true);
    });
    test("isSunk function does not incorrectly log true when Ship hits array is not full", () => {
      testShip2.hit(0);
      testShip2.hit(2);
      expect(testShip2.isSunk()).toBe(false);
    });
  });
});
