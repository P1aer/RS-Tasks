import { BaseComponent } from "./base-component";
import { FormContainer } from "./form-container";

export class Form extends BaseComponent {
  readonly container: FormContainer;

  constructor(styles: string[]) {
    super("form", styles);
    this.container = new FormContainer();
    this.element.appendChild(this.container.element);
  }
}
