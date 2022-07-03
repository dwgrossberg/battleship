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
  describe("Player methods", () => {
    test("Player factory automatically creates a new fleet on start", () => {
      expect(playerA.playerInfo.ships.length).toBe(5);
      expect(playerA.playerInfo.ships[0].name).toBe("carrier");
      expect(playerA.playerInfo.ships[2].name).toBe("destroyer");
    });
  });
});
