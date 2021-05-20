import { BaseComponent } from "./base-component";

export class Input extends BaseComponent {
  constructor(
    styles: string[],
    id: string,
    type: string,
    require = false,
    placeholder = "",
    value = ""
  ) {
    super("input", styles);
    this.element.id = id;
    (<HTMLInputElement>this.element).type = type;
    (<HTMLInputElement>this.element).placeholder = placeholder;
    (<HTMLInputElement>this.element).value = value;
    if (require) {
      (<HTMLInputElement>this.element).required = true;
      if (type !== "email")
        (<HTMLInputElement>this.element).pattern = "[A-Za-zА-Яа-яЁё]+";
      (<HTMLInputElement>this.element).maxLength = 30;
    }
  }

  cleanInput() {
    (<HTMLInputElement>this.element).value = "";
  }
}
