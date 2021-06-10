import BaseComponent from "../base-component";
import "./garage.scss";
import GarageMenu from "../garage-menu/garage-menu";
import { getCars } from "../../api";
import GarageTable from "../garage-table/garage-table";
import PageFooter from "../page-footer/page-footer";
import { garageTableClear } from "../../shared/table-data";

class GaragePage extends BaseComponent {
  private readonly menu: GarageMenu;

  private currentPage: number;

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
    this.currentPage = 1;
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
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage -= 1;
    this.getCarsPage();
    this.footer.updatePage(this.currentPage);
  }

  handleNextBtn() {
    this.currentPage += 1;
    this.getCarsPage();
    this.footer.updatePage(this.currentPage);
  }

  getCarsPage() {
    garageTableClear();
    const res = getCars(this.currentPage);
    res.then((resolve) => {
      this.element.querySelector(
        ".garage-count"
      ).innerHTML = `${resolve.count}`;
      resolve.items.forEach(
        (item: { id: number; color: string; name: string }) =>
          this.table.addPlace(item)
      );
    });
  }

  addCarsOnPage(car: { id: number; color: string; name: string }) {
    const counter = this.element.querySelector(".garage-count");
    const cars = Number(counter.innerHTML) + 1;
    counter.innerHTML = `${cars}`;
    this.table.addPlace(car);
  }

}

export default GaragePage;
