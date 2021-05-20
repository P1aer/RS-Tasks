import "../styles/style.scss";

import "./database";
import best from "./best";
import game from "./components/game";
import { App } from "./app";

window.onload = () => {
  new App(document.body).buildFirstPage();
};
