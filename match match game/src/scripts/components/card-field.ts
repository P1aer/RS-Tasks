import { BaseComponent } from "./base-component";
import { Card } from "./card";
import globalState from "../../shared/services/globalState";

export class CardField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super("div", ["card-field"]);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = "";
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, globalState.settings.SHOW_TIME * 1000);
  }
}
