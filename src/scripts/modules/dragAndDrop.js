import displayController from "./displayControl";

const dragAndDrop = (() => {
  const checkbox = document.getElementById("players");
  const playerOneInfo = document.getElementsByClassName("player-one")[0];
  const playerTwoInfo = document.getElementsByClassName("player-two")[0];
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

  const run = (game) => {
    let vertical = false;
    const boardOne = game.humanBoard.data.board;
    const boardTwo = game.roboBoard.data.board;

    shipsDOM.style.display = "flex";

    shipsArray.forEach((ship) => (ship.style.display = ""));

    // Remove any ships already on the board
    if (checkbox.checked === false) {
      displayController.removeBoard(boardOneDOM);
      game.humanBoard.removeAllShips();
      displayController.renderBoard(boardOne, boardOneDOM);
    } else if (checkbox.checked === true) {
      if (boardOneDOM.style.display === "") {
        displayController.removeBoard(boardOneDOM);
        game.humanBoard.removeAllShips();
        displayController.renderBoard(boardOne, boardOneDOM);
      } else if (boardTwoDOM.style.display === "") {
        displayController.removeBoard(boardTwoDOM);
        game.roboBoard.removeAllShips();
        displayController.renderBoard(boardTwo, boardTwoDOM);
      }
    }

    const verticalShips = () => {
      shipsDOM.style.flexDirection = "row";
      shipsArray.forEach((ship) => {
        ship.style.flexDirection = "column";
        ship.dataset.vertical = "true";
      });
      vertical = true;
    };

    const horizontalShips = () => {
      shipsDOM.style.flexDirection = "";
      shipsArray.forEach((ship) => {
        ship.style.flexDirection = "";
        ship.dataset.vertical = "false";
      });
      vertical = false;
    };

    changeDirections.addEventListener("mousedown", () => {
      console.log(vertical);

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
        const index = e.target.dataset.index;
        let board;
        let ship;
        if (e.target.classList[1] === "board-one") {
          board = game.humanBoard;
          board.data.ships.forEach((boat) => {
            if (boat.name === dragged.id) {
              ship = boat;
            }
          });
          if (dragged.dataset.vertical === "true") {
            ship.vertical = true;
          }
          board.placeShip(ship, Number(index));
          displayController.removeBoard(boardOneDOM);
          displayController.renderBoard(boardOne, boardOneDOM);
          document.getElementById("player-one-ships-left").innerText =
            Number(document.getElementById("player-one-ships-left").innerText) +
            1;
          dragged.style.display = "none";
        } else {
          board = game.roboBoard;
          board.data.ships.forEach((boat) => {
            if (boat.name === dragged.id) {
              ship = boat;
            }
          });
        }

        // Test board at given index before placing the actual Ship
      })
    );
  };

  return {
    run,
  };
})();

export default dragAndDrop;
