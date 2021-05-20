import { BaseComponent } from "./base-component";
import { FormContainer } from "./form-container";

export class Form extends BaseComponent {
  readonly container: FormContainer;

  constructor() {
    super("form", ["challenger-form"]);
    this.container = new FormContainer();
    this.element.appendChild(this.container.element);
  }
}
