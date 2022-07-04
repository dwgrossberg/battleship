/* eslint-disable no-undef */
import Player from "../scripts/factories/player";
import Gameboard from "../scripts/factories/gameboard";

describe("Player Factory", () => {
  const testBoardA = Gameboard("testA");
  const playerA = Player("a");
  const testBoardB = Gameboard("testB");
  const playerB = Player("b");
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
    });
  });
});
