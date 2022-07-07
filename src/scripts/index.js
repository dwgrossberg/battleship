import favicon from "../assets/favicon.ico";
import githubIcon from "../assets/gitHubIconWhite.png";
import "../styles/index.scss";
import gameController from "./modules/gameControl.js";

document.querySelector('[type="image/x-icon"]').href = favicon;
document.getElementById("github-icon").src = githubIcon;

gameController.startGame("player 1");
