import { BaseComponent } from "./base-component";
import { Input } from "./input";

export class FormInput extends BaseComponent {
  readonly input: Input;

  constructor(
    label: string,
    styles: string[],
    id: string,
    type: string,
    require = false,
    placeholder = "",
    value = ""
  ) {
    super("div", ["form-input"]);
    this.input = new Input(styles, id, type, require, placeholder, value);
    this.element.innerHTML = ` <label for="${id}">${label}</label><br>`;
    this.element.appendChild(this.input.element);
  }
}
