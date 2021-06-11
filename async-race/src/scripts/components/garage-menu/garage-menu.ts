import BaseComponent from "../base-component";
import "./garage-menu.scss";
import BtnContainer from "../button-container/btn-container";

class GarageMenu extends BaseComponent {
  readonly buttons: BtnContainer[];

  constructor() {
    super("div", ["garage-menu"]);
    this.element.innerHTML = `
    <button id="generate"> Generate</button>
    <button id="reset"> reset</button>
    <button class="race-btn">RACE</button>
    `;
    this.buttons = [
      new BtnContainer("Change Car", "change"),
      new BtnContainer("Create Car", "create"),
    ];
    this.buttons.forEach((btn) => this.element.prepend(btn.element));
  }
}

export default GarageMenu;
