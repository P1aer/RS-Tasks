import globalState from "../../shared/services/globalState";
import { BaseComponent } from "./base-component";
import { Card } from "./card";
import { CardField } from "./card-field";
import { delay } from "../../shared/delay";
import { TimerContainer } from "./timer-container";

/* 
Расчет очков игрока должен производиться по следующей формуле: 
(количество сравнений - количество ошибочных сравнений) * 100 
- (время прошедшее с начала в секундах) * 10. При этом количество очков не должно быть меньше 0. 
*/
export class Game extends BaseComponent {
  private scoreData = {
    total: 0,
    mistakes: 0,
    left: globalState.settings.number,
    time: 0,
  };

  private readonly cardsField = new CardField();

  private activeCard?: Card;

  private timer: TimerContainer;

  private isAnimation = false;

  constructor() {
    super();
    this.timer = new TimerContainer();
    this.cardsField = new CardField();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.cardsField.element);
  }

  InitGame(images: string[]) {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    cards.forEach((card) =>
      card.element.addEventListener("click", () => this.cardHandler(card))
    );
    this.cardsField.addCards(cards);
    this.timer.timer.setShowTimer();
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      this.handleMistake(this.activeCard, card);
      await delay(globalState.settings.FLIP_DELAY * 1000);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.activeCard.element.classList.remove("red-card");
      card.element.classList.remove("red-card");
    } else {
      this.handleHit(this.activeCard, card);
      // очки или анимация
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  handleMistake(card1, card2) {
    card2.element.classList.add("red-card");
    card1.element.classList.add("red-card");
    this.scoreData.mistakes += 1;
    this.scoreData.total += 1;
    console.log(this.scoreData);
  }

  handleHit(card1, card2) {
    card1.element.classList.add("green-card");
    card2.element.classList.add("green-card");
    this.scoreData.total += 1;
    this.scoreData.left -= 1;
    console.log(this.scoreData);
  }
}
