/* eslint-disable no-undef */
import Gameboard from "../scripts/factories/gameboard";
import Ship from "../scripts/factories/ship";

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
    const carrier = Ship("carrier", 5);
    test("Gameboard data object logs player namer correctly", () => {
      expect(board1.data.player).toBe("test");
    });
    test("Gameboard is an array 100 spaces long", () => {
      board1.initBoard();
      expect(board1.data.board.length).toBe(100);
    });
    test("Gameboard can place horizontal ships at specific coords", () => {
      board1.placeShip(carrier, 33);
      expect(board1.data.board[33].hasShip).toBe(true);
      expect(board1.data.board[34].hasShip).toBe(true);
      expect(board1.data.board[35].hasShip).toBe(true);
      expect(board1.data.board[36].hasShip).toBe(true);
      expect(board1.data.board[37].hasShip).toBe(true);
    });
    test("Gameboard will not span horizontal ships across the board edges", () => {
      board1.placeShip(carrier, 87);
      expect(board1.data.board[8].hasShip).toBe(false);
      expect(board1.data.board[9].hasShip).toBe(false);
    });
  });
});
