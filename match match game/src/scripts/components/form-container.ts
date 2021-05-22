import { BaseComponent } from "./base-component";
import { FormInput } from "./form-input";
import { Button } from "./button";
import { Input } from "./input";

export class FormContainer extends BaseComponent {
  private forminputs?: FormInput[];

  private inputs?: Input[];

  private btns?: Button[];

  get Btns() {
    return this.btns;
  }

  get Inputs() {
    return this.forminputs;
  }

  get SipleInputs() {
    return this.inputs;
  }

  constructor() {
    super("div", ["form-container"]);
  }

  createInputs() {
    this.forminputs = [];
  }

  createSimpleInput() {
    this.inputs = [];
  }

  addSimpleInput(
    styles: string[],
    id: string,
    type: string,
    require = false,
    placeholder = "",
    value = ""
  ) {
    this.inputs.push(new Input(styles, id, type, require, placeholder, value));
  }

  createBtns() {
    this.btns = [];
  }

  addBtn(style: string[], text: string, id: string) {
    this.btns.push(new Button(style, text, id));
  }

  addInput(
    label: string,
    styles: string[],
    id: string,
    type: string,
    require = false,
    placeholder = "",
    value = "",
    fstyle: string[]
  ) {
    this.forminputs.push(
      new FormInput(
        label,
        styles,
        id,
        type,
        require,
        placeholder,
        value,
        fstyle
      )
    );
  }
}
