import Header from "./components/header/header";
import GaragePage from "./components/garage/garage-page";
import WinnersPage from "./components/winners/winners-page";
import BaseComponent from "./components/base-component";
import { createCar, saveWinner } from "./api";
import globalState from "./shared/table-data";

const colors = "0123456789ABCDEF";
const names = [
  "Mercedes",
  "Toyota",
  "Porsche",
  "BMW",
  "Kamaz",
  "Ferrari",
  "Audi",
  "Volvo",
  "Bugatti",
  "Niisan",
];
const ends = [
  "Benz",
  "M8",
  "C-Max",
  "F8",
  "488",
  "911",
  "Cherokee",
  "Qashqai",
  "350-ZX",
  "Classic",
];

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
    const garage = this.garage.Table;
    const { cars } = garage;
    garage.carsCheckIdentity();
    const promises = [];
    for (let i = 0; i < cars.length; i += 1) {
      if (cars[i].isAnimated) {
        return;
      }
      promises.push(cars[i].startEngine());
    }
    globalState.isRace = true;
    const winner = await this.raceAll(
      promises,
      globalState.cars.map((car) => car.id)
    );
    this.handleEndRace(winner);
  }

  async raceAll(
    promises: Promise<{ success: string; id: number; time: number }>[],
    ids: number[]
  ): Promise<{ id: number; name: string; time: number }> {
    if (ids.length === 0) {
      return {
        id: 0,
        name: "no Winner",
        time: 0,
      };
    }
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
    const result = globalState.cars.find((car) => car.id === id);
    return {
      id: result.id,
      name: result.name,
      time: +(time / 1000).toFixed(2),
    };
  }

  handleReset = () => {
    if (globalState.isRace) {
      return;
    }
    this.garage.Table.carsCheckIdentity();
    const promises: Promise<void>[] = [];
    for (let i = 0; i < this.garage.Table.cars.length; i += 1) {
      promises.push(this.garage.Table.cars[i].stopEngine());
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
    const element = new BaseComponent("div", ["victory-letter"]);
    element.element.innerHTML = `
        <img src="../images/victory-pepega.gif" alt="gif">
        <h3>Winner is ${winner.name} with time:${winner.time}</h3>
`;
    this.garage.Menu.element.after(element.element);
    globalState.isRace = false;
    setTimeout(() => element.element.remove(), 5000);
    if (winner.id !== 0) {
      saveWinner(winner.id, winner.time).then(() =>
        this.winners.getWinnersPage()
      );
    }
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
    this.checkWinnersIdentity();
    this.winners.updateCounter();
    this.clearMain();
    this.main.element.append(this.winners.element);
    this.header.Container.Nav.goToPage("winners");
  }

  checkWinnersIdentity() {
    const winners = this.winners.Table.Winners;
    if (globalState.winners.length !== winners.length) {
      const toDelete: number[] = [];
      for (let i = 0; i < winners.length; i += 1) {
        if (
          !globalState.winners.find(
            (item: { id?: number }) => item.id === winners[i].id
          )
        ) {
          toDelete.push(winners[i].id);
        }
      }
      for (let j = 0; j < toDelete.length; j += 1) {
        const index = winners.findIndex((item) => item.id === toDelete[j]);
        winners[index].element.remove();
        winners.splice(index, 1);
      }
    }
  }

  clearMain() {
    this.main.element.innerHTML = "";
  }

  changeHandler() {
    const num = document.getElementById("change-invisible").innerText;
    if (num === "0") {
      return;
    }
    this.garage.Menu.buttons[0].updateCar(Number(num)).then(() => {
      this.garage.getCarsPage().then(() => this.winners.getWinnersPage());
    });
  }
}
export default App;
