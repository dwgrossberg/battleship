import favicon from "../assets/favicon.ico";
import "../styles/index.scss";
import gameController from "./modules/gameControl.js";

document.querySelector('[type="image/x-icon"]').href = favicon;

console.log(favicon);

gameController.startGame("player 1");
