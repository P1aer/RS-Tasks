import BaseComponent from "../base-component";
import "./garage.scss";
import GarageMenu from "../garage-menu/garage-menu";
import { getCars } from "../../api";
import GarageTable from "../garage-table/garage-table";

class GaragePage extends BaseComponent {
  private readonly menu: GarageMenu;

  private readonly currentPage: number;

  private readonly table: GarageTable;

  constructor(num: string) {
    super("div", ["garage-section"]);
    this.menu = new GarageMenu();
    this.table = new GarageTable();
    this.currentPage = 1;
    this.element.innerHTML = `<h3 class="garage-h3">Garage currently serving: ${num}</h3>`;
    this.element.prepend(this.menu.element);
    this.element.append(this.table.element);
    this.getCarsPage();
  }

  getCarsPage() {
    this.table.clearPlaces();
    const res = getCars(this.currentPage);
    res.then((resolve) => {
      this.element.querySelector(".garage-h3").innerHTML = `
      Garage currently serving: ${resolve.count}`;
      resolve.items.forEach(
        (item: { id: number; color: string; name: string }) =>
          this.table.addPlace(item)
      );
      this.table.createTable();
    });
  }
}

export default GaragePage;
