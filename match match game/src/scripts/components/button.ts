import { BaseComponent } from "./base-component";

export class Button extends BaseComponent {
  constructor(style: string[], text: string, id: string) {
    super("button", style);
    this.element.innerText = text;
    this.element.id = id;
  }
}
