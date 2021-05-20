import globalState from "../../shared/services/globalState";
import { BaseComponent } from "./base-component";
import { Card } from "./card";
import { CardField } from "./card-field";
import { delay } from "../../shared/delay";

const FLIP_DELAY = 0.5; // тоже в настройки улетит

export class Game extends BaseComponent {
  private readonly cardsField = new CardField();

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardField();
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
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if(!card.isFlipped) return ;
    this.isAnimation = true;
    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      await delay(FLIP_DELAY * 1000);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      // очки или анимация
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}

function createGameHTML() {
  const main = document.querySelector(".main-container");
  main.innerHTML = `
           <div class="card-timer">
            <h3 class="timer">0 : 0</h3>
           </div>
           
             <div class="card-field">
                   <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>
                 
             
                 <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>
                                  <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>
                                  <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>   
                 <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>
                 <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>  
                                  <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>
                 <div class="card-container">
                    <div class="card">
                       <div class="card-front">f</div>
                       <div class="card-back">b</div>
                    </div>
                 </div>  
           </div>
            
  `;
}
function startGame() {

  createGameHTML();
  const from = new Date().getTime();
  const countdownfunc = setInterval(() => {
    const now = new Date().getTime();
    const distance = now - from;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const timer = document.querySelector(".timer");
    timer.innerHTML = `${minutes} : ${seconds}`;
    if (distance >= globalState.settings.time * 1000) {
      clearInterval(countdownfunc);
    }
  }, 1000);
}
export default { startGame };
