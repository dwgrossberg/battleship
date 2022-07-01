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
    const battleship = Ship("battleship", 4);
    const destroyer = Ship("destroyer", 3);
    const submarine = Ship("submarine", 2);
    const patrolBoat = Ship("patrol-boat", 1);
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
      board1.placeShip(carrier, 8);
      expect(board1.data.board[8].hasShip).toBe(false);
      expect(board1.data.board[9].hasShip).toBe(false);
      board1.placeShip(submarine, 19);
      expect(board1.data.board[19].hasShip).toBe(false);
      expect(board1.data.board[20].hasShip).toBe(false);
    });
    test("Gameboard can place vertical ships at specific coords", () => {
      destroyer.changeAxis("vertical");
      battleship.changeAxis("vertical");
      board1.placeShip(destroyer, 62);
      expect(board1.data.board[62].hasShip).toBe(true);
      expect(board1.data.board[72].hasShip).toBe(true);
      expect(board1.data.board[82].hasShip).toBe(true);
      board1.placeShip(battleship, 44);
      expect(board1.data.board[44].hasShip).toBe(true);
      expect(board1.data.board[54].hasShip).toBe(true);
      expect(board1.data.board[64].hasShip).toBe(true);
      expect(board1.data.board[74].hasShip).toBe(true);
    });
    test("Gameboard will not span vertical ships across the bottom edge", () => {
      board1.placeShip(destroyer, 83);
      expect(board1.data.board[83].hasShip).toBe(false);
      expect(board1.data.board[93].hasShip).toBe(false);
      board1.placeShip(battleship, 79);
      expect(board1.data.board[79].hasShip).toBe(false);
      expect(board1.data.board[89].hasShip).toBe(false);
      expect(board1.data.board[99].hasShip).toBe(false);
    });
    test("Gameboard will not place a Ship in a space with another Ship already there", () => {
      board1.placeShip(patrolBoat, 54);
    });
  });
});
