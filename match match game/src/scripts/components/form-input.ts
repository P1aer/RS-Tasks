import BaseComponent from "./base-component";
import Input from "./input";

class FormInput extends BaseComponent {
  readonly input: Input;

  constructor(
    label: string,
    styles: string[],
    id: string,
    type: string,
    require = false,
    placeholder = "",
    value = "",
    fstyle: string[]
  ) {
    super("div", fstyle);
    this.input = new Input(styles, id, type, require, placeholder, value);
    this.element.innerHTML = ` <label for="${id}">${label}</label><br>`;
    this.element.appendChild(this.input.element);
  }
}

export default FormInput;
