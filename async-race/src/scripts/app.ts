import Header from "./components/header/header";
import GaragePage from "./components/garage/garage-page";
import WinnersPage from "./components/winners/winners-page";
import BaseComponent from "./components/base-component";
import { createCar, saveWinner } from "./api";
import {
  garageTable,
  garageTableCheck,
  globalState,
} from "./shared/table-data";

const colors = "0123456789ABCDEF";

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
    this.garage.Menu.element
      .querySelector("#reset")
      .addEventListener("click", () => this.handleReset());
    this.garage.Menu.element
      .querySelector(".race-btn")
      .addEventListener("click", () => this.race());
  }

  async race() {
    garageTableCheck();
    const promises = [];
    for (let i = 0; i < garageTable.length; i += 1) {
      if (garageTable[i].isAnimated) {
        return;
      }
      promises.push(garageTable[i].startEngine());
    }
    globalState.isRace = true;
    const winner = await this.raceAll(
      promises,
      garageTable.map((car) => car.ID)
    );
    this.handleEndRace(winner);
  }

  async raceAll(
    promises: Promise<{ success: string; id: number; time: number }>[],
    ids: number[]
  ): Promise<{ id: number; name: string; time: number }> {
    const { success, id, time } = await Promise.race(promises);
    if (!success) {
      const failedIndex = ids.findIndex((i) => i === id);
      const restPromises = [
        ...promises.slice(0, failedIndex),
        ...promises.slice(failedIndex + 1, promises.length),
      ];
      const restIds = [
        ...ids.slice(0, failedIndex),
        ...ids.slice(failedIndex + 1, ids.length),
      ];
      return this.raceAll(restPromises, restIds);
    }
    const result = garageTable.find((car) => car.ID === id);
    return {
      id: result.ID,
      name: result.name,
      time: +(time / 1000).toFixed(2),
    };
  }

  handleReset = () => {
    if (globalState.isRace) {
      return;
    }
    garageTableCheck();
    const promises: Promise<void>[] = [];
    for (let i = 0; i < garageTable.length; i += 1) {
      promises.push(garageTable[i].stopEngine());
    }
    Promise.all(promises);
  };

  generateCars() {
    for (let i = 0; i < 100; i += 1) {
      const newCar = this.getRandomCar();
      createCar(newCar).then((res) => this.garage.addCarsOnPage(res));
    }
  }

  handleEndRace = (winner: { name: string; id: number; time: number }) => {
    globalState.isRace = false;
    saveWinner(winner.id, winner.time).then(() =>
      this.winners.getWinnersPage()
    );
    console.log(winner.name);
  };

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
