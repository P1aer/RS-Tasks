import globalState from "../../shared/services/globalState";
import { BaseComponent } from "./base-component";
import { Card } from "./card";
import { CardField } from "./card-field";
import { delay } from "../../shared/delay";
import { TimerContainer } from "./timer-container";
import { Form } from "./form";

export class Game extends BaseComponent {
  private scoreData = {
    total: 0,
    mistakes: 0,
    left: globalState.settings.number,
    time: 0,
    score: 0,
  };

  private countdownfunc;

  private readonly resultForm: Form;

  private readonly cardsField;

  private activeCard?: Card;

  private timerContainer: TimerContainer;

  private isAnimation = false;

  get ResultForm() {
    return this.resultForm;
  }

  get Score() {
    return this.scoreData.score;
  }

  constructor() {
    super();
    this.resultForm = new Form(["challenger-form", "result-form-container"]);
    this.resultForm.container.createBtns();
    this.resultForm.container.addBtn(["result-btn"], "OK", "score-btn");
    this.timerContainer = new TimerContainer();
    this.cardsField = new CardField();
    this.element.appendChild(this.timerContainer.element);
    this.element.appendChild(this.cardsField.element);
  }

  InitGame(images: string[]) {
    this.cleanGame();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    cards.forEach((card) =>
      card.element.addEventListener("click", () => this.cardHandler(card))
    );
    this.cardsField.addCards(cards);
    this.setShowTimer();
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
    }
    this.activeCard = undefined;
    this.isAnimation = false;
    if (this.scoreData.left === 0) {
      this.stopTimer();
      this.endGame();
    }
  }

  cleanGame() {
    this.scoreData.left = globalState.settings.number;
    this.scoreData.total = 0;
    this.scoreData.mistakes = 0;
    this.scoreData.time = 0;
    this.cardsField.clear();
    this.stopTimer();
    clearTimeout(this.cardsField.timeout);
    this.resultForm.element.remove();
  }

  endGame() {
    const time = this.timerContainer.element.innerText.split(":");
    this.scoreData.time = Number(time[0]) * 60 + Number(time[1]);
    let score =
      (this.scoreData.total - this.scoreData.mistakes) * 100 -
      this.scoreData.time * 10;
    score = score <= 0 ? 0 : score;
    this.scoreData.score = score;
    this.giveFinalResult();
  }

  giveFinalResult() {
    this.resultForm.container.element.innerHTML = `
      <h2 class="result-h2">Game Over</h2>
        <div class="result-stats">
            <h3 class="result-h3"> Statistics</h3>
                <ul class="result-list">
                   <li class="result-stat-item">Comparisons: ${
                     this.scoreData.total
                   }</li>
                   <li class="result-stat-item">Hits: ${
                     globalState.settings.number - this.scoreData.left
                   }</li>
                   <li class="result-stat-item">Mistakes: ${
                     this.scoreData.mistakes
                   }</li>
                   <li class="result-stat-item">Time: ${
                     this.scoreData.time
                   }</li>
                   <li class="result-stat-item">Score: <span class="score-span">${
                     this.scoreData.score
                   }</span>
                   </li>
                </ul>
                <div class="result-btn-container">
                
            </div>
        </div>   
    `;
    const div = this.resultForm.container.element.querySelector(
      ".result-btn-container"
    );
    div.append(this.resultForm.container.Btns[0].element);
    this.element.append(this.resultForm.element);
  }

  handleMistake(card1, card2) {
    card2.element.classList.add("red-card");
    card1.element.classList.add("red-card");
    this.scoreData.mistakes += 1;
    this.scoreData.total += 1;
  }

  handleHit(card1, card2) {
    card1.element.classList.add("green-card");
    card2.element.classList.add("green-card");
    this.scoreData.total += 1;
    this.scoreData.left -= 1;
  }

  setShowTimer() {
    const timer = this.timerContainer.timer.element;
    timer.innerText = ` 0 : ${globalState.settings.SHOW_TIME}`;
    let from = new Date().getTime() + globalState.settings.SHOW_TIME * 1000;

    this.countdownfunc = setInterval(() => {
      const now = new Date().getTime();
      const distance = Math.abs(from - now);
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.round((distance % (1000 * 60)) / 1000);
      timer.innerText = `${minutes} : ${seconds}`;
      if (distance <= 0) {
        from = new Date().getTime();
      }
      if (distance >= globalState.settings.time * 1000) {
        this.stopTimer();
        this.endGame();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.countdownfunc);
  }
}
