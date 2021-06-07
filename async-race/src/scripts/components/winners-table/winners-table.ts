import BaseComponent from "../base-component";
import "./winners-table.scss";
import WinnersPlace from "../winners-place/winners-place";

class WinnersTable extends BaseComponent {
  private places: WinnersPlace[];

  constructor() {
    super("div", ["winners-table"]);
    this.places = [];
    this.element.innerHTML = `
        <div class="table-head">
          <h3 class="table-head-elem table-number">Number</h3>
          <h3 class="table-head-elem table-car">Car</h3>
          <h3 class="table-head-elem table-name">Name</h3>
          <h3 class="table-head-elem table-wins">Wins</h3>
          <h3 class="table-head-elem table-time">Best time</h3>
        </div>
    `;
  }

  addTablePlace(newCar: {
    time: number;
    wins: number;
    car: { id: number; name: string; color: string };
  }) {
    if (this.places.length < 10) {
      const info = { name: newCar.car.name, color: newCar.car.color };
      this.places.push(
        new WinnersPlace(this.places.length + 1, newCar.time, newCar.wins, info)
      );
      this.element.append(this.places[this.places.length - 1].element);
    }
  }

  cleanTablePlaces() {
    this.places.forEach((item) => item.element.remove())
    this.places = [];
  }
}

export default WinnersTable;
