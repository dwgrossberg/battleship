/* eslint-disable no-undef */
import Gameboard from "../scripts/factories/gameboard";

describe("Gameboard Factory", () => {
  describe("type", () => {
    test("happy path", () => {
      expect(Gameboard);
    });
    test("returns an object", () => {
      expect(typeof Gameboard()).toBe("object");
    });
  });

  describe("basic Gameboard properties", () => {
    const board1 = Gameboard("test");
    test("Gameboard data object logs player namer correctly", () => {
      expect(board1.data.player).toBe("test");
    });
    test("Gameboard is 100 spaces long", () => {
      board1.initBoard();
      expect(board1.data.board.length).toBe(100);
    });
  });
});
