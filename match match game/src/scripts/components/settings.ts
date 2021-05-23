import { BaseComponent } from "./base-component";
import { FormInput } from "./form-input";
import globalState from "../../shared/services/globalState";

export class Settings extends BaseComponent {
  private readonly inputs: FormInput[];

  constructor() {
    super("div", ["settings-container"]);
    this.inputs = [
      new FormInput("show time", [], "set-show", "range", false, "", "5", [
        "setting-input",
      ]),
      new FormInput("delay time", [], "set-delay", "range", false, "", "0.5", [
        "setting-input",
      ]),
      new FormInput("size of field", [], "set-size", "range", false, "", "4", [
        "setting-input",
      ]),
      new FormInput("type of cards", [], "set-type", "range", false, "", "0", [
        "setting-input",
      ]),
      new FormInput("game time", [], "set-time", "range", false, "", "60", [
        "setting-input",
      ]),
    ];
    this.inputs.forEach((input) => this.element.appendChild(input.element));
  }

  initInputs() {
    const showInput = <HTMLInputElement>this.inputs[0].input.element;
    const delayInput = <HTMLInputElement>this.inputs[1].input.element;
    const sizeInput = <HTMLInputElement>this.inputs[2].input.element;
    const typeInput = <HTMLInputElement>this.inputs[3].input.element;
    const timeInput = <HTMLInputElement>this.inputs[4].input.element;
    showInput.min = "2";
    showInput.max = "20";
    delayInput.min = "0.1";
    delayInput.max = "2";
    delayInput.step = "0.1";
    sizeInput.min = "4";
    sizeInput.step = "2";
    sizeInput.max = "8";
    typeInput.min = "0";
    typeInput.max = "1";
    timeInput.min = "30";
    timeInput.max = "180";
    timeInput.step = "10";
    showInput.addEventListener("change", (ev) => {
      globalState.settings.SHOW_TIME = Number(
        (<HTMLInputElement>ev.target).value
      );
    });
    delayInput.addEventListener("change", (ev) => {
      globalState.settings.FLIP_DELAY = Number(
        (<HTMLInputElement>ev.target).value
      );
    });
    sizeInput.addEventListener("change", (ev) => {
      globalState.settings.number =
        Number((<HTMLInputElement>ev.target).value) ** 2 / 2;
    });
    typeInput.addEventListener("change", (ev) => {
      globalState.settings.type = Number((<HTMLInputElement>ev.target).value);
    });
    timeInput.addEventListener("change", (ev) => {
      globalState.settings.time = Number((<HTMLInputElement>ev.target).value);
    });
  }
}
