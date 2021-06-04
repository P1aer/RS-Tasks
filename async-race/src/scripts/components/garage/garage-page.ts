import BaseComponent from "../base-component";
import "./garage.scss";
import GarageMenu from "../garage-menu/garage-menu";
import { getCars } from "../../api";

class GaragePage extends BaseComponent {
  private readonly menu: GarageMenu;

  private readonly currentPage: number;

  constructor(num: string) {
    super("div", ["garage-section"]);
    this.menu = new GarageMenu();
    this.currentPage = 1;
    this.element.innerHTML = `Garage currently serving: ${num}`;
    this.element.prepend(this.menu.element);
    this.getCarsPage();
  }

  getCarsPage() {
    const res = getCars(this.currentPage);
    res.then((resolve) =>
      resolve.items.forEach((val: object) => console.log(val))
    );
  }
}

export default GaragePage;
