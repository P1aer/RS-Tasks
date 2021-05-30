import BaseComponent from "./base-component";
import Card from "./card";
import globalState from "../../shared/services/globalState";

class CardField extends BaseComponent {
  timeout;

  private isShowed = true;

  private cards: Card[] = [];

  get IsShowed() {
    return this.isShowed;
  }

  constructor() {
    super("div", ["card-field"]);
  }

  clear() {
    this.isShowed = true;
    this.cards = [];
    this.element.innerHTML = "";
  }

  addCards = (cards: Card[]) => {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    this.timeout = setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
      this.isShowed = false;
    }, globalState.settings.SHOW_TIME * 1000);
  };
}

export default CardField;
