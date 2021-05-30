import BaseComponent from "./base-component";
import FormInput from "./form-input";
import globalState from "../../shared/services/globalState";
import Output from "./output";

class Settings extends BaseComponent {
  private readonly inputs: FormInput[];

  private readonly outputs: Output[];

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
    this.outputs = [
      new Output("5", "out-show"),
      new Output("0.5", "out-delay"),
      new Output("4 x 4", "out-size"),
      new Output("pokemon", "out-type"),
      new Output("60", "out-time"),
    ];
    this.inputs.forEach((input) => this.element.appendChild(input.element));
    for (let i = 0; i < this.outputs.length; i += 1) {
      this.inputs[i].element.append(this.outputs[i].element);
    }
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
    showInput.addEventListener("input", (ev) => {
      globalState.settings.SHOW_TIME = Number(
        (<HTMLInputElement>ev.target).value
      );
      (<HTMLOutputElement>(
        this.outputs[0].element
      )).value = `${globalState.settings.SHOW_TIME}`;
    });
    delayInput.addEventListener("input", (ev) => {
      globalState.settings.FLIP_DELAY = Number(
        (<HTMLInputElement>ev.target).value
      );
      (<HTMLOutputElement>(
        this.outputs[1].element
      )).value = `${globalState.settings.FLIP_DELAY}`;
    });
    sizeInput.addEventListener("input", (ev) => {
      globalState.settings.number =
        Number((<HTMLInputElement>ev.target).value) ** 2 / 2;
      this.changeCardSize(globalState.settings.number);
      (<HTMLOutputElement>this.outputs[2].element).value = `${
        (<HTMLInputElement>ev.target).value
      } x ${(<HTMLInputElement>ev.target).value}`;
    });
    typeInput.addEventListener("input", (ev) => {
      globalState.settings.type = Number((<HTMLInputElement>ev.target).value);
      (<HTMLOutputElement>this.outputs[3].element).value = this.defineType(
        globalState.settings.type
      );
    });
    timeInput.addEventListener("input", (ev) => {
      globalState.settings.time = Number((<HTMLInputElement>ev.target).value);
      (<HTMLOutputElement>(
        this.outputs[4].element
      )).value = `${globalState.settings.time}`;
    });
  }

  defineType = (type: number) => {
    switch (type) {
      case 0:
        return "pokemon";
      case 1:
        return "kanji";
      default:
        return "pokemon";
    }
  };

  changeCardSize = (size: number) => {
    let tempSize;
    let tempSpace;
    switch (size) {
      case 8:
        tempSize = "10rem";
        tempSpace = "22%";
        break;
      case 18:
        tempSize = "6rem";
        tempSpace = "14%";
        break;
      case 32:
        tempSize = "4.5rem";
        tempSpace = "10%";
        break;
      default:
        tempSize = "10rem";
        tempSpace = "22%";
        break;
    }
    document.documentElement.style.setProperty("--cardSpace", tempSpace);
    document.documentElement.style.setProperty("--cardSize", tempSize);
  };
}

export default Settings;
