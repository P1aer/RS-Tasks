import Header from "./components/header/header";
import GaragePage from "./components/garage/garage-page";
import WinnersPage from "./components/winners/winners-page";
import BaseComponent from "./components/base-component";
import { createCar } from "./api";

const colors = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
const names = ["A", "B", "C", "D", "E", "F", "G", "K", "L", "M"];
const ends = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

class App {
  private readonly header: Header;

  private garage: GaragePage;

  private readonly winners: WinnersPage;

  private readonly main: BaseComponent;

  constructor() {
    this.header = new Header();
    this.main = new BaseComponent("main", ["main"]);
    this.garage = new GaragePage();
    this.winners = new WinnersPage();
    document.body.append(this.header.element);
    document.body.append(this.main.element);
    this.initListeners();
    this.goToGarage();
  }

  initListeners() {
    this.header.Container.Nav.Garage.element.addEventListener("click", () =>
      this.goToGarage()
    );
    this.header.Container.Nav.Winners.element.addEventListener("click", () =>
      this.goToWinners()
    );
    this.garage.Menu.element
      .querySelector("#generate")
      .addEventListener("click", () => this.generateCars());
    this.garage.Menu.element
      .querySelector("#create-btn")
      .addEventListener("click", () =>
        this.garage.Menu.buttons[1]
          .createCar()
          .then((res) => this.garage.addCarsOnPage(res))
      );
    this.garage.Menu.element
      .querySelector("#change-btn")
      .addEventListener("click", () => this.changeHandler());
  }

  generateCars() {
    for (let i = 0; i < 100; i += 1) {
      const newCar = this.getRandomCar();
      createCar(newCar).then((res) => this.garage.addCarsOnPage(res));
    }
  }

  getRandomCar = () => {
    let color = "#";
    for (let i = 0; i < 6; i += 1) {
      color += colors[Math.floor(colors.length * Math.random())];
    }
    const name = `${names[Math.floor(names.length * Math.random())]} ${
      ends[Math.floor(ends.length * Math.random())]
    }`;
    return {
      name,
      color,
    };
  };

  goToGarage() {
    this.clearMain();
    this.main.element.append(this.garage.element);
    this.header.Container.Nav.goToPage("garage");
  }

  goToWinners() {
    this.winners.updateCounter();
    this.clearMain();
    this.main.element.append(this.winners.element);
    this.header.Container.Nav.goToPage("winners");
  }

  clearMain() {
    this.main.element.innerHTML = "";
  }

  changeHandler() {
    const num = document.getElementById("change-invisible").innerText;
    if (num === "0") {
      return;
    }
    this.garage.Menu.buttons[0]
      .updateCar(Number(num))
      .then(() => this.garage.getCarsPage());
  }
}
export default App;
