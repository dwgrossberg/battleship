/* eslint-disable no-undef */
import Player from "../player";
import Gameboard from "../gameboard";

describe("Player Factory", () => {
  const playerA = Player("a");
  const testBoardA = Gameboard(playerA);
  const playerB = Player("b");
  const testBoardB = Gameboard(playerB);
  testBoardA.randomlyPlace(testBoardA.data.ships);
  testBoardB.randomlyPlace(testBoardB.data.ships);

  describe("type", () => {
    test("happy path", () => {
      expect(Player);
    });
    test("returns an Object", () => {
      expect(typeof playerA).toBe("object");
    });
  });
  describe("Player methods", () => {
    test("players can attack each other's boards", () => {
      playerA.fireAway(testBoardB, 38);
      expect(playerA.playerInfo.shots.length).toBe(1);
      testBoardB.data.board[38].hasShip === true
        ? expect(playerA.playerInfo.shots).toContainEqual({
            index: 38,
            shot: "hit",
          })
        : expect(playerA.playerInfo.shots).toContainEqual({
            index: 38,
            shot: "miss",
          });
    });
    test("roboPlayer can make a legal random move", () => {
      playerB.roboPlay(testBoardA);
      expect(playerB.playerInfo.shots.length).toBe(1);
      console.log(playerB.playerInfo.shots);
    });
    const ace = Player("ace");
    const testBoardC = Gameboard(ace);
    testBoardC.placeShip(testBoardC.data.ships[0], 50);
    testBoardC.data.ships[1].changeAxis("vertical");
    testBoardC.placeShip(testBoardC.data.ships[1], 3);
    test("roboPlayer returns a logical next-step move when it hits a Ship", () => {
      expect(ace.roboPlay(testBoardC, [51])).toStrictEqual({
        nextMove: [50, 52],
        thisMove: 51,
      });
      expect(ace.roboPlay(testBoardC, [13])).toStrictEqual({
        nextMove: [3, 23],
        thisMove: 13,
      });
    });
    test("roboPlayer will not try to shoot outside the bounds of the Gameboard array", () => {
      expect(ace.roboPlay(testBoardC, [50])).toStrictEqual({
        nextMove: [51],
        thisMove: 50,
      });
      expect(ace.roboPlay(testBoardC, [3])).toStrictEqual({
        nextMove: [13],
        thisMove: 3,
      });
    });
  });
});
