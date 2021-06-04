import Header from "./components/header/header";
import GaragePage from "./components/garage/garage-page";
import WinnersPage from "./components/winners/winners-page";
import BaseComponent from "./components/base-component";
import { getCars, getWinners } from "./api";

class App {
  private readonly header: Header;

  private garage: GaragePage;

  private readonly winners: WinnersPage;

  private readonly main: BaseComponent;

  constructor() {
    this.header = new Header();
    this.main = new BaseComponent("main", ["main"]);
    getCars(1, 7).then((resolve) => {
      this.garage = new GaragePage(resolve.count);
      this.goToGarage();
    });
    this.winners = new WinnersPage();
    document.body.append(this.header.element);
    document.body.append(this.main.element);

    this.initListeners();
  }

  initListeners() {
    this.header.Container.Nav.Garage.element.addEventListener("click", () =>
      this.goToGarage()
    );
    this.header.Container.Nav.Winners.element.addEventListener("click", () =>
      this.goToWinners()
    );
  }

  goToGarage() {
    this.clearMain();
    this.main.element.append(this.garage.element);
    this.header.Container.Nav.goToPage("garage");
  }

  goToWinners() {
    this.clearMain();
    this.main.element.append(this.winners.element);
    this.header.Container.Nav.goToPage("winners");
  }

  clearMain() {
    this.main.element.innerHTML = "";
  }
}
export default App;
