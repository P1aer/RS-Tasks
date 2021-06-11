import App from "./app";
import "../styles/main.scss";

window.onload = () => {
  const app = new App();
  app.initListeners();
};
