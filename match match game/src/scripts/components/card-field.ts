import { BaseComponent } from "./base-component";
import { Card } from "./card";
import globalState from "../../shared/services/globalState";

export class CardField extends BaseComponent {
  timeout;

  private cards: Card[] = [];

  constructor() {
    super("div", ["card-field"]);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = "";
  }

  /// баги велком
  addCards = (cards: Card[]) => {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    this.timeout = setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, globalState.settings.SHOW_TIME * 1000);
  }
}
