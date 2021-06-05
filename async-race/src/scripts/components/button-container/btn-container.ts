import BaseComponent from "../base-component";
import "./btn-container.scss";
import { createCar, updateCar } from "../../api";

class BtnContainer extends BaseComponent {
  private readonly inputText: BaseComponent;

  private readonly inputColor: BaseComponent;

  get ColorInput() {
    return this.inputColor.element;
  }

  get TextInput() {
    return this.inputText.element;
  }

  constructor(button: string, id: string) {
    super("div", ["btn-container"]);
    this.inputText = new BaseComponent("input");
    this.inputColor = new BaseComponent("input");
    (<HTMLInputElement>this.inputText.element).type = "text";
    (<HTMLInputElement>this.inputText.element).id = `${id}-input`;
    (<HTMLInputElement>this.inputColor.element).type = "color";
    (<HTMLInputElement>this.inputColor.element).id = `${id}-color`;
    this.element.innerHTML = `
          <button class="menu-${id}-btn" id="${id}-btn">${button}</button>
             <div class="input-container">
            </div>   
     `;
    this.element
      .querySelector(".input-container")
      .append(this.inputText.element);
    this.element
      .querySelector(".input-container")
      .append(this.inputColor.element);
/*    this.element
      .querySelector(`#${id}-btn`)
      .addEventListener("click", () => this.createCar());*/
  }

  createCar() {
    const name = (<HTMLInputElement>this.inputText.element).value;
    if (name === "") {
      console.log("Empty name");
      return;
    }
    const color = (<HTMLInputElement>this.inputColor.element).value;
    createCar({ name, color }).then((res) => console.log(res, `created`));
  }

  updateCar(id: number){
    const name = (<HTMLInputElement>this.inputText.element).value;
    if (name === "") {
      console.log("Empty name");
      return;
    }
    const color = (<HTMLInputElement>this.inputColor.element).value;
    updateCar(id, { name, color }).then((r) => console.log(r, `created`));
  }
}

export default BtnContainer;
