import BaseComponent from "../base-component";
import "./garage-menu.scss";
import BtnContainer from "../button-container/btn-container";
import GarageTable from "../garage-table/garage-table";

class GarageMenu extends BaseComponent {
  private readonly buttons: BtnContainer[];

  private table: GarageTable;

  constructor() {
    super("div", ["garage-menu"]);
    this.element.innerHTML = `
    <button> Generate</button>
    <button> reset</button>
    <button class="race-btn">RACE</button>
    `;
    this.table = new GarageTable();
    this.buttons = [
      new BtnContainer("Change Car", "change"),
      new BtnContainer("Create Car", "create"),
    ];
    this.buttons.forEach((btn) => this.element.prepend(btn.element));
  }
}

export default GarageMenu;
