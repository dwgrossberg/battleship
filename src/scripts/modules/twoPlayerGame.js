const twoPlayerGame = (() => {
  let turn = true;
  const playerOneName = document.getElementById("player-one-name-input");
  const playerTwoName = document.getElementById("player-two-name-input");

  const runGame = () => {
    if (turn) {
      playerOneName.style.outline = "2px solid #e2c08c";
    } else {
      playerOneName.style.outline = "";
      playerTwoName.style.outline = "2px solid #e2c08c";
    }
  };

  return {
    runGame,
  };
})();

export default twoPlayerGame;
