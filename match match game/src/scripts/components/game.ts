import globalState from "../../shared/services/globalState";
import BaseComponent from "./base-component";
import Card from "./card";
import CardField from "./card-field";
import delay from "../../shared/delay";
import TimerContainer from "./timer-container";
import Form from "./form";

class Game extends BaseComponent {
  private scoreData = {
    total: 0,
    mistakes: 0,
    left: globalState.settings.number,
    time: 0,
    score: 0,
  };

  private countdown;

  private readonly resultForm: Form;

  private readonly cardsField: CardField;

  private activeCard?: Card;

  private timerContainer: TimerContainer;

  private isAnimation = false;

  isPaused = false;

  get ResultForm() {
    return this.resultForm;
  }

  get Field() {
    return this.cardsField;
  }

  get Score() {
    return this.scoreData.score;
  }

  constructor() {
    super();
    this.resultForm = new Form(["challenger-form", "result-form-container"]);
    this.resultForm.container.createButtons();
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

  cleanGame() {
    this.scoreData.left = globalState.settings.number;
    this.scoreData.total = 0;
    this.scoreData.mistakes = 0;
    this.scoreData.time = 0;
    this.cardsField.clear();
    this.stopTimer();
    clearTimeout(this.cardsField.timeout);
    this.resultForm.element.remove();
    this.isPaused = false;
    this.isAnimation = false;
    this.activeCard = undefined;
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped || this.isPaused) return;
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
    let from = globalState.settings.SHOW_TIME;

    this.countdown = setInterval(() => {
      from -= 1;
      timer.innerText = `0 : ${from}`;
      if (from <= 0) {
        clearInterval(this.countdown);
        this.setGameTimer();
      }
    }, 1000);
  }

  setGameTimer(time = 0) {
    const timer = this.timerContainer.timer.element;
    let from = time;
    this.countdown = setInterval(() => {
      from += 1;
      const minutes = Math.floor(from / 60);
      timer.innerText = `${minutes} : ${from}`;
      if (from >= globalState.settings.time) {
        clearInterval(this.countdown);
        this.endGame();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.countdown);
  }

  handlePauseClick(state: boolean, element) {
    if (state) {
      return;
    }
    const btn = element;
    if (!this.isPaused) {
      btn.innerText = "Resume Gambling";
    } else {
      btn.innerText = "Pause Gambling";
    }
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.stopTimer();
    } else {
      const time = this.timerContainer.element.innerText.split(":");
      const pauseTime = Number(time[0]) * 60 + Number(time[1]);
      this.setGameTimer(pauseTime);
    }
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
    div.append(this.resultForm.container.Buttons[0].element);
    this.element.append(this.resultForm.element);
  }
}

export default Game;
