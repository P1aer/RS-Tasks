import BaseComponent from "../base-component";
import "./garage-table.scss";
import GaragePlace from "../garage-place/garage-place";
import { garageTable, garageTableCheck } from "../../shared/table-data";

class GarageTable extends BaseComponent {
  constructor() {
    super("div", ["garage-pages"]);
  }

  addPlace(car: { id: number; color: string; name: string }) {
    // уточнить тут
    garageTableCheck();
    if (garageTable.length < 7) {
      garageTable.push(new GaragePlace(car));
      this.element.append(garageTable[garageTable.length - 1].element);
    }
  }
}

export default GarageTable;
