import BaseComponent from "../base-component";
import "./winners-table.scss";
import WinnersPlace from "../winners-place/winners-place";
import globalState from "../../shared/table-data";

class WinnersTable extends BaseComponent {
  private items: WinnersPlace[];

  get Winners() {
    return this.items;
  }

  constructor() {
    super("div", ["winners-table"]);
    this.items = [];
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

  getFullPage() {
    this.clearPlaces();
    globalState.winners.forEach(
      (winner: {
        id: number;
        wins: number;
        time: number;
        car: { id: number; color: string; name: string };
      }) => {
        const elementWinner = new WinnersPlace(
          winner.id,
          winner.time,
          winner.wins,
          winner.car
        );
        this.items.push(elementWinner);
        this.element.append(this.items[this.items.length - 1].element);
      }
    );
  }

  clearPlaces() {
    this.items.forEach((item) => item.element.remove());
    this.items = [];
  }
}

export default WinnersTable;
