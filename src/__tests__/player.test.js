/* eslint-disable no-undef */
import Player from "../scripts/factories/player";

describe("Player Factory", () => {
  const playerA = Player("a");
  describe("type", () => {
    test("happy path", () => {
      expect(Player);
    });
    test("returns an Object", () => {
      expect(typeof playerA).toBe("object");
    });
  });
  describe("Player methods", () => {});
});
