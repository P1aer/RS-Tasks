import BaseComponent from "./base-component";

class Input extends BaseComponent {
  private validity: boolean;

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
    this.validity = false;
    (<HTMLInputElement>this.element).type = type;
    (<HTMLInputElement>this.element).placeholder = placeholder;
    (<HTMLInputElement>this.element).value = value;
    if (require) {
      (<HTMLInputElement>this.element).required = true;
      if (id !== "fmail") {
        (<HTMLInputElement>this.element).pattern =
          "[^ ~ ! @ # $ % * () _ — + = | : ; \" ' ` < > , . ? / ^ 0-9]+";
        (<HTMLInputElement>this.element).maxLength = 30;
      } else if (id === "fmail") {
        console.log(this.element);
      }
    }
  }

  cleanInput() {
    (<HTMLInputElement>this.element).value = "";
  }

  onInput() {
    const regex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
    const ans = regex.test((<HTMLInputElement>this.element).value);
    if (ans) {
      this.element.classList.add("valid");
      this.validity = true;
    } else {
      this.element.classList.remove("valid");
      this.validity = false;
    }
  }
}

export default Input;
