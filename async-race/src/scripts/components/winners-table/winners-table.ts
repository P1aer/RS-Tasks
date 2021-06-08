import BaseComponent from "../base-component";
import "./winners-table.scss";
import WinnersPlace from "../winners-place/winners-place";
import { winnersTable } from "../../shared/table-data";

class WinnersTable extends BaseComponent {
  constructor() {
    super("div", ["winners-table"]);
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
    if (winnersTable.length < 10) {
      winnersTable.push(
        new WinnersPlace(
          winnersTable.length + 1,
          newCar.time,
          newCar.wins,
          newCar.car
        )
      );
      this.element.append(winnersTable[winnersTable.length - 1].element);
    }
  }
}

export default WinnersTable;
