/* eslint-disable no-undef */
import Gameboard from "../gameboard";
import Ship from "../ship";

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
    const carrier2 = Ship("carrier2", 5);
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
    test("Player factory automatically creates a new fleet on start", () => {
      expect(testBoard.data.ships.length).toBe(5);
      expect(testBoard.data.ships[1].name).toBe("battleship");
      expect(testBoard.data.ships[2].name).toBe("destroyer");
      expect(testBoard.data.ships[3].name).toBe("submarine");
      expect(testBoard.data.ships[4].name).toBe("patrol-boat");
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
      testBoard.placeShip(submarine, 86);
      expect(testBoard.data.board[86].hasShip).toBe(true);
      expect(testBoard.data.board[96].hasShip).toBe(true);
      testBoard.placeShip(patrolBoat, 98);
      expect(testBoard.data.board[98].hasShip).toBe(true);
    });
    test("Gameboard will not span vertical ships across the bottom edge", () => {
      carrier2.changeAxis("vertical");
      testBoard.placeShip(carrier2, 60);
      expect(testBoard.data.board[60].hasShip).toBe(false);
      expect(testBoard.data.board[70].hasShip).toBe(false);
      expect(testBoard.data.board[80].hasShip).toBe(false);
      expect(testBoard.data.board[90].hasShip).toBe(false);
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
      carrier2.changeAxis("horizontal");
      testBoard.placeShip(patrolBoat, 54);
      expect(testBoard.data.board[54].shipType).toBe(battleship);
      testBoard.placeShip(carrier2, 52);
      expect(testBoard.data.board[54].shipType).toBe(battleship);
    });
  });
  describe("advanced Gameboard methods", () => {
    const testBoard = Gameboard("test2");
    const carrier = Ship("carrier", 5);
    const battleship = Ship("battleship", 4);
    const destroyer = Ship("destroyer", 3);
    const submarine = Ship("submarine", 2);
    const patrolBoat = Ship("patrol-boat", 1);
    testBoard.randomlyPlace([
      patrolBoat,
      submarine,
      destroyer,
      battleship,
      carrier,
    ]);
    test("Gameboard randomlyPlace will trigger changeAxis for at least one Ship, but not all", () => {
      expect([
        patrolBoat.vertical,
        submarine.vertical,
        destroyer.vertical,
        battleship.vertical,
        carrier.vertical,
      ]).toContain(true);
      expect([
        patrolBoat.vertical,
        submarine.vertical,
        destroyer.vertical,
        battleship.vertical,
        carrier.vertical,
      ]).toContain(false);
    });
    test("Gameboard can randomlyPlace all Ships", () => {
      expect(carrier.position.length).toBe(5);
      expect(battleship.position.length).toBe(4);
      expect(destroyer.position.length).toBe(3);
      expect(submarine.position.length).toBe(2);
      expect(patrolBoat.position.length).toBe(1);
    });
    test("Gameboard randomlyPlace function does not overlap Ships", () => {
      expect(
        testBoard.data.board.filter((cell) => cell.hasShip === true).length
      ).toBe(15);
    });
    const testBoard2 = Gameboard("shots fired");
    const testShip = Ship("test", 5);
    const testShip2 = Ship("test", 3);
    test("Gameboard receiveAttack function correctly logs hits to Ships", () => {
      testBoard2.placeShip(testShip, 33);
      testBoard2.receiveAttack(35);
      expect(testShip.hits[2]).toBe("hit");
      expect(testBoard2.data.missedShots.length).toBe(0);
    });
    test("Gameboard receiveAttack function correctly logs misses to the missedShots array", () => {
      testBoard2.placeShip(testShip2, 50);
      testBoard2.receiveAttack(2);
      expect(testShip2.hits).not.toContain("hit");
      expect(testBoard2.data.missedShots.length).toBe(1);
      expect(testBoard2.data.missedShots).toContain(2);
    });
    const testBoard3 = Gameboard("sunk");
    const sunkShip = Ship("sinker", 3);
    test("Gameboard can verify whether or not all Ships have been sunk", () => {
      expect(testBoard3.allSunk()).toBe(true);
      sunkShip.changeAxis("vertical");
      testBoard3.placeShip(sunkShip, 33);
      expect(testBoard3.allSunk()).toBe(false);
      testBoard3.receiveAttack(33);
      expect(testBoard3.allSunk()).toBe(false);
      testBoard3.receiveAttack(43);
      expect(testBoard3.allSunk()).toBe(false);
      testBoard3.receiveAttack(53);
      expect(testBoard3.allSunk()).toBe(true);
    });
    test("Gameboard can remove all Ships from the board", () => {
      const testBoard3 = Gameboard("one more");
      testBoard3.randomlyPlace(testBoard3.data.ships);
      testBoard3.removeAllShips();
      console.log(testBoard3.data.ships);
      expect(
        testBoard3.data.ships.forEach((ship) => ship.position.length === 0)
      ).toBe(true);
    });
  });
});
