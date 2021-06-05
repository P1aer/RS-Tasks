import BaseComponent from "../base-component";
import "./garage-table.scss";
import GaragePlace from "../garage-place/garage-place";

class GarageTable extends BaseComponent {
  private places: GaragePlace[];

  constructor() {
    super("div", ["garage-pages"]);
    this.places = [];
  }

  clearPlaces() {
    this.places = [];
  }

  addPlace(car: { id: number; color: string; name: string }) {
    this.places.push(new GaragePlace(car));
  }

  createTable() {
    console.log(this.places);
    this.places.forEach((place) => this.element.append(place.element));
  }
}

export default GarageTable;
