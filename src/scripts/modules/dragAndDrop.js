import displayController from "./displayControl";

const dragAndDrop = (() => {
  const checkbox = document.getElementById("players");
  const boardOneDOM = document.getElementById("board-one");
  const boardTwoDOM = document.getElementById("board-two");
  const shipsDOM = document.getElementById("ships");
  const carrier = document.getElementById("carrier");
  const battleship = document.getElementById("battleship");
  const destroyer = document.getElementById("destroyer");
  const submarine = document.getElementById("submarine");
  const patrolBoat = document.getElementById("patrol-boat");
  const changeDirections = document.getElementById("change-directions");
  const targets = [boardOneDOM, boardTwoDOM];
  const shipsArray = [carrier, battleship, destroyer, submarine, patrolBoat];
  let vertical = false;

  const run = (game) => {
    const boardOne = game.humanBoard.data.board;
    const boardTwo = game.roboBoard.data.board;

    shipsDOM.style.display = "flex";

    // Remove any ships already on the board
    if (checkbox.checked === false) {
      displayController.removeBoard(boardOneDOM);
      game.humanBoard.removeAllShips();
      displayController.renderBoard(boardOne, boardOneDOM);
    } else if (checkbox.checked === true) {
      displayController.removeBoard(boardOneDOM);
      game.humanBoard.removeAllShips();
      displayController.renderBoard(boardOne, boardOneDOM);
      displayController.removeBoard(boardTwoDOM);
      game.roboBoard.removeAllShips();
      displayController.renderBoard(boardTwo, boardTwoDOM);
    }
    const verticalShips = () => {
      shipsDOM.style.flexDirection = "row";
      shipsArray.forEach((ship) => {
        ship.style.flexDirection = "column";
      });
      vertical = true;
    };

    const horizontalShips = () => {
      shipsDOM.style.flexDirection = "";
      shipsArray.forEach((ship) => {
        ship.style.flexDirection = "";
      });
      vertical = false;
    };

    changeDirections.addEventListener("mousedown", () => {
      vertical === false ? verticalShips() : horizontalShips();
    });

    let dragged = null;
    shipsArray.forEach((ship) =>
      ship.addEventListener("dragstart", (e) => {
        dragged = e.target;
      })
    );
    targets.forEach((target) =>
      target.addEventListener("dragover", (e) => {
        e.preventDefault();
      })
    );
    targets.forEach((target) =>
      target.addEventListener("drop", (e) => {
        console.log(e.target);
      })
    );
  };

  return {
    run,
  };
})();

export default dragAndDrop;
