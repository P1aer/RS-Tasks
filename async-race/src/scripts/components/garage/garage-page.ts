import BaseComponent from "../base-component";
import "./garage.scss";
import GarageMenu from "../garage-menu/garage-menu";
import { getCars } from "../../api";
import GarageTable from "../garage-table/garage-table";
import PageFooter from "../page-footer/page-footer";
import globalState from "../../shared/table-data";

class GaragePage extends BaseComponent {
  private readonly menu: GarageMenu;

  private readonly table: GarageTable;

  private footer: PageFooter;

  get Menu() {
    return this.menu;
  }

  get Table() {
    return this.table;
  }

  constructor() {
    super("div", ["garage-section"]);
    this.menu = new GarageMenu();
    this.table = new GarageTable();
    this.footer = new PageFooter("garage");
    this.element.innerHTML = `<h3 class="garage-h3">Garage currently serving: <span class="garage-count" id="garage-count"></span></h3>`;
    this.element.prepend(this.menu.element);
    this.element.append(this.table.element);
    this.element.append(this.footer.element);
    this.getCarsPage();
    this.footer.element
      .querySelector(".garage-footer-prev-btn")
      .addEventListener("click", () => this.handlePrevBtn());
    this.footer.element
      .querySelector(".garage-footer-next-btn")
      .addEventListener("click", () => this.handleNextBtn());
  }

  handlePrevBtn() {
    if (globalState.carsPage === 1) {
      return;
    }
    globalState.carsPage -= 1;
    this.getCarsPage().then(() => this.footer.updatePage(globalState.carsPage));
  }

  handleNextBtn() {
    globalState.carsPage += 1;
    this.getCarsPage().then(() => this.footer.updatePage(globalState.carsPage));
  }

  async getCarsPage() {
    this.table.clearPlaces();
    const { items, count } = await getCars(globalState.carsPage);
    globalState.carsCount = Number(count);
    globalState.cars = items;
    this.element.querySelector(
      ".garage-count"
    ).innerHTML = `${globalState.carsCount}`;
    this.table.getFullPage();
  }

  addCarsOnPage(car: { id: number; color: string; name: string }) {
    const counter = this.element.querySelector(".garage-count");
    globalState.carsCount += 1;
    counter.innerHTML = `${globalState.carsCount}`;
    this.table.addPlaceOnPage(car);
  }
}

export default GaragePage;
