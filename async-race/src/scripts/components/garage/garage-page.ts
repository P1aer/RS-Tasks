import BaseComponent from "../base-component";
import "./garage.scss";
import GarageMenu from "../garage-menu/garage-menu";
import { getCars } from "../../api";
import GarageTable from "../garage-table/garage-table";
import GarageFooter from "../garage-footer/garage-footer";

class GaragePage extends BaseComponent {
  private readonly menu: GarageMenu;

  private currentPage: number;

  private readonly table: GarageTable;

  private footer: GarageFooter;

  get Menu() {
    return this.menu;
  }

  constructor() {
    super("div", ["garage-section"]);
    this.menu = new GarageMenu();
    this.table = new GarageTable();
    this.footer = new GarageFooter();
    this.currentPage = 1;
    this.element.innerHTML = `<h3 class="garage-h3"></h3>`;
    this.element.prepend(this.menu.element);
    this.element.append(this.table.element);
    this.element.append(this.footer.element);
    this.getCarsPage();
    this.footer.element
      .querySelector(".footer-prev-btn")
      .addEventListener("click", () => this.handlePrevBtn());
    this.footer.element
      .querySelector(".footer-next-btn")
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
    this.table.element.innerHTML = "";
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
