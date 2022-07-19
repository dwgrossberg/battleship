const dragAndDrop = (() => {
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

  const run = () => {
    shipsDOM.style.display = "flex";

    const verticalShips = () => {
      shipsDOM.style.flexDirection = "row";
      shipsArray.forEach((ship) => {
        ship.style.flexDirection = "column";
      });
      changeDirections.style.left = "20px";
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
