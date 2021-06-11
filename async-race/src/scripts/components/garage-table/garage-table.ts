import BaseComponent from "../base-component";
import "./garage-table.scss";
import GaragePlace from "../garage-place/garage-place";
import globalState from "../../shared/table-data";

class GarageTable extends BaseComponent {
  cars: GaragePlace[];

  constructor() {
    super("div", ["garage-pages"]);
    this.cars = [];
  }

  getFullPage() {
    this.clearPlaces();
    globalState.cars.forEach(
      (car: { id: number; color: string; name: string }) => {
        this.cars.push(new GaragePlace(car));
        this.element.append(this.cars[this.cars.length - 1].element);
      }
    );
  }

  addPlaceOnPage(car: { id: number; color: string; name: string }) {
    this.carsCheckIdentity();
    const { length } = Object.keys(globalState.cars);
    if (length < 7) {
      globalState.cars.push(car);
      this.cars.push(new GaragePlace(car));
      this.element.append(this.cars[this.cars.length - 1].element);
    }
  }

  carsCheckIdentity() {
    const finded = this.cars.filter((car) => car.ID === 0);
    for (let i = 0; i < finded.length; i += 1) {
      const index = this.cars.findIndex((car) => car.ID === 0);
      this.cars.splice(index, 1);
    }
  }

  clearPlaces() {
    this.cars.forEach((car) => car.element.remove());
    this.cars.splice(0, this.cars.length);
  }
}

export default GarageTable;
