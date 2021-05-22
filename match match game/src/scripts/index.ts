import "../styles/style.scss";

import "./database";
import { App } from "./app";

window.onload = () => {
  new App(document.body).buildFirstPage();
};
