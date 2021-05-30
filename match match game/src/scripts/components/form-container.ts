import BaseComponent from "./base-component";
import FormInput from "./form-input";
import Button from "./button";
import Input from "./input";

class FormContainer extends BaseComponent {
  private formInputs?: FormInput[];

  private inputs?: Input[];

  private buttons?: Button[];

  get Buttons() {
    return this.buttons;
  }

  get Inputs() {
    return this.formInputs;
  }

  get SipleInputs() {
    return this.inputs;
  }

  constructor() {
    super("div", ["form-container"]);
  }

  createInputs() {
    this.formInputs = [];
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

  createButtons() {
    this.buttons = [];
  }

  addBtn(style: string[], text: string, id: string) {
    this.buttons.push(new Button(style, text, id));
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
    this.formInputs.push(
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

export default FormContainer;
