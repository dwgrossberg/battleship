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

  describe("basic Gameboard methods", () => {
    const testBoard = Gameboard("test1");
    const carrier = Ship("carrier", 5);
    const battleship = Ship("battleship", 4);
    const destroyer = Ship("destroyer", 3);
    const submarine = Ship("submarine", 2);
    const patrolBoat = Ship("patrol-boat", 1);
    test("Gameboard data object logs player namer correctly", () => {
      expect(testBoard.data.player).toBe("test1");
    });
    test("Gameboard is an array 100 spaces long", () => {
      expect(testBoard.data.board.length).toBe(100);
    });
    test("Gameboard can place horizontal ships at specific coords", () => {
      testBoard.placeShip(patrolBoat, 0);
      expect(testBoard.data.board[0].hasShip).toBe(true);
      testBoard.placeShip(carrier, 33);
      expect(testBoard.data.board[33].hasShip).toBe(true);
      expect(testBoard.data.board[34].hasShip).toBe(true);
      expect(testBoard.data.board[35].hasShip).toBe(true);
      expect(testBoard.data.board[36].hasShip).toBe(true);
      expect(testBoard.data.board[37].hasShip).toBe(true);
    });
    test("Gameboard will not span horizontal ships across the board edges", () => {
      testBoard.placeShip(carrier, 8);
      expect(testBoard.data.board[8].hasShip).toBe(false);
      expect(testBoard.data.board[9].hasShip).toBe(false);
      testBoard.placeShip(submarine, 19);
      expect(testBoard.data.board[19].hasShip).toBe(false);
      expect(testBoard.data.board[20].hasShip).toBe(false);
    });
    test("Gameboard can place vertical ships at specific coords", () => {
      destroyer.changeAxis("vertical");
      battleship.changeAxis("vertical");
      submarine.changeAxis("vertical");
      testBoard.placeShip(destroyer, 62);
      expect(testBoard.data.board[62].hasShip).toBe(true);
      expect(testBoard.data.board[72].hasShip).toBe(true);
      expect(testBoard.data.board[82].hasShip).toBe(true);
      testBoard.placeShip(battleship, 44);
      expect(testBoard.data.board[44].hasShip).toBe(true);
      expect(testBoard.data.board[54].hasShip).toBe(true);
      expect(testBoard.data.board[64].hasShip).toBe(true);
      expect(testBoard.data.board[74].hasShip).toBe(true);
      testBoard.placeShip(submarine, 80);
      expect(testBoard.data.board[80].hasShip).toBe(true);
      expect(testBoard.data.board[90].hasShip).toBe(true);
      testBoard.placeShip(patrolBoat, 98);
      expect(testBoard.data.board[98].hasShip).toBe(true);
    });
    test("Gameboard will not span vertical ships across the bottom edge", () => {
      testBoard.placeShip(destroyer, 83);
      expect(testBoard.data.board[83].hasShip).toBe(false);
      expect(testBoard.data.board[93].hasShip).toBe(false);
      testBoard.placeShip(battleship, 79);
      expect(testBoard.data.board[79].hasShip).toBe(false);
      expect(testBoard.data.board[89].hasShip).toBe(false);
      expect(testBoard.data.board[99].hasShip).toBe(false);
      testBoard.placeShip(submarine, 91);
      expect(testBoard.data.board[91].hasShip).toBe(false);
    });
    test("Gameboard will not place a Ship in a space with another Ship already there", () => {
      testBoard.placeShip(patrolBoat, 54);
      expect(testBoard.data.board[54].shipName).toBe("battleship");
    });
  });
  describe("advanced Gameboard methods", () => {
    const testBoard = Gameboard("test2");
    const carrier = Ship("carrier", 5);
    const battleship = Ship("battleship", 4);
    const destroyer = Ship("destroyer", 3);
    const submarine = Ship("submarine", 2);
    const patrolBoat = Ship("patrol-boat", 1);
    testBoard.randomlyPlace(
      patrolBoat,
      submarine,
      destroyer,
      battleship,
      carrier
    );
    test("Gameboard randomlyPlace will trigger changeAxis for at least one Ship, but not all", () => {
      expect([
        patrolBoat.vertical,
        submarine.vertical,
        destroyer.vertical,
        battleship.vertical,
        carrier.vertical,
      ]).toContain(true);
    });
    test("Gameboard can randomlyPlace all Ships", () => {
      console.log(carrier, battleship, destroyer, submarine, patrolBoat);
      expect(carrier.position.length).toBe(5);
      expect(battleship.position.length).toBe(4);
      expect(destroyer.position.length).toBe(3);
      expect(submarine.position.length).toBe(2);
      expect(patrolBoat.position.length).toBe(1);
    });
  });
});
