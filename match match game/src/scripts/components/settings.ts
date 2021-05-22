import { BaseComponent } from "./base-component";
import { FormInput } from "./form-input";
import globalState from "../../shared/services/globalState";

export class Settings extends BaseComponent {
  private readonly inputs: FormInput[];

  constructor() {
    super("div", ["settings-container"]);
    this.inputs = [
      new FormInput("show time", [], "set-show", "range", false, "", "2", [
        "setting-input",
      ]),
    ];
    this.inputs.forEach((input) => this.element.appendChild(input.element));
  }

  initInputs() {
    this.inputs[0].element.addEventListener("change", (ev) => {
      globalState.settings.SHOW_TIME = Number(
        (<HTMLInputElement>ev.target).value
      );
      console.log(globalState.settings.SHOW_TIME);
    });
  }
}
